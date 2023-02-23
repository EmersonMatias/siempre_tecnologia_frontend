import { useEffect, useState } from "react"
import styled from "styled-components"
import ProductsTable from "./ProductsTable"
import Settings from "./Settings"
import SideBar from "./SideBar"
import iconSetting from "../../img/iconSetting.svg"



export default function ScreenType1() {
    const [password, setPassword] = useState(0)
    const [settings, setSettings] = useState({
        showCounter: true,
        showProductsTable: true,
        showBanner: true,
        settingVisible: false,
        tableLines: 5,
        spaceLines: 1,
        fontSize: 4
    })

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
       
    }, [settings])

    return (
        <Container onKeyDown={(event) => event.key === "Enter" ? passwordConfigs() : ""} tabIndex={0}>
            <Settings settings={settings} setSettings={setSettings} />
            <SideBar password={password} settings={settings} />
            <ProductsTable settings={settings} />
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