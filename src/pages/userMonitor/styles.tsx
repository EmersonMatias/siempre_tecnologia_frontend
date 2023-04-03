import styled from "styled-components"

type ScreenProps = {
    isReady: boolean
}

const Container = styled.div<ScreenProps>`
    max-width: 100%;
    height: 100vh;
    display: flex;
    color: white;
    overflow: hidden;

    .loadingScreen{
        width: 100%;
        height: 100%;
        display: ${props => props.isReady === true ? "none" : "flex"};
        justify-content: center;

        img{
          height: 100%;
        }
    }
  
    .contentContainer{
        width: 100%;
        height: 100;
        background-color: #0026ff;
        display: ${props => props.isReady === true ? "flex" : "none"};
        color: white;
        position: relative;
    }
    
    .backPage{
        font-size: 1.6rem;
        font-weight: bold;
        position: fixed;
        right: 16px;
        top: 8px;
        opacity: 0;
        z-index: 10000;
     

        &:hover{
            opacity: 1;
        }
    }

    .settings{
        width: 60px;
        position: fixed;
        top: 16px;
        left: 16px;
        opacity: 0;
        cursor: pointer;
        
        &:hover{
           opacity: 1;
        }
    }

    .gradient{
        width: 100%;
        height: 100%;
        background: linear-gradient(180deg, #000000 -20%, rgba(0, 0, 0, 0) 200%);
        position: absolute;
        top: 0;
        left: 0;
        padding: 0 4rem;
    }

`

export default Container