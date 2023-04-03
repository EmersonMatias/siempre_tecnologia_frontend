import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getScreenLogo, handleFileChangeLogo, handleFormSubmitLogo } from "./functions";
import Container from "./styles";

type ScreenLogoType = {
    screen_id: number
}

export default function ScreenLogo({ screen_id }: ScreenLogoType) {
    const [file2, setFile] = useState<File | null>(null);
    const [filename2, setFileName2] = useState<string>('');
    const token = localStorage.getItem("token")
    const config = { headers: { Authorization: `Bearer ${token}` } }
    const [disableButton, setDisableButton] = useState(false)
    const [logo, setLogo] = useState({ id: 0, url: "" })
    const monitorId = Number(useParams().id)

    useEffect(() => {
        getScreenLogo(monitorId, setLogo)
    }, [disableButton])


    return (
        <Container>
            <form onSubmit={(event) => handleFormSubmitLogo(event, file2, config, setDisableButton, setFile, setFileName2, screen_id)}>
                <h1>Logo Background</h1>
                <div>
                    <input disabled={logo.url !== undefined ? true : false } type="file" onChange={(event) => handleFileChangeLogo(event, setFile, setFileName2)} />
                </div>
                <div>
                    <button  className="sendFile" type="submit" disabled={disableButton  || logo.url !== undefined ? true : false}>Enviar</button>
                </div>
            </form>

            <div className="logoContainer">
                <img src={logo.url} />
            </div>
        </Container>
    )
}