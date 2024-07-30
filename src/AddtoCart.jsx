import React, { useContext, useEffect, useState } from 'react'
import Header from './Header'
import { MainContext } from './context/CartContext'

export default function AddtoCart() {
    let {bag,setBag } = useContext(MainContext)

  


    return (
        <div>
            <Header />

            <div className='w-full'>
                <table width={1000} className='mx-auto mt-10'  >
                    <thead>
                        <tr>
                            <td className='bg-[skyblue]' >sr.</td>
                            <td className='bg-[skyblue]'>Image</td>
                            <td className='bg-[skyblue]'>Name</td>
                            <td className='bg-[skyblue]'> price </td>
                            <td className='bg-[skyblue]'> Quntity </td>
                            <td className='bg-[skyblue]'></td>
                          
                        </tr>
                    </thead>
                    <tbody>

                        {bag.length>0 ?
                        bag.map((v,i)=>{
                            return(
                                <Tr  data={v} index={i} key={i} />
                            )
                        })
                         : 
                         "No Data Found"}
                        
                        
                        

                    </tbody>
                </table>

               <div className="w-[400px] mx-auto bg-[skyblue] ">
               <table width={400} >
                    <thead>
                        <td className='bg-slate-300 text-[25px] font-bold text-black ' >Price Details</td>
                        <td className='bg-slate-300 text-[25px] font-bold text-black '>Amout</td>
                    </thead>
                        <TotalAmounts/>
                </table>
               </div>
            </div>
        </div>
    )
}


let Tr=( {data,index} )=>{
    let {bag,setBag } = useContext(MainContext)

    console.log(bag)
  
    // Delete 
    let Delete=(DelID)=>{
            let newAddProduct=bag.filter((v,i)=>i!=DelID)
            setBag(newAddProduct)
    }
    // handelInput
    let handelInput=(e)=>{
        let newQuntity=e.target.value;
        let oldData=[...bag]
        oldData[index].quntity=newQuntity

        setBag(oldData)

       

    }
    
    return(
        <tr>
                            <td> {index+1} </td>
                            <td>
                                <img src={data.image} className='w-[70px] h-[70px] ' alt="" />
                            </td>
                            <td> {data.title}  </td>
                            <td>Price : &#8377; {((data.price)*(data.quntity)).toFixed(2)} </td>

                            <td> <input type="number" className='text-black p-1' onChange={handelInput} defaultValue={data.quntity} min={1} max={10} /> </td>

                            <td><button onClick={()=>Delete(index)} type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button></td>

                        </tr>

    )
}


let TotalAmounts=()=>{

    let {bag,setBag } = useContext(MainContext)

    
    const [total,setTotal]=useState([])
    let sum;
    let mytotal=()=>{
         sum=0;
        bag.map((v,i)=>{
            return(
                sum=sum+((v.price)*(v.quntity))
            )
        })
        setTotal(Math.round(sum))

    }

    useEffect(()=>{
        mytotal()
    },[bag])


    return(
        <tbody  >
        <tr>
            <td>Amout: </td>
            <td className='text-center'>&#8377; {total}</td>
            
        </tr>
        <tr>
            <td>Taxe: </td>
            <td className='text-center'> 18%</td>
            
        </tr>
        <tr>
            <td className='bg-[red]' >Total Amount :</td>
            <td className='text-center bg-[red]'> &#8377; {(total*1.18).toFixed(2)}  </td>
        </tr>
    </tbody>
    )
}