import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase";

function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await signOut(auth);
      // O redirecionamento será tratado pelo AuthProvider
    } catch (error) {
      console.error(error);
      alert("Erro ao fazer logout.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button 
      onClick={handleLogout}
      disabled={isLoading}
      className="text-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md transition flex items-center"
    >
      {isLoading ? (
        <svg className="animate-spin h-4 w-4 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : (
        "Sair"
      )}
    </button>
  );
}

export default LogoutButton;