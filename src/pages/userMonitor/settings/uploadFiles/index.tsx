import { useEffect, useState } from "react";
import { deleteFile, FileType, getMonitorFiles, handleFileChange, handleFormSubmit } from "./functions";
import Container from "./styles";

type UploadFiles = {
    screen_id: number
}

export default function UploadFiles({ screen_id }: UploadFiles) {
    const [file, setFile] = useState<File | null>(null);
    const [filename, setFileName] = useState<string>('');
    const token = localStorage.getItem("token")
    const config = { headers: { Authorization: `Bearer ${token}` } }
    const [myFiles, setMyFiles] = useState<FileType[]>([])
    const [disableButton, setDisableButton] = useState(false)
    const [updateSection, setUpdateSection] = useState(false)

    useEffect(() => {
        getMonitorFiles(screen_id, config, setMyFiles)

    }, [screen_id, disableButton, updateSection])

    return (
        <Container>

            <form onSubmit={(event) => handleFormSubmit(event, file, config, setDisableButton, setFile, setFileName, screen_id)}>
                <h1>Upload de Imagens</h1>
                <div>
                    <input type="file" onChange={(event) => handleFileChange(event, setFile, setFileName)} />
                </div>
                <div>
                    <button className="sendFile" type="submit" disabled={disableButton}>Enviar</button>
                </div>
            </form>

            <h1>Meus Arquivos</h1>
            <div className="files">
                {myFiles?.map((file, index) => (
                    file.file_name.includes("mp4") ?
                        <video controls onClick={() => deleteFile(file.id, config, updateSection, setUpdateSection)}>
                            <source src={file.url} type="video/mp4" ></source>
                        </video>
                        :
                        <img key={index} src={`${file.url}`} onClick={() => deleteFile(file.id, config, updateSection, setUpdateSection)} />
                ))}
            </div>
        </Container>
    )
}

