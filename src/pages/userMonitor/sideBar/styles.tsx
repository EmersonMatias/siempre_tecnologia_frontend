import styled from "styled-components";
import { Screen } from "../../../types/types";

export type PropsSideBar = {
    password: number,
    screen: Screen
}

const Container = styled.div<PropsSideBar>`
        width: ${props => props.screen.show_productstable === false ? 100 : 100 - props.screen.width_table}vw;
        height: 100%;
        display: ${props => (props.screen.show_banner === false && props.screen.show_counter === false) ? "none" : "flex"};
        flex-direction: column;

        .banner{
            width: ${props => props.screen.show_productstable === false ? 100 : 100 - props.screen.width_table}vw;
            height: ${props => (props.screen.show_productstable === false && props.screen.show_counter === false) || props.screen.show_counter === false ? "100vh" : "50vh"};
            background-color: #000000;
            display: ${props => props.screen.show_banner === true ? "flex" : "none"};
            flex-direction: column;
            align-items: flex-end;
            
            video{
                width: ${props => props.screen.show_productstable === false ? 100 : 100 - props.screen.width_table}vw;
                height: ${props => (props.screen.show_productstable === false && props.screen.show_counter === false) || props.screen.show_counter === false ? "100vh" : "50vh"};
                object-fit: contain;
                position: absolute;

            }
            img{
                width: ${props => props.screen.show_productstable === false ? 100 : 100 - props.screen.width_table}vw;
                height: ${props => (props.screen.show_productstable === false && props.screen.show_counter === false) || props.screen.show_counter === false ? "100vh" : "50vh"};
                object-fit: contain;
                position: absolute;
            }
        }

        .password{
            width: 100%;
            height: ${props => (props.screen.show_productstable === false && props.screen.show_counter === false) || props.screen.show_banner === false ? "100vh" : "50vh"};
            background-color: black;
            display: ${props => props.screen.show_counter === true ? "flex" : "none"};
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-size: 4vw;
            z-index: 2;
            .passwordNumber{
                font-family: 'Digital Numbers', sans-serif;
                font-size: 11vw;
                color: red;
                margin-top: 3rem;
            }
        }
`

export default Container