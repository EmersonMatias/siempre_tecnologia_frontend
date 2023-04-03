import { useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import GlobalStyle from "./components/global"
import { defaultUserData } from "./constants/defaultData"
import MyContext from "./context/context"
import AdminScreen from "./pages/adminScreen"
import AppDesktop from "./pages/AppDesktop/AppDesktop"
import Home from "./pages/Home/Home"
import HomeApp from "./pages/HomeApp/HomeApp"
import ScreenType1 from "./pages/userMonitor"
import UserScreen from "./pages/userScreen"
import { UserDataGet } from "./types/types"


function App() {
  const [userData, setUserData] = useState<UserDataGet>(defaultUserData)
  const config = { headers: { Authorization: `Bearer ${userData?.token}` } }

  console.log(userData)

  return (
    <BrowserRouter>
      <GlobalStyle />

      <MyContext.Provider value={{ userData,setUserData, config }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminScreen />} />
          <Route path="/user" element={<UserScreen />} />
          <Route path="/tela/:id" element={<ScreenType1 />} />

          <Route path="/home" element={<HomeApp />} />
          <Route path="/appdesktop" element={<AppDesktop />} />


        </Routes>

      </MyContext.Provider>

    </BrowserRouter>
  )
}

export default App

