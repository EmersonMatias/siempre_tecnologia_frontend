import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import MyContext from "../../context/context"
import { Users } from "../../types/types.js"
import CreateNewUser from "./CreateNewUser"
import { filterProducts, user } from "./functionsAdminScreen"
import iconLoading from "../../img/Loading.svg"

export default function AdminScreen() {
    const navigate = useNavigate()
    const { userData, config, setUserData } = useContext(MyContext)

    const [users, setUsers] = useState<Users[]>([])
    const [updatePage, setUpdatePage] = useState(false)
    const [desactiveButton, setDesactiveButton] = useState(false)
    const [search, setSearch] = useState("")
    const [showCreateUser, setShowCreateUser] = useState(false)
    const [updateUserData, setUpdateUserData] = useState(false)
    const filterProductsByName = users.filter((user) => user.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
    const filterProductsByEmail = users.filter((user) => user.email.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
    const filterProductsByCity = users.filter((user) => user.city.toLocaleLowerCase().includes(search.toLocaleLowerCase()))

    useEffect(() => {
        if (userData?.account_type === "user") return navigate("/")
        if (userData.token === "") return navigate("/")
        //"https://siempre-tecnologia-backend-5obk.onrender.com/users"
        async function getUsers() {
            try {
                const users = await axios.get(`https://siempre-tecnologia-backend-5obk.onrender.com/users`, config)
                setUsers(users.data)
            } catch (error) {
                console.log(error)
            }
        }

        getUsers()
    }, [updatePage])

    return (
        <Container updateUserData={updateUserData}>
            <header><h1>Tabela de Admnistração de Clientes</h1></header>
            <div className="exit" onClick={() => user.exitAccount(setUserData, updatePage, setUpdatePage)}>
                Sair
            </div>
            <input type={"text"} onChange={(event) => setSearch(event.target.value)} value={search} className="search" placeholder="Pesquisar"></input>
            <div className="tableContent">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Clientes</th>
                            <th>Email</th>
                            <th>Contato</th>
                            <th>Cidade</th>
                            <th>Endereço</th>
                            <th>Conta em uso</th>
                            <th>Status da Conta</th>
                            <th>Preço</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filterProducts(filterProductsByName, filterProductsByEmail, filterProductsByCity, users, updatePage, setUpdatePage, config, desactiveButton, setDesactiveButton, updateUserData, setUpdateUserData)}
                    </tbody>

                </table>
                <img src={iconLoading} className="loading" />
            </div>

            <button className="newUser" onClick={() => setShowCreateUser(!showCreateUser)}>Criar novo cliente</button>

            <CreateNewUser updatePage={updatePage} setUpdatePage={setUpdatePage} showCreateUser={showCreateUser} setShowCreateUser={setShowCreateUser} />
        </Container>
    )
}

type AdminProps = {
    updateUserData: boolean
}

const Container = styled.div<AdminProps>`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1.6rem;
    font-family: 'Roboto', sans-serif;
    overflow-x: hidden;
    padding: 2rem 0;

    .search{
        width: 40%;
        margin-top: 1rem;
        border: 3px solid black;
        border-radius: 8px;
        font-size: 1.6rem;
        padding: 4px 0  4px 16px;
    }

    .loading{
        width: 50%;
        display: ${props => props.updateUserData === true ? "flex" : "none"};
    }

    .newUser{
        width: 20%;
        height: 60px;
        font-size: 1.6rem;
        font-weight: bold;
        cursor: pointer;
        border-radius: 8px;
        margin-top: 2rem;
        background-color: #0A66C2;
        color: #FFFFFF;
        border: none;
    }

    .exit{
        position: absolute;
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
        display: flex;
        align-items: center;
        justify-content: center;
    }

    h1{
        font-size: 2rem;
        font-weight: 600;
    }

    .tableContent{
        width: 90%;
        display: flex;
        flex-direction: column;
        align-items: center;
      
    }

    table{
        width: 100%;
        margin-top: 2vw;
        margin-bottom: 2rem;
        word-wrap:break-word;
        text-align: center;
        visibility: ${props => props.updateUserData === true ? "collapse" : ""};
    }

    td{
        padding: 8px;
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
        width: 90%;
        height: 40px;
        font-size: 1.2rem;
        font-weight: bold;
        cursor: pointer;
    }

    button:disabled{
        color: grey;
    }
`

