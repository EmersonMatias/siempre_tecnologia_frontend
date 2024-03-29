import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import MyContext from "../../context/context"
import backgroundHome from "../../img/background_home.png"
import logo from "../../img/logo.png"
import { Login } from "../../types/types"
import iconWpp from "../../img/IconWpp.svg"
import { signIn } from "./functionsHome"


export default function Home() {
    const [userLogin, setDataLogin] = useState<Login>({ email: "", password: "" })
    const [disableButton, setDisableButton] = useState(false)
    const { setUserData } = useContext(MyContext)
    const navigate = useNavigate()
    
    useEffect(() => {
        const token = localStorage.getItem("token")
        const account_type:any = localStorage.getItem("account_type")
        const name = localStorage.getItem("name")
        const active = Boolean(localStorage.getItem("active"))
        const id = Number(localStorage.getItem("id"))
        setUserData({ account_type, active, name, token, id})
       
        if (token && account_type === "user") return navigate("/user")
        if (token && account_type === "admin") return navigate("/admin")
    }, [])

    return (
        <Container>

            <div className="logo">
                <img src={logo} />
            </div>
            <img src={iconWpp} className="iconWpp" onClick={() => window.open("https://wa.me/5534999996124?", `_blank`)} />
            <form onSubmit={(e) => signIn(e, userLogin, setDisableButton, setUserData, setDataLogin, navigate)}>
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
