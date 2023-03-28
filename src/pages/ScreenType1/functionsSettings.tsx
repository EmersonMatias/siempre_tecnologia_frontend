import axios from "axios"
import { Screen } from "../../types/types"

const token = localStorage.getItem("token")
const config = { headers: { Authorization: `Bearer ${token}` } }


//POSITION PRODUCT
function PositionProductLeft(screen: Screen, setScreen: React.Dispatch<React.SetStateAction<Screen>>){
    if(screen.product_position !== "left"){
        setScreen({...screen, product_position: "left"})
    }
}

function PositionProductRight(screen: Screen, setScreen: React.Dispatch<React.SetStateAction<Screen>>){
    if(screen.product_position !== "right"){
        setScreen({...screen, product_position: "right"})
    }
}

function PositionProductCenter(screen: Screen, setScreen: React.Dispatch<React.SetStateAction<Screen>>){
    if(screen.product_position !== "center"){
        setScreen({...screen, product_position: "center"})
    }
}

//POSITION PRICE
function PositionPriceLeft(screen: Screen, setScreen: React.Dispatch<React.SetStateAction<Screen>>){
    if(screen.price_position !== "left"){
        setScreen({...screen, price_position: "left"})
    }
}

function PositionPriceRight(screen: Screen, setScreen: React.Dispatch<React.SetStateAction<Screen>>){
    if(screen.price_position !== "right"){
        setScreen({...screen, price_position: "right"})
    }
}

function PositionPriceCenter(screen: Screen, setScreen: React.Dispatch<React.SetStateAction<Screen>>){
    if(screen.price_position !== "center"){
        setScreen({...screen, price_position: "center"})
    }
}

//NUMBER LINES
function NumberLines(e: React.ChangeEvent<HTMLInputElement> ,screen: Screen, setScreen: React.Dispatch<React.SetStateAction<Screen>>){
    setScreen({ ...screen, table_lines: Number(e.target.value) })
}
function SpaceLines(e: React.ChangeEvent<HTMLInputElement> ,screen: Screen, setScreen: React.Dispatch<React.SetStateAction<Screen>>){
    setScreen({ ...screen, space_lines: Number(e.target.value) })
}

function Font_Size(e: React.ChangeEvent<HTMLInputElement> ,screen: Screen, setScreen: React.Dispatch<React.SetStateAction<Screen>>){
    setScreen({ ...screen, font_size: Number(e.target.value) })
}

function Font_Family(e: React.ChangeEvent<HTMLSelectElement> ,screen: Screen, setScreen: React.Dispatch<React.SetStateAction<Screen>>){
    setScreen({ ...screen, font_family: e.target.value })
}

function Color(e: React.ChangeEvent<HTMLInputElement>, screen: Screen, setScreen: React.Dispatch<React.SetStateAction<Screen>> ){
    setScreen({ ...screen, color_lines: e.target.value })
}

function NoColor(screen: Screen, setScreen: React.Dispatch<React.SetStateAction<Screen>>){
    setScreen({ ...screen, color_lines: " " })
}

function WidthProductTable(e:React.ChangeEvent<HTMLInputElement>, screen: Screen, setScreen: React.Dispatch<React.SetStateAction<Screen>>){
    setScreen({ ...screen, width_table: Number(e.target.value) })
}

function ShowCounter(screen: Screen, setScreen: React.Dispatch<React.SetStateAction<Screen>>){
    setScreen({ ...screen, show_counter: !screen.show_counter })
}

function ShowProductTable(screen: Screen, setScreen: React.Dispatch<React.SetStateAction<Screen>>){
    setScreen({ ...screen, show_productstable: !screen.show_productstable })
}

function ShowBanner(screen: Screen, setScreen: React.Dispatch<React.SetStateAction<Screen>>){
    setScreen({ ...screen, show_banner: !screen.show_banner })
}

function BackgroundColorTitle(e: React.ChangeEvent<HTMLInputElement>, screen: Screen, setScreen: React.Dispatch<React.SetStateAction<Screen>> ){
    setScreen({ ...screen, background_color_title: e.target.value })
}

function BackgroundColorTitleNone(screen: Screen, setScreen: React.Dispatch<React.SetStateAction<Screen>> ){
    setScreen({ ...screen, background_color_title: "  " })
}

function FontFamilyTitle(e: React.ChangeEvent<HTMLSelectElement> ,screen: Screen, setScreen: React.Dispatch<React.SetStateAction<Screen>>){
    setScreen({ ...screen, font_family_title: e.target.value })
}

function ColorLetter(e: React.ChangeEvent<HTMLInputElement>, screen: Screen, setScreen: React.Dispatch<React.SetStateAction<Screen>> ){
    setScreen({ ...screen, color: e.target.value })
}

function ColorTitle(e: React.ChangeEvent<HTMLInputElement>, screen: Screen, setScreen: React.Dispatch<React.SetStateAction<Screen>> ){
    setScreen({ ...screen, color_title: e.target.value })
}

function BannerTime(e: React.ChangeEvent<HTMLInputElement> ,screen: Screen, setScreen: React.Dispatch<React.SetStateAction<Screen>>){
    setScreen({ ...screen, banner_time: Number(e.target.value)*1000 })
}

export async function UpdateScreen(screen: Screen){
    const sendContent = async () =>{

        try{
           const sucess = await axios.put(`http://localhost:4000/screen/${screen.id}`, {screen} , config)
           alert("Atulizado com sucesso")
           console.log(sucess)
        }catch(error){
            console.log(error)
        }
    
    }

    sendContent()
    
}

export const  Change = {
    PositionProductLeft,
    PositionProductRight,
    PositionProductCenter,
    PositionPriceLeft,
    PositionPriceRight,
    PositionPriceCenter,
    NumberLines,
    SpaceLines,
    Font_Size,
    Font_Family,
    Color,
    NoColor,
    WidthProductTable,
    ShowCounter,
    ShowProductTable,
    ShowBanner,
    BackgroundColorTitle,
    BackgroundColorTitleNone,
    FontFamilyTitle,
    ColorLetter,
    ColorTitle,
    BannerTime
}

