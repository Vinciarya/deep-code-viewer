import express from 'express';
import cors from 'cors';

import analysisRoutes from './routes/analysisRoutes';


const app = express();
const port = 5000;


app.use(cors());
app.use(express.json());


app.get('/', (req,res)=>{
    res.send('Deep code Viewer backend is running');

});
app.use('/api', analysisRoutes);
app.listen(port,()=>{
    console.log(`Server listening at http://localhost:${port}`);

});