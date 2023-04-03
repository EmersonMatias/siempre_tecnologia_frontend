import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { BASE_URL } from "../../../constants/constants"
import { Files, Screen } from "../../../types/types"
import Container, { PropsSideBar } from "./styles"

export default function SideBar({ password, screen }: PropsSideBar) {
    const token = localStorage.getItem("token")
    const config = { headers: { Authorization: `Bearer ${token}` } }
    const screen_id = useParams().id
    const [files, setFiles] = useState<Files[]>([])
    const [currentSlide, setCurrentSlide] = useState(0)
    let time = screen.banner_time
    const [autoplayInterval, setApi] = useState(time)

    const listaNova = files.reduce((acc:any, curr, index) => {
        if (index !== 0) {
            const novoElemento = {
                type: "teste"
            }
          acc.push(novoElemento);
        }
        acc.push(curr);
        return acc;
      }, []);

    useEffect(() => {
        const getFiles = async () => {
            try{
                const sucess = await  axios.get(`${BASE_URL}/getfiles/${screen_id}`,config )
                setFiles(sucess.data)
           
            }catch(error){
                console.log(error)
            }
        }

        getFiles()

    }, [])

    useEffect(() => {
        if(listaNova.length){
            const intervalId = setInterval(() => {
                setCurrentSlide((currentSlide + 1) % listaNova?.length);
              }, autoplayInterval);
          
              return () => {
                clearInterval(intervalId);
              };
        }

        baerna()
        
      }, [autoplayInterval,currentSlide, files?.length]);
  
function baerna(){  

     if(listaNova[currentSlide]?.type ==="teste") {
        if(autoplayInterval !== 50){
            setApi(50)
        }
    }
    
    if( listaNova[currentSlide]?.original_name?.includes("png")  ||  
        listaNova[currentSlide]?.original_name?.includes("jpeg") || 
        listaNova[currentSlide]?.original_name?.includes("jpg") ) {
        if (time !==autoplayInterval){
            setApi(time)
        }
       return  <img src={listaNova[currentSlide]?.url} className="active"></img>
    }
    else if (listaNova[currentSlide]?.original_name?.includes('mp4')){
        return <video autoPlay={true} onLoadedMetadata={(e) =>   setApi(Number((e.target as HTMLVideoElement)?.duration) * 1000)} className="active" >
                    <source src={listaNova[currentSlide]?.url} type="video/mp4" ></source>
                </video> 
    }
}

    return (
        <Container screen={screen} password={password}>

            <div className="banner"> { baerna() }</div>

            <div className="password">
                <p>SENHA:</p>
                <p className="passwordNumber">{password}</p>
            </div>
        </Container>
    )
}

