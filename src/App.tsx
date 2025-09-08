import { Routes, Route } from "react-router-dom";
import MenuPage from "./pages/MenuPage";
import CartPage from "./pages/CartPage";
import StatuePage from "./pages/StatuePage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MenuPage />} />
      <Route path="/koszyk" element={<CartPage />} />
      <Route path="/regulamin" element={<StatuePage/>}/>
    </Routes>
  );
}
