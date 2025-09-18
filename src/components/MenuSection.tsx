import DishCard from "./DishCard";
import TopHeader from "./TopHeader";
import CartButton from "./CartButton";
import DishCardMobile from "./DishCardMobile";
import { useEffect, useMemo, useState } from "react";
import { api, MenuWithDishRow } from "../lib/api";

type CardItem = {
  id: string;
  image: string;
  name: string;
  name_description: string;
  description: string;
  rating?: number;
  reviews?: number;
  price: number;
  day: string;
  date: string;
};

const PL_DAYS = ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"];
const fmtDay = (iso: string) => PL_DAYS[new Date(iso).getDay()];
const fmtDate = (iso: string) => {
  const d = new Date(iso);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return `${dd}.${mm}`;
};

export default function MenuSection() {
  const [rows, setRows] = useState<MenuWithDishRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string>("");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true); setErr("");
        const res = await api.menuExpanded({
          is_active: true,
          not_expired: true,   
          orderable: true,     
          limit: 50,
          offset: 0,
        });


        setRows(res.items);
      } catch (e: any) {
        setErr(e.message || "Błąd ładowania menu");
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  const items: CardItem[] = useMemo(() => rows.map(r => {
    const d = r.dish;
    const ratingNum = d?.reviews ? Number(d.reviews) : undefined;
    const reviewsQty = d?.reviews_quantity ?? undefined;

    return {
      id: String(r.id),
      image: d?.png || "/img/placeholder.png",
      name: d?.name || "Danie",
      name_description: d?.title || "",
      description: d?.description || "",
      rating: Number.isFinite(ratingNum) ? ratingNum : undefined,
      reviews: reviewsQty,
      price: Number(r.price ?? d?.['price' as keyof typeof d] ?? 0),
      day: fmtDay(r.date_to_sell),
      date: fmtDate(r.date_to_sell),
    };
  }), [rows]);

  return (
    <section className="relative min-h-screen flex flex-col justify-between text-white py-10 px-4 overflow-hidden">
      {/* BG */}
      <img src="/img/bg-colorova.png" alt="" className="hidden md:block absolute top-0 left-0 w-full h-auto object-cover z-0 pointer-events-none drop-shadow" />
      <img src="/img/bg-mobile.png" alt="" className="block md:hidden absolute top-0 left-0 w-full h-auto object-cover z-0 pointer-events-none" />

      <TopHeader />
      <div className="relative z-1 my-6">
        <div className="text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-[#ffffff] pt-2.5" style={{ textShadow: "0px 0px 4px rgba(0,0,0,.5)" }}>Zamów obiad!</h1>
          <p className="max-w-2xl mx-auto font-black text-white text-sm md:text-base" style={{ textShadow: "0 0 2px rgba(0,0,0,.9)" }}>
            Nic tak nie motywuje do pracy jak ciepły, domowy posiłek...
          </p>
        </div>
        <CartButton />
      </div>

      {/* PROMO */}
      <img src="/img/promo.png" alt="Promo" className="hidden md:block fixed top-[80px] right-[80px] w-[100px] md:w-[140px] z-50 pointer-events-none select-none drop-shadow-lg animate-scale-pulse" />
      <img src="/img/promo.png" alt="Promo" className="block md:hidden fixed top-4 left-4 w-[60px] z-50 pointer-events-none select-none drop-shadow animate-scale-pulse" />

      {/* Loading / Error */}
      {loading && <div className="text-center py-10">Ładuję menu…</div>}
      {err && <div className="text-center py-10 text-red-300">{err}</div>}

      {!loading && !err && (
        <>
          {/* Desktop */}
          <div className="hidden md:flex gap-8 justify-center flex-wrap mb-[50px]">
            {items.map((item) => <DishCard key={item.id} {...item} />)}
          </div>

          {/* Mobile */}
          <div className="md:hidden overflow-x-auto flex gap-2 px-10 snap-x snap-mandatory scroll-smooth">
            {items.map((item) => (
              <div key={item.id} className="snap-center shrink-0 w-[300px] mx-2">
                <DishCardMobile {...item} />
              </div>
            ))}
          </div>
        </>
      )}

      {/* Stopka */}
      <footer className="absolute bottom-0 left-0 w-full h-[180px] z-[-1] pointer-events-none">
        <img src="/img/footer-1.png" alt="Stopka" className="w-full h-full object-cover" />
        <div className="absolute bottom-2 w-full text-center text-white text-sm font-light pointer-events-none">
          © {new Date().getFullYear()} Colorova. Wszelkie prawa zastrzeżone.
        </div>
      </footer>
    </section>
  );
}
