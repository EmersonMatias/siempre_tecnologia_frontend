import { useContext, useState } from "react"
import axios from "axios"
import { CreateNewUserProps, NewUser } from "../../../types/types"
import MyContext from "../../../context/context"
import iconClose from "../../../img/iconClose.svg"
import iconLoading from "../../../img/Loading.svg"
import Container from "./styles"
import { BASE_URL } from "../../../constants/constants"

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

            const sucess = await axios.post(`${BASE_URL}/cadastrar`, newUserData, config)
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
        <Container
         showCreateUser={showCreateUser} isLoading={isLoading}>
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

