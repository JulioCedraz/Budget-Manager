import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import ForgotPasswordForm from "./ForgotPasswordForm";
import GoogleLoginButton from "./GoogleLoginButton";
import { useTheme, ThemeToggle } from "../context/Themes";

function LoginPage() {
  const [activeTab, setActiveTab] = useState("login");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const { theme, themeColors } = useTheme();
  const colors = themeColors[theme];

  const handleForgotPassword = (email) => {
    setRecoveryEmail(email);
    setShowForgotPassword(true);
  };

  const handleBackToLogin = () => {
    setShowForgotPassword(false);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${colors.loginBg}`}>
      <div className={`w-full max-w-md ${colors.container} shadow-2xl rounded-xl p-8 space-y-6 relative`}>
        <ThemeToggle />
        <h1 className={`text-3xl font-bold text-center ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
          Gestor de Despesas
        </h1>
        
        {showForgotPassword ? (
          <ForgotPasswordForm onBack={handleBackToLogin} initialEmail={recoveryEmail || ""} />
        ) : (
          <>
            <div className={`flex border-b ${theme === 'dark' ? 'border-gray-600' : 'border-gray-200'} mb-6`}>
              <button 
                className={`flex-1 py-2 text-center font-medium ${
                  activeTab === "login" 
                    ? `text-blue-${theme === 'dark' ? '400' : '600'} border-b-2 border-blue-${theme === 'dark' ? '400' : '600'}` 
                    : `text-gray-${theme === 'dark' ? '300' : '500'} hover:text-gray-${theme === 'dark' ? '200' : '700'}`
                }`}
                onClick={() => setActiveTab("login")}
              >
                Login
              </button>
              <button 
                className={`flex-1 py-2 text-center font-medium ${
                  activeTab === "register" 
                    ? `text-blue-${theme === 'dark' ? '400' : '600'} border-b-2 border-blue-${theme === 'dark' ? '400' : '600'}` 
                    : `text-gray-${theme === 'dark' ? '300' : '500'} hover:text-gray-${theme === 'dark' ? '200' : '700'}`
                }`}
                onClick={() => setActiveTab("register")}
              >
                Cadastro
              </button>
            </div>

            <div className="space-y-6">
              {activeTab === "login" ? (
                <>
                  <LoginForm onForgotPassword={handleForgotPassword} />
                  <div className="relative flex items-center justify-center">
                    <div className={`absolute w-full border-t ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'}`}></div>
                    <div className={`relative ${colors.container} px-4`}>
                      <span className={`text-sm text-gray-${theme === 'dark' ? '300' : '500'}`}>ou continue com</span>
                    </div>
                  </div>
                  <GoogleLoginButton />
                </>
              ) : (
                <>
                  <RegisterForm />
                  <div className="relative flex items-center justify-center">
                    <div className={`absolute w-full border-t ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'}`}></div>
                    <div className={`relative ${colors.container} px-4`}>
                      <span className={`text-sm text-gray-${theme === 'dark' ? '300' : '500'}`}>ou continue com</span>
                    </div>
                  </div>
                  <GoogleLoginButton />
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default LoginPage;