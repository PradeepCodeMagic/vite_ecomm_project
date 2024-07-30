import React, { useContext, useEffect, useState } from 'react'
import Header from './Header'
import { useLocation, useParams } from 'react-router-dom'
import axios from 'axios';
import { MainContext } from './context/CartContext';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';


export default function DetailsPage() {
  let [oneProduct, setOneProduct] = useState([])
  let [smallImg, setSmallimg] = useState([])
  let [bigImg, setBigimg] = useState([])



  let param = useParams()
  let Pid = param.id;

  let singelProductDetails = () => {
    axios.get(`https://dummyjson.com/products/${Pid}`)
      .then((ress) => {
        setSmallimg(ress.data.images)
        setBigimg(ress.data.thumbnail)
        setOneProduct(ress.data)
        
      })
      .catch((error) => {
        console.log(error)
      })
  }
  useEffect(() => {
    singelProductDetails()
  }, [])

  // add to wishlist
  let {wish,setWish}=useContext(MainContext)



  let AddtoWish=(e)=>{

      let wishObj={
          image:e.thumbnail,
          price:e.price,
          title:e.title,
          quntity:1
      }

      let CheackData=wish.some((v)=>v.title==wishObj.title)

     if(CheackData==false){
      setWish([...wish,wishObj])
     }
     else{
      toast.error("this product already axist in wishlist")
     }



      
  }

  return (
    <div>
     <ToastContainer />
      <Header />
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div class="flex flex-col md:flex-row -mx-4">
          <div class="md:flex-1 px-4">
            <div className='flex '>
              <div className=" ">

                {smallImg.map((v) => {
                  return (
                    <div className="bg-gray-100 m-2 ">
                      <img src={v} alt="" onMouseOver={() => setBigimg(v)} className='h-[120px] mx-auto ' />
                    </div>
                  )
                })}


              </div>

              <div class=" w-[600px] h-64 rounded-lg bg-gray-100 mb-4">
                <img src={bigImg} alt="" className='mx-auto' />
              </div>


            </div>
          </div>
          <div class="md:flex-1 px-4">
            <h2 class="mb-2 leading-tight tracking-tight font-bold  text-2xl md:text-3xl">
              {oneProduct.title}
            </h2>
            <p class="text-gray-500 text-sm">
              {oneProduct.category}
            </p>

            <div class="flex items-center space-x-4 my-4">
              <div>
                <div class="rounded-lg bg-gray-100 flex py-2 px-3">
                  <span class="text-indigo-400 mr-1 mt-1">$</span>
                  <span class="font-bold text-indigo-600 text-3xl">    {oneProduct.price} </span>
                </div>
              </div>
              <div class="flex-1">
                <p class="text-green-500 text-xl font-semibold">Save 12%</p>
                <p class="text-gray-400 text-sm">Inclusive of all Taxes.</p>
              </div>
            </div>

            <p class="text-gray-500">
              {oneProduct.description}
            </p>

            <div class="flex py-4 space-x-4">


              <button onClick={(e)=>AddtoWish(oneProduct)}  class="h-14 px-6 py-2 font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white">
                Add to Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>


  )
}
