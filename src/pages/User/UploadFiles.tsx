import axios from "axios";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components"
import MyContext from "../../context/context";


type FileType = {
    file_name: string,
    id: number,
    original_name: string,
    size: number,
    url: string,
    user_id: number
}

export default function UploadFiles() {
    const [file, setFile] = useState<File | null>(null);
    const [filename, setFilename] = useState<string>('');
    const { config } = useContext(MyContext)
    const [myFiles, setMyFiles] = useState<FileType[]>([])
    const [updatePage, setUpdatePage] = useState(false)
    const [disableButton, setDisableButton] = useState(false)
    console.log(myFiles)

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
            axios.post('http://localhost:4000/uploadfile', formData, config)
                .then((response) => {
                    setDisableButton(false)
                    setFile(null)
                    setFilename("")
                    setUpdatePage(!updatePage)
                })
                .catch((error) => {
                    console.log(error);
                    setDisableButton(false)
                    setUpdatePage(!updatePage)
                });
        }
    }

    useEffect(() => {

        const getFiles = async () => {
            try {
                const sucess = await axios.get("http://localhost:4000/getfiles", config)
                setMyFiles(sucess.data)
            } catch (error) {
                console.log(error)
            }
        }
        getFiles()

    }, [updatePage])

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
                {myFiles?.map((file) => (<img src={`${file.url}`}/>))}
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
        display: flex;
        flex-wrap: wrap;
        height: 800px;
        overflow-y: scroll;
        background-color: #ffffff;

        img{
            height: 350px;
            margin-left: 2rem;
            margin-bottom: 2rem;
            border-radius: 16px;
            background-color: rgb(255,255,255,1);
        }
    }

`