import admin from 'firebase-admin';
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

console.log("Firebase Initialized Successfully");

const db = admin.firestore();
const storage = admin.storage();
const getCollection = (collectionName) => db.collection(collectionName);
const getStorageRef = (path) => storage.bucket().file(path);


export {db, storage,getCollection, getStorageRef};
