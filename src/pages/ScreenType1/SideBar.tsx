import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import { Files, Screen } from "../../types/types"


type PropsSideBar = {
    password: number,
    screen: Screen
}

export default function SideBar({ password, screen }: PropsSideBar) {
    const token = localStorage.getItem("token")
    const config = { headers: { Authorization: `Bearer ${token}` } }
    const screen_id = useParams().id
    const [files, setFiles] = useState<Files[]>([])
    const [currentSlide, setCurrentSlide] = useState(0)
    let time = screen.banner_time
    const [autoplayInterval, setApi] = useState(time)
    console.log(currentSlide, files)
    console.log(autoplayInterval)
    console.log(time)
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
console.log(listaNova, "aa")
    useEffect(() => {
        const getFiles = async () => {
            try{
                const sucess = await  axios.get(`http://localhost:4000/getfiles/${screen_id}`,config )
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
        return <video autoPlay={true} onLoadedMetadata={(e) => setApi(Number(e.target.duration)*1000)} className="active" >
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

const Container = styled.div<PropsSideBar>`
        width: ${props => props.screen.show_productstable === false ? 100 : 100 - props.screen.width_table}vw;
        height: 100%;
        display: ${props => (props.screen.show_banner === false && props.screen.show_counter === false) ? "none" : "flex"};
        flex-direction: column;

        .banner{
            width: ${props => props.screen.show_productstable === false ? 100 : 100 - props.screen.width_table}vw;
            height: ${props => (props.screen.show_productstable === false && props.screen.show_counter === false) || props.screen.show_counter === false ? "100vh" : "50vh"};
            background-color: #000000;
            display: ${props => props.screen.show_banner === true ? "flex" : "none"};
            flex-direction: column;
            align-items: flex-end;
            
            video{
                width: ${props => props.screen.show_productstable === false ? 100 : 100 - props.screen.width_table}vw;
                height: ${props => (props.screen.show_productstable === false && props.screen.show_counter === false) || props.screen.show_counter === false ? "100vh" : "50vh"};
                object-fit: contain;
                position: absolute;

            }
            img{
                width: ${props => props.screen.show_productstable === false ? 100 : 100 - props.screen.width_table}vw;
                height: ${props => (props.screen.show_productstable === false && props.screen.show_counter === false) || props.screen.show_counter === false ? "100vh" : "50vh"};
                object-fit: contain;
                position: absolute;
            }
        }

        .password{
            width: 100%;
            height: ${props => (props.screen.show_productstable === false && props.screen.show_counter === false) || props.screen.show_banner === false ? "100vh" : "50vh"};
            background-color: black;
            display: ${props => props.screen.show_counter === true ? "flex" : "none"};
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-size: 4vw;
            z-index: 2;
            .passwordNumber{
                font-family: 'Digital Numbers', sans-serif;
                font-size: 11vw;
                color: red;
                margin-top: 3rem;
            }
        }
`
