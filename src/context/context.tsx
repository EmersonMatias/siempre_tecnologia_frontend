import { createContext } from "react";
import { defaultUserData } from "../constants/defaultData";
import { UserData, UserDataGet } from "../types/types";


  type MyContextState = {
    userData: UserDataGet,
    setUserData: React.Dispatch<React.SetStateAction<UserDataGet>>,
    config: object,
  }
  
 
  const MyContext = createContext<MyContextState>({
    userData: defaultUserData,
    setUserData: () => {},
    config: { headers: { Authorization: `Bearer ${defaultUserData.token}` } }
  })
  
  export default MyContext
  