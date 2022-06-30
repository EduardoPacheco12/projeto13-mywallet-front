import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginScreen from "./login/LoginScreen";
import RegisterScreen from "./register/RegisterScreen";
import MainScreen from "./main/MainScreen";
import WithdrawScreen from "./withdraw/WithdrawScreen";
import DepositScreen from "./deposit/DepositScreen";
import Context from "./context/Context";
import "../assets/css/reset.css";
import "../assets/css/style.css";

export default function App() {
    //LOGIN
    const [token, setToken] = useState("");
    //UI
    return(
        <Context.Provider value={{token, setToken}}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navigate replace to="/login" />} />
                    <Route path="/login" element={<LoginScreen />}/>
                    <Route path="/cadastro" element={<RegisterScreen />}/>
                    <Route path="/saldo" element={<MainScreen />}/>
                    <Route path="/deposito" element={<DepositScreen />}/>
                    <Route path="/saque" element={<WithdrawScreen />}/>
                </Routes>
            </BrowserRouter>
        </Context.Provider>
    );
}