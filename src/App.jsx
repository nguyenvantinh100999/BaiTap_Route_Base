import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./components/Admin";
import Index from "./components/product-management";
import CreateProduct from "./components/product-management/CreateProduct";
import UpdateProduct from "./components/product-management/UpdateProduct";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="admin" element={<Admin />}>
          <Route index element={<Index />}></Route>
          <Route path="create" element={<CreateProduct />}></Route>
          <Route path="update">
            <Route path=":id" element={<UpdateProduct />}></Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
