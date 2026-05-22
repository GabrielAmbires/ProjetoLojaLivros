import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const configuracoesFirebase = {
  apiKey: "AIzaSyDet3UKFnkbYH8B-B2rt0X9B1qEoJG9wPo",
  authDomain: "folhaviva-1fd94.firebaseapp.com",
  projectId: "folhaviva-1fd94",
  storageBucket: "folhaviva-1fd94.firebasestorage.app",
  messagingSenderId: "927738388464",
  appId: "1:927738388464:web:9f3060840d8edeefef0735"
};

const app = initializeApp(configuracoesFirebase);
export const autenticacao = getAuth(app);
export const bd = getFirestore(app);