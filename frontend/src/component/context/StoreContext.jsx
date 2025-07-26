import { createContext, useEffect, useState } from "react"

export const StoreContext=createContext();
const StoreContextProvider = ({children}) => {

    const [token,setToken]=useState(localStorage.getItem("token"))
    const [products,setproducts]=useState([])
    const [cartproducts,setcartproducts]=useState([])

    useEffect(()=>{
        if(token){
            localStorage.setItem("token",token)
        }else{
            localStorage.removeItem("token")
        }
    },[token]);

    const contextValue={
      token, setToken,
      products, setproducts,
      cartproducts, setcartproducts}

  return (
    <StoreContext.Provider value={contextValue}>
            {children}
    </StoreContext.Provider>
  )
}

export default StoreContextProvider
