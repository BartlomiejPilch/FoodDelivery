import TopHeader from "../components/TopHeader";
import { useCart } from "../context/CartContext";
import { useState } from "react";


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


export default function CartPage() {
  const { cartCount, cartItems,clearCart, removeFromCart, updateCartQuantity } = useCart();

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

  const [discountCode, setDiscountCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);



  const pickupLocations = ["Hala 10", "Hala 12", "Biuro główne"];
  const pickupTimes = ["12:00", "16:00", "21:00"];

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const getErrors = () => {
    const e: ValidationErrors = {};
    if (!formData.name.trim()) e.name = "Podaj imię i nazwisko";
    if (!emailRegex.test(formData.email)) e.email = "Podaj poprawny e-mail";
    if (!formData.pickupLocation) e.pickupLocation = "Wybierz miejsce odbioru";
    if (!formData.pickupTime) e.pickupTime = "Wybierz godzinę odbioru";
    if (!termsAccepted) e.terms = "Zaakceptuj regulamin";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = getErrors();
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setFormData(initialForm);
    setTermsAccepted(false);
    setDiscountCode("");
    setDiscountPercent(0);
    setErrors({});
    clearCart();         

    alert("Zamówienie przyjęte — dziękujemy!");
  };



  const isFormValid = Object.keys(getErrors()).length === 0;




  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleApplyDiscount = () => {
    if (discountCode.trim().toUpperCase() === "RABAT10") {
      setDiscountPercent(10);
    } else {
      setDiscountPercent(0);
      alert("Nieprawidłowy kod rabatowy");
    }
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountedTotal = total * (1 - discountPercent / 100);
  const finalTotal = discountPercent > 0 ? discountedTotal : total;

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
                <label className="block text-sm mb-1">Imię i nazwisko</label>
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
                  value={formData.pickupLocation}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                >
                  <option value="">Wybierz miejsce</option>
                  {pickupLocations.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
                {errors.pickupLocation && <p className="text-red-600 text-xs mt-1">{errors.pickupLocation}</p>}
              </div>

              <div>
                <label className="block text-sm mb-1">Godzina odbioru</label>
                <select
                  name="pickupTime"
                  value={formData.pickupTime}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                >
                  <option value="">Wybierz godzinę</option>
                  {pickupTimes.map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
                {errors.pickupTime && <p className="text-red-600 text-xs mt-1">{errors.pickupTime}</p>}
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
                  className={` bg-green-600 text-white font-semibold py-2 px-6 rounded-full shadowtransition-transform transition-colors
                  ${isFormValid ? "hover:scale-105 hover:bg-green-700" : "opacity-80"}`}
                >
                  Złóż zamówienie
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
