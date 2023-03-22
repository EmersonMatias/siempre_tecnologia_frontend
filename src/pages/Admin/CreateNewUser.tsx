import styled from "styled-components"
import { useContext, useState } from "react"
import axios from "axios"
import { CreateNewUserProps, NewUser } from "../../types/types"
import MyContext from "../../context/context"
import iconClose from "../../img/iconClose.svg"
import iconLoading from "../../img/Loading.svg"


export default function CreateNewUser({ updatePage, setUpdatePage, showCreateUser, setShowCreateUser }: CreateNewUserProps) {
    const { config } = useContext(MyContext)
    const [newUserData, setNewUserData] = useState<NewUser>({ name: "", email: "", password: "", phone: "", city: "", adress: "", price: 0 })
    const [isLoading, setIsLoading] = useState(false)

    async function NewUser(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const invalidData = newUserData.name.length < 3 || newUserData.email.length < 8 || newUserData.password.length < 8 || newUserData.city.length < 5

        if (invalidData) {
            return alert("Verifique as informações digitadas.")
        }

        setIsLoading(true)

        try {

            const sucess = await axios.post("https://siempre-tecnologia-backend-5obk.onrender.com/cadastrar", newUserData, config)
            alert("Conta criada com sucesso!")
            setNewUserData({ name: "", email: "", password: "", phone: "", city: "", adress: "", price: 0 })
            setIsLoading(false)
            setUpdatePage(!updatePage)
            setShowCreateUser(false)
        } catch (error) {
            alert("Não foi possível criar a conta! Tente novamente mais tarde.")
            console.log(error)
            setIsLoading(false)
        }
    }

    function closeNewUser() {
        setShowCreateUser(false)
        setNewUserData({ name: "", email: "", password: "", phone: "", city: "", adress: "", price: 0 })
    }

    return (
        <Container showCreateUser={showCreateUser} isLoading={isLoading}>
            <form onSubmit={(event) => NewUser(event)}>
                <img src={iconClose} onClick={() => closeNewUser()} className="closeIcon" />
                <p>Novo Usuário</p>
                <input type={"text"} placeholder="Nome" onChange={(event) => setNewUserData({ ...newUserData, name: event.target.value })} value={newUserData?.name} required />
                <input type={"email"} placeholder="Email" onChange={(event) => setNewUserData({ ...newUserData, email: event.target.value })} value={newUserData?.email} required />
                <input type={"password"} placeholder="Senha" onChange={(event) => setNewUserData({ ...newUserData, password: event.target.value })} value={newUserData?.password} required />
                <input type={"text"} placeholder="Telefone" onChange={(event) => setNewUserData({ ...newUserData, phone: event.target.value })} value={newUserData?.phone} min={8} max={16} required />
                <input type={"text"} placeholder="Cidade" onChange={(event) => setNewUserData({ ...newUserData, city: event.target.value })} value={newUserData?.city} required />
                <input type={"text"} placeholder="Endereço" onChange={(event) => setNewUserData({ ...newUserData, adress: event.target.value })} value={newUserData?.adress} />
                <input type={"number"} placeholder="Preço" onChange={(event) => setNewUserData({ ...newUserData, price: Number(event.target.value) })} value={newUserData.price === 0 ? "" : newUserData?.price} />
                <button>Criar novo cliente</button>
            </form>
            <div className="loadingContainer">
                <img src={iconLoading} className="loadingNewUser"/>
            </div>
        </Container>
    )
}

type Styles = {
    showCreateUser: boolean,
    isLoading: boolean
}

const Container = styled.div<Styles>`
    width: 50%;
    background-color: #fafafa;
    position: fixed;
    top: 10%;
    border-radius: 16px;
    box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
    display: ${props => props.showCreateUser === true ? "flex" : "none"};
 
    .loadingContainer{
        width: 100%;
        height: 100%;
        border-radius: 16px;
        display: ${props => props.isLoading === true ? "flex" : "none"};
        align-items: center;
        justify-content: center;
       

        .loadingNewUser{
            width: 65%;
        }
    }
    
    form{
        display: ${props => props.isLoading === true ? "none" : "flex"};
        flex-direction: column;
        width: 100%;
        align-items: center;
    
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
            width: 20%;
            height: 80px;
            margin: 2rem 0;
            background-color: #0A66C2;
            color: #FFFFFF;
            border-radius: 8px;
            border: none;
        }
    }

    .closeIcon{
        width: 40px;
        height: 40px;
        position: absolute;
        right: 16px;
        top: 8px;
        cursor: pointer;
    }
`

