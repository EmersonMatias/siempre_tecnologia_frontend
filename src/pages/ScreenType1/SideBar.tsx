import styled from "styled-components"

type PropsSideBar = {
    password: number,
    screen: {
        background_url: string,
        font_family: string,
        font_size: number,
        id: number,
        screen_name: string,
        show_banner: boolean,
        show_counter: boolean,
        show_productstable: boolean,
        space_lines: number,
        table_lines: number,
        user_id: number,
        width_table: number
    }
}

export default function SideBar({ password, screen }: PropsSideBar) {
    return (
        <Container screen={screen} password={password}>

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

const Container = styled.div<PropsSideBar>`
        width: ${props => props.screen.show_productstable === false ? 100 : 100 - props.screen.width_table}vw;
        height: 100%;
        display: ${props => (props.screen.show_banner === false && props.screen.show_counter === false) ? "none" : "flex"};
        flex-direction: column;
        background-color: aquamarine;
        justify-content: center;

        .banner{
            width: 100%;
            height: ${props => props.screen.show_productstable === false && props.screen.show_counter === false ? "100vh" : "50vh"};
            background-color: rebeccapurple;
            display: ${props => props.screen.show_banner === true ? "flex" : "none"};
            video{
                width: 100%;
                object-fit: contain;
                object-position: center;
            }
        }

        .password{
            width: 100%;
            height: ${props => (props.screen.show_productstable === false && props.screen.show_banner === false )? "100vh" : "50vh"};
            background-color: black;
            display: ${props => props.screen.show_counter === true ? "flex" : "none"};
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