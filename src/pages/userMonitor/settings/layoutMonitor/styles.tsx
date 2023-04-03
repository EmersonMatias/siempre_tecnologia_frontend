import styled from "styled-components";
import { Screen } from "../../../../types/types";

type LayoutMonitorStyleType = {
    screen: Screen
}

const Container = styled.div<LayoutMonitorStyleType>`
    margin-top: 2rem;
    width: 100%;
    background-color: #dfdfdf ;
    padding: 10px 0;

    h2{
        text-align: center;
        font-size: 2rem;
        margin-bottom: 2rem;
    }

    div{
        padding: 0 0 0 10%;
        margin: 1rem 0;
    }

    .counter{
        background-color: ${props => props.screen.show_counter === true ? "green" : "red"};
    }

    .productsTable{
        background-color: ${props => props.screen.show_productstable === true ? "green" : "red"};
    }

    .banner{
        background-color: ${props => props.screen.show_banner === true ? "green" : "red"};
    }

    .toogleButton{
        border: none;
        font-size: 1rem;
        color: white;
        font-weight: bold;
        border-radius: 16px;
        margin-left: 1rem;
        padding: 0.5rem;
    }

    input{
        border-radius: 8px;
        font-size: 1rem;
        font-weight: bold;
        padding-left: 10px;
        margin-left: 1rem;
        margin-right: 1rem;
        width: 10%;
    }
`

export default Container