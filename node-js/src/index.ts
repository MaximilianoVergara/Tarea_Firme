import express, { Request, Response } from 'express';
import './database';
import router from './routes/posts.routes';
import cors from 'cors';


const app = express();

app.set('port', 3001);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(router);

app.use((req: Request, res: Response, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});




app.listen(app.get('port'), () => {
    console.log(`Server port ${app.get('port')}`)
}); 