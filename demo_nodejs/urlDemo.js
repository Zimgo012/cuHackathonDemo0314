import url from 'url';

const urlString = 'https://www.youtube.com/watch?v=32M1al-Y6Ag'

//URL Object
const urlObj = new URL(urlString);

console.log(urlObj);


//format()
console.log(url.format(urlObj));


//import.met.url - file URL
console.log(import.meta.url);

// fileURLToPath()
console.log(url.fileURLToPath(import.meta.url));


console.log(urlObj.search);

const params = new URLSearchParams(urlObj.search);
console.log(params.get);

