import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth, setPersistence, browserSessionPersistence } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCNm0dOnhfMzEVv2LkHjB7XzzzPbFlCgOw",
  authDomain: "my-app-2851c.firebaseapp.com",
  databaseURL: "https://my-app-2851c-default-rtdb.firebaseio.com",
  projectId: "my-app-2851c",
  storageBucket: "my-app-2851c.appspot.com",
  messagingSenderId: "1085943013426",
  appId: "1:1085943013426:web:2b096b0b6e84195b0b1c2b",
  measurementId: "G-ZB59V97W0F"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app)
const auth = getAuth(app);
const db = getDatabase(app);
const dbFire = getFirestore(app);

setPersistence(auth, browserSessionPersistence);
export { app, storage, auth, setPersistence, browserSessionPersistence, db, dbFire };