// src/firebase/firebase.ts

import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// ✅ Your Firebase config
const firebaseConfig = {
  apiKey: 'AIzaSyBA9TMd35w4wD0r1avZheDlzlF_iWO-TH4',
  authDomain: 'client-dashboard-bd2cb.firebaseapp.com',
  projectId: 'client-dashboard-bd2cb',
  storageBucket: 'client-dashboard-bd2cb.firebasestorage.app',
  messagingSenderId: '839617510089',
  appId: '1:839617510089:web:f3b692b2e826fb7dc36b18',
  measurementId: 'G-3ZZCZLVKDR',
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Optional Services
const analytics = getAnalytics(app);
const db = getFirestore(app); // Firestore
const auth = getAuth(app); // Auth (if needed)
const storage = getStorage(app); // Storage (if needed)

export { app, db, auth, storage, analytics };
