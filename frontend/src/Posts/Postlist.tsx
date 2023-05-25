import { Button } from '@material-ui/core';
import React, { useEffect , useState} from 'react'
import { FaTrash } from 'react-icons/fa';
import { format, isToday, isYesterday } from 'date-fns';


export const Postlist = () => {

    
    const[posts,setPost] = useState([]);
    
    useEffect(()=>{
        loadData()
    },[])

    const loadData = async () =>{
        try{
            const response = await fetch('http://localhost:3001/api/data');
            const data = await response.json();
            const sortedPosts = data.sort((a: any, b: any) => {
                const dateA = new Date(a['created_at']);
                const dateB = new Date(b['created_at']);
                return dateB.getTime() - dateA.getTime();
              });
            setPost(sortedPosts);
            

        }catch (err){
            console.log("Error al recibir los posts del servidor",err);

     
        }
    }   

    const Bloqueo = async (objectID:string) => {
        try {
            console.log(objectID);
            const response = await fetch(`http://localhost:3001/api/data/${objectID}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ blocked: 1 }),
          });
    
          if (response.ok) {
            console.log('Post eliminado');
            loadData(); // Actualizar los datos después de la actualización
          } else {
            console.error('Error al eliminar el post');
          }
        } catch (error) {
          console.error('Error al acceder al endpoint:', error);
        }
      };
    
      const handleClick = (url: string, objectID: string) => {
        window.open(url, '_blank');
      };
    
      const handleDelete = (event: React.MouseEvent<HTMLButtonElement>, objectID: string) => {
       
        event.stopPropagation();
        
        Bloqueo(objectID);
      };

    

    return (
        <div>
            <div style={{ background: '#333' , paddingTop: '100px', paddingBottom: '100px',
                paddingLeft: '20px',marginBottom: '20px'}} >
                
                <h1 style={{ color: 'white',fontSize: '100px', margin: 0, marginLeft: '10px' }} >HN Feed</h1>
                <span style={{ color: 'white',fontSize: '34px',marginLeft: '20px' }} >  We &hearts; hacker news!</span>
                
            </div>   
            <ul style={{ listStyle: 'none', padding: 0 }}>

                

                {posts.map((item) => {

                if (!item['story_title'] && !item['title']) {
                    return null; 
                }

                if (item['blocked'] === 1) {
                    return null;
                }
                const createdAt = new Date(item['created_at']);

                let formattedDate = '';

                if (isToday(createdAt)) {
                formattedDate = format(createdAt, 'hh:mm a');
                } else if (isYesterday(createdAt)) {
                formattedDate = 'Yesterday';
                } else {
                formattedDate = format(createdAt, 'dd MMM');
                }
                
                
                
                return (
                    
                   <div
                        key={item['objectID']}
                        className="row"
                        style={{
                            border: 'none',
                            borderBottom: '1px solid #ccc',
                            padding: '10px',
                            margin: '0 30px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            transition: 'background-color 0.3s',
                            cursor: 'pointer'
                        }}
                        onClick={() => handleClick(item['story_url'],item['objectID'])}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#fafafa';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#fff';
                        }}
                        >
                        <div>
                            <span style={{ textTransform: 'none', fontSize: '13pt', color: '#333' }}>{item['story_title'] ? item['story_title'] : item['title']}</span>
                            <span style={{ textTransform: 'none', fontSize: '13pt', color: '#999' }}>
                                {item['author'] && <>&nbsp;-&nbsp;</>}
                                {item['author']}
                                {item['author'] && <>&nbsp;-</>}
                            </span>
                            
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <span style={{ fontSize: '18px', marginRight: '5px' }}>{formattedDate}</span>
                            <Button
                                className="delete-button"
                                onClick={(e) => handleDelete(e, item['objectID'])}
                            >
                                <FaTrash />
                            </Button>
                        </div>
                    </div>
                );
            })}
            </ul>
        </div>
    )
}


