import styled from "styled-components";


const Container = styled.div`
   width: 100%;
    padding: 2rem;
    background-color: rgb(0,0,0,0.03);

    .sendFile{
        width: 200px;
        height: 40px;
        font-size: 1.4rem;
        font-weight: bold;
        border-radius: 8px;
        background-color: #f33535;
        border: none;
        color: #ffffff;
        margin-top: 2rem;
        cursor: pointer;

        &:disabled{
            background-color: #f0d1d1;
        }
    }
    
    form{
        margin-bottom: 3rem;
    }

    h1{
        font-size: 2.4rem;
        font-weight: bold;
        margin-bottom: 1rem;
    }

    input{
        width: 100%;
        font-size: 1.4rem;
        margin: 1rem 0;
    }

    .logoContainer{
        width: 100%;
        display: flex;
        justify-content: center;
        
        img{
            width: 50%;
        }
    }

`

export default Container