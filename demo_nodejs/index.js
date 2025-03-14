// const {generateRandNumber, celcToFar} = require('./utils');

// console.log(`Random Number: ${generateRandNumber()}`);

// console.log(`Celcius: ${celcToFar(23)}`);


import  getPosts, {getPostsLength}  from "./postController.js";

console.log(getPosts());
console.log(`Post length: ${getPostsLength()}`);