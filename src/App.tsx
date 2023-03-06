import { useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import GlobalStyle from "./components/global"
import MyContext from "./context/context"
import AdminScreen from "./pages/Admin/AdminScreen"
import AppDesktop from "./pages/AppDesktop/AppDesktop"
import Home from "./pages/Home/Home"
import HomeApp from "./pages/HomeApp/HomeApp"
import ScreenType1 from "./pages/ScreenType1/ScreenType1"
import UserScreen from "./pages/User/UserScreen"
import { UserData } from "./types/types"

function App() {
  const [userData, setUserData] = useState<UserData>({
    account_type: "user",
    active: false,
    name: "",
    token: "",
    id: 0
  })
  const config = { headers: { Authorization: `Bearer ${userData?.token}` } }

  return (
    <BrowserRouter>
      <GlobalStyle />

      <MyContext.Provider value={{ setUserData, userData, config }}>
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

