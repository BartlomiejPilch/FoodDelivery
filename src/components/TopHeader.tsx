

export default function TopHeader() {
  return (
    <div className="flex items-center justify-between px-4 pt-4 w-full">
      {/* Lewa strona: hamburger (tylko mobile) / logo (desktop) */}
      <div className="flex items-center gap-2">
        {/* Hamburger tylko na mobile */}
        <img
          src="/img/hamburger.png"
          alt="Menu"
          className="w-6 h-6 object-contain md:hidden"
        />

        {/* Logo na desktop */}
        <img
          src="/img/Colorova-logo.svg"
          alt="Logo"
          className="hidden md:block w-[150px] md:w-[150px] h-auto object-contain  transition duration-300 transform hover:scale-110"
        />
      </div>

      {/* Logo wyśrodkowane tylko na mobile */}
      <img
         src="/img/Colorova-logo.svg"
        alt="Logo mobile"
        className="block md:hidden w-[120px] h-auto object-contain absolute left-1/2 transform -translate-x-1/2"
      />
      

      {/* Prawa strona: ikony */}
      {/* <div className="flex gap-4 items-center">
        <img
          src="/img/favorite.png"
          alt="Ulubione"
          className="w-6 h-6 object-contain cursor-pointer"
        />
        <img
          src="/img/basket.png"
          alt="Koszyk"
          className="w-6 h-6 object-contain cursor-pointer"
        />
      </div> */}
    </div>
  );
}
