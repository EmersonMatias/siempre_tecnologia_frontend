import styled from "styled-components"

const Container = styled.div`
    width: 100%;
    height: 100%;
    font-size: 2rem;
    overflow-wrap: break-word;
    overflow-x: hidden;
    font-family: 'Roboto', sans-serif;
    display: flex;
    flex-direction: column;

    header{
        position: relative;
        width: 100%;
        height: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        font-weight: 600;
        background-color: red;
    }
    
`

export default Container