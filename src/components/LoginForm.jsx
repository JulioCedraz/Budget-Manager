import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase";
import { useTheme } from "../context/Themes";

function LoginForm({ onForgotPassword }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { theme, themeColors } = useTheme();
  const colors = themeColors[theme];

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro("");
    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, senha);
    } catch (error) {
      console.error(error);
      setErro("Email ou senha inválidos.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <div>
        <label htmlFor="email" className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'} mb-1`}>
          Email
        </label>
        <input
          id="email"
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
            theme === 'dark' 
              ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-400' 
              : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
          } transition`}
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      
      <div>
        <div className="flex justify-between">
          <label htmlFor="senha" className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'} mb-1`}>
            Senha
          </label>
          <button 
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onForgotPassword(email);
            }}
            className={`text-sm ${theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}
          >
            Esqueceu a senha?
          </button>
        </div>
        <input
          id="senha"
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
            theme === 'dark' 
              ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-400' 
              : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
          } transition`}
          type="password"
          placeholder="Sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
      </div>
      
      {erro && <p className="text-sm text-red-600">{erro}</p>}
      
      <button
        className={`w-full ${
          theme === 'dark'
            ? 'bg-blue-700 hover:bg-blue-600'
            : 'bg-blue-600 hover:bg-blue-700'
        } text-white font-medium py-2 px-4 rounded-lg transition flex items-center justify-center`}
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Entrando...
          </>
        ) : (
          "Entrar"
        )}
      </button>
    </form>
  );
}

export default LoginForm;