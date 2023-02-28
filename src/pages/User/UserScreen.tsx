import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import MyContext from "../../context/context"
import MyProducts from "./MyProducts"
import Screens from "./Screens"
import UploadFiles from "./UploadFiles"

export type ProductType = {
    code: number,
    type: string,
    product: string,
    price: number,
    user_id: number
}

export default function UserScreen() {
    const { userData, setUserData } = useContext(MyContext)
    const [updatePage, setUpdatePage] = useState(false)
    const navigate = useNavigate()


    useEffect(() => {
        if (userData?.account_type === "admin") return navigate("/")
        if (userData.token === "") return navigate("/")
    }, [updatePage])

    function exitAccount() {
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

    return (
        <Container >
            <header><h1>Tabela de Configurações</h1>    <div className="exit" onClick={() => exitAccount()}>
                Sair
            </div></header>


            <div className="configContainer">

                <MyProducts updatePage={updatePage} setUpdatePage={setUpdatePage} />

                <UploadFiles updatePage={updatePage} setUpdatePage={setUpdatePage} />

                <Screens />

            </div>
        </Container>
    )
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    font-size: 2rem;
    overflow-wrap: break-word;
    overflow-x: hidden;
    font-family: 'Roboto', sans-serif;

    .exit{
        position: absolute;
        right: 40px;
        font-size: 1.6rem;
        font-weight: bold;
        color: rgb(0,0,0,0.5);

        &:hover{
            color: red;
        }
    }


    header{
        position: relative;
        width: 100%;
        height: 4rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        font-weight: 600;
    }

    .configContainer{
        width: 100%;
    }

`