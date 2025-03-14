import express from 'express';
import path from 'path';
import { fileURLToPath} from 'url';
import posts from './route/posts.js';
import logger from './middleware/logger.js'
import errorHandler from './middleware/error.js';
import colors from 'colors'

const PORT = process.env.PORT

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// setup static folder
app.use(express.static(path.join(__dirname, 'public')))

//logger middleware
app.use(logger);

//Route
app.use('/api/posts', posts)

app.use((req,res,next) => {
    const error = new Error('Not Found');
    error.status =404
    next(error);
    console.log("Error" ['red']);
    
})

//ErrorHandler
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));