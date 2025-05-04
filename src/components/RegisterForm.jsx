import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase";

function RegisterForm() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");
  const [erro, setErro] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setErro("");
    
    if (senha !== confirmaSenha) {
      setErro("As senhas não coincidem.");
      return;
    }
    
    if (senha.length < 6) {
      setErro("A senha deve ter pelo menos 6 caracteres.");
      return;
    }
    
    setIsLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, email, senha);
      // Não precisamos do alert aqui, o AuthProvider irá redirecionar automaticamente após o cadastro
    } catch (error) {
      console.error(error);
      if (error.code === 'auth/email-already-in-use') {
        setErro("Este email já está em uso.");
      } else if (error.code === 'auth/invalid-email') {
        setErro("Email inválido.");
      } else {
        setErro("Erro ao cadastrar. Tente novamente mais tarde.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleRegister} className="space-y-4">
      <div>
        <label htmlFor="register-email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          id="register-email"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      
      <div>
        <label htmlFor="register-senha" className="block text-sm font-medium text-gray-700 mb-1">
          Senha
        </label>
        <input
          id="register-senha"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          type="password"
          placeholder="Mínimo 6 caracteres"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
          minLength={6}
        />
      </div>
      
      <div>
        <label htmlFor="confirma-senha" className="block text-sm font-medium text-gray-700 mb-1">
          Confirmar Senha
        </label>
        <input
          id="confirma-senha"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          type="password"
          placeholder="Confirme sua senha"
          value={confirmaSenha}
          onChange={(e) => setConfirmaSenha(e.target.value)}
          required
        />
      </div>
      
      {erro && <p className="text-sm text-red-600">{erro}</p>}
      
      <button
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition flex items-center justify-center"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Cadastrando...
          </>
        ) : (
          "Cadastrar"
        )}
      </button>
    </form>
  );
}

export default RegisterForm;