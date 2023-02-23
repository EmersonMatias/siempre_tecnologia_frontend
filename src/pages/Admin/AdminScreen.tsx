import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import MyContext from "../../context/context"
import { Users } from "../../types/types.js"

export default function AdminScreen() {
    const { userData, config, setUserData } = useContext(MyContext)
    const [users, setUsers] = useState<Users[]>([])
    const navigate = useNavigate()
    const [updatePage, setUpdatePage] = useState(false)
    const [desactiveButton, setDesactiveButton] = useState(false)

    useEffect(() => {
        if (userData?.account_type === "user") return navigate("/")
        if (userData.token === "") return navigate("/")

        getUsers()
    }, [updatePage])

    async function getUsers() {
        try {
            const users = await axios.get("http://localhost:4000/users", config)
            setUsers(users.data)
        } catch (error) {
            console.log(error)
        }
    }

    async function desactiveAccount(e: Users) {
        if (e.active === true) {
            const dataUpdate = { active: false, userId: e.id }

            setDesactiveButton(true)
            const update = await axios.put("http://localhost:4000/updateuser", dataUpdate, config)

            setUpdatePage(!updatePage)

            setDesactiveButton(false)
        }
        if (e.active === false) {
            const dataUpdate = { active: true, userId: e.id }
            setDesactiveButton(true)
            const update = await axios.put("http://localhost:4000/updateuser", dataUpdate, config)
            setUpdatePage(!updatePage)

            setDesactiveButton(false)
        }
    }

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
        <Container>
            <header><h1>Tabela de Administração</h1></header>
            <div className="exit" onClick={() => exitAccount()}>
                Sair
            </div>

            <div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Telefone</th>
                            <th>Conta em uso</th>
                            <th>Status da Conta</th>
                            <th>Preço</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((e, index) => (
                            <tr key={index}>
                                <td>{e.id}</td>
                                <td>{e.name}</td>
                                <td>{e.email}</td>
                                <td>{e.phone}</td>
                                <td>{ }</td>
                                <td><button className={e.active === true ? "active" : "desactive"} disabled={desactiveButton} onClick={() => desactiveAccount(e)}>{e.active === true ? "Ativa" : "Desativada"}</button></td>
                                <td> R$ {(e.price / 100).toFixed(2)}</td>
                            </tr>))}
                    </tbody>

                </table>
            </div>
        </Container>
    )
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1.6rem;

    .exit{
        position: fixed;
        top: 8px;
        right: 50px;
        font-size: 1.6rem;
        font-weight: bold;
        color: rgb(0,0,0,0.5);

        &:hover{
            color: red;
        }
    }


    header{
        width: 100%;
        height: 4rem;
        background-color: aliceblue;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    h1{
        font-size: 2rem;
        font-weight: 600;
    }

    table{
        table-layout: fixed;
        margin-top: 2vw;
        word-wrap:break-word;
        text-align: center;
    }

    .active{
        color: white;
        background-color: green;
        border-radius: 8px;
        border: none;
    }

    .desactive{
        color: white;
        background-color: red;
        border-radius: 8px;
        border: none;
    }

    button{
        width: 70%;
        height: 40px;
        font-size: 1.2rem;
        font-weight: bold;
        cursor: pointer;
    }

    button:disabled{
        color: grey;
    }
`

