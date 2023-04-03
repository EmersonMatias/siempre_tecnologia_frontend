import axios from "axios"
import { BASE_URL } from "../../constants/constants.js"
import { Users } from "../../types/types.js"


async function desactiveAccount(e: Users, updatePage: boolean, setUpdatePage: React.Dispatch<React.SetStateAction<boolean>>, setDesactiveButton: React.Dispatch<React.SetStateAction<boolean>>, config: object) {
    if (e.active === true) {
        const dataUpdate = { active: false, userId: e.id }

        setDesactiveButton(true)
        const update = await axios.put(`${BASE_URL}/updateuser`, dataUpdate, config)

        setUpdatePage(!updatePage)

        setDesactiveButton(false)
    }
    if (e.active === false) {
        const dataUpdate = { active: true, userId: e.id }
        setDesactiveButton(true)
        const update = await axios.put(`${BASE_URL}/updateuser`, dataUpdate, config)
        setUpdatePage(!updatePage)

        setDesactiveButton(false)
    }
}

async function updateName(userId: number, updatePage: boolean, setUpdatePage: React.Dispatch<React.SetStateAction<boolean>>, config: object, updateUserData: boolean, setUpdateUserData: React.Dispatch<React.SetStateAction<boolean>>) {
    const newName = prompt("Digite o novo nome: ")

    if (newName) {
        setUpdateUserData(true)

        try {
            const sucess = await axios.put(`${BASE_URL}/updateusername`, { name: newName, userId }, config)
            setUpdatePage(!updatePage)
            setUpdateUserData(false)
            alert("Nome do cliente atualizado com sucesso!")
            console.log(sucess)
        } catch (error) {
            setUpdateUserData(false)
            console.log(error)
        }
    }
}

async function updatePhone(userId: number, updatePage: boolean, setUpdatePage: React.Dispatch<React.SetStateAction<boolean>>, config: object, updateUserData: boolean, setUpdateUserData: React.Dispatch<React.SetStateAction<boolean>>) {
    const newPhone = prompt("Digite o novo telefone: ")

    if (newPhone) {
        setUpdateUserData(true)

        try {
            const sucess = await axios.put(`${BASE_URL}/updateuserphone`, { phone: newPhone, userId }, config)
            setUpdatePage(!updatePage)
            setUpdateUserData(false)
            console.log(sucess)
        } catch (error) {
            console.log(error)
            setUpdateUserData(false)
        }
    }
}

async function updateCity(userId: number, updatePage: boolean, setUpdatePage: React.Dispatch<React.SetStateAction<boolean>>, config: object, updateUserData: boolean, setUpdateUserData: React.Dispatch<React.SetStateAction<boolean>>) {
    const newCity = prompt("Digite a nova cidade: ")

    if (newCity) {
        setUpdateUserData(true)

        try {
            const sucess = await axios.put(`${BASE_URL}/updateusercity`, { city: newCity, userId }, config)
            setUpdatePage(!updatePage)
            setUpdateUserData(false)
            console.log(sucess)
        } catch (error) {
            console.log(error)
            setUpdateUserData(false)
        }
    }
}

async function updateAdress(userId: number, updatePage: boolean, setUpdatePage: React.Dispatch<React.SetStateAction<boolean>>, config: object, updateUserData: boolean, setUpdateUserData: React.Dispatch<React.SetStateAction<boolean>>) {
    const newAdress = prompt("Digite o novo endereço: ")

    if (newAdress) {
        setUpdateUserData(true)

        try {
            const sucess = await axios.put(`${BASE_URL}/updateuseradress`, { adress: newAdress, userId }, config)
            setUpdatePage(!updatePage)
            setUpdateUserData(false)
            console.log(sucess)
        } catch (error) {
            console.log(error)
            setUpdateUserData(false)
        }
    }
}

