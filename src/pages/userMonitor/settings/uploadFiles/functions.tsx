import axios from "axios"
import { BASE_URL } from "../../../../constants/constants"

export type FileType = {
    file_name: string,
    id: number,
    original_name: string,
    size: number,
    url: string,
    user_id: number
}

export async function getMonitorFiles(screen_id: number, config: object, setMyFiles: React.Dispatch<React.SetStateAction<FileType[]>>) {

    if (screen_id) {
        try {
            const sucess = await axios.get(`${BASE_URL}/getfiles/${screen_id}`, config)
            setMyFiles(sucess.data)
        } catch (error) {
            console.log(error)
        }
    }
}

export function handleFileChange(event: React.ChangeEvent<HTMLInputElement>, setFile: React.Dispatch<React.SetStateAction<File | null>>, setFileName: React.Dispatch<React.SetStateAction<string>>) {
    if (event.target.files) {
        setFile(event.target.files[0]);
        setFileName(event.target.files[0].name);
    }
}

export function handleFormSubmit(event: React.FormEvent<HTMLFormElement>, file:  File | null, config: object, setDisableButton: React.Dispatch<React.SetStateAction<boolean>>, setFile: React.Dispatch<React.SetStateAction<File | null>>,setFileName: React.Dispatch<React.SetStateAction<string>>, screen_id: number) {

    event.preventDefault();
    if (file) {
        const formData = new FormData();
        formData.append('file', file);
        setDisableButton(true)
        console.log(screen_id, "bbb")
        axios.post(`${BASE_URL}/uploadfile/${screen_id}`, formData, config)
            .then((response) => {
                setDisableButton(false)
                setFile(null)
                setFileName("")
                alert("Arquivo enviado com sucesso!")
            })
            .catch((error) => {
                console.log(error);
                setDisableButton(false)
            });
    }
}

export async function deleteFile(id: number, config: object, updateSection: boolean, setUpdateSection: React.Dispatch<React.SetStateAction<boolean>>) {
    const confirmFileDeletion = confirm("Tem certeza que deseja apagar este arquivo?")

    if (confirmFileDeletion) {

        try {
            const sucess = await axios.delete(`${BASE_URL}/deletefile/${id}`, config)
            setUpdateSection(!updateSection)
            alert("Arquivo excluido com sucesso!")
        } catch (error) {
            console.log(error)
        }
    }
}
