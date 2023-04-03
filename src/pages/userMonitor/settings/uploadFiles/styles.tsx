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

    .files{
        margin: 2rem 0;
        padding: 2rem;
        display: flex;
        flex-wrap: wrap;
        overflow-y: scroll;
        background-color: #ffffff;

        img, video {
            height: 200px;
            margin-left: 2rem;
            margin-bottom: 2rem;
            border-radius: 16px;
            background-color: rgb(255,255,255,1);
        }

        video{
            width: 300px;
        }
        
    }

`

export default Container