import axios from "axios"


const token = localStorage.getItem("token")
const config = { headers: { Authorization: `Bearer ${token}` } }

export async function DeleteFile(id: number){

    const confirmDelete = confirm("Tem certeza que deseja apagar este arquivo?")
    if(confirmDelete){
        const deleteFile = async  () => {
            try{
                const sucess = await axios.delete(`https://siempre-tecnologia-backend-5obk.onrender.com/deletefile/${id}`, config)
                alert("Arquivo excluido com sucesso!")
            }catch(error){
                console.log(error)
            }
        }

        deleteFile()
    }
}