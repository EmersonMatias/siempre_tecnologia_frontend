import axios from "axios";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components"
import MyContext from "../../context/context";
import { DeleteFile } from "./functionsUser";


type FileType = {
    file_name: string,
    id: number,
    original_name: string,
    size: number,
    url: string,
    user_id: number
}

type UploadFiles = {
    screen_id: number
}



export default function UploadFiles({ screen_id }: UploadFiles) {
    const [file, setFile] = useState<File | null>(null);
    const [filename, setFilename] = useState<string>('');
    const token = localStorage.getItem("token")
    const config = { headers: { Authorization: `Bearer ${token}` } }
    const [myFiles, setMyFiles] = useState<FileType[]>([])
    const [disableButton, setDisableButton] = useState(false)
    const screenId = screen_id

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
            setFilename(event.target.files[0].name);
        }
    };

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            setDisableButton(true)
            console.log(screen_id, "bbb")
            axios.post(`https://siempre-tecnologia-backend-5obk.onrender.com/uploadfile/${screenId}`, formData, config)
                .then((response) => {
                    setDisableButton(false)
                    setFile(null)
                    setFilename("")
                    console.log(response)
                })
                .catch((error) => {
                    console.log(error);
                    setDisableButton(false)
                });
        }
    }

    useEffect(() => {
        const getFiles = async () => {
            if (screenId) {
                try {
                    const sucess = await axios.get(`https://siempre-tecnologia-backend-5obk.onrender.com/getfiles/${screen_id}`, config)
                    setMyFiles(sucess.data)
                } catch (error) {
                    console.log(error)
                }
            }

        }
        getFiles()

    }, [screenId])

    return (
        <Container>
            <form onSubmit={handleFormSubmit}>
                <h1>Upload de Imagens</h1>
                <div>
                    <input type="file" onChange={handleFileChange} />
                </div>
                <div>
                    <button type="submit" disabled={disableButton}>Enviar</button>
                </div>
            </form>
            <h1>Meus Arquivos</h1>
            <div className="files">
                {myFiles?.map((file, index) => (
                    file.file_name.includes("mp4") ?
                    <video  controls onClick={() => DeleteFile(file.id)}>
                        <source src={file.url} type="video/mp4" ></source>
                    </video> 
                : 
                    <img key={index} src={`${file.url}`} onClick={() => DeleteFile(file.id)} />
                ))}
            </div>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    padding: 2rem;
    background-color: rgb(0,0,0,0.03);

    button{
        width: 200px;
        height: 40px;
        font-size: 1.4rem;
        font-weight: bold;
        border-radius: 8px;
        background-color: #f33535;
        border: none;
        color: #ffffff;
        margin-top: 2rem;

        &:disabled{
            background-color: #f0d1d1;
        }
    }
    
    form{
        margin-bottom: 3rem;
    }

    h1{
        font-size: 2.4rem;
        font-weight: bold;
        margin-bottom: 1rem;
    }

    input{
        width: 100%;
        font-size: 1.4rem;
        margin: 1rem 0;
    }

    .files{
        margin: 2rem 0;
        padding: 2rem;
        display: flex;
        flex-wrap: wrap;
        overflow-y: scroll;
        background-color: #ffffff;

        img, video {
            height: 200px;
            margin-left: 2rem;
            margin-bottom: 2rem;
            border-radius: 16px;
            background-color: rgb(255,255,255,1);
        }

        video{
            width: 300px;
        }
        
    }

`