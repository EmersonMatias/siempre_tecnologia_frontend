import axios from "axios"
import { ProductType2 } from ".";
import { BASE_URL } from "../../../../constants/constants"
import { ProductType } from "../../../userScreen"

export async function selectMonitorProduct(product: ProductType, screen_id: number, config: object, setSettings: React.Dispatch<React.SetStateAction<{
    settingVisible: boolean;
    update: boolean
}>>, settings: {
    settingVisible: boolean,
    update: boolean
}) {

    try {
        const sucess = await axios.post(`${BASE_URL}/productsscreen/${screen_id}`, product, config)
        console.log(sucess)
        setSettings({ ...settings, update: !settings.update })
    } catch (error) {
        console.log(error)
    }
}

export function filteredProducts(filterProducts: ProductType2[], screen_id: number, config: object, setSettings: React.Dispatch<React.SetStateAction<{
    settingVisible: boolean;
    update: boolean
}>>, settings: {
    settingVisible: boolean,
    update: boolean
}, myProducts: ProductType2[], ProductsId: Number[]) {

    function defaultProducts(index: number, product: ProductType2) {
        return <tr key={index} onClick={() => selectMonitorProduct(product, screen_id, config, setSettings, settings)} className={`${ProductsId?.includes(product.id) ? "back" : ""}`}>
            <td>{product.code}</td>
            <td>{product.product}</td>
            <td>{product.type}</td>
            <td>R$ {(Number(product.price) / 100).toFixed(2).replace(".", ",")}</td>
        </tr>
    }

    return filterProducts?.length ?
        filterProducts?.map((product, index) => (defaultProducts(index, product))) :
        myProducts?.map((product, index) => (defaultProducts(index, product)))
}