import { useState } from "react";
import styled from "styled-components"
import Close from "../../img/iconClose.svg"
import { Screen } from "../../types/types";
import MyProducts, { ProductType2 } from "../User/MyProducts";
import UploadFiles from "../User/UploadFiles";
import { Change } from "./functionsSettings";



type PropsProductsTable = {
    settings: {
        settingVisible: boolean,
        update: boolean
    }
    setSettings: React.Dispatch<React.SetStateAction<{
        settingVisible: boolean;
        update: boolean
    }>>
    screen: Screen
    setScreen: React.Dispatch<React.SetStateAction<Screen>>
    myProducts: ProductType2[]
    ProductsId: Array<Number>
}

export default function Settings({ settings, setSettings, screen, setScreen, myProducts, ProductsId }: PropsProductsTable) {
    const [a, setA] = useState({ x: 0, y: 0 })

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
        <Container draggable="true" onDragEnd={(event) => handleDragEnd(event)} top={a.y} left={a.x} settings={settings} screen={screen}>
            <h1>Configurações</h1>

            <div className="close" onClick={() => setSettings({ ...settings, settingVisible: false })}>
                <img src={Close} />
            </div>

            <div className="configLayoutContainer">
                <div>
                    Exibir Contador:
                    <button className="counter" onClick={() => Change.ShowCounter(screen, setScreen)}>
                        {screen.show_counter === true ? "Ativado" : "Desativado"}
                    </button>
                </div>
                <div>
                    Exibir Tabela de Produtos: 
                    <button className="productsTable" onClick={() => Change.ShowProductTable(screen, setScreen)}>
                        {screen.show_productstable === true ? "Ativado" : "Desativado"}
                    </button>
                </div>
                <div>
                    Exibir Banner:
                    <button className="banner" onClick={() => Change.ShowBanner(screen, setScreen)}>
                        {screen.show_banner === true ? "Ativado" : "Desativado"}
                    </button>
                </div>
                <div>
                    Tempo entre banners:
                    <input type={"number"} min={1} onChange={(event) => {Change.BannerTime(event, screen, setScreen)}} value={screen.banner_time/1000}/>

                </div>
            </div>

            <div className="configTitleTable">
                <div>
                    Posição de Produtos: 
                    <button onClick={() => Change.PositionProductLeft(screen, setScreen)}>Esquerda</button>
                    <button onClick={() => Change.PositionProductCenter(screen, setScreen)}>Centralizado</button> 
                    <button onClick={() => Change.PositionProductRight(screen, setScreen)}>Direita</button>
                </div>
                <div>
                    Posição de Preços: 
                    <button onClick={() => Change.PositionPriceLeft(screen, setScreen)}>Esquerda</button> 
                    <button onClick={() => Change.PositionPriceCenter(screen, setScreen)}>Centralizado</button> 
                    <button onClick={() => Change.PositionPriceRight(screen, setScreen)}>Direita</button>
                </div>
                <div className="color_lines">
                    Cor das linhas:
                    <input onChange={(event) => Change.BackgroundColorTitle(event, screen, setScreen) } type={"color"}  />
                    <button onClick={() => Change.BackgroundColorTitleNone(screen, setScreen)}>Sem Cor</button>
                </div>
                <select onChange={(event) => Change.FontFamilyTitle(event, screen, setScreen)}>
                    <option value="'Handlee', cursive">Handlee</option>
                    <option value="'Open Sans', sans-serif">Open Sans</option>
                    <option value="'Gloria Hallelujah', cursive">Gloria Hallelujah</option>
                    <option value="'Roboto', sans-serif">Roboto</option>
                    <option value="'Lilita One', cursive">Lilita One</option>
                </select>
                <div className="color">
                    Cor da letra:
                    <input onChange={(event) => Change.ColorTitle(event, screen, setScreen) } type={"color"}  />
                </div>
            </div>

            <div className="configProductsTable">
                <div className="numberLines">
                    Número de linhas: 
                    <input type={"number"} onChange={(event) => Change.NumberLines(event, screen, setScreen) } value={screen.table_lines} min={0} />
                </div>
                <div className="spaceLines">
                    Espaçamento entre Linhas: 
                    <input type={"number"} onChange={(event) => Change.SpaceLines(event, screen, setScreen )} value={screen.space_lines} min={0} />
                </div>
                <div className="spaceLines">
                    Tamanho da Fonte:
                    <input type={"number"} onChange={(event) => Change.Font_Size(event, screen, setScreen)} value={screen.font_size} min={1} />
                </div>
                <select onChange={(event) => Change.Font_Family(event, screen, setScreen)}>
                    <option value="'Handlee', cursive">Handlee</option>
                    <option value="'Open Sans', sans-serif">Open Sans</option>
                    <option value="'Gloria Hallelujah', cursive">Gloria Hallelujah</option>
                    <option value="'Roboto', sans-serif">Roboto</option>
                    <option value="'Lilita One', cursive">Lilita One</option>
                </select>
                <div className="color_lines">
                    Cor das linhas:
                    <input onChange={(event) => Change.Color(event, screen, setScreen) } type={"color"}  />
                    <button onClick={(event) => Change.NoColor(event, screen, setScreen)}>Sem Cor</button>
                </div>
                <div>Largura da Tabela de Produtos:
                    <input onChange={(event) =>Change.WidthProductTable(event, screen, setScreen)} type={"number"} min={50} max={100} value={screen.width_table} />
                </div>
                <div className="color">
                    Cor da letra:
                    <input onChange={(event) => Change.ColorLetter(event, screen, setScreen) } type={"color"}  />
                </div>
            </div>

            <UploadFiles screen_id={screen.id} />

            <MyProducts myProducts={myProducts} screen_id={screen.id} ProductsId={ProductsId} settings={settings} setSettings={setSettings}/>

        </Container>
    )
}

type Props = {
    top: number,
    left: number,
    settings: {
        settingVisible: boolean,
    },
    screen: Screen
}

const Container = styled.div<Props>`
    width: 50%;
    height: 60vh;
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
    overflow-y: scroll;
    font-family: Arial, Helvetica, sans-serif;

    .color_line_input{
        background-color: #FFFFFF;
        margin-left: 1rem;
        cursor: pointer;
    }

    input{
        border-radius: 8px;
        font-size: 1rem;
        font-weight: bold;
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

    .configLayoutContainer, .configProductsTable, .configTitleTable{
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
        background-color: ${props => props.screen.show_productstable === true ? "green" : "red"};
    }

    .counter{
        background-color: ${props => props.screen.show_counter === true ? "green" : "red"};
    }

    .banner{
        background-color: ${props => props.screen.show_banner === true ? "green" : "red"};
    }
`

