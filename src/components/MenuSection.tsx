import DishCard from "./DishCard";
import TopHeader from "./TopHeader";
import CartButton from "./CartButton";
import { useCart } from "../context/CartContext";
import DishCardMobile from "./DishCardMobile";

export default function MenuSection() {

  const items = [
    {
      id: "1",
      image: "/img/burger.png",
      name: "Burger",
      name_description: "Szefa Kuchni",
      description: "Solidna, klasyczna przekąska z polską duszą. Wersja „szefowska” to śledź w śmietanie podany po królewsku.",
      rating: 4.9,
      reviews: 87,
      price: 45.00,
      day: "Poniedziałek",
      date: "28.07",
    },
    {
      id: "2",
      image: "/img/pizza.png",
      name: "Pizza",
      name_description: "z Pewexu",
      description: "Nowoczesna klasyka z włoskim rodowodem i polskim charakterem. Wersja „prezesowska” to pizza na cienkim cieście z dojrzewającą szynką, serem bursztyn i oliwą truflową.",
      rating: 4.9,
      reviews: 87,
      price: 45.00,
      day: "Wtorek",
      date: "29.07",
    },
    {
      id: "3",
      image: "/img/kaszanka.png",
      name: "Kaszanka",
      name_description: "Prezesa",
      description: "Wyrazista, tradycyjna potrawa kuchni polskiej z charakterem. Wersja „prezesowska” to kaszanka najwyższej jakości.",
      rating: 4.9,
      reviews: 87,
      price: 45.20,
      day: "Środa",
      date: "30.07",
    },
    {
      id: "4",
      image: "/img/burger.png",
      name: "Burger",
      name_description: "Szefa Kuchni",
      description: "Solidna, klasyczna przekąska z polską duszą. Wersja „szefowska” to śledź w śmietanie podany po królewsku.",
      rating: 4.9,
      reviews: 87,
      price: 45.00,
      day: "Czwartek",
      date: "31.07",
    },
    {
      id: "5",
      image: "/img/ryba.png",
      name: "Rybka",
      name_description: "Lubi pływać",
      description: "Solidna, klasyczna przekąska z polską duszą. Wersja „szefowska” to śledź w śmietanie podany po królewsku.",
      rating: 4.9,
      reviews: 87,
      price: 45.00,
      day: "Piątek",
      date: "01.08",
    },
  ];

  const { addToCart, removeFromCart } = useCart();

  return (
    <section className="relative min-h-screen flex flex-col justify-between text-white py-10 px-4 overflow-hidden">
    {/* ✅ BG tylko desktop */}
<img
  src="/img/bg-colorova.png"
  alt="Tło desktop"
  className="hidden md:block absolute top-0 left-0 w-full h-auto object-cover z-0 pointer-events-none drop-shadow"
/>

{/* ✅ BG tylko mobile */}
<img
  src="/img/bg-mobile.png"
  alt="Tło mobile"
  className="block md:hidden absolute top-0 left-0 w-full h-auto object-cover z-0 pointer-events-none"
/>

      <TopHeader />

      <div className="relative z-1 my-6">

        <div className="text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-[#ffffff] pt-2.5" style={{ textShadow: "0px 0px 4px rgba(0, 0, 0, 0.5)" }}>

            Zamów obiad!
          </h1>
          <p
            className="max-w-2xl mx-auto font-black text-white text-sm md:text-base"
            style={{ textShadow: "0px 0px 2px rgba(0, 0, 0, 0.9)" }}
          >
            Nic tak nie motywuje do pracy jak ciepły, domowy posiłek...
          </p>
        </div>
        <CartButton />
      </div>


      {/* PROMO obrazek dla desktop */}
      <img
        src="/img/promo.png"
        alt="Promo"
        className="hidden md:block fixed top-[80px] right-[80px] w-[100px] md:w-[140px] z-50 pointer-events-none select-none drop-shadow-lg animate-scale-pulse"
      />

      {/* PROMO obrazek dla mobile */}
      <img
        src="/img/promo.png"
        alt="Promo"
        className="block md:hidden fixed top-4 left-4 w-[60px] z-50 pointer-events-none select-none drop-shadow animate-scale-pulse"
      />

      {/* ✅ Desktop layout */}
      <div className="hidden md:flex gap-8 justify-center flex-wrap mb-[50px]">
        {items.map((item, index) => (
          <DishCard key={index} {...item} />
        ))}
      </div>

      {/* ✅ Mobile layout */}
      <div className="md:hidden overflow-x-auto flex gap-2 px-10 snap-x snap-mandatory scroll-smooth">

        {items.map((item) => (
          <div key={item.id} className="snap-center shrink-0 w-[300px] mx-2 ">
            <DishCardMobile key={item.id}  {...item} />
          </div>
        ))}
      </div>


      {/* Stopka */}
      <footer className="absolute bottom-0 left-0 w-full h-[180px] z-[-1] pointer-events-none">
        <img
          src="/img/footer-1.png"
          alt="Stopka"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-2 w-full text-center text-white text-sm font-light pointer-events-none">
          © {new Date().getFullYear()} Colorova. Wszelkie prawa zastrzeżone.
        </div>
      </footer>


    </section>
  );
}
