import styled from "styled-components"

type Props = {
    top: number,
    left: number,
    settings: {
        settingVisible: boolean,
    }
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



    .close{
        position: absolute;
        width: 40px;
        top: 8px;
        right: 16px;
        cursor: pointer;
    }

    h1{
        font-size: 2rem;
        font-weight: bold;
        text-align: center;
        margin: 0.5rem 0;
    }

    .save{
        background-color: #f57474;
        color: #FFFFFF;
        font-size: 1.6rem;
        border: none;
        padding: 0.8rem;
        cursor: pointer;
    }

    .active{
        background-color: green;
    }

    .disabled{
        background-color: red;
    }
 
`

export default Container
