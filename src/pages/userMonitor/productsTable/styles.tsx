import styled from "styled-components";
import { Screen } from "../../../types/types";
import { ProductType2 } from "../settings/myProducts";

export type PropsProductsTable = {
    screen: Screen,
    Products: ProductType2[]
}

const Container = styled.div<PropsProductsTable>`
        width: ${props => (props.screen.show_banner === false && props.screen.show_counter === false) ? 100 : props.screen.width_table}vw;
        height: 100%;
        display: ${props => props.screen.show_productstable === true ? "flex" : "none"};
        background-image: url(${props => props.screen.background_url});
        background-repeat: no-repeat;
        background-size: cover;
        padding: 0 3rem;
        position: relative;
        font-family: ${props => props.screen.font_family};
    
        .imgLogo{
            height: ${props => props.screen.logo_height}%;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            opacity: ${props => props.screen.logo_opacity};
        }

        header{
            display: flex;
            justify-content: space-between;
            margin-top: 1.6rem;
            font-family: ${props => props.screen.font_family_title};
            font-size: 5vw;
            z-index: 520;
            color: ${props => props.screen.color_title};

            .products{
                display: flex;
                background-color: ${props => props.screen.background_color_title};
                width: 70%;
                justify-content: ${props => props.screen.product_position};
            }

            .prices{
                display: flex;
                background-color: ${props => props.screen.background_color_title};
                width: 30%;
                justify-content:  ${props => props.screen.price_position};
            }
        }

        .gradient{
            z-index: 200;
        }
        .table{
            display: flex;
            justify-content: space-between;
            margin-top: 2vh;
            width: 100%;
            height: 85%;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 8px;
            padding: 1.6rem;
            color: ${props => props.screen.color};

            .products{
                width: 100%;
                display: flex;
                flex-direction: column;
                overflow-wrap: break-word;
                font-size: ${props => props.screen.font_size}rem;

                .product{
                    display: flex;
                    position: relative;
                    justify-content: space-between;
                    align-items: center;
                    padding-right: 1rem;
                    margin-bottom: ${props => props.screen.space_lines}rem;
                    z-index: 500;
                    background-color: ${props => props.screen.color_lines};
                    font-weight: ${props => props.screen.bold === true ? "bold" : ""};
                    font-style:  ${props => props.screen.italic === true ? "italic" : "normal"};
                }

                .promotional{
                    background-color: aqua;

                    img{
                        height: 160px;
                        position: fixed;
                        right: 15%;
                    }
                }
            }
        }

     
`

export default Container