import styled from "styled-components"
import RegisterProducts from "../userScreen/RegisterProducts"

export default function AppDesktop() {
    return (
        <Container>
            <RegisterProducts />
        </Container>
    )
}


const Container = styled.div`
    width: 100%;
    height: 100vh;
    background-color: aliceblue;

`