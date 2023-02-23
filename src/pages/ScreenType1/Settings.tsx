import { useState } from "react";
import styled from "styled-components"
import Close from "../../img/iconClose.svg"


type PropsProductsTable = {
    settings: {
        showCounter: boolean,
        showProductsTable: boolean,
        showBanner: boolean,
        settingVisible: boolean
        tableLines: number,
        spaceLines: number,
        fontSize: number
    }
    setSettings: React.Dispatch<React.SetStateAction<{
        showCounter: boolean;
        showProductsTable: boolean;
        showBanner: boolean;
        settingVisible: boolean;
        tableLines: number;
        spaceLines: number;
        fontSize: number;
    }>>
}

export default function Settings({ settings, setSettings }: PropsProductsTable) {
    const [a, setA] = useState({ x: 0, y: 0 })

    console.log(settings.tableLines)

    function handleDragEnd(event: any) {
        const element = event.target;
        const container = element.parentElement;
        const elementRect = element.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const x = event.pageX - containerRect.left - elementRect.width / 2;
        const y = event.pageY - containerRect.top - elementRect.height / 2;
        setA({ x, y });
    }

    return (
        <Container draggable="true" onDragEnd={(event) => handleDragEnd(event)} top={a.y} left={a.x} settings={settings} >
            <h1>Configurações</h1>
            <div className="close" onClick={() => setSettings({ ...settings, settingVisible: false })}>
                <img src={Close} />
            </div>
            <div className="configLayoutContainer">
                <div>Exibir Contador <button className="counter" onClick={() => setSettings({ ...settings, showCounter: !settings.showCounter })}>
                    {settings.showCounter === true ? "Ativado" : "Desativado"}
                </button></div>
                <div>Exibir Tabela de Produtos <button className="productsTable" onClick={() => setSettings({ ...settings, showProductsTable: !settings.showProductsTable })}>
                    {settings.showProductsTable === true ? "Ativado" : "Desativado"}
                </button></div>
                <div>Exibir Banner <button className="banner" onClick={() => setSettings({ ...settings, showBanner: !settings.showBanner })}>
                    {settings.showBanner === true ? "Ativado" : "Desativado"}
                </button></div>
            </div>
            <div className="configProductsTable">
                <div className="numberLines">Número de linhas: <input type={"number"} onChange={(e) => setSettings({ ...settings, tableLines: Number(e.target.value) })} value={settings.tableLines} min={0} /></div>
                <div className="spaceLines">Espaçamento entre Linhas: <input type={"number"} onChange={(e) => setSettings({ ...settings, spaceLines: Number(e.target.value) })} value={settings.spaceLines} min={0} /></div>
                <div className="spaceLines">Tamanho da Fonte: <input type={"number"} onChange={(e) => setSettings({ ...settings, fontSize: Number(e.target.value) })} value={settings.fontSize} min={1} /></div>
            </div>
        </Container>
    )
}

type Props = {
    top: number,
    left: number,
    settings: {
        showCounter: boolean,
        showProductsTable: boolean,
        showBanner: boolean,
        settingVisible: boolean,
        tableLines: number,
        spaceLines: number
    }
}

const Container = styled.div<Props>`
    width: 30%;
    height: 50vh;
    background-color: white;
    top: ${props => props.top}px;
    left: ${props => props.left}px;
    position: absolute;
    border-radius: 16px;
    z-index: 5000;
    color: #000000;
    display: ${props => props.settings.settingVisible === true ? "flex" : "none"};
    flex-direction: column;
    align-items: center;
    font-size: 1.4rem;
    font-weight: bold;

    input{
        border-radius: 8px;
        font-size: 1rem;
        font-weight: bold;
        width: 50px;
        padding-left: 10px;

    }

    .close{
        position: absolute;
        width: 40px;
        top: 8px;
        right: 16px;
        cursor: pointer;
    }

    h1{
        font-size: 1.6rem;
        font-weight: bold;
        text-align: center;
        margin: 0.5rem 0;
    }

    .configLayoutContainer, .configProductsTable{
        margin-top: 2rem;
        width: 80%;
    }

    .numberLines, .spaceLines{
        margin-bottom: 1rem;
    }



    .counter, .productsTable, .banner{
        border: none;
        font-size: 1rem;
        color: white;
        font-weight: bold;
        border-radius: 16px;
        margin-left: 1rem;
        padding: 0.5rem;
    }

    .productsTable{
        background-color: ${props => props.settings.showProductsTable === true ? "green" : "red"};
    }

    .counter{
        background-color: ${props => props.settings.showCounter === true ? "green" : "red"};
    }

    .banner{
        background-color: ${props => props.settings.showBanner === true ? "green" : "red"};
    }
`

