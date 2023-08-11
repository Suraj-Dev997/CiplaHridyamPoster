import { createContext, useState } from "react";

export const IdContext = createContext();

export const IdContexProvider = ({children})=>{

      //  const [empId,setEmpId] = useState();

      //  const handelId = (value)=>{
      //    setEmpId(value);
      //  }

      const [login, setLogin] = useState(false);

      const handelLogin = (value)=>{
        setLogin(value)
      }

    return <IdContext.Provider value={{handelLogin,login}}>{children}</IdContext.Provider>
}