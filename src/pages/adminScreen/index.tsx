import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import MyContext from "../../context/context"
import { Users } from "../../types/types.js"
import CreateNewUser from "./newUser"
import { filterUsers, getUsers, user } from "./functions"
import iconLoading from "../../img/Loading.svg"
import Container from "./styles"
import Exit from "../../components/exit"

export default function AdminScreen() {
    const navigate = useNavigate()
    const { userData, config, setUserData } = useContext(MyContext)
    const [users, setUsers] = useState<Users[]>([])

    const [search, setSearch] = useState("")
    const [updatePage, setUpdatePage] = useState(false)
    const [desactiveButton, setDesactiveButton] = useState(false)
    const [showCreateUser, setShowCreateUser] = useState(false)
    const [updateUserData, setUpdateUserData] = useState(false)

    const filterUsersByName = users.filter((user) => user.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
    const filterUsersByEmail = users.filter((user) => user.email.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
    const filterUsersByCity = users.filter((user) => user.city.toLocaleLowerCase().includes(search.toLocaleLowerCase()))

    useEffect(() => {
        if (userData?.account_type === "user") return navigate("/")
        if (userData.token === "") return navigate("/")

        getUsers(config, setUsers)
    }, [updatePage])

    return (
        <Container updateUserData={updateUserData}>
            <header><h1>Tabela de Admnistração de Clientes</h1></header>
            <Exit setUserData={setUserData} updatePage={updatePage} setUpdatePage={setUpdatePage} />
            
            <input type={"text"} onChange={(event) => setSearch(event.target.value)} value={search} className="search" placeholder="Pesquisar" />

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
                        {filterUsers(filterUsersByName, filterUsersByEmail, filterUsersByCity, users, updatePage, setUpdatePage, config, desactiveButton, setDesactiveButton, updateUserData, setUpdateUserData)}
                    </tbody>

                </table>
                <img src={iconLoading} className="loading" />
            </div>

            <button className="newUser" onClick={() => setShowCreateUser(!showCreateUser)}>Criar novo cliente</button>

            <CreateNewUser updatePage={updatePage} setUpdatePage={setUpdatePage} showCreateUser={showCreateUser} setShowCreateUser={setShowCreateUser} />
        </Container>
    )
}


