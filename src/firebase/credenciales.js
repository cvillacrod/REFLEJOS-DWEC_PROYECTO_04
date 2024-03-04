// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//xa obtenes bbdd del firebase de cualquier app
import {getFirestore} from "firebase/firestore";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDa-SiC5BsTEou89F9SR_Vxm-6lFEp6SGY",
  authDomain: "dwecproyecto.firebaseapp.com",
  projectId: "dwecproyecto",
  storageBucket: "dwecproyecto.appspot.com",
  messagingSenderId: "204249169154",
  appId: "1:204249169154:web:2c8f89a3f7c835dfc8561b",
  measurementId: "G-N3YQWWVKSY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//constante para poder usar esas base de datos
//como queremos usar en mas sitios la exportamos
export const db = getFirestore(app);


