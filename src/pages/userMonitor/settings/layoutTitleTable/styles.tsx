import styled from "styled-components";



const Container = styled.div`
    margin-top: 2rem;
    width: 100%;    

    h2{
        text-align: center;
        font-size: 2rem;
        margin-bottom: 2rem;
    }

    .color_line_input{
        background-color: #FFFFFF;
        margin-left: 1rem;
        cursor: pointer;
    }

    button{
        margin-left: 0.5rem;
        padding: 10px 0;
        border: none;
        width: 20%;
        border-radius: 8px;
        font-size: 1rem;
        font-weight: bold;
    }

    select{
        margin-left: 1rem;
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

    div{
        padding: 0 0 0 10%;
        margin: 1rem 0;
    }

`

export default Container