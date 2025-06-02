import React, { useState } from "react";
import { signInAnonymously } from "firebase/auth";
import { auth } from "../../Firebase";
import { useTheme } from "../../context/Themes";

function AnonymousLoginButton() {
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useTheme();

  const handleAnonymousLogin = async () => {
    setIsLoading(true);
    try {
      await signInAnonymously(auth);
    } catch (error) {
      console.error("Erro no login anônimo:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleAnonymousLogin}
      disabled={isLoading}
      className={`w-full flex items-center justify-center
        ${theme === 'dark' 
          ? 'bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600' 
          : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
        } 
        border py-3 px-4 rounded-lg shadow-sm transition duration-150`}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Entrando...
        </>
      ) : (
        <>
          <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
          Entrar anonimamente
        </>
      )}
    </button>
  );
}

export default AnonymousLoginButton;