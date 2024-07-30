import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import DetailsPage from './DetailsPage.jsx'
import CartContext from './context/CartContext.jsx'
import Wishlist from './Wishlist.jsx'
import AddtoCart from './AddtoCart.jsx'



const router=createBrowserRouter([
  {
    path:"/",
    element:<App/>
  },
  {
    path:"/product/:id",
    element:<DetailsPage/>
  },
  {
    path:"/wishlist",
    element:<Wishlist/>
  },
  {
    path:"/addtocart",
    element:<AddtoCart/>
  },

])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <CartContext>
        <RouterProvider router={router}/>
    </CartContext>


  </React.StrictMode>,
)
