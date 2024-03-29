import styled from "styled-components"

type ScreensProps = {
    displayForm: boolean,
    screenType: "açogue" | "padaria" | "neutro",
    loading: boolean
}

const Container = styled.div<ScreensProps>`
    width: 100%;
    padding: 2rem;
    font-size: 1.6rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    h1{
        font-size: 5rem;
        font-weight: bold;
        text-align: center;
    }

    .monitorsContainer{
        display: ${props => props.loading === false ? "flex" : "none"};
        flex-wrap: wrap;
        padding: 0 1rem;
    }

    .monitor{
        width: 200px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 1rem auto;


        img{
            width: 100%;
            cursor: pointer;
        }

        p{
            width: 100%;
            text-align: center;
            cursor: pointer;
        }
    }

    .formContainer{
        display: ${props => props.displayForm === true ? "flex" : "none"};
        background-color: #fafafa;
        position: fixed;
        top: 20%;
        width: 30%;
        border-radius: 8px;
        box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;

        img{
            width: 40px;
            position: absolute;
            right: 8px;
            top: 8px;
            cursor: pointer;
        }
    }

    form{
        width: 100%;
        margin: 2.4rem 0;
        display: flex;
        flex-direction: column;
        padding: 1rem 2rem;
        align-items: center;

        .screenName{
            font-size: 1.6rem;
            margin-right: 2.4rem;
            padding-top: 0.4rem;
            padding-bottom: 0.4rem;
            padding-left: 0.8rem;
            border-radius: 16px;
            width: 300px;
            border: 1px solid #000000;
        }

        .type{
            font-size: 1rem;
            font-weight: bold;
            border-radius: 8px;
            border: none;
            padding: 0rem 1rem;
            text-align: center;
            margin: 0.8rem 0;
            width: 160px;
            height: 36px;
        }

        .selected{
            background-color: #61e261;
        }


        button{
            width: 160px;
            font-size: 1.4rem;
            padding: 0.4rem 1rem;
            font-weight: bold;
            background-color: #6195e2;
            color: #FFFFFF;
            border-radius: 8px;
            border: none;
            cursor: pointer;

            &:disabled{
                background-color:rgb(226, 210, 210);
                color:  rgb(233, 1, 1);
                cursor: default;
            }
        }

        .createScreen{
            margin-top: 2rem;
        }
    }

    .createNewScreen{
        background-color: #6195e2;
        font-size: 1.6rem;
        font-weight: bold;
        color: #FFFFFF;
        padding: 1rem;
        border-radius: 8px;
        border: none;
        cursor: pointer;
        margin-top: 2rem;
    }


    .loading2{
        display: ${props => props.loading === false ? "none" : "flex"};
        height: 100vh;
        img{
            height: 100%;
        }
    }

`

export default Container