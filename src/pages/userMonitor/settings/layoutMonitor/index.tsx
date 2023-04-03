import { Screen } from "../../../../types/types"
import { Change } from "../functions"
import Container from "./styles"

export type LayoutMonitorType = {
    screen: Screen,
    setScreen: React.Dispatch<React.SetStateAction<Screen>>
}

export default function LayoutMonitor({ screen, setScreen }: LayoutMonitorType) {
    return (
        <Container screen={screen}>
            <h2>Layout Monitor</h2>
            <div>
                Exibir Contador:
                <button className="counter toogleButton" onClick={() => Change.ShowCounter(screen, setScreen)}>
                    {screen.show_counter === true ? "Ativado" : "Desativado"}
                </button>
            </div>
            <div>
                Exibir Tabela de Produtos:
                <button className="productsTable toogleButton" onClick={() => Change.ShowProductTable(screen, setScreen)}>
                    {screen.show_productstable === true ? "Ativado" : "Desativado"}
                </button>
            </div>
            <div>
                Exibir Banner:
                <button className="banner toogleButton" onClick={() => Change.ShowBanner(screen, setScreen)}>
                    {screen.show_banner === true ? "Ativado" : "Desativado"}
                </button>
            </div>
            <div>
                Tempo entre banners:
                <input type={"number"} min={1} onChange={(event) => { Change.BannerTime(event, screen, setScreen) }} value={screen.banner_time / 1000} />

            </div>
        </Container>

    )
}