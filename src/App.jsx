// RACIM CODE
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";

import "./App.css";
import React from "react";
import RootLayout from "./components/layouts/RootLayout";
import Home from "./pages/Home";

import LoginSig from "./pages/LoginSig";
import LoadingAnimation from "./pages/Loading";

import Patient from "./pages/Patient" ;








function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="LoginSig" element={<LoginSig />} />
        <Route path="loading" element={<LoadingAnimation />} />
           <Route path="patient" element={<Patient />} />

    
      </Route>

    )
  );

  return <RouterProvider router={router} />;
}

export default App;

