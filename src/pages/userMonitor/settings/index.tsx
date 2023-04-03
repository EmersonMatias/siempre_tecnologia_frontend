import { useState } from "react";
import styled from "styled-components"
import Close from "../../../img/iconClose.svg"
import { ProductScreen, Screen } from "../../../types/types";
import MyProducts, { ProductType2 } from "./myProducts";
import RegisterProducts from "../../userScreen/RegisterProducts";
import UploadFiles from "./uploadFiles";
import { Change, UpdateScreen } from "./functions";
import ProductsSelected from "./productsSelected/index.js";
import Container from "./styles";
import LayoutMonitor from "./layoutMonitor";
import LayoutTitleTable from "./layoutTitleTable";
import LayoutProductsTable from "./layoutProductsTable";
import ScreenLogo from "./screenLogo";

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
    monitorProducts: ProductScreen[]
}

export default function Settings({ settings, setSettings, screen, setScreen, myProducts, ProductsId, monitorProducts }: PropsProductsTable) {
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
        <Container draggable="true" onDragEnd={(event) => handleDragEnd(event)} top={a.y} left={a.x} settings={settings} >
            <h1>Configurações</h1>

            <div className="close" onClick={() => setSettings({ ...settings, settingVisible: false })}>
                <img src={Close} />
            </div>

            <LayoutMonitor screen={screen} setScreen={setScreen} />

            <LayoutTitleTable screen={screen} setScreen={setScreen} />

            <LayoutProductsTable screen={screen} setScreen={setScreen} />


            <div>
                <button className="save" onClick={() => UpdateScreen(screen)}>Salvar</button>
            </div>

            <UploadFiles screen_id={screen.id} />

            <RegisterProducts />

            <MyProducts myProducts={myProducts} screen_id={screen.id} ProductsId={ProductsId} settings={settings} setSettings={setSettings} />

            <ProductsSelected monitorProducts={monitorProducts} />

            <ScreenLogo screen_id={screen.id}/>

        </Container>
    )
}

