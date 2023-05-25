import axios from "axios";
import Post from "./models/Posts";


export async function Data_management(url:string){
    try{

        const response = await axios.get(url);
        
        const data = response.data;
        
        for (const hit of data['hits']) {
            console.log(hit);
            
            const { created_at, title, author, url, points, story_text, comment_text,
                story_id, story_title,story_url,parent_id,objectID} = hit;

            const exist = await Post.findOne({objectID});
           
            console.log(exist);

            
            if (!exist){
                
                const blocked = 0;    
                await Post.create({ created_at, title, author, url, points, story_text, comment_text,
                    story_id, story_title,story_url,parent_id,objectID, blocked});    


            }                
           
            
        }
        console.log("Guardado exitoso")

        


    }catch(error){

        console.log("Error al obtener o guardar los datos", error)

    }
}

