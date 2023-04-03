import styled from "styled-components"
import { exitAccount } from "../../pages/userScreen/functionsUser"
import { UserDataGet } from "../../types/types"

type ExitType = {
    setUserData: React.Dispatch<React.SetStateAction<UserDataGet>>,
    updatePage: boolean,
    setUpdatePage: React.Dispatch<React.SetStateAction<boolean>>,
}

export default function Exit({ setUserData, setUpdatePage, updatePage }: ExitType) {
    return (
        <Container onClick={() => exitAccount(setUserData, setUpdatePage, updatePage)}>
            Sair
        </Container>
    )
}

const Container = styled.div`
    position: absolute;
    top: 8px;
    right: 50px;
    font-size: 1.6rem;
    font-weight: bold;
    color: rgb(0,0,0,0.5);
    z-index: 50000;

    &:hover{
        color: red;
    }

`