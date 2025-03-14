
import e from 'express';
import { db,projName } from '../config/firebase.js';



//Post Data 
export const addData = async (req , res ) =>{
    try{

        console.log('Request body:', req.body); // Debug: Check if req.body is parsed
        const {name, value } =  req.body;
        await db.collection(projName).add(
            {
            name,
            value,
            timestamp: Date.now(),
            }
    );

    res.status(201).send('Data successfully added!')
    }catch (error){
        console.log(error);
        
        res.status(500).send('Data failed to be added!')
    }
}