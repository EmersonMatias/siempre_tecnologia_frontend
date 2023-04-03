import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import Exit from "../../components/exit"
import MyContext from "../../context/context"
import BlockPage from "../Block/BlockPage"
import { getProducts } from "./functionsUser"
import { ProductType2 } from "../userMonitor/settings/myProducts"
import Monitors from "./monitors"

import Container from "./styles"

export type ProductType = {
    code: number,
    type: string,
    product: string,
    price: number,
    user_id: number
}

export default function UserScreen() {
    const { userData, setUserData, config } = useContext(MyContext)
    const [updatePage, setUpdatePage] = useState<boolean>(false)
    const navigate = useNavigate()
    const active = localStorage.getItem("active")
    const [myProducts, setMyProducts] = useState<ProductType2[]>([])

    useEffect(() => {
        if (userData?.account_type === "admin") return navigate("/")
        if (userData.token === "") return navigate("/")

        getProducts(setMyProducts)
    }, [updatePage])


    console.log(config, "AAABB")

    return (
        <Container >

            <Exit setUserData={setUserData} updatePage={updatePage} setUpdatePage={setUpdatePage} />
            {active === "true" ? null : <BlockPage />}
            <Monitors updatePage={updatePage} setUpdatePage={setUpdatePage} />
        </Container>
    )
}

