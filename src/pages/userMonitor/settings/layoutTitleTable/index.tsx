import { Change } from "../functions";
import { LayoutMonitorType } from "../layoutMonitor";
import Container from "./styles";

export default function LayoutTitleTable({ screen, setScreen }: LayoutMonitorType) {
    return (
        <Container>
            <h2>Layout do Título da Tabela</h2>
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
                <input onChange={(event) => Change.BackgroundColorTitle(event, screen, setScreen)} type={"color"} />
                <button onClick={() => Change.BackgroundColorTitleNone(screen, setScreen)}>Sem Cor</button>
            </div>
            <div>
                Tipo da Fonte
                <select onChange={(event) => Change.FontFamilyTitle(event, screen, setScreen)}>
                    <option value="'Handlee', cursive">Handlee</option>
                    <option value="'Open Sans', sans-serif">Open Sans</option>
                    <option value="'Gloria Hallelujah', cursive">Gloria Hallelujah</option>
                    <option value="'Roboto', sans-serif">Roboto</option>
                    <option value="'Lilita One', cursive">Lilita One</option>
                </select>
            </div>

            <div className="color">
                Cor da letra:
                <input onChange={(event) => Change.ColorTitle(event, screen, setScreen)} type={"color"} />
            </div>
        </Container>
    )
}