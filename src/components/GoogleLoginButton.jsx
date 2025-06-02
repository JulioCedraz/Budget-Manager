import { useState, useEffect } from "react";
import { 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithRedirect, 
  getRedirectResult 
} from "firebase/auth";
import { auth } from "../Firebase";
import { useTheme } from "../context/Themes";

function GoogleLoginButton() {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Verificar resultado do redirect ao carregar a página
    const checkRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          console.log('Login via redirect bem-sucedido:', result.user);
        }
      } catch (error) {
        console.error('Erro no redirect result:', error);
        setError('Erro no login. Tente novamente.');
        
        // Limpar erro após 5 segundos
        setTimeout(() => setError(null), 5000);
      }
    };

    checkRedirectResult();
  }, []);

  // Função para detectar se é dispositivo móvel
  const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  };

  // Função para detectar se o navegador bloqueia cookies de terceiros
  const isThirdPartyCookiesBlocked = () => {
    // Verificação para Safari e Firefox que tendem a bloquear cookies de terceiros
    return /Safari|Firefox/i.test(navigator.userAgent) && !/Chrome/i.test(navigator.userAgent);
  };

  const handleGoogleLogin = async () => {
    setError(null);
    setLoading(true);

    const provider = new GoogleAuthProvider();
    
    // Configurações adicionais do provider para evitar problemas
    provider.setCustomParameters({
      prompt: 'select_account'
    });

    // Adicionar escopos necessários
    provider.addScope('email');
    provider.addScope('profile');

    try {
      // Usar redirect em dispositivos móveis ou quando cookies de terceiros são bloqueados
      if (isMobile() || isThirdPartyCookiesBlocked()) {
        console.log('Usando signInWithRedirect (dispositivo móvel ou cookies bloqueados)...');
        await signInWithRedirect(auth, provider);
        // O redirect não retorna aqui, a página será recarregada
        return;
      } else {
        // Usar popup em desktop quando possível
        console.log('Tentando signInWithPopup...');
        const result = await signInWithPopup(auth, provider);
        console.log('Login com popup bem-sucedido:', result.user);
      }
    } catch (error) {
      console.error('Erro no login:', error);
      
      // Se popup falhar devido a problemas de iframe, cookies ou bloqueio, tentar redirect
      if (error.code === 'auth/popup-blocked' || 
          error.code === 'auth/popup-closed-by-user' ||
          error.code === 'auth/cancelled-popup-request' ||
          error.message.includes('iframe') ||
          error.message.includes('popup') ||
          error.message.includes('third-party cookies')) {
        
        console.log('Popup falhou, tentando redirect como fallback...');
        try {
          await signInWithRedirect(auth, provider);
          // O redirect não retorna aqui, a página será recarregada
          return;
        } catch (redirectError) {
          console.error('Erro no redirect:', redirectError);
          setError('Erro no login. Verifique sua conexão e tente novamente.');
        }
      } else {
        // Outros erros
        let errorMessage = 'Erro no login com Google.';
        
        switch (error.code) {
          case 'auth/network-request-failed':
            errorMessage = 'Erro de conexão. Verifique sua internet.';
            break;
          case 'auth/too-many-requests':
            errorMessage = 'Muitas tentativas. Tente novamente em alguns minutos.';
            break;
          case 'auth/user-disabled':
            errorMessage = 'Conta desabilitada. Entre em contato com o suporte.';
            break;
          default:
            errorMessage = `Erro no login: ${error.message}`;
        }
        
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Mostrar erro se houver */}
      {error && (
        <div className={`mb-3 p-3 rounded-lg text-sm ${
          theme === 'dark' 
            ? 'bg-red-900/20 border border-red-700 text-red-300' 
            : 'bg-red-50 border border-red-200 text-red-700'
        }`}>
          {error}
        </div>
      )}

      <button
        className={`w-full flex items-center justify-center gap-3 
          ${theme === 'dark' 
            ? 'bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600' 
            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
          } 
          ${loading ? 'opacity-75 cursor-not-allowed' : 'cursor-pointer'}
          border py-3 px-4 rounded-lg shadow-sm transition duration-150`}
        onClick={handleGoogleLogin}
        disabled={loading}
        type="button"
      >
        {loading ? (
          // Spinner de loading
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-current"></div>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px">
            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
            <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
            <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
            <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
          </svg>
        )}
        {loading ? 'Entrando...' : 'Entrar com Google'}
      </button>

      {/* Dica informativa */}
      {(isMobile() || isThirdPartyCookiesBlocked()) && (
        <p className={`mt-2 text-xs text-center ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
        }`}>
          O login será feito via redirecionamento
        </p>
      )}
    </div>
  );
}

export default GoogleLoginButton;