import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA0OfJxUiERCFzEwW7fqM7VMAQ7biD3qmw",
  authDomain: "budget-manager-by-julio-cedraz.firebaseapp.com",
  projectId: "budget-manager-by-julio-cedraz",
  storageBucket: "budget-manager-by-julio-cedraz.firebasestorage.app",
  messagingSenderId: "537189823143",
  appId: "1:537189823143:web:14557db5eb6989d5eda182",
  measurementId: "G-50NQZTSF94"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa o serviço de autenticação
const auth = getAuth(app);

export { auth };