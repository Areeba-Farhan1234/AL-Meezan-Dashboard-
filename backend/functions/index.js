// import * as functions from 'firebase-functions';
// import * as admin from 'firebase-admin';

// admin.initializeApp();

// // Sample GET API
// export const helloWorld = functions.https.onRequest((req, res) => {
//   res.send('Hello from Firebase Functions with TypeScript!');
// });

// export const submitMessage = functions.https.onRequest(async (req, res) => {
//   const { name, message } = req.body;
//   if (!name || !message) return res.status(400).send('Missing fields');
//   await admin.firestore().collection('messages').add({ name, message });
//   res.status(200).send('Saved!');
// });
// import * as functions from 'firebase-functions'; // ✅ v1 supports .schedule()

// import * as admin from 'firebase-admin';

// admin.initializeApp();
// const db = admin.firestore();

// export const notifyExpiringClients = functions.pubsub.schedule('every 24 hours').onRun(async () => {
//   const snapshot = await db.collection('clients').get();
//   const now = new Date();

//   for (const doc of snapshot.docs) {
//     const data = doc.data();
//     const expiry = new Date(data.expiryDate);
//     const daysLeft = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

//     if (daysLeft <= 7) {
//       await db.collection('notifications').add({
//         clientId: doc.id,
//         message: `Plan expires in ${daysLeft} day(s)`,
//         seen: false,
//         createdAt: admin.firestore.FieldValue.serverTimestamp(),
//       });
//     }
//   }

//   return null;
// });

import functions from 'firebase-functions';
import admin from 'firebase-admin';

admin.initializeApp();

export const helloWorld = functions.https.onRequest((req, res) => {
  res.send('Hello from Firebase!');
});
