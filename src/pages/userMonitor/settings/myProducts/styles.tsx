import styled from "styled-components";

const Container = styled.div`
    padding: 2.4rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 5rem;

    p{
      margin-top: 0.8rem;
      margin-left: 0.8rem;
    }


    .myProductsContainer{
        width: 100%;
        height: 100%;
        font-size: 1.4rem;
        overflow-y: scroll;
        height: 400px;
    }

    h1{
        font-size: 2.4rem;
        font-weight: bold;
        text-align: center;
        margin-bottom: 1rem;
    }
   
    .back{
        background-color: rgb(223,41,41, 0.6);
        color: rgb(255,255,255,1);
    }
    
    table{
        width: 100%;
        table-layout: fixed;
        word-wrap:break-word;
        text-align: center;
    }


    .myProductsContainer::-webkit-scrollbar {
        width: 10px;     
    }

    .myProductsContainer::-webkit-scrollbar-thumb {
        background: #000000;
        border-radius: 8px;     
    }

 
`

export default Container