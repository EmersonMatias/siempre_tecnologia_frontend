import axios from "axios"
import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import MyContext from "../../context/context"
import { useNavigate } from "react-router-dom"
import { Screen } from "../../types/types"

export default function Screens() {
    const { config } = useContext(MyContext)
    const [displayForm, setDisplayForm] = useState(false)
    const [screenName, setScreenName] = useState("")
    const [screenType, setScreenType] = useState<"açogue" | "padaria" | "neutro">("neutro")
    const [screens, setScreens] = useState<Screen[]>([])
    const [buttonDisabled, setButtoDisabled] = useState(false)
    const navigate = useNavigate()


    function createNewScreen(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const send = async () => {
           setButtoDisabled(true)
            try {

                const sucess = await axios.post("http://localhost:4000/screens", { screen_name: screenName, screen_type: screenType }, config)
                setDisplayForm(false)
                setButtoDisabled(false)
                setScreenName("")
                console.log(sucess)
            } catch (error) {
                console.log(error)
                setButtoDisabled(false)
            }
        }

        send()
    }

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

    }, [])


    return (
        <Container displayForm={displayForm} screenType={screenType}>
      
            <h1>Telas</h1>
            <div className="container_screens">
                {screens?.map((screen) => (<div className="screen" onClick={() => navigate(`/tela/${screen.id}`)}>{screen.screen_name}</div>))}
            </div>

            <form onSubmit={(event) => createNewScreen(event)}>
                <input className="screenName" placeholder="Nome da tela" onChange={(text) => setScreenName(text.target.value)}></input>
                <input className={`type ${screenType === "açogue" ? "selected" : ""}`} type={"button"} value="Açogue" onClick={() => setScreenType("açogue")} />
                <input className={`type ${screenType === "padaria" ? "selected" : ""}`} type={"button"} value="Padaria" onClick={() => setScreenType("padaria")} />
                <input className={`type ${screenType === "neutro" ? "selected" : ""}`} type={"button"} value="Neutro" onClick={() => setScreenType("neutro")} />
                <button disabled={buttonDisabled}>Criar tela</button>
            </form>
            <button onClick={() => setDisplayForm(!displayForm)}>Criar nova tela</button>

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
    background-color: rgb(0,0,0,0.03);

    h1{
        margin-bottom: 1.6rem;
    }

    .container_screens{
        display: flex;
        padding: 2rem;
        flex-wrap: wrap;
    }

    .screen{
        width: 200px;
        height: 200px;
        background-color: #6195e2;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 1rem auto;
    }

    form{
        margin: 2.4rem 0;
        display: ${props => props.displayForm === true ? "flex" : "none"};
        flex-direction: column;

        .screenName{
            font-size: 1.6rem;
            margin-right: 2.4rem;
            padding-top: 0.4rem;
            padding-bottom: 0.4rem;
            padding-left: 0.8rem;
            border-radius: 16px;
            width: 400px;
        }

        .type{
            font-size: 1rem;
            font-weight: bold;
            border-radius: 8px;
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
            background-color: rgb(223,41,41,0.3);
            color:  rgb(250, 8, 8);
            border-radius: 8px;
            border: none;
            cursor: pointer;

            &:disabled{
                background-color:rgb(226, 210, 210);
                color:  rgb(233, 1, 1);
                cursor: default;
            }
        }
    }

`