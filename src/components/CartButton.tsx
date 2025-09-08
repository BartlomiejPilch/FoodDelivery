import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function CartButton() {
  const { cartCount } = useCart();
  const navigate = useNavigate();

  if (cartCount === 0) return null;

  return (
    <div className="md:flex md:justify-center md:mt-4 fixed top-6 right-6 z-50 md:static md:z-0">
      <button
        onClick={() => navigate("/koszyk")}
        className="relative bg-[#ebebeb] text-black px-6 py-3 rounded-full shadow-lg text-sm font-semibold flex items-center gap-2 animate-scale-pulse "
      >
        <span className="text-xl">🛒</span>
        <span>Koszyk</span>
        <span className="absolute -top-2 -right-2 w-9 h-9 flex items-center justify-center text-xs font-bold text-white bg-[#be0102] rounded-full shadow-md">
          {cartCount}
        </span>
      </button>
    </div>
  );
}
