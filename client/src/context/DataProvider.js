import { createContext,useState } from "react"

export const DataContext=createContext(null);

const DataProvider=({children})=>{
    const[acount,setAcount]=useState({username:'',name:''})
    
    

    return(
        <DataContext.Provider value={{
            acount,
            setAcount
        }}>
          {children}
        </DataContext.Provider>
    )

}
export default DataProvider;