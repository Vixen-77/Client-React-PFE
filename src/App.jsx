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
import PatientSignup from "./pages/Patientsignup";
import ProSignup from "./pages/ProSignup";
import RespSignup from "./pages/RespSignup";
import LoginSig from "./pages/LoginSig";
import PatientSignin from "./pages/PatientSignin";
import ProSignin from "./pages/ProSignin";
import RespSignin from "./pages/RespSignin";
import Patient from "./pages/Patient";
import Help from "./pages/help";
import ProS from "./pages/ProS";

import { DarkModeProvider } from "./components/layouts/DarkModeContext";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="LoginSig" element={<LoginSig />} />
        <Route path="PatientSignup" element={<PatientSignup />} />
        <Route path="ProSignup" element={<ProSignup />} />
        <Route path="RespSignup" element={<RespSignup />} />
        <Route path="PatientSignin" element={<PatientSignin />} />
        <Route path="ProSignin" element={<ProSignin />} />
        <Route path="RespSignin" element={<RespSignin />} />
        <Route path="Patient" element={<Patient />} />
        <Route path="Help" element={<Help />} />

        <Route path="ProS" element={<ProS />} />
      </Route>
    )
  );

  return (
    <DarkModeProvider>
      <RouterProvider router={router} />
    </DarkModeProvider>
  );
}

export default App;
