import axios from "axios"
import { useState } from "react"
import styled from "styled-components"
import { ProductType } from "./UserScreen"

export type TypeFile = "mgv" | "filzola"


export default function RegisterProducts() {
    const [filePath, setFilePath] = useState(localStorage.getItem("path"));
    const [typeFile, setTypeFile] = useState<TypeFile>("mgv")
    const [fileContent, setFileContent] = useState("")
    const productsList: ProductType[] = []
    const [disabled, setDisabled] = useState(false)
    const token = localStorage.getItem("token")
    const id = localStorage.getItem("id")
    const config = { headers: { Authorization: `Bearer ${token}` } }
    console.log(filePath)
    console.log(config)

    function handleArquivoSelecionado(event: any) {
        const arquivoSelecionado = event.target.files[0];
        const arquivoSelecionadoPath:string = event.target.files[0].path
        localStorage.setItem("path", arquivoSelecionadoPath)
        setFilePath(arquivoSelecionadoPath)
        const reader = new FileReader();

        reader.onload = (evento: any) => {
            const conteudo = evento.target.result;
            setFileContent(conteudo)
        };

        reader.readAsText(arquivoSelecionado);
    }

    async function sendProducts(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        try {
            setDisabled(true)
            const sucess = await axios.post("https://siempre-tecnologia-backend-5obk.onrender.com/products", productsList, config)
            setDisabled(false)
            console.log(sucess)
        } catch (error) {
            setDisabled(false)
            console.log(error)
        }
    }

    function chooseTypeFile() {
        if (typeFile === "filzola") {
            let init = 0
            let end = 39
            for (let i = 0; i < fileContent.length / 41; i++) {

                const repartindo = fileContent.slice(init, end).replace("\r\n", "")
                productsList.push({ code: Number(repartindo.slice(0, 6)), type: repartindo[6], product: repartindo.slice(7, 29), price: Number(repartindo.slice(29, 36)), user_id: Number(id) })
                init = end
                end = end + 41
            }
        } else if (typeFile === "mgv") {
            let init = 0;
            let end = 146
            for (let i = 0; i < fileContent.length / 148; i++) {

                const repartindo = fileContent.slice(init, end).replace("\r\n", "")
                productsList.push({ code: Number(repartindo.slice(3, 9)), type: repartindo[2], product: repartindo.slice(18, 43), price: Number(repartindo.slice(9, 15)), user_id: Number(id) })
                init = end
                end = end + 148
            }
        }
    }
    chooseTypeFile()

    return (
        <Container typeFile={typeFile}>
            <div className="configProductsContainer">
                <div className="typeFileContainer">
                    <button className="mgv" onClick={() => typeFile !== "mgv" ? setTypeFile("mgv") : ""}>Itens MGV</button>
                    <button className="filzola" onClick={() => typeFile !== "filzola" ? setTypeFile("filzola") : ""}>FIlzola</button>
                    <form onSubmit={sendProducts}>
                        <input type="file" accept="text/plain" onChange={(event) => handleArquivoSelecionado(event)} disabled={productsList.length ? true : false} />
                        <button className="sendProduct" disabled={disabled}>Enviar Produtos</button>
                    </form>
                    <div>Arquivo observado: {filePath}</div>
                </div>

                <div className="contentContainer">
                    <table>
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Produto</th>
                                <th>Und</th>
                                <th>Preço</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productsList.map((product, index) => (
                                <tr key={index}>
                                    <td>{product.code}</td>
                                    <td>{product.product}</td>
                                    <td>{product.type}</td>
                                    <td>R$ {(Number(product.price) / 100).toFixed(2).replace(".", ",")}</td>
                                </tr>))}
                        </tbody>

                    </table>
                </div>

            </div>
        </Container>
    )
}

type PropsTypeFile = {
    typeFile: TypeFile
}

const Container = styled.div<PropsTypeFile>`
    background-color: rgb(0,0,0, 0.03);
    padding: 2rem;
    width: 100%;
    margin-bottom: 5rem;
    display: flex;


    input{
        width: 100%;
        font-size: 1.4rem;
        margin: 1rem 0;
    }
    .typeFileContainer{
        width: 50%;
        margin-bottom: 2rem;
    }

    .contentContainer{
        width: 50%;
        height: 400px;
        overflow-y: scroll;
    }

    .filzola, .mgv{
        width: 140px;
        height: 40px;
        font-size: 1.4rem;
        font-weight: bold;
        border-radius: 8px;
        border: none;
        margin-right: 16px;
        color: #ffffff;
    }

    .filzola{
        background-color: ${props => props.typeFile === "filzola" ? "#23cc23" : "#c0bcbf"};
    }

    .mgv{
        background-color: ${props => props.typeFile === "mgv" ? "#23cc23" : "#c0bcbf"};
    }

   

    .contentContainer::-webkit-scrollbar {
        width: 10px;     
    }

    .contentContainer::-webkit-scrollbar-thumb {
        background: #000000;
        border-radius: 8px;     
    }

    table{
        width: 100%;
        table-layout: fixed;
        word-wrap:break-word;
        text-align: center;
    }

    .sendProduct{
        width: 200px;
        height: 40px;
        font-size: 1.4rem;
        font-weight: bold;
        border-radius: 8px;
        background-color: #f33535;
        border: none;
        color: #ffffff;
        margin-top: 2rem;

        &:disabled{
            background-color: #f0d1d1;
        }
    }

`