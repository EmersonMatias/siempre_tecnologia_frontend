import styled from "styled-components";


const Container = styled.div`
    margin-top: 2rem;
    width: 100%;
    padding: 10px 0;
    background-color: #dfdfdf ;

    .numberLines, .spaceLines{
        margin-bottom: 1rem;
    }

    div{
        padding: 0 0 0 10%;
        margin: 1rem 0;
    }

    h2{
        text-align: center;
        font-size: 2rem;
        margin-bottom: 2rem;
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

    .buttonStyle{
        padding: 10px 0;
        border: none;
        width: 20%;
    }
`

export default Container