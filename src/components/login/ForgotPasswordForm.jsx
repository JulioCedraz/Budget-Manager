import React, { useState } from "react";
import { sendPasswordResetEmail, fetchSignInMethodsForEmail } from "firebase/auth";
import { auth } from "../../Firebase";
import { useTheme } from "../../context/Themes";

function ForgotPasswordForm({ onBack, initialEmail = "" }) {
  const [email, setEmail] = useState(initialEmail);
  const [mensagem, setMensagem] = useState("");
  const [tipo, setTipo] = useState(""); // "sucesso" ou "erro"
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useTheme();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMensagem("");
    setTipo("");
    setIsLoading(true);

    try {
      // Verificamos se o email é válido antes de tentar enviar
      if (!email || !email.includes('@') || !email.includes('.')) {
        setMensagem("Por favor, insira um email válido.");
        setTipo("erro");
        setIsLoading(false);
        return;
      }

      // Verificando se o email existe no Firebase
      try {
        const methods = await fetchSignInMethodsForEmail(auth, email);
        
        // Se não houver métodos de login disponíveis, o email não está registrado
        if (methods.length === 0) {
          setMensagem("Este email não está cadastrado em nosso sistema.");
          setTipo("erro");
          setIsLoading(false);
          return;
        }
        
        // Se chegou aqui, o email existe, então enviamos o link de recuperação
        await sendPasswordResetEmail(auth, email);
        setMensagem("Email de recuperação enviado. Verifique sua caixa de entrada.");
        setTipo("sucesso");
      } catch (methodError) {
        // Tratar erro na verificação de métodos
        if (methodError.code === 'auth/invalid-email') {
          setMensagem("O formato do email não é válido.");
        } else {
          console.error(methodError);
          // Se não conseguimos verificar, tentamos enviar o reset de qualquer forma
          await sendPasswordResetEmail(auth, email);
          setMensagem("Se este email estiver cadastrado, um link de recuperação será enviado.");
          setTipo("sucesso");
        }
      }
    } catch (error) {
      console.error(error);
      if (error.code === 'auth/user-not-found') {
        setMensagem("Este email não está cadastrado em nosso sistema.");
      } else if (error.code === 'auth/invalid-email') {
        setMensagem("O formato do email não é válido.");
      } else if (error.code === 'auth/too-many-requests') {
        setMensagem("Muitas tentativas em pouco tempo. Tente novamente mais tarde.");
      } else {
        setMensagem("Erro ao processar sua solicitação. Tente novamente mais tarde.");
      }
      setTipo("erro");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className={`text-2xl font-medium text-center ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
        Recuperar Senha
      </h2>
      
      <p className={`text-sm text-center ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
        Digite seu email para receber um link de recuperação de senha
      </p>
      
      <form onSubmit={handleResetPassword} className="space-y-4">
        <div>
          <label htmlFor="recovery-email" className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'} mb-1`}>
            Email
          </label>
          <input
            id="recovery-email"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              theme === 'dark' 
                ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-400 focus:border-blue-400' 
                : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
            } transition`}
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        {mensagem && (
          <div className={`p-3 rounded-lg text-sm flex items-start ${
            tipo === "sucesso" 
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" 
              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
          }`}>
            <div className="mr-2 mt-0.5">
              {tipo === "sucesso" ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <p>{mensagem}</p>
          </div>
        )}
        
        <div className="flex space-x-3">
          <button
            type="button"
            onClick={onBack}
            className={`flex-1 py-2 px-4 border rounded-lg font-medium transition ${
              theme === 'dark'
                ? 'border-gray-600 text-gray-200 hover:bg-gray-700'
                : 'border-gray-300 text-gray-700 hover:bg-gray-100'
            }`}
          >
            Voltar
          </button>
          
          <button
            className={`flex-1 ${
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
                Enviando...
              </>
            ) : (
              "Enviar"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ForgotPasswordForm;