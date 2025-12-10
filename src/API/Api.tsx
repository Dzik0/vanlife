// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { type Van } from "../types/types";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSS6XZ3Dp_yzvgawmGXl7phrWJ7jiA0T4",
  authDomain: "vanlife-3fdac.firebaseapp.com",
  projectId: "vanlife-3fdac",
  storageBucket: "vanlife-3fdac.firebasestorage.app",
  messagingSenderId: "459720086",
  appId: "1:459720086:web:bae75dc93d46d59c4709b7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//DATABASE
export const db = getFirestore(app);

export async function getVans() {
  const collectionRef = collection(db, "vans");
  const snapshot = await getDocs(collectionRef);
  const vans: Van[] = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Van, "id">),
  }));

  return vans;
}

export async function getVanId(id: string) {
  const docRef = doc(db, "vans", id);
  const snapshot = await getDoc(docRef);
  const van = { id: id, ...snapshot.data() };
  console.log(van);

  return van;
}

export async function getHostVans(id: string) {
  const q = query(collection(db, "vans"), where("hostId", "==", id));
  const snapshot = await getDocs(q);
  const vans = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  return vans;
}

export async function getUserDetails(id: string) {
  if (id === "") {
    throw new Error("This function needs ID!");
  }

  const docRef = doc(db, "users", id);
  const snapshot = await getDoc(docRef);
  const userDetails = { ...snapshot.data(), id: id };

  return userDetails;
}

//AUTH
export const auth = getAuth(app);
