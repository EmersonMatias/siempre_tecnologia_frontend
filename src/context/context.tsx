import { createContext } from "react";
import { UserData } from "../types/types";


  type MyContextState = {
    userData: UserData,
    setUserData: React.Dispatch<React.SetStateAction<UserData>>,
    config: object,
  }
  
  const defaultUserData: UserData = {
    account_type: "user",
    active: false,
    name: "",
    token: "",
    id: 0
  }
  
  const MyContext = createContext<MyContextState>({
    userData: defaultUserData,
    setUserData: () => {},
    config: { headers: { Authorization: `Bearer ${defaultUserData.token}` } }
  })
  
  export default MyContext
  