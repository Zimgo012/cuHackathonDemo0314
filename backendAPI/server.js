// server.js
import express from 'express';
import cors from 'cors';
import { WebSocketServer } from 'ws';
import { createServer } from 'http';
import router from './routes/route.js';
import { db, storage, getCollection, getStorageRef } from './config/firebase.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors()); // For HTTP requests if needed

// Mount routes (for non-WebSocket endpoints)
app.use('/', router);

// Create HTTP server for Express and WebSocket
const server = createServer(app);
const wss = new WebSocketServer({ server });

// WebSocket connection handling
wss.on('connection', (ws) => {
    console.log('Client connected to WebSocket');

    ws.on('message', async (message) => {
        const data = JSON.parse(message.toString());
        const { type, imageData, collectionName = 'recognition_results', userId } = data;

        if (type === 'frame') {
            if (!imageData) {
                ws.send(JSON.stringify({ error: 'No imageData' }));
                return;
            }

            // Forward frame to Python via WebSocket (simplified; see Python setup)
            const pythonWsUrl = 'ws://localhost:5000'; // Python WebSocket server
            const pythonWs = new WebSocket(pythonWsUrl);

            pythonWs.on('open', () => {
                pythonWs.send(JSON.stringify({ imageData }));
            });

            pythonWs.on('message', async (pythonResponse) => {
                const { result } = JSON.parse(pythonResponse.toString());

                // Optionally save frame to Firebase Storage
                const fileName = `frames/${Date.now()}.jpg`;
                const storageRef = getStorageRef(fileName);
                const buffer = Buffer.from(imageData, 'base64');
                await storageRef.save(buffer, { contentType: 'image/jpeg' });
                const imageUrl = `https://storage.googleapis.com/${storageRef.bucket.name}/${fileName}`;

                // Store recognition result in Firestore
                const collectionRef = getCollection(collectionName);
                const docRef = await collectionRef.add({
                    imageUrl,
                    recognitionResult: result || 'Unknown',
                    userId: userId || 'unknown',
                    timestamp: Date.now(),
                });

                // Send result back to Flutter
                const response = {
                    id: docRef.id,
                    imageUrl,
                    recognitionResult: result || 'Unknown',
                };
                ws.send(JSON.stringify(response));
            });

            pythonWs.on('error', (err) => {
                console.error('Python WebSocket error:', err);
                ws.send(JSON.stringify({ error: 'Processing failed' }));
            });

            pythonWs.on('close', () => console.log('Python WebSocket closed'));
        }
    });

    ws.on('close', () => console.log('Client disconnected'));
});

// Start server
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT} with WebSocket`);
});