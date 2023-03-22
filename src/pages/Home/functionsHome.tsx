import axios from "axios"
import { NavigateFunction } from "react-router-dom"
import { Login, UserData, UserDataGet } from "../../types/types"


export async function signIn(
    e: React.FormEvent<HTMLFormElement>, 
    userLogin: Login, setDisableButton: React.Dispatch<React.SetStateAction<boolean>>, 
    setUserData:React.Dispatch<React.SetStateAction<UserDataGet>>, 
    setDataLogin: React.Dispatch<React.SetStateAction<Login>>,
    navigate: NavigateFunction) {

    e.preventDefault()
    if (userLogin.password.length < 8) return alert("Digite uma senha valida")

    try {
        setDisableButton(true)
        const login: UserData = await (await axios.post("https://siempre-tecnologia-backend-5obk.onrender.com/signin", userLogin)).data
        setUserData(login)

        localStorage.setItem("account_type", login?.account_type)
        localStorage.setItem("active", `${login.active}`)
        localStorage.setItem("name", login.name)
        localStorage.setItem("token", login.token)
        localStorage.setItem("id", `${login.id}`)

        if (login.account_type === "user") return navigate("/user")
        if (login.account_type === "admin") return navigate("/admin")

        setDisableButton(false)
        setDataLogin({ email: "", password: "" })
    } catch (error) {
        alert("Digite as informações corretamente!")
        setDisableButton(false)
    }

}



