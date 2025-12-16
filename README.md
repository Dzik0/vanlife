# 🚐 VanLife - Explore & Host Platform

A full-stack **van rental marketplace** built with **React**, **TypeScript**, **Firebase**, and **React Router**.  
Users can browse vans, hosts can manage listings, with full authentication and protected routes. **Live on Netlify** with Firebase backend.

## 📸 Preview

![Vanlife Page Screenshot](/screenshot.jpg)

LIVE: [https://p-glazowski.github.io/vanlife](https://vanlife-explore-vans.netlify.app/)

---

## 🚀 Features

- **👤 User Authentication** - Login/Register/Password Recovery with Firebase Auth
- **🏕️ Van Discovery** - Browse and view detailed van listings
- **📊 Host Dashboard** - Manage income, reviews, and hosted vans
- **🔐 Protected Routes** - Host features require authentication
- **📱 Fully Responsive** - Mobile-first design with Tailwind CSS
- **⚡ Real-time Data** - Firebase Firestore integration
- **🖼️ Image Storage** - Firebase Storage for van photos
- **🛣️ Client-side Routing** - React Router v6 with nested routes

---

## 🛠️ Tech Stack

| Frontend     | Backend          | Tools           |
| ------------ | ---------------- | --------------- |
| React 18     | Firebase Auth    | Vite            |
| TypeScript   | Firestore        | React Router v6 |
| Tailwind CSS | Firebase Storage | Netlify         |

---

## 📁 Project Structure

```
src/
├── pages/
│   ├── Home.tsx                 # Landing page
│   ├── Vans/                    # Van browsing & details
│   ├── Host/                    # Host dashboard & management
│   └── Account/                 # Auth pages
├── components/
│   ├── Layout.tsx               # Main layout
│   ├── HostLayout.tsx           # Host dashboard layout
│   └── ProtectedRoute.tsx       # Route protection
├── providers/
│   ├── AuthProvider.tsx         # Firebase Auth context
│   └── VansProvider.tsx         # Vans data context
└── API/
    └── Api.ts                   # Firebase services
```

---

## 🧠 Key Implementation Highlights

```tsx
// Custom Hooks & Context API for state management
// Firebase Auth with real-time user state
// Protected routes with loading states
// Dynamic van image loading from Firebase Storage
// TypeScript interfaces for full type safety
// Nested routing for host van management
```

**📈 Current Status:** MVP complete. **Bookings & Messaging system in progress.**

---

## 📦 Quick Start

```bash
git clone https://github.com/p-glazowski/vanlife.git
cd product-page
npm install
npm run dev
```

**Note:** Requires Firebase project setup with Firestore/Auth/Storage enabled.

---

## 🌐 Deployment

- **Frontend:** [Netlify](https://vanlife-explore-vans.netlify.app/)
- **Backend:** Firebase (Auth, Firestore, Storage)
- **CI/CD:** Netlify automatic deploys

---

## ✅ Roadmap

| Phase | Features                          | Status          |
| ----- | --------------------------------- | --------------- |
| ✅    | Authentication & Protected Routes | Complete        |
| ✅    | Van Browsing & Host Dashboard     | Complete        |
| ✅    | Firebase Integration              | Complete        |
| 🔄    | **Bookings System**               | **In Progress** |
| 🔄    | **Real-time Messaging**           | **In Progress** |
| ⏳    | Payment Integration               | Planned         |
| ⏳    | Advanced Search & Filters         | Planned         |

---

## 👨‍💻 Author

**Piotr Głazowski**  
_Full-Stack Developer_  
[GitHub](https://github.com/p-glazowski)

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🎯 Portfolio Highlights

- **Scalable Architecture** - Context API + Custom Hooks
- **Production Firebase Integration**
- **TypeScript Everywhere** - Zero runtime errors
- **Professional UX/UI** - Mobile-first responsive design
- **Real Authentication Flow** - Protected routes & user management

---

_Built with ❤️ for production-ready web applications_
