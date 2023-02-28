import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import ProductsTable from "./ProductsTable"
import Settings from "./Settings"
import SideBar from "./SideBar"
import iconSetting from "../../img/iconSetting.svg"
import axios from "axios"
import MyContext from "../../context/context"
import { useParams } from "react-router-dom"

type Screen = {
    background_url: string,
    font_family: string,
    font_size: number,
    id: number,
    screen_name: string,
    show_banner: boolean,
    show_counter: boolean,
    show_productstable: boolean,
    space_lines: number,
    table_lines: number,
    user_id: number,
    color_lines: string,
    width_table: number
}

export default function ScreenType1() {
    const [password, setPassword] = useState(0)
    const [screen,setScreen] = useState<Screen>({
        background_url: "",
        font_family: "",
        font_size: 1,
        id: 0,
        screen_name: "",
        show_banner: true,
        show_counter: true,
        show_productstable: true,
        space_lines: 0,
        table_lines: 1,
        user_id: 0,
        color_lines: "",
        width_table: 0
    })
    const { config } = useContext(MyContext)
    const [settings, setSettings] = useState({
        settingVisible: false,
    })
    const screen_id = useParams().id

     function passwordConfigs(){
        setPassword(password + 1)
  
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance();
            utterance.text = `Senha ${password+1}. repetindo.senha ${password+1}`;
            utterance.lang = 'pt-BR';
            utterance.rate = 1.2;
            utterance.pitch = 1;
            utterance.volume = 1;
            speechSynthesis.speak(utterance);
        }
          
    }


    useEffect(() => {
        const screens = async () => {
            try {
                const sucess = await axios.get(`http://localhost:4000/screen/${screen_id}`, config)
                setScreen(sucess?.data)
            } catch (error) {
                console.log(error)
            }
        }
        screens()
    }, [])

    return (
        <Container onKeyDown={(event) => event.key === "Enter" ? passwordConfigs() : ""} tabIndex={0}>
            <Settings settings={settings} setSettings={setSettings} screen={screen} setScreen={setScreen}/>
            <SideBar password={password} screen={screen}/>
            <ProductsTable screen={screen}/>
            <img className="settings" src={iconSetting} onClick={() => setSettings({...settings, settingVisible: true})}/>
        </Container>
    )
}

const Container = styled.div`
    max-width: 100%;
    height: 100vh;
    background-color: #0026ff;
    display: flex;
    color: white;
    overflow: hidden;
    position: relative;
    

    .settings{
        width: 60px;
        position: fixed;
        top: 16px;
        left: 16px;
        opacity: 0;
        cursor: pointer;
        
        &:hover{
           opacity: 1;
        }
    }

    .gradient{
        width: 100%;
        height: 100%;
        background: linear-gradient(180deg, #000000 -20%, rgba(0, 0, 0, 0) 200%);
        position: absolute;
        top: 0;
        left: 0;
        padding: 0 4rem;
    }

    header{
        display: flex;
        justify-content: space-between;
        margin-top: 1.6rem;
        font-family: 'Lilita One', cursive;
        font-size: 5vw;
        z-index: 520;
    }
`