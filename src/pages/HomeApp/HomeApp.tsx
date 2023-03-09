import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import backgroundHome from "../../img/background_home.png"
import logo from "../../img/logo.png"
import iconWpp from "../../img/IconWpp.svg"

export type UserData = {
    account_type: "user" | "admin",
    active: boolean,
    name: string,
    token: string,
    id: number
}

export default function HomeApp() {
    const [userLogin, setDataLogin] = useState({ email: "", password: "" })
    const [disableButton, setDisableButton] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("token")
        const account_type = localStorage.getItem("account_type")
        const name = localStorage.getItem("name")
        const active = localStorage.getItem("active")
        const id = localStorage.getItem("id")
        console.log(token, account_type, name, account_type, id)

        if (token && account_type === "user") return navigate("/appdesktop")
        if (token && account_type === "admin") return navigate("/appdesktop")

        
    }, [])

    async function signIn(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if (userLogin.password.length < 8) return alert("Digite uma senha valida")

        try {
            setDisableButton(true)
            const login: UserData = await (await axios.post("https://siempre-tecnologia-backend-5obk.onrender.com/signin", userLogin)).data

            localStorage.setItem("account_type", login.account_type)
            localStorage.setItem("active", `${login.active}`)
            localStorage.setItem("name", login.name)
            localStorage.setItem("token", login.token)
            localStorage.setItem("id", `${login.id}`)

            if (login.account_type === "user") return navigate("/appdesktop")
            if (login.account_type === "admin") return navigate("/appdesktop")

            setDisableButton(false)
            setDataLogin({ email: "", password: "" })
        } catch (error) {
            alert("Digite as informações corretamente!")
            setDisableButton(false)
        }

    }

    return (
        <Container>

            <div className="logo">
                <img src={logo} />
            </div>
            <img src={iconWpp} className="iconWpp" onClick={() => window.open("https://wa.me/5516992031949?", `_blank`)} />
            <form onSubmit={(e) => signIn(e)}>
                <div className="login">
                    <input placeholder="email" type="email" onChange={(e) => setDataLogin({ ...userLogin, email: e.target.value })} required disabled={disableButton} value={userLogin.email}></input>
                    <input placeholder="senha" type="password" onChange={(e) => setDataLogin({ ...userLogin, password: e.target.value })} required disabled={disableButton} value={userLogin.password}></input>
                    <button disabled={disableButton}>Entrar</button>
                </div>
            </form>


        </Container>
    )
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-image: url(${backgroundHome});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
   
    .logo{
        width: 487px;
        margin-top: 48px;
        margin-bottom: 48px;

        img{
            width: 100%;
        }
    }

    .login{
        width: 30vw;
        height: 200px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, 0.7);
        backdrop-filter: blur(10px);
        border-radius: 16px;
        
        input{
            width: 80%;
            height: 40px;
            margin-bottom: 24px;
            border-radius: 8px;
            font-size: 1.6rem;
            padding-left: 16px;
            border: none;
        }

        button{
            width: 160px;
            height: 40px;
            font-size: 1.6rem;
            font-weight: 600;
            border-radius: 8px;
            color: #FFFFFF;
            background-color: black;
        }
    }

    .iconWpp{
        position: absolute;
        top: 1rem;
        right: 4rem;
        cursor: pointer;
    }
`
