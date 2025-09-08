import { useCart } from "../context/CartContext";
import { useState } from "react";

interface DishCardMobileProps {
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
  reverse?: boolean;
}

export default function DishCardMobile({
  id,
  image,
  name,
  name_description,
  description,
  rating,
  reviews,
  price,
  day,
  date,
  reverse = false,
}: DishCardMobileProps) {
  const { cartItems, addToCart, removeFromCart } = useCart();
  const [hoverRemove, setHoverRemove] = useState(false);

  const cartItem = cartItems.find(item => item.id === id);
  const quantity = cartItem?.quantity || 0;

  const handleAdd = () => addToCart({ id, name, price, image });
  const handleRemoveOne = () => removeFromCart(id, 1);
  const handleRemoveAll = () => removeFromCart(id, quantity);

  return (
    <div className="w-[calc(100%-10px)] mx-[5px] flex flex-col items-center transition duration-300 transform ">
      <div className="bg-white text-black text-center rounded-[10px] p-2 shadow-md">
        <a className="font-semibold">{day} </a>
        <span className="text-[#7690c9] text-center justify-center font-bold">
          - {date}
        </span>
      </div>

      <div className="relative z-10 -mb-12 transition duration-300 transform hover:scale-105">
        <img
          src={image}
          alt={name}
          className="w-[300px] h-[200px] object-contain drop-shadow-xl"
        />
      </div>

      <div className="w-full bg-[#ffffff] rounded-[40px] h-[220px] w-[240px] drop-shadow-md px-5 pt-6 pb-4 relative">
        <div className="flex flex-col h-full">
          <div className="flex flex-col gap-0">
            <h3 className="text-[#be0102] text-xl font-bold">{name}</h3>
            <p className="text-red-400 text-base">{name_description}</p>
            <p className="text-[#232329] text-sm">{description}</p>
          </div>
          <div className="mt-auto">
            <p className="text-black text-left text-base font-bold">
              {price.toFixed(2)} zł
            </p>
          </div>
        </div>

        <div className="absolute bottom-4 right-5 text-right">
          <span className="text-yellow-400">★ </span>
          <span className="text-gray-400 text-xs font-semibold">
            {rating?.toFixed(1)} • {reviews} opinii
          </span>
        </div>
      </div>

      {/* Przyciski */}
      <div className="mt-4 flex gap-3 items-center">
        {quantity > 0 ? (
          <>
            <button
              onClick={handleRemoveOne}
              className="bg-[#a3a3a3] hover:bg-[#f8c475] text-white font-bold px-4 py-2 rounded-full shadow transition"
            >
              –
            </button>

            <button
              onClick={handleRemoveAll}
              onMouseEnter={() => setHoverRemove(true)}
              onMouseLeave={() => setHoverRemove(false)}
              className="bg-green-600 hover:bg-red-600 text-white font-bold px-5 py-2 rounded-full shadow transition relative"
            >
              {hoverRemove ? "Usuń z koszyka" : `Ilość: ${quantity} `}
            </button>

            <button
              onClick={handleAdd}
              className="bg-[#a3a3a3] hover:bg-[#caf875] text-white font-bold px-4 py-2 rounded-full shadow transition"
            >
              +
            </button>
          </>
        ) : (
          <button
            onClick={handleAdd}
            className="bg-[#be0102] hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full shadow-md transition duration-200"
          >
            Zamów
          </button>
        )}
      </div>
    </div>
  );
}
