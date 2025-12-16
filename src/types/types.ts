import type { Timestamp } from "firebase/firestore";

export type Van = {
  id: string;
  description: string;
  imageUrl: string;
  name: string;
  price: number;
  type: string;
  hostId: string;
};

export type UserFirebase = {
  id: string;
  phone: string;
  name: string;
  email: string;
  createdAt: string;
};

export type BookingFirebase = {
  id: string;
  userId: string;
  vanId: string;
  startDate: Timestamp;
  endDate: Timestamp;
  createdAt: Timestamp;
  status: string;
};
