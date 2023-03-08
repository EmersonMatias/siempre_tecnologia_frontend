import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import MyContext from "../../context/context"
import { Users } from "../../types/types.js"
import CreateNewUser from "./CreateNewUser"

export default function AdminScreen() {
    const { userData, config, setUserData } = useContext(MyContext)
    const [users, setUsers] = useState<Users[]>([])
    const navigate = useNavigate()
    const [updatePage, setUpdatePage] = useState(false)
    const [desactiveButton, setDesactiveButton] = useState(false)
    const [search, setSearch] = useState("")
    const filterProducts =  users.filter((user) => user.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) )
    const [showCreateUser, setShowCreateUser] = useState(false)
    console.log(users, filterProducts)

    useEffect(() => {
        if (userData?.account_type === "user") return navigate("/")
        if (userData.token === "") return navigate("/")

        async function getUsers() {
            try {
                const users = await axios.get("http://localhost:4000/users", config)
                setUsers(users.data)
            } catch (error) {
                console.log(error)
            }
        }
    

        getUsers()
    }, [updatePage])

    
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

    function updateUserName( userId: number){

        const newName = prompt("Digite o novo nome: ")

        if(newName){
            const updateName = async () => {
            
                try{
                    const sucess = await axios.put("http://localhost:4000/updateusername", {name: newName, userId}, config)
                    setUpdatePage(!updatePage)
                    console.log(sucess)
                }catch(error){
                    console.log(error)
                }
    
            }
    
            updateName()
        }
    }

    function updateUserPhone( userId: number){

        const newPhone = prompt("Digite o novo telefone: ")

        if(newPhone){
            const updatePhone = async () => {
            
                try{
                    const sucess = await axios.put("http://localhost:4000/updateuserphone", {phone: newPhone, userId}, config)
                    setUpdatePage(!updatePage)
                    console.log(sucess)
                }catch(error){
                    console.log(error)
                }
            }
    
            updatePhone()
        }
    }

    function updateUserCity( userId: number){

        const newCity = prompt("Digite a nova cidade: ")

        if(newCity){
            const updateCity = async () => {
            
                try{
                    const sucess = await axios.put("http://localhost:4000/updateusercity", {city: newCity, userId}, config)
                    setUpdatePage(!updatePage)
                    console.log(sucess)
                }catch(error){
                    console.log(error)
                }
            }
    
            updateCity()
        }
    }

    function updateUserAdress( userId: number){

        const newAdress = prompt("Digite o novo endereço: ")

        if(newAdress){
            const updateAdress = async () => {
            
                try{
                    const sucess = await axios.put("http://localhost:4000/updateuseradress", {adress: newAdress, userId}, config)
                    setUpdatePage(!updatePage)
                    console.log(sucess)
                }catch(error){
                    console.log(error)
                }
            }
    
            updateAdress()
        }
    }

    function updateUserPrice( userId: number){

        const newPrice = prompt("Digite o novo preço: ")

        if(newPrice){
            const updatePrice = async () => {
            
                try{
                    const sucess = await axios.put("http://localhost:4000/updateuserprice", {price: Number(newPrice)*100, userId}, config)
                    setUpdatePage(!updatePage)
                    console.log(sucess)
                }catch(error){
                    console.log(error)
                }
            }
    
            updatePrice()
        }
    }

    function deleteUser( userId: number){

        const confirmDelete = confirm("Tem certeza que deseja deletar essa conta?")

        if(confirmDelete){
            const deleteAccount = async () => {
            
                try{
                   const sucess = await axios.delete(`http://localhost:4000/deleteuser/${userId}`, config)
                   setUpdatePage(!updatePage)
                   console.log(sucess)
               }catch(error){
                   console.log(error)
               }
           }
       
            deleteAccount()
        }

    }

    
    
    

    return (
        <Container>
            <header><h1>Tabela de Administração</h1></header>
            <div className="exit" onClick={() => exitAccount()}>
                Sair
            </div>
            <input type={"text"} onChange={(event) => setSearch(event.target.value)} value={search} className="search"></input>
            <div className="tableContent">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Telefone</th>
                            <th>Cidade</th>
                            <th>Endereço</th>
                            <th>Conta em uso</th>
                            <th>Status da Conta</th>
                            <th>Preço</th>
                        </tr>
                    </thead>
                    <tbody>
                        { filterProducts.length ?
                             filterProducts.map((e, index) => (
                                <tr key={index}>
                                    <td onClick={() => deleteUser(e.id) }>{e.id}</td>
                                    <td onClick={() => updateUserName(e.id) }>{e.name}</td>
                                    <td>{e.email}</td>
                                    <td onClick={() => updateUserPhone(e.id) }>{e.phone}</td>
                                    <th onClick={() => updateUserCity(e.id) }>{e.city}</th>
                                    <th onClick={() => updateUserAdress(e.id) }>{e.adress}</th>
                                    <td>{ }</td>
                                    <td><button className={e.active === true ? "active" : "desactive"} disabled={desactiveButton} onClick={() => desactiveAccount(e)}>{e.active === true ? "Ativa" : "Desativada"}</button></td>
                                    <td onClick={() => updateUserPrice(e.id) }> R$ {(e.price / 100).toFixed(2).replace(".", ",")}</td>
                                </tr>
                            )) :
                            users.map((e, index) => (
                                <tr key={index}>
                                    <td>{e.id}</td>
                                    <td>{e.name}</td>
                                    <td>{e.email}</td>
                                    <td>{e.phone}</td>
                                    <th>{e.city}</th>
                                    <th>{e.adress}</th>
                                    <td>{ }</td>
                                    <td><button className={e.active === true ? "active" : "desactive"} disabled={desactiveButton} onClick={() => desactiveAccount(e)}>{e.active === true ? "Ativa" : "Desativada"}</button></td>
                                    <td> R$ {(e.price / 100).toFixed(2).replace(".", ",")}</td>
                                </tr>
                            ))
                        }
                    </tbody>

                </table>
            </div>

            <button className="newUser" onClick={() => setShowCreateUser(!showCreateUser)}>Criar Novo Usuário</button>

            <CreateNewUser updatePage={updatePage} setUpdatePage={setUpdatePage} showCreateUser={showCreateUser} setShowCreateUser={setShowCreateUser}/>
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

    .search{
        width: 50%;
        margin-top: 1rem;
    }

    .newUser{
        border-radius: 16px;
        margin-top: 2rem;
        margin-bottom: 2rem;
    }

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

    .tableContent{
        width: 90%;
    }

    table{
        width: 100%;
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