async function updatePrice(userId: number, updatePage: boolean, setUpdatePage: React.Dispatch<React.SetStateAction<boolean>>, config: object) {
    const newPrice = prompt("Digite o novo preço: ")

    if (newPrice) {
        try {
            const sucess = await axios.put(`${BASE_URL}/updateuserprice`, { price: Number(newPrice) * 100, userId }, config)
            setUpdatePage(!updatePage)
            console.log(sucess)
        } catch (error) {
            console.log(error)
        }
    }

}

async function deleteAccount(userId: number, updatePage: boolean, setUpdatePage: React.Dispatch<React.SetStateAction<boolean>>, config: object, updateUserData: boolean, setUpdateUserData: React.Dispatch<React.SetStateAction<boolean>>) {
    const confirmDelete = confirm("Tem certeza que deseja deletar essa conta?")

    if (confirmDelete) {
        setUpdateUserData(true)

        try {
            const sucess = await axios.delete(`${BASE_URL}/deleteuser/${userId}`, config)
            setUpdatePage(!updatePage)
            setUpdateUserData(false)
            alert("Conta deletada com sucesso!")
        } catch (error) {
            setUpdateUserData(false)
            console.log(error)
            alert("Não foi possível deletar essa conta! Tente mais tarde.")
        }
    }

}

export const user = {
    desactiveAccount,
    updateName,
    updatePhone,
    updateCity,
    updateAdress,
    updatePrice,
    deleteAccount
}

export function filterUsers(
    filterUsersByName: Users[],
    filterUsersByEmail: Users[],
    filterUsersByCity: Users[],
    users: Users[],
    updatePage: boolean,
    setUpdatePage: React.Dispatch<React.SetStateAction<boolean>>,
    config: object,
    desactiveButton: boolean,
    setDesactiveButton: React.Dispatch<React.SetStateAction<boolean>>,
    updateUserData: boolean,
    setUpdateUserData: React.Dispatch<React.SetStateAction<boolean>>) {

    function defaultTable(e: Users, index: number) {
        return <tr key={index}>
            <td onClick={() => user.deleteAccount(e.id, updatePage, setUpdatePage, config, updateUserData, setUpdateUserData)}>{e.id}</td>
            <td onClick={() => user.updateName(e.id, updatePage, setUpdatePage, config, updateUserData, setUpdateUserData)}>{e.name}</td>
            <td>{e.email}</td>
            <td onClick={() => user.updatePhone(e.id, updatePage, setUpdatePage, config, updateUserData, setUpdateUserData)}>{e.phone}</td>
            <th onClick={() => user.updateCity(e.id, updatePage, setUpdatePage, config, updateUserData, setUpdateUserData)}>{e.city}</th>
            <th onClick={() => user.updateAdress(e.id, updatePage, setUpdatePage, config, updateUserData, setUpdateUserData)}>{e.adress}</th>
            <td>{ }</td>
            <td><button className={e.active === true ? "active" : "desactive"} disabled={desactiveButton} onClick={() => user.desactiveAccount(e, updatePage, setUpdatePage, setDesactiveButton, config)}>{e.active === true ? "Ativa" : "Desativada"}</button></td>
            <td onClick={() => user.updatePrice(e.id, updatePage, setUpdatePage, config)}> R$ {(e.price / 100).toFixed(2).replace(".", ",")}</td>
        </tr>
    }

    if (filterUsersByName.length) {
        return filterUsersByName.map((e, index) => (
            defaultTable(e, index)
        ))
    }
    else if (filterUsersByEmail.length) {
        return filterUsersByEmail.map((e, index) => (
            defaultTable(e, index)
        ))
    }
    else if (filterUsersByCity.length) {
        return filterUsersByCity.map((e, index) => (
            defaultTable(e, index)
        ))
    }
    else {
        return users.map((e, index) => (
            defaultTable(e, index)
        ))
    }
}

export async function getUsers(config: object, setUsers: React.Dispatch<React.SetStateAction<Users[]>>) {
    try {
        const users = await axios.get(`${BASE_URL}/users`, config)
        setUsers(users.data)
    } catch (error) {
        console.log(error)
    }
}