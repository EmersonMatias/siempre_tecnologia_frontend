import axios from "axios"
import { BASE_URL } from "../../../../constants/constants"
import { ProductScreen } from "../../../../types/types"
import { ProductType2 } from "../myProducts"

export async function getPromotionalProducts(monitorId: number, config: object, setPromotionalProducts: React.Dispatch<any>) {

    try {
        const sucess = await axios.get(`${BASE_URL}/promotionalproducts/${monitorId}`, config)
        setPromotionalProducts(sucess.data.map((product: any) => product?.product_id))
    } catch (error) {
        console.log(error)
    }
}

export async function putPromotionalLine(product: ProductType2, monitorId: number, config: object, setUpdateSection: React.Dispatch<React.SetStateAction<boolean>>, updateSection: boolean) {
    try {
        const sucess = await axios.post(`${BASE_URL}/promotionalproducts`, { product_id: product?.id, monitorId }, config)
        setUpdateSection(!updateSection)
        console.log(sucess)
    } catch (error) {
        console.log(error)
    }

}

export function filteredProducts(filterProducts: ProductScreen[], monitorId: number, config: object, setUpdateSection: React.Dispatch<React.SetStateAction<boolean>>, updateSection: boolean, promotionalProducts: any, monitorProducts: ProductScreen[]) {

    function defaultProducts(index: number, product: ProductScreen) {
        return <tr key={index} onClick={() => putPromotionalLine(product.products, Number(monitorId), config, setUpdateSection, updateSection)} className={promotionalProducts.includes(product.products.id) ? "selected" : ""} >
            <td>{product.products.code}</td>
            <td>{product.products.product}</td>
            <td>{product.products.type}</td>
            <td>R$ {(Number(product.products.price) / 100).toFixed(2).replace(".", ",")}</td>
        </tr>
    }

    return filterProducts?.length ?
        filterProducts?.map((product, index) => (
            defaultProducts(index, product))
        ) :
        monitorProducts?.map((product, index) => (
            defaultProducts(index, product))
        )
}