import axios from "axios"
import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import MyContext from "../../context/context"
import { useNavigate } from "react-router-dom"
import { Screen } from "../../types/types"
import { createNewScreen } from "./functionsUser"
import iconTv from "../../img/iconTv.svg"
import iconClose from "../../img/iconClose.svg"

type PropsScreen = {
    updatePage: boolean,
    setUpdatePage: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Screens({ updatePage, setUpdatePage }: PropsScreen) {
    const { config } = useContext(MyContext)
    const [displayForm, setDisplayForm] = useState(false)
    const [screenName, setScreenName] = useState("")
    const [screenType, setScreenType] = useState<"açogue" | "padaria" | "neutro">("neutro")
    const [screens, setScreens] = useState<Screen[]>([])
    const [buttonDisabled, setButtoDisabled] = useState(false)
    const navigate = useNavigate()


    useEffect(() => {
        const screens = async () => {
            try {
                const sucess = await axios.get("http://localhost:4000/screens", config)
                setScreens(sucess?.data)
            } catch (error) {
                console.log(error)
            }
        }

        screens()

    }, [updatePage])


    return (
        <Container displayForm={displayForm} screenType={screenType}>

            <h1>Telas</h1>
            <div className="container_screens">

                {screens?.map((screen) => (<div className="screen" onDoubleClick={() => navigate(`/tela/${screen.id}`)}><img src={iconTv} /> <p>{screen.screen_name}</p></div>))}
            </div>


            <div className="formContainer">
                <form onSubmit={(event) => createNewScreen(event, setButtoDisabled, setDisplayForm, setScreenName, screenName, screenType, updatePage, setUpdatePage)}>
                    <input className="screenName" placeholder="Nome da tela" onChange={(text) => setScreenName(text.target.value)} value={screenName}></input>
                    <input className={`type ${screenType === "açogue" ? "selected" : ""}`} type={"button"} value="Açogue" onClick={() => setScreenType("açogue")} />
                    <input className={`type ${screenType === "padaria" ? "selected" : ""}`} type={"button"} value="Padaria" onClick={() => setScreenType("padaria")} />
                    <input className={`type ${screenType === "neutro" ? "selected" : ""}`} type={"button"} value="Neutro" onClick={() => setScreenType("neutro")} />
                    <button className="createScreen" disabled={buttonDisabled}>Criar tela</button>
                </form>
                <img src={iconClose} onClick={ () => setDisplayForm(false)}  className="closeCreateNewScreen" />
            </div>

            <button className="createNewScreen" onClick={() => setDisplayForm(!displayForm)}>Criar nova tela</button>

        </Container>
    )
}

type ScreensProps = {
    displayForm: boolean,
    screenType: "açogue" | "padaria" | "neutro"
}

const Container = styled.div<ScreensProps>`
    width: 100%;
    padding: 2rem;
    font-size: 1.6rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    h1{
        font-size: 5rem;
        font-weight: bold;
        text-align: center;
    }

    .container_screens{
        display: flex;
        flex-wrap: wrap;
        padding: 0 1rem;
    }

    .screen{
        width: 200px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 1rem auto;
        cursor: pointer;

        img{
            width: 100%;
        }

        p{
            width: 100%;
            text-align: center;
        }
    }

    .formContainer{
        display: ${props => props.displayForm === true ? "flex" : "none"};
        background-color: #fafafa;
        position: fixed;
        top: 20%;
        width: 30%;
        border-radius: 8px;
        box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;

        img{
            width: 40px;
            position: absolute;
            right: 8px;
            top: 8px;
            cursor: pointer;
        }
    }

    form{
        width: 100%;
        margin: 2.4rem 0;
        display: flex;
        flex-direction: column;
        padding: 1rem 2rem;
        align-items: center;

        .screenName{
            font-size: 1.6rem;
            margin-right: 2.4rem;
            padding-top: 0.4rem;
            padding-bottom: 0.4rem;
            padding-left: 0.8rem;
            border-radius: 16px;
            width: 300px;
            border: 1px solid #000000;
        }

        .type{
            font-size: 1rem;
            font-weight: bold;
            border-radius: 8px;
            border: none;
            padding: 0rem 1rem;
            text-align: center;
            margin: 0.8rem 0;
            width: 160px;
            height: 36px;
        }

        .selected{
            background-color: #61e261;
        }


        button{
            width: 160px;
            font-size: 1.4rem;
            padding: 0.4rem 1rem;
            font-weight: bold;
            background-color: #6195e2;
            color: #FFFFFF;
            border-radius: 8px;
            border: none;
            cursor: pointer;

            &:disabled{
                background-color:rgb(226, 210, 210);
                color:  rgb(233, 1, 1);
                cursor: default;
            }
        }

        .createScreen{
            margin-top: 2rem;
        }
    }

    .createNewScreen{
        background-color: #6195e2;
        font-size: 1.6rem;
        font-weight: bold;
        color: #FFFFFF;
        padding: 1rem;
        border-radius: 8px;
        border: none;
        cursor: pointer;
        margin-top: 2rem;
    }

`