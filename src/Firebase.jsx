import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAo0lzzDb-3cvp7lkvdf5rLUhu4i4J_d_4",
  authDomain: "budget-manager-37737.firebaseapp.com",
  projectId: "budget-manager-37737",
  storageBucket: "budget-manager-37737.firebasestorage.app",
  messagingSenderId: "586916191923",
  appId: "1:586916191923:web:1783a9af327ae12d621ac6",
  measurementId: "G-GKG12PL6KY"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa o serviço de autenticação
const auth = getAuth(app);

export { auth };