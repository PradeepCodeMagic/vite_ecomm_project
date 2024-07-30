import React, { useContext } from 'react'
import "./Wishlist.css"
import Header from './Header'
import { MainContext } from './context/CartContext'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

export default function Wishlist() {

    let { wish, setWish, bag,setBag } = useContext(MainContext)
   
    // delete item
    let Delete = (DelId) => {
        let NewWishProduct=wish.filter((v,i)=>DelId!=i)

        setWish(NewWishProduct)
        toast.error(DelId,{
                style:{
                    position:"absolute",
                    top:"500px",
                    left:"-200px",
                    backgroundColor:"skyblue",
                    width:"400px"

                },
                
            
                
        });
    }
    // move To Bag

    let moveToBag=(info,index)=>{
        setBag([...bag,info])
       
        let move_product=wish.filter((v,i)=>i!=index)
        setWish(move_product)
        toast.success('Move to cart');

    }

    


    return (

        <>
            <ToastContainer />
            <Header />
            <div className='w-full'>
                <table width={1000} className='mx-auto mt-10'  >
                    <thead>
                        <tr>
                            <td className='bg-[skyblue]' >sr.</td>
                            <td className='bg-[skyblue]'>Image</td>
                            <td className='bg-[skyblue]'>Name</td>
                            <td className='bg-[skyblue]'> price </td>
                            <td className='bg-[skyblue]'></td>
                            <td className='bg-[skyblue]'></td>
                        </tr>
                    </thead>
                    <tbody>
                        {wish.length > 0 ?
                            wish.map((v, i) => {

                                
                                return (
                                    <tr>
                                        <td> {i + 1} </td>
                                        <td>
                                            <img src={v.image} className='w-[70px] h-[70px] ' alt="" />
                                        </td>
                                        <td> {v.title} </td>
                                        <td>Price : {v.price} </td>
                                        <td><button onClick={()=>Delete(i)} type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button></td>

                                        <td>  <button onClick={()=>moveToBag(v,i)} type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Move To Mag</button> </td>
                                    </tr>
                                )
                            })
                            :
                            "No Data found"}



                    </tbody>
                </table>
            </div>

        </>

    )
}
