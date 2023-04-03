import axios from "axios"
import { BASE_URL } from "../../constants/constants"
import { Screen, UserDataGet } from "../../types/types"
import { ProductType2 } from "../userMonitor/settings/myProducts"


const token = localStorage.getItem("token")
const config = { headers: { Authorization: `Bearer ${token}` } }


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

export async function getProducts(setMyProducts: React.Dispatch<React.SetStateAction<ProductType2[]>>) {
    try {
        const productsList = await axios.get(`${BASE_URL}/products`, config)
        console.log(productsList.data, "aaaaaaaaaaaa")
        setMyProducts(productsList.data)
    } catch (error) {
        console.log(error)
    }
}


// Monitors
export async function getMonitors(setMonitors: React.Dispatch<React.SetStateAction<Screen[]>>) {
    try {
        const sucess = await axios.get(`${BASE_URL}/screens`, config)
        setMonitors(sucess?.data)
    } catch (error) {
        console.log(error)
    }
}

export async function createNewMonitor(event: React.FormEvent<HTMLFormElement>, setButtoDisabled: React.Dispatch<React.SetStateAction<boolean>>, setDisplayForm: React.Dispatch<React.SetStateAction<boolean>>, setScreenName: React.Dispatch<React.SetStateAction<string>>, screenName: string, screenType: "açogue" | "padaria" | "neutro", updatePage: boolean, setUpdatePage: React.Dispatch<React.SetStateAction<boolean>>) {
    event.preventDefault()

    if(screenName.length < 4){
       return alert("Por favor, digite um nome para o novo monitor que tenha mais que 3 letras!")
    }

    try {
        const sucess = await axios.post(`${BASE_URL}/screens`, { screen_name: screenName, screen_type: screenType }, config)
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

export async function deleteMonitor(id: number, updatePage: boolean, setUpdatePage: React.Dispatch<React.SetStateAction<boolean>>) {
    const confirmMonitorDeletion = confirm("Tem certeza que quer excluir esse monitor?")

    if (confirmMonitorDeletion) {
        try {
            const sucess = await axios.delete(`${BASE_URL}/screen/${id}`, config)
            setUpdatePage(!updatePage)
            alert("Tela deletada com sucesso!")
        } catch (error) {
            console.log(error)
        }
    }

}