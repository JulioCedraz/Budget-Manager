import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import GoogleLoginButton from "./GoogleLoginButton";

function LoginPage() {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-teal-500 to-emerald-400">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-xl p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">Gestor de Despesas</h1>
        
        <div className="flex border-b border-gray-200 mb-6">
          <button 
            className={`flex-1 py-2 text-center font-medium ${
              activeTab === "login" 
                ? "text-blue-600 border-b-2 border-blue-600" 
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
          <button 
            className={`flex-1 py-2 text-center font-medium ${
              activeTab === "register" 
                ? "text-blue-600 border-b-2 border-blue-600" 
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("register")}
          >
            Cadastro
          </button>
        </div>

        <div className="space-y-6">
          {activeTab === "login" ? (
            <>
              <LoginForm />
              <div className="relative flex items-center justify-center">
                <div className="absolute w-full border-t border-gray-300"></div>
                <div className="relative bg-white px-4">
                  <span className="text-sm text-gray-500">ou continue com</span>
                </div>
              </div>
              <GoogleLoginButton />
            </>
          ) : (
            <>
              <RegisterForm />
              <div className="relative flex items-center justify-center">
                <div className="absolute w-full border-t border-gray-300"></div>
                <div className="relative bg-white px-4">
                  <span className="text-sm text-gray-500">ou continue com</span>
                </div>
              </div>
              <GoogleLoginButton />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;