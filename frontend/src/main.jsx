import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import {Home, Login, Product, Reffer, User} from "./components";



const route = createBrowserRouter(
  createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route path="" element={<Home />}/>
    <Route path="login" element={<Login />} />
    <Route path="user" element={<User />} />
    <Route path="product/:id" element={<Product />} />
    <Route path="redirect" element={<Reffer />} />
   </Route>)
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
   <RouterProvider router={route} />
  </StrictMode>
);
