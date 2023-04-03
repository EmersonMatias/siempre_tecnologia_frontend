import axios from "axios";
import { BASE_URL } from "../../../../constants/constants";

const token = localStorage.getItem("token")
const config = { headers: { Authorization: `Bearer ${token}` } }


export async function handleFormSubmitLogo(event: React.FormEvent<HTMLFormElement>, file: File | null, config: object, setDisableButton: React.Dispatch<React.SetStateAction<boolean>>, setFile2: React.Dispatch<React.SetStateAction<File | null>>, setFileName: React.Dispatch<React.SetStateAction<string>>, screen_id: number) {

    event.preventDefault();
    if (file) {
        const formData = new FormData();
        formData.append('file', file);
        setDisableButton(true)
   
        try {
            const sucess = await axios.post(`${BASE_URL}/screenlogo/${screen_id}`, formData, config)
            setDisableButton(false)
            setFile2(null)
            setFileName("")
            alert("Arquivo enviado com sucesso!")
        }catch(error){
            setDisableButton(false)
            setFile2(null)
            alert("Falha ao enviar arquivo!")
        }
     
    }
}

export function handleFileChangeLogo(event: React.ChangeEvent<HTMLInputElement>, setFile: React.Dispatch<React.SetStateAction<File | null>>, setFileName: React.Dispatch<React.SetStateAction<string>>) {
    if (event.target.files) {
        setFile(event.target.files[0]);
        setFileName(event.target.files[0].name);
    }
}

export async function getScreenLogo(monitorId: number, setLogo: React.Dispatch<React.SetStateAction<{
    id: number;
    url: string;
}>>){

    try{
        const sucess = await axios.get(`${BASE_URL}/screenlogo/${monitorId}`, config)
        const logoId: number = sucess.data.id
        const logoUrl: string = sucess.data.url

        setLogo({id: logoId , url: logoUrl })

    }catch(error){
        console.log(error)
    }
   


}