import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Screen } from "../../../types/types"
import { createNewMonitor, deleteMonitor, getMonitors } from "../functionsUser"
import iconTv from "../../../img/iconTv.svg"
import iconClose from "../../../img/iconClose.svg"
import Container from "./styles"
import MyContext from "../../../context/context"

type PropsScreen = {
    updatePage: boolean,
    setUpdatePage: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Monitors({ updatePage, setUpdatePage }: PropsScreen) {
    const navigate = useNavigate()

    const [displayForm, setDisplayForm] = useState(false)
    const [screenName, setScreenName] = useState("")
    const [screenType, setScreenType] = useState<"açogue" | "padaria" | "neutro">("neutro")
    const [monitors, setMonitors] = useState<Screen[]>([])
    const [buttonDisabled, setButtoDisabled] = useState(false)

    useEffect(() => {
        getMonitors(setMonitors)

    }, [updatePage])


    return (
        <Container displayForm={displayForm} screenType={screenType}>
            <h1>Telas</h1>

            <div className="monitorsContainer">
                {monitors?.map((monitor) => (
                    <div className="monitor" >
                        <img onClick={() => navigate(`/tela/${monitor.id}`)} src={iconTv} />
                        <p onDoubleClick={() => deleteMonitor(monitor.id, updatePage, setUpdatePage)}>{monitor.screen_name}</p>
                    </div>
                ))}
            </div>

            <div className="formContainer">
                <form onSubmit={(event) => createNewMonitor(event, setButtoDisabled, setDisplayForm, setScreenName, screenName, screenType, updatePage, setUpdatePage)}>
                    <input className="screenName" placeholder="Nome da tela" onChange={(text) => setScreenName(text.target.value)} value={screenName}></input>
                    <input className={`type ${screenType === "açogue" ? "selected" : ""}`} type={"button"} value="Açogue" onClick={() => setScreenType("açogue")} />
                    <input className={`type ${screenType === "padaria" ? "selected" : ""}`} type={"button"} value="Padaria" onClick={() => setScreenType("padaria")} />
                    <input className={`type ${screenType === "neutro" ? "selected" : ""}`} type={"button"} value="Neutro" onClick={() => setScreenType("neutro")} />
                    <button className="createScreen" disabled={buttonDisabled}>Criar tela</button>
                </form>
                <img src={iconClose} onClick={() => setDisplayForm(false)} className="closeCreateNewScreen" />
            </div>

            <button className="createNewScreen" onClick={() => setDisplayForm(!displayForm)}>Criar nova tela</button>

        </Container>
    )
}

