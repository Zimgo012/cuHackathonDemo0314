import express from 'express';
import dataRoutes from './routes/dataRoutes.js';

const PORT = process.env.PORT;
const app = express();

//Middleware
app.use(express.json());


//Mount Route
app.use('/api', dataRoutes);

// Test route
app.get('/', (req, res) => {
    res.send('Firebase + Express Backend is Live (ESM)!');
  });


app.listen(PORT, () => {
    console.log(`Server is running in PORT: ${PORT}` );
    
})