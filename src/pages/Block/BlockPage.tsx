import styled from "styled-components";


export default function BlockPage(){
    return(
        <Container>
            <p>Sua conta está desativada. Por favor, entre em contato com o administrador.</p>
    
        </Container>
    )
}



const Container = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    right: 0;
    background-color: #f3f3f3;
    z-index: 500;
    display: flex;
    align-items: center;

    p{
        font-size: 5rem;
        font-weight: bold;
        color: #fa4545;
        text-align: center;
    }
`