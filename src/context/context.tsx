import { createContext } from "react";
import { UserData, UserDataGet } from "../types/types";


  type MyContextState = {
    userData: UserDataGet,
    setUserData: React.Dispatch<React.SetStateAction<UserDataGet>>,
    config: object,
  }
  
  const defaultUserData: UserDataGet = {
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
  