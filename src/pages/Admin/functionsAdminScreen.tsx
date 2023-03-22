import axios from "axios"
import { Users } from "../../types/types.js"
import { UserData } from "../../types/types";

async function desactiveAccount(e: Users, updatePage: boolean, setUpdatePage: React.Dispatch<React.SetStateAction<boolean>>, setDesactiveButton: React.Dispatch<React.SetStateAction<boolean>>, config: object) {
    if (e.active === true) {
        const dataUpdate = { active: false, userId: e.id }

        setDesactiveButton(true)
        const update = await axios.put("https://siempre-tecnologia-backend-5obk.onrender.com/updateuser", dataUpdate, config)

        setUpdatePage(!updatePage)

        setDesactiveButton(false)
    }
    if (e.active === false) {
        const dataUpdate = { active: true, userId: e.id }
        setDesactiveButton(true)
        const update = await axios.put("https://siempre-tecnologia-backend-5obk.onrender.com/updateuser", dataUpdate, config)
        setUpdatePage(!updatePage)

        setDesactiveButton(false)
    }
}

function exitAccount(setUserData: React.Dispatch<React.SetStateAction<UserData>>, updatePage: boolean, setUpdatePage: React.Dispatch<React.SetStateAction<boolean>> ) {
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

function updateName(userId: number, updatePage: boolean, setUpdatePage: React.Dispatch<React.SetStateAction<boolean>>, config: object, updateUserData: boolean, setUpdateUserData: React.Dispatch<React.SetStateAction<boolean>>){

    const newName = prompt("Digite o novo nome: ")

    if(newName){
        const updateName = async () => {
            setUpdateUserData(true)

            try{
                const sucess = await axios.put("https://siempre-tecnologia-backend-5obk.onrender.com/updateusername", {name: newName, userId}, config)
                setUpdatePage(!updatePage)
                setUpdateUserData(false)
                alert("Nome do cliente atualizado com sucesso!")
                console.log(sucess)
            }catch(error){
                setUpdateUserData(false)
                console.log(error)
            }

        }

        updateName()
    }
}

function updatePhone( userId: number, updatePage: boolean, setUpdatePage: React.Dispatch<React.SetStateAction<boolean>>, config: object, updateUserData: boolean, setUpdateUserData: React.Dispatch<React.SetStateAction<boolean>>){
    const newPhone = prompt("Digite o novo telefone: ")

    if(newPhone){
        const updatePhone = async () => {
            setUpdateUserData(true)

            try{
                const sucess = await axios.put("https://siempre-tecnologia-backend-5obk.onrender.com/updateuserphone", {phone: newPhone, userId}, config)
                setUpdatePage(!updatePage)
                setUpdateUserData(false)
                console.log(sucess)
            }catch(error){
                console.log(error)
                setUpdateUserData(false)
            }
        }

        updatePhone()
    }
}

function updateCity( userId: number,  updatePage: boolean, setUpdatePage: React.Dispatch<React.SetStateAction<boolean>>, config: object, updateUserData: boolean, setUpdateUserData: React.Dispatch<React.SetStateAction<boolean>>){
    const newCity = prompt("Digite a nova cidade: ")

    if(newCity){
        const updateCity = async () => {
            setUpdateUserData(true)

            try{
                const sucess = await axios.put("https://siempre-tecnologia-backend-5obk.onrender.com/updateusercity", {city: newCity, userId}, config)
                setUpdatePage(!updatePage)
                setUpdateUserData(false)
                console.log(sucess)
            }catch(error){
                console.log(error)
                setUpdateUserData(false)
            }
        }

        updateCity()
    }
}

function updateAdress( userId: number,  updatePage: boolean, setUpdatePage: React.Dispatch<React.SetStateAction<boolean>>, config: object, updateUserData: boolean, setUpdateUserData: React.Dispatch<React.SetStateAction<boolean>>){
    const newAdress = prompt("Digite o novo endereço: ")

    if(newAdress){
        const updateAdress = async () => {
            setUpdateUserData(true)

            try{
                const sucess = await axios.put("https://siempre-tecnologia-backend-5obk.onrender.com/updateuseradress", {adress: newAdress, userId}, config)
                setUpdatePage(!updatePage)
                setUpdateUserData(false)
                console.log(sucess)
            }catch(error){
                console.log(error)
                setUpdateUserData(false)
            }
        }

        updateAdress()
    }
}

function updatePrice( userId: number,  updatePage: boolean, setUpdatePage: React.Dispatch<React.SetStateAction<boolean>>, config: object){
    const newPrice = prompt("Digite o novo preço: ")

    if(newPrice){
        const updatePrice = async () => {
        
            try{
                const sucess = await axios.put("https://siempre-tecnologia-backend-5obk.onrender.com/updateuserprice", {price: Number(newPrice)*100, userId}, config)
                setUpdatePage(!updatePage)
                console.log(sucess)
            }catch(error){
                console.log(error)
            }
        }

        updatePrice()
    }
}

function deleteAccount( userId: number, updatePage: boolean, setUpdatePage: React.Dispatch<React.SetStateAction<boolean>>, config: object, updateUserData: boolean, setUpdateUserData: React.Dispatch<React.SetStateAction<boolean>>){
    const confirmDelete = confirm("Tem certeza que deseja deletar essa conta?")

    if(confirmDelete){
        const deleteAccount = async () => {
            setUpdateUserData(true)

            try{
               const sucess = await axios.delete(`https://siempre-tecnologia-backend-5obk.onrender.com/deleteuser/${userId}`, config)
               setUpdatePage(!updatePage)
               setUpdateUserData(false)
               alert("Conta deletada com sucesso!")
           }catch(error){
            setUpdateUserData(false)
                alert("Não foi possível deletar essa conta! Tente mais tarde.")
                console.log(error)
           }
       }
   
        deleteAccount()
    }

}

export const user = {
    desactiveAccount,
    exitAccount,
    updateName,
    updatePhone,
    updateCity,
    updateAdress,
    updatePrice,
    deleteAccount
}

export function filterProducts(
    filterProductsByName: Users[],
    filterProductsByEmail: Users[], 
    filterProductsByCity: Users[],
    users: Users[] , 
    updatePage: boolean, 
    setUpdatePage: React.Dispatch<React.SetStateAction<boolean>>, 
    config: object,
    desactiveButton: boolean,
    setDesactiveButton: React.Dispatch<React.SetStateAction<boolean>>,
    updateUserData: boolean,
    setUpdateUserData: React.Dispatch<React.SetStateAction<boolean>>){
    if(filterProductsByName.length){
        return filterProductsByName.map((e, index) => (
            <tr key={index}>
                <td onClick={() => user.deleteAccount(e.id, updatePage, setUpdatePage, config, updateUserData, setUpdateUserData) }>{e.id}</td>
                <td onClick={() => user.updateName(e.id, updatePage, setUpdatePage, config, updateUserData, setUpdateUserData) }>{e.name}</td>
                <td>{e.email}</td>
                <td onClick={() => user.updatePhone(e.id, updatePage, setUpdatePage, config, updateUserData, setUpdateUserData) }>{e.phone}</td>
                <th onClick={() => user.updateCity(e.id, updatePage, setUpdatePage, config, updateUserData, setUpdateUserData) }>{e.city}</th>
                <th onClick={() => user.updateAdress(e.id, updatePage, setUpdatePage, config, updateUserData, setUpdateUserData) }>{e.adress}</th>
                <td>{ }</td>
                <td><button className={e.active === true ? "active" : "desactive"} disabled={desactiveButton} onClick={() => user.desactiveAccount(e, updatePage, setUpdatePage,setDesactiveButton, config)}>{e.active === true ? "Ativa" : "Desativada"}</button></td>
                <td onClick={() => user.updatePrice(e.id, updatePage, setUpdatePage, config) }> R$ {(e.price / 100).toFixed(2).replace(".", ",")}</td>
            </tr>
        )) 
    }
    else if(filterProductsByEmail.length){
        return filterProductsByEmail.map((e, index) => (
            <tr key={index}>
                <td onClick={() => user.deleteAccount(e.id, updatePage, setUpdatePage, config, updateUserData, setUpdateUserData) }>{e.id}</td>
                <td onClick={() => user.updateName(e.id, updatePage, setUpdatePage, config, updateUserData, setUpdateUserData) }>{e.name}</td>
                <td>{e.email}</td>
                <td onClick={() => user.updatePhone(e.id, updatePage, setUpdatePage, config, updateUserData, setUpdateUserData) }>{e.phone}</td>
                <th onClick={() => user.updateCity(e.id, updatePage, setUpdatePage, config, updateUserData, setUpdateUserData) }>{e.city}</th>
                <th onClick={() => user.updateAdress(e.id, updatePage, setUpdatePage, config, updateUserData, setUpdateUserData) }>{e.adress}</th>
                <td>{ }</td>
                <td><button className={e.active === true ? "active" : "desactive"} disabled={desactiveButton} onClick={() => user.desactiveAccount(e, updatePage, setUpdatePage,setDesactiveButton, config)}>{e.active === true ? "Ativa" : "Desativada"}</button></td>
                <td onClick={() => user.updatePrice(e.id, updatePage, setUpdatePage, config) }> R$ {(e.price / 100).toFixed(2).replace(".", ",")}</td>
            </tr>
        )) 
    }
    else if(filterProductsByCity.length){
        return filterProductsByCity.map((e, index) => (
            <tr key={index}>
                <td onClick={() => user.deleteAccount(e.id, updatePage, setUpdatePage, config, updateUserData, setUpdateUserData) }>{e.id}</td>
                <td onClick={() => user.updateName(e.id, updatePage, setUpdatePage, config, updateUserData, setUpdateUserData) }>{e.name}</td>
                <td>{e.email}</td>
                <td onClick={() => user.updatePhone(e.id, updatePage, setUpdatePage, config, updateUserData, setUpdateUserData) }>{e.phone}</td>
                <th onClick={() => user.updateCity(e.id, updatePage, setUpdatePage, config, updateUserData, setUpdateUserData) }>{e.city}</th>
                <th onClick={() => user.updateAdress(e.id, updatePage, setUpdatePage, config, updateUserData, setUpdateUserData) }>{e.adress}</th>
                <td>{ }</td>
                <td><button className={e.active === true ? "active" : "desactive"} disabled={desactiveButton} onClick={() => user.desactiveAccount(e, updatePage, setUpdatePage,setDesactiveButton, config)}>{e.active === true ? "Ativa" : "Desativada"}</button></td>
                <td onClick={() => user.updatePrice(e.id, updatePage, setUpdatePage, config) }> R$ {(e.price / 100).toFixed(2).replace(".", ",")}</td>
            </tr>
        )) 
    } 
    else {
        return users.map((e, index) => (
            <tr key={index}>
                <td>{e.id}</td>
                <td onClick={() => user.updateName(e.id, updatePage, setUpdatePage, config, updateUserData, setUpdateUserData) }>{e.name}</td>
                <td>{e.email}</td>
                <td>{e.phone}</td>
                <th>{e.city}</th>
                <th>{e.adress}</th>
                <td>{ }</td>
                <td><button className={e.active === true ? "active" : "desactive"} disabled={desactiveButton} onClick={() => user.desactiveAccount(e, updatePage, setUpdatePage,setDesactiveButton, config)}>{e.active === true ? "Ativa" : "Desativada"}</button></td>
                <td> R$ {(e.price / 100).toFixed(2).replace(".", ",")}</td>
            </tr>
        ))
    }
}