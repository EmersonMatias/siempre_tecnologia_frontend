import axios from "axios"
import { UserData, UserDataGet } from "../../types/types"
import { ProductType2 } from "./MyProducts"


const token = localStorage.getItem("token")
const config = { headers: { Authorization: `Bearer ${token}` } }

export async function DeleteFile(id: number){

    const confirmDelete = confirm("Tem certeza que deseja apagar este arquivo?")
    if(confirmDelete){
        const deleteFile = async  () => {
            try{
                const sucess = await axios.delete(`http://localhost:4000/deletefile/${id}`, config)
                alert("Arquivo excluido com sucesso!")
            }catch(error){
                console.log(error)
            }
        }

        deleteFile()
    }
}

export function exitAccount(setUserData: React.Dispatch<React.SetStateAction<UserDataGet>>, setUpdatePage: React.Dispatch<React.SetStateAction<boolean>>, updatePage: boolean) {
    localStorage.removeItem("token")
    localStorage.removeItem("account_type")
    localStorage.removeItem("name")
    localStorage.removeItem("active")
    localStorage.removeItem("id")
    setUserData({
        account_type: "user",
        active: false,
        name: "",
        token: "",
        id: 0
    })
    setUpdatePage(!updatePage)
}

export async function getProducts(setMyProducts: React.Dispatch<React.SetStateAction<ProductType2[]>>)  {
    try {
        const productsList = await axios.get("http://localhost:4000/products", config)
        console.log(productsList.data, "aaaaaaaaaaaa")
        setMyProducts(productsList.data)
    } catch (error) {
        console.log(error)
    }
}


export function createNewScreen(event: React.FormEvent<HTMLFormElement>, setButtoDisabled: React.Dispatch<React.SetStateAction<boolean>>,setDisplayForm: React.Dispatch<React.SetStateAction<boolean>>, setScreenName: React.Dispatch<React.SetStateAction<string>>, screenName: string, screenType: "açogue" | "padaria" | "neutro", updatePage: boolean, setUpdatePage: React.Dispatch<React.SetStateAction<boolean>>) {
    event.preventDefault()

    const send = async () => {
       setButtoDisabled(true)
        try {

            const sucess = await axios.post("http://localhost:4000/screens", { screen_name: screenName, screen_type: screenType }, config)
            setDisplayForm(false)
            setButtoDisabled(false)
            setScreenName("")
            setUpdatePage(!updatePage)
            console.log(sucess)
        } catch (error) {
            console.log(error)
            setButtoDisabled(false)
            setUpdatePage(!updatePage)
        }
    }

    send()
}