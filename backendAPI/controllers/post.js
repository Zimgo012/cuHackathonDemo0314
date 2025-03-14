import { getCollection } from '../config/firebase.js';

//Post data
export const saveData = async (req , res) =>{
    try {
        const { collectionName, data } = req.body;
        if (!collectionName || !data) {
            return res.status(400).send('Missing collectionName or data');
        }

        const collectionRef = getCollection(collectionName);
        const docRef = await collectionRef.add({
            ...data,
            timestamp: Date.now(),
        });

        res.status(201).json({ id: docRef.id, ...data });
    } catch (error) {
        console.error('Save data error:', error);
        res.status(500).send('Error saving data: ' + error.message);
    }
};