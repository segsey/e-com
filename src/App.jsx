import { Route, Routes } from "react-router-dom";
import ShoppingPage from "./page/shopping-page.jsx";
import Product from "./page/product.jsx";
import Form from "./page/formComponents/form.jsx";
function App() {
  return (
    <>
      <Routes>
        <Route path="/*" element={<ShoppingPage />} />
        <Route path="/form/*" element={<Form />} />
        <Route path="/product/:category/:id" element={<Product />} />
      </Routes>
    </>
  );
}

export default App;
