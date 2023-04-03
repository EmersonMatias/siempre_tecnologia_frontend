import { Change } from "../functions";
import { LayoutMonitorType } from "../layoutMonitor";
import Container from "./styles";

export default function LayoutProductsTable({ screen, setScreen }: LayoutMonitorType) {
    return (
        <Container>
            <h2>Layout dos produtos da tabela.</h2>
            <div className="numberLines">
                Número de linhas:
                <input type={"number"} onChange={(event) => Change.NumberLines(event, screen, setScreen)} value={screen.table_lines} min={0} />
            </div>
            <div className="spaceLines">
                Espaçamento entre Linhas:
                <input type={"number"} onChange={(event) => Change.SpaceLines(event, screen, setScreen)} value={screen.space_lines} min={0} />
            </div>
            <div className="spaceLines">
                Tamanho da Fonte:
                <input type={"number"} onChange={(event) => Change.Font_Size(event, screen, setScreen)} value={screen.font_size} min={1} />
            </div>
            <div className="">
               Tipo da Fonte:
                <select onChange={(event) => Change.Font_Family(event, screen, setScreen)}>
                    <option value="'Handlee', cursive">Handlee</option>
                    <option value="'Open Sans', sans-serif">Open Sans</option>
                    <option value="'Gloria Hallelujah', cursive">Gloria Hallelujah</option>
                    <option value="'Roboto', sans-serif">Roboto</option>
                    <option value="'Lilita One', cursive">Lilita One</option>
                </select>
            </div>

            <div>
                Negrito:
                <input type={"button"} value={screen.bold === true ? "Ativado" : "Desativado"} onClick={() => Change.Bold(screen, setScreen)} className={screen.bold === true ? "toogleButton active buttonStyle" : "toogleButton disabled buttonStyle"} />
            </div>
            <div>
                Itálico:
                <input type={"button"} value={screen.italic === true ? "Ativado" : "Desativado"} onClick={() => Change.Italic(screen, setScreen)} className={screen.italic === true ? "toogleButton active buttonStyle" : "toogleButton disabled buttonStyle"} />
            </div>
            <div className="color_lines">
                Cor das linhas aqui:
                <input onChange={(event) => Change.Color(event, screen, setScreen)} type={"color"} />
                <button onClick={() => Change.NoColor(screen, setScreen)}>Sem Cor</button>
            </div>
            <div>Largura da Tabela de Produtos:
                <input onChange={(event) => Change.WidthProductTable(event, screen, setScreen)} type={"number"} min={50} max={100} value={screen.width_table} />
            </div>
            <div className="color">
                Cor da letra:
                <input onChange={(event) => Change.ColorLetter(event, screen, setScreen)} type={"color"} />
            </div>

        </Container>
    )
}