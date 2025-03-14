import { db,projName } from '../config/firebase.js';

//Get request
export const getData = async(req, res ) =>{
    try {
        
        const snapshot  = await db.collection(projName).get();
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data()}));
        res.status(200).json(data);
    } catch (error) {
        res.status(500).send(`Error retrieving data`);
    }
}
