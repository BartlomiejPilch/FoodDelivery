import { useNavigate } from "react-router-dom";
import SuccessPopupBig from "../components/SuccessPopupBig";
import SuccessToast from "../components/SuccessToast";
import TopHeader from "../components/TopHeader";
import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react";
import { api, postFrontendOrder } from "../lib/api";

interface FormData {
  name: string;
  email: string;
  pickupLocation: string;
  pickupTime: string;
}

interface ValidationErrors {
  name?: string;
  email?: string;
  pickupLocation?: string;
  pickupTime?: string;
  terms?: string;
}

type Place = { id: number; place_name: string; is_active: boolean; note?: string };
type Hour = { id: number; hour: string; is_active: boolean; note?: string };

export default function CartPage() {
  const { cartCount, cartItems, clearCart, removeFromCart, updateCartQuantity } = useCart();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    pickupLocation: "",
    pickupTime: "",
  });
  const initialForm: FormData = {
    name: "",
    email: "",
    pickupLocation: "",
    pickupTime: "",
  };
  const navigate = useNavigate();
  const [discountCode, setDiscountCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});

  const [places, setPlaces] = useState<Place[]>([]);
  const [hours, setHours] = useState<Hour[]>([]);
  const [loadingMeta, setLoadingMeta] = useState(true);
  const [metaErr, setMetaErr] = useState("");

  const [deliveryPlaceId, setDeliveryPlaceId] = useState<number | null>(null);
  const [deliveryHourId, setDeliveryHourId] = useState<number | null>(null);

  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'online'>('cash');
  const [orderCodes, setOrderCodes] = useState<string>('');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const getErrors = () => {
    const e: ValidationErrors = {};
    if (!formData.name.trim()) e.name = "Podaj imię i nazwisko";
    if (!emailRegex.test(formData.email)) e.email = "Podaj poprawny e-mail";
    if (!deliveryPlaceId) e.pickupLocation = "Wybierz miejsce odbioru";
    if (!deliveryHourId) e.pickupTime = "Wybierz godzinę odbioru";
    if (!termsAccepted) e.terms = "Zaakceptuj regulamin";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = getErrors();
    setErrors(errs);
    if (Object.keys(errs).length) return;
    if (cartItems.length === 0) return;

    try {
      setSubmitting(true);
      const items = cartItems.map(ci => ({
        menu_id: Number(ci.id),                 
        quantity: Math.max(1, ci.quantity || 1)
      }));

      const payload: any = {
        name: formData.name,
        email: formData.email,
        delivery_place_id: deliveryPlaceId!,    
        delivery_hour_id: deliveryHourId!,
        items,
        payment_method: paymentMethod,
      };

      if (discountCode.trim()) {
        payload.rabat_code = discountCode.trim().toUpperCase();
      }

      const response = await postFrontendOrder(payload);

      // reset UI
      setFormData({ name: "", email: "", pickupLocation: "", pickupTime: "" });
      setTermsAccepted(false);
      setDiscountCode("");
      setDiscountPercent(0);
      setErrors({});
      setOrderCodes(response?.order_code);
      setOpen(true);
      clearCart();
    } catch (err: any) {
      alert(err?.message || "Nie udało się złożyć zamówienia");
    } finally {
      setSubmitting(false);
    }
  };


  const isFormValid = Object.keys(getErrors()).length === 0;

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const [appliedRabatId, setAppliedRabatId] = useState<number | null>(null);

  const handleApplyDiscount = async () => {
    const code = discountCode.trim().toUpperCase();
    if (!code) { setDiscountPercent(0); setAppliedRabatId(null); return; }

    const v = await api.validateRabatCode(code);
    if (!v) {
      setDiscountPercent(0);
      setAppliedRabatId(null);
      alert("Nieprawidłowy lub wygasły kod rabatowy");
      return;
    }
    setDiscountPercent(Number(v.percentage || 0));
    setAppliedRabatId(v.id);
  };


  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountedTotal = total * (1 - discountPercent / 100);
  const finalTotal = discountPercent > 0 ? discountedTotal : total;

  useEffect(() => {
    (async () => {
      try {
        setLoadingMeta(true); setMetaErr("");
        const [ph, pl] = await Promise.all([
          api.getDeliveryHours(),
          api.getDeliveryPlaces()
        ]);
        const activeHours = (ph.items || []).filter(h => h.is_active);
        const activePlaces = (pl.items || []).filter(p => p.is_active);
        setHours(activeHours);
        setPlaces(activePlaces);
        // suggest defaults
        if (activePlaces[0]) setDeliveryPlaceId(activePlaces[0].id);
        if (activeHours[0]) setDeliveryHourId(activeHours[0].id);
      } catch (e: any) {
        setMetaErr(e?.message || "Nie udało się pobrać lokalizacji/godzin");
      } finally {
        setLoadingMeta(false);
      }
    })();
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-between text-white  px-4">
      {/* Tło */}
      <img
        src="/img/bg-colorova.png"
        alt="Tło desktop"
        className="hidden md:block absolute top-0 left-0 w-full h-auto object-cover z-0 pointer-events-none drop-shadow"
      />
      <img
        src="/img/bg-mobile.png"
        alt="Tło mobile"
        className="block md:hidden absolute top-0 left-0 w-full h-auto object-cover z-0 pointer-events-none"
      />

      {/* Logo / nagłówek */}
      <TopHeader />

      {/* Główna zawartość */}
      <div className="relative z-10 w-full flex flex-col items-center">
        <div className="items-centeritems-center mb-6">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-[#ffffff] pt-2.5" style={{ textShadow: "0px 0px 4px rgba(0, 0, 0, 0.5)" }}>
            Twój koszyk
          </h1>
          {cartCount > 0 ? (
            <p
              className="max-w-2xl mx-auto font-black text-white text-sm md:text-base"
              style={{ textShadow: "0px 0px 2px rgba(0, 0, 0, 1)" }}
            >
              Masz <span className="font-black text-4xl text-red-600">{cartCount}</span>
              {cartCount % 100 >= 12 && cartCount % 100 <= 14
                ? " obiadów "
                : cartCount === 1
                  ? " obiad "
                  : cartCount % 10 >= 2 && cartCount % 10 <= 4
                    ? " obiady "
                    : " obiadów "}
              w Twoim koszyku.
            </p>
          ) : (
            <p
              className="max-w-2xl mx-auto font-black text-white text-sm md:text-base"
              style={{ textShadow: "0px 0px 2px rgba(0, 0, 0, 0.9)" }}
            >Twój koszyk jest pusty.</p>
          )}
        </div>

        {/* Dwukolumnowy układ */}
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Lewa kolumna – lista produktów */}
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl p-4 shadow text-black flex items-center gap-4"
              >
                <img src={item.image} alt={item.name} className="w-24  h-auto object-cover rounded" />

                <div className="flex-1 text-left">
                  <p className="text-sm text-slate-600 font-mono">{item.day} {item.date}</p>
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.price.toFixed(2)} zł</p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateCartQuantity(item.id, Math.max(1, item.quantity - 1))}
                    className="px-3 py-1 bg-gray-200 rounded-full hover:bg-gray-300 font-semibold text-center"
                  >
                    -
                  </button>
                  <span className="min-w-[24px] text-center font-medium">{item.quantity} </span>
                  <button
                    onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                    className="px-3 py-1 bg-gray-200 rounded-full hover:bg-gray-300 font-semibold text-center"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-600 text-sm font-medium hover:underline ml-4"
                >
                  Usuń
                </button>
              </div>
            ))}

            {/* Podsumowanie ceny */}
            {cartItems.length > 0 && (
              <div className="mt-4 text-black text-right font-semibold text-lg">
                {discountPercent > 0 ? (
                  <>
                    <div className="line-through text-gray-500">{total.toFixed(2)} zł</div>
                    <div className="text-green-600">{discountedTotal.toFixed(2)} zł po rabacie</div>
                  </>
                ) : (
                  <>Suma: {total.toFixed(2)} zł</>
                )}
              </div>
            )}
          </div>

          {/* Prawa kolumna – formularz + rabat */}
          <div className="bg-white rounded-xl shadow p-6 text-black self-start">
            <h2 className="text-2xl font-bold mb-4">Dane do odbioru</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Imię</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
                {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm mb-1">E-mail</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
              <div>
                <label className="block text-sm mb-1">Miejsce odbioru</label>
                <select
                  name="pickupLocation"
                  value={String(deliveryPlaceId ?? "")}
                  onChange={(e) => setDeliveryPlaceId(Number(e.target.value) || null)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                >
                  <option value="">Wybierz miejsce</option>
                  {places.map(p => (
                    <option key={p.id} value={p.id}>{p.place_name}</option>
                  ))}
                </select>
                {errors.pickupLocation && <p className="text-red-600 text-xs mt-1">{errors.pickupLocation}</p>}
              </div>

              <div>
                <label className="block text-sm mb-1">Godzina odbioru</label>
                <select
                  name="pickupTime"
                  value={String(deliveryHourId ?? "")}
                  onChange={(e) => setDeliveryHourId(Number(e.target.value) || null)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                >
                  <option value="">Wybierz godzinę</option>
                  {hours.map(h => (
                    <option key={h.id} value={h.id}>{h.hour}</option>
                  ))}
                </select>
                {errors.pickupTime && <p className="text-red-600 text-xs mt-1">{errors.pickupTime}</p>}
                {metaErr && <p className="text-red-600 text-sm mt-2">{metaErr}</p>}
              </div>
              {/* Kod rabatowy */}
              <div className="mt-6">
                <label className="block text-sm mb-1">Kod rabatowy</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    className="flex-1 border border-gray-300 rounded px-3 py-2"
                    placeholder="Wpisz kod (np. RABAT10)"
                  />
                  <button
                    onClick={handleApplyDiscount}
                    className="bg-gray-800 text-white px-4 py-2 rounded font-medium hover:bg-gray-700"
                  >
                    Zastosuj
                  </button>
                </div>
              </div>

              {/* Wybór płatności */}
              <div className="mt-6">
                <label className="block text-sm mb-2 font-medium">Wybierz opcję płatności</label>
                <div className="flex gap-4 items-center">
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="cash"
                      checked={paymentMethod === 'cash'}
                      onChange={() => setPaymentMethod('cash')}
                      className="accent-green-600"
                    />
                    <span>Gotówka przy odbiorze</span>
                  </label>
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="online"
                      checked={paymentMethod === 'online'}
                      onChange={() => setPaymentMethod('online')}
                      className="accent-green-600"
                    />
                    <span>Płatność internetowa</span>
                  </label>
                </div>
                <p className="text-xs text-slate-500 mt-1">

                </p>
              </div>

              <div className="flex items-start gap-2 mt-4">
                <input
                  id="terms"
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => {
                    setTermsAccepted(e.target.checked);
                    if (errors.terms) setErrors(prev => ({ ...prev, terms: undefined }));
                  }}
                  className="w-4 h-4 accent-green-600 mt-1 cursor-pointer"
                />
                <label htmlFor="terms" className="text-sm cursor-pointer">
                  Akceptuję <a href="/regulamin" className="text-blue-600 underline">regulamin.</a>
                </label>
              </div>
              {errors.terms && <p className="text-red-600 text-xs mt-1">{errors.terms}</p>}
              {/* Zamówienie */}
              {/* Zamówienie + suma */}
              <div className="mt-6 flex items-center justify-between gap-4">
                <button
                  onClick={handleSubmit}
                  disabled={!isFormValid || submitting}
                  className={`bg-green-600 text-white font-semibold py-2 px-6 rounded-full transition
                 ${isFormValid && !submitting ? "hover:scale-105 hover:bg-green-700" : "opacity-60 cursor-not-allowed"}`}
                >
                  {submitting ? "Wysyłanie…" : "Złóż zamówienie"}
                </button>
                <div>
                  {discountPercent > 0 && (
                    <div className="mt-2 text-green-600 text-sm font-medium ">
                      Rabat {discountPercent}% (-{(total - discountedTotal).toFixed(2)} zł)
                    </div>
                  )}
                  <span className="text-2xl font-bold text-[#000000]">
                    {finalTotal.toFixed(2)} zł
                  </span>
                </div>

                <SuccessPopupBig
                  open={open}
                  onClose={() => setOpen(false)}
                  onExited={() => {
                    clearCart();
                    navigate("/");
                  }}
                  title="Zapisane!"
                  message={<>Wspaniale Twoje zamówienie zostało przyjęte do realizacji!</>}
                  order_number={orderCodes.length ? orderCodes : "—"}
                  autoHideMs={30000}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Powrót */}
        <button
          onClick={() => window.history.back()}
          className="mt-10 bg-[#be0102] text-white py-2 px-6 rounded-full shadow-lg text-sm font-semibold mb-20"
        >
          Wróć do menu
        </button>
      </div>

      {/* Stopka */}
      <footer className="absolute bottom-0 left-0 w-full h-[180px] z-[-1] pointer-events-none">
        <img
          src="/img/footer-1.png"
          alt="Stopka"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-2 w-full text-center text-white text-sm md:text-base font-light pointer-events-none">
          © {new Date().getFullYear()} Colorova. Wszelkie prawa zastrzeżone.
        </div>
      </footer>
    </section>
  );
}
