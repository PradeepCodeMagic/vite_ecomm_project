import { useContext, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import Header from './Header'
import { Link } from 'react-router-dom'
import { MainContext } from './context/CartContext'

function App() {
 



  const [allCat, setAllCat] = useState([])
  const [allCard, setAllCard] = useState([])

  function displayCat() {

    axios.get("https://dummyjson.com/products/categories")
      .then((ress) => {
        setAllCat(ress.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }


  function displayCard(singelCatItem) {
    
    let Api;

    if(singelCatItem==undefined){
      Api='https://dummyjson.com/products?limit=100'
    }
    else{
      Api=`https://dummyjson.com/products/category/${singelCatItem}`
    }

    axios.get(Api)
      .then((ress) => {
        setAllCard(ress.data.products)
      })
      .catch((error) => {
        console.log(error)
      })

  }


  // singelCat
  let singelCat=(singelCatItem)=>{
    displayCard(singelCatItem)
  }

  useEffect(() => {
    displayCard()
    displayCat()
  }, [])





  return (
    <>
    <Header/>
      <div className='container  mx-auto '>
        <div className='grid grid-cols-[20%_auto] gap-1 '>
          <div className=''>

            <h1 className='text-[25px] text-center my-[10px] ' > All Category</h1>

            {allCat.map((v, i) => {
              return (
                <div onClick={()=>singelCat(v.slug)}  className=" text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">

                  <a  className="block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
                    {v.name}
                  </a>


                </div>
              )
            })}



          </div>
          <div className=''>
            <h1 className='text-[25px] text-center my-[10px] ' >Product</h1>

            <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-1 '>
              {allCard.map((v, i) => {
                return (
                  <div key={i} className=" bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <a href="#">
                      <img className="rounded-t-lg" src={v.thumbnail} alt="" />
                    </a>
                    <div className="p-5">
                      <a href="#">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                          {v.title}
                        </h5>
                      </a>
                      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        Price : {(v.price).toFixed(2)}
                      </p>
                      <Link to={`/product/${v.id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        id : {v.id}

                      </Link>
                    </div>
                  </div>
                )
              })}


            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App





