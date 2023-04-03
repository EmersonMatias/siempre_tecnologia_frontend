import styled from "styled-components"

type Styles = {
    showCreateUser: boolean,
    isLoading: boolean
}

const Container = styled.div<Styles>`
    width: 50%;
    background-color: #fafafa;
    position: fixed;
    top: 10%;
    border-radius: 16px;
    box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
    display: ${props => props.showCreateUser === true ? "flex" : "none"};
 
    .loadingContainer{
        width: 100%;
        height: 100%;
        border-radius: 16px;
        display: ${props => props.isLoading === true ? "flex" : "none"};
        align-items: center;
        justify-content: center;
       

        .loadingNewUser{
            width: 65%;
        }
    }
    
    form{
        display: ${props => props.isLoading === true ? "none" : "flex"};
        flex-direction: column;
        width: 100%;
        align-items: center;
    
        p{
            font-weight: bold;
            margin-top: 1rem;
        }

        input{
            width: 80%;
            height: 50px;
            font-size: 1.2rem;
            border-radius: 0.8rem;
            margin: 1rem 0;
            padding-left: 1rem;
        }
        button{
            width: 20%;
            height: 80px;
            margin: 2rem 0;
            background-color: #0A66C2;
            color: #FFFFFF;
            border-radius: 8px;
            border: none;
        }
    }

    .closeIcon{
        width: 40px;
        height: 40px;
        position: absolute;
        right: 16px;
        top: 8px;
        cursor: pointer;
    }
`

export default Container

