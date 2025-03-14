// import fs from 'fs';
import fs from 'fs/promises';

// //readFile() async -> callback
// fs.readFile('./test.txt', 'utf8' , (err,data) =>{
//     if (err) throw err;
//     console.log(data);
// });

// //readFile() -> Synchronous version
// const data = fs.readFileSync('./test.txt', 'utf8');
// console.log(data);

// // readFile() -> Promise.then()
// fs.readFile('./test.txt', 'utf8')
// .then(data => console.log(data))
// .catch(err => console.log(err));

// //readFile async/aweait
const readFile = async () => {
try{
    const data = await fs.readFile('./test.txt', 'utf8');
    console.log(data);
} catch (error){
    console.log(error)
}   
};

// writeFile()

const writeFile =  async () =>{
    try{
        const data = await fs.writeFile('./test.txt', 'New file written');
        console.log('File written to');
    } catch (error){
        console.log(error)
    }   
}

const appendFile =  async () =>{
    try{
        const data = await fs.appendFile('./test.txt', 'Appended');
        console.log('File written to');
    } catch (error){
        console.log(error)
    }   
}

writeFile();
readFile();
appendFile()
readFile();
