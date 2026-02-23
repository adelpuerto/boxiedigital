// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Importamos Base de Datos
import { getStorage } from "firebase/storage";     // Importamos Almacenamiento (Fotos)

// Tus datos de configuración (Copiados de tu captura)
const firebaseConfig = {
  apiKey: "AIzaSyCo88Ei8LYci7OGNdDMShmtIqwtfGrL6f4",
  authDomain: "boxie-digital.firebaseapp.com",
  projectId: "boxie-digital",
  storageBucket: "boxie-digital.firebasestorage.app",
  messagingSenderId: "90424135534",
  appId: "1:90424135534:web:c98d57167691f3fcd7fb7f"
};

// 1. Inicializamos Firebase
const app = initializeApp(firebaseConfig);

// 2. Exportamos las herramientas para usarlas en la app
export const db = getFirestore(app);
export const storage = getStorage(app);