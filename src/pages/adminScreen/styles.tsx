import styled from "styled-components"

type AdminProps = {
    updateUserData: boolean
}

export const Container = styled.div<AdminProps>`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1.6rem;
    font-family: 'Roboto', sans-serif;
    overflow-x: hidden;
    padding: 2rem 0;

    .search{
        width: 40%;
        margin-top: 1rem;
        border: 3px solid black;
        border-radius: 8px;
        font-size: 1.6rem;
        padding: 4px 0  4px 16px;
    }

    .loading{
        width: 50%;
        display: ${props => props.updateUserData === true ? "flex" : "none"};
    }

    .newUser{
        width: 20%;
        height: 60px;
        font-size: 1.6rem;
        font-weight: bold;
        cursor: pointer;
        border-radius: 8px;
        margin-top: 2rem;
        background-color: #0A66C2;
        color: #FFFFFF;
        border: none;
    }

    header{
        width: 100%;
        height: 4rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    h1{
        font-size: 2rem;
        font-weight: 600;
    }

    .tableContent{
        width: 90%;
        display: flex;
        flex-direction: column;
        align-items: center;
      
    }

    table{
        width: 100%;
        margin-top: 2vw;
        margin-bottom: 2rem;
        word-wrap:break-word;
        text-align: center;
        visibility: ${props => props.updateUserData === true ? "collapse" : ""};
    }

    td{
        padding: 8px;
    }

    .active{
        color: white;
        background-color: green;
        border-radius: 8px;
        border: none;
    }

    .desactive{
        color: white;
        background-color: red;
        border-radius: 8px;
        border: none;
    }

    button{
        width: 90%;
        height: 40px;
        font-size: 1.2rem;
        font-weight: bold;
        cursor: pointer;
    }

    button:disabled{
        color: grey;
    }
`
export default Container