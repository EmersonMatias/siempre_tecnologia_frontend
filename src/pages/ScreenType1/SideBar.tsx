import styled from "styled-components"

type PropsSideBar = {
    password: number
    settings: {
        showCounter: boolean,
        showProductsTable: boolean,
        showBanner: boolean
    }
}

export default function SideBar({ password, settings }: PropsSideBar) {
    return (
        <Container settings={settings} >

            <div className="banner">
              <video autoPlay loop>
                <source src="https://siempre-tecnologia-test-bucket.s3.sa-east-1.amazonaws.com/d1f7a304-d512-4a33-9d5a-8b878580262a_ICON_VERSION8_1.mp4" type="video/mp4"></source>
              </video>
            </div>
            <div className="password">
                <p>SENHA:</p>
                <p className="passwordNumber">{password}</p>
            </div>
            

        </Container>
    )
}

type Settings = {
    settings: {
        showCounter: boolean,
        showProductsTable: boolean,
        showBanner: boolean
    }
}

const Container = styled.div<Settings>`
        width: 100%;
        height: 100%;
        display: ${props => (props.settings.showBanner === false && props.settings.showCounter === false) ? "none" : "flex"};
        flex-direction: column;
        background-color: aquamarine;
        justify-content: center;

        .banner{
            width: 100%;
            height: 100%;
            background-color: rebeccapurple;
            display: ${props => props.settings.showBanner === true ? "flex" : "none"};
            video{
                width: 100%;
                object-fit: cover;
                object-position: center;
            }
        }

        .password{
            width: 100%;
            height: 100%;
            background-color: black;
            display: ${props => props.settings.showCounter === true ? "flex" : "none"};
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-size: 4vw;

            .passwordNumber{
                font-family: 'Digital Numbers', sans-serif;
                font-size: 11vw;
                color: red;
                margin-top: 3rem;
            }
        }
    

`