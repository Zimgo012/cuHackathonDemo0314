import admin from 'firebase-admin';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const serviceAccount = require('../serviceAccountKey.json');
console.log('Service account project ID:', serviceAccount.project_id);


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

console.log('Firebase initialized successfully');

const db = admin.firestore();
const projName = "demoFirebase"

export { db, projName };