import express from 'express';
import { createPost, getPost, getPosts, updatePost , delPost } from '../controllers/postController.js'
const router = express.Router();

//get posts
router.get('/', getPosts); 

//get post
router.get('/:id', getPost);

//create new post
router.post('/', createPost);

//Create update
router.put('/:id', updatePost)

//Delete post
router.delete('/:id', delPost);


export default router;