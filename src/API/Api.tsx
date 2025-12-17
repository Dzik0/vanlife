// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { type BookingFirebase, type Van, type VanImages } from "../types/types";
import { getDownloadURL, getStorage, listAll, ref } from "firebase/storage";

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
  const vans: Van[] = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Van, "id">),
  }));

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

export async function getRentedVans(id: string) {
  if (id === "") {
    throw new Error("This function needs ID!");
  }

  const q = query(collection(db, "bookings"), where("userId", "==", id));
  const snapshot = await getDocs(q);
  const vans: BookingFirebase[] = snapshot.docs.map((item) => ({
    id: item.id,
    ...(item.data() as Omit<BookingFirebase, "id">),
  }));
  return vans;
}

//DATABASE BOOKINGS
export async function bookVan(details: any) {
  const docRef = collection(db, "bookings");
  try {
    await addDoc(docRef, details);
  } catch (err) {
    console.error(err);
  }
}

//AUTH
export const auth = getAuth(app);

//STORE
export const storage = getStorage(app);

export async function getSingleVanImages(vanId: string): Promise<string[]> {
  const imageListRef = ref(storage, `vansphotos/van-${vanId}`);
  const res = await listAll(imageListRef);
  const list = await Promise.all(res.items.map(getDownloadURL));
  return list;
}

export async function getAllImages() {
  const rootRef = ref(storage, "vansphotos");
  const res = await listAll(rootRef);

  const result: VanImages[] = [];

  // Each prefix is like vansphotos/van-123
  for (const folderRef of res.prefixes) {
    // folderRef.name will be "van-123"
    const folderName = folderRef.name; // e.g. "van-123"

    // Extract vanId if you want just "123"
    const vanId = folderName.replace("van-", "");

    const folderRes = await listAll(folderRef);
    const urls = await Promise.all(folderRes.items.map(getDownloadURL));

    result.push({
      vanId,
      vanPhotos: urls,
    });
  }

  return result;
}
