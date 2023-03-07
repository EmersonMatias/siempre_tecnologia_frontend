import styled from "styled-components"
import {useState} from "react"
import axios from "axios"

type NewUser = {
    name: string,
    email: string,
    password: string
    phone: string,
    city: string,
    adress: string,
    price: number
}

type CreateNewUserProps = {
    updatePage: boolean,
    setUpdatePage: React.Dispatch<React.SetStateAction<boolean>>
    showCreateUser: boolean
    setShowCreateUser: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CreateNewUser({updatePage, setUpdatePage, showCreateUser, setShowCreateUser}: CreateNewUserProps){
    const[newUserData, setNewUserData] = useState<NewUser>({name: "", email: "",password: "", phone: "", city: "", adress: "", price: 0})
    const token = localStorage.getItem("token")
    const config = { headers: { Authorization: `Bearer ${token}` } }
    
    async function NewUser(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault()

        try{
            const sucess = await axios.post("http://localhost:4000/cadastrar", newUserData, config)
            alert("Conta criada com sucesso!")
            setNewUserData({name: "", email: "",password: "", phone: "", city: "", adress: "", price: 0})
            setUpdatePage(!updatePage)
            setShowCreateUser(false)
        }catch(error){
            console.log(error)
        }
    }

    return(
        <Container showCreateUser={showCreateUser} >
            <form onSubmit={(event) => NewUser(event)}>
                <p>Novo Usuário</p>
                <input type={"text"} placeholder="Nome" onChange={(event) => setNewUserData({...newUserData, name: event.target.value} )} value={newUserData?.name}/>
                <input type={"email"} placeholder="Email" onChange={(event) => setNewUserData({...newUserData, email: event.target.value} )} value={newUserData?.email}/>
                <input type={"password"} placeholder="Senha" onChange={(event) => setNewUserData({...newUserData, password: event.target.value} )} value={newUserData?.password} min={8}/>
                <input type={"text"} placeholder="Telefone" onChange={(event) => setNewUserData({...newUserData, phone: event.target.value} )} value={newUserData?.phone} min={8} max={16}/>
                <input type={"text"} placeholder="Cidade" onChange={(event) => setNewUserData({...newUserData, city: event.target.value} )} value={newUserData?.city}/>
                <input type={"text"} placeholder="Endereço" onChange={(event) => setNewUserData({...newUserData, adress: event.target.value} )} value={newUserData?.adress}/>
                <input type={"number"} placeholder="Preço" onChange={(event) => setNewUserData({...newUserData, price: Number(event.target.value)} )} value={newUserData?.price}/>
                <button>Criar</button>
            </form>

        </Container>
    )
}

type Styles = {
    showCreateUser: boolean
}

const Container = styled.div<Styles>`
    width: 50%;
    height: 50%;
    background-color: #FFFFFF;
    position: fixed;
    top: 18%;
    display: ${props => props.showCreateUser === true ? "flex" : "none"};
    

    form{
        display: flex;
        flex-direction: column;
        width: 100%;
        align-items: center;
        overflow-y: scroll;

        p{
            font-weight: bold;
            margin-top: 1rem;
        }

        input{
            width: 80%;
            height: 50px;
            font-size: 1.2rem;
            border-radius: 0.8rem;
            margin: 1rem 0;
            padding-left: 1rem;
        }
        button{
            margin: 2rem 0;
            background-color: red;
            color: #FFFFFF;
            border-radius: 8px;
            border: none;
        }
    }
`