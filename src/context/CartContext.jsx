import { createContext, useState } from "react"
import React from 'react'


 export let MainContext=createContext()

export default function CartContext({children}  ) {

    const [wish,setWish]=useState([])
    const [bag,setBag]=useState([])

    let obj={wish,setWish,bag,setBag}

  return (

    <MainContext.Provider value={obj} >
       {children}
    </MainContext.Provider>

  )
}
