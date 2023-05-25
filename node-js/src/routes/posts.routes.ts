import { Router, Request, Response } from 'express';
import Post from "../models/Posts";

const router = Router();

router.get('/api/data', async (req: Request, res: Response) => {
    try {
      
      const data = await Post.find();
      res.json(data);

    } catch (error) {
        
      console.error('Error get data:', error);
      res.status(500).json({ error: 'No se pudo obtener los datos'});
    }
});

router.put('/api/data/:objectID', async (req: Request, res: Response) => {
    const { objectID } = req.params;
    const { blocked } = req.body;
    
  
    try {

        await Post.findOneAndUpdate({ objectID }, { blocked: blocked });


        res.json({ success: true });

    } catch (error) {

        console.error('Error update blocked:', error);
        res.status(500).json({ error: 'No se pudo eliminar el post'});
    }
});
  


 export default router;

