import express from 'express';
import { getData } from '../controllers/get.js';
import { addData } from '../controllers/post.js';

const router =  express.Router();

//@desc Get data from db
//@route GET /data
router.get('/data', getData);

//@desc add data to db
//@route POST /data
router.post('/data',addData);


export default router;