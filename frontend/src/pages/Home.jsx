import axios from 'axios'
import React, { useEffect, useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../component/context/StoreContext'
import Layout from './Layout'
import { toast } from 'react-toastify'


const Home = ({url}) => {

    const { products, setproducts ,setcartproducts} = useContext(StoreContext)


    //fetch product using fake api
    const fetchProducts = async () => {
        const res = await axios.get(url+`/api/product/products`).catch((err) => { console.log("err ", err) })
        setproducts(res.data.products)
    }

    // Add to cart 
    const addToCart = (product) => {
        setcartproducts((prevProducts) => {
            const existingProduct = prevProducts.find(p => p.id === product.id);
            if (existingProduct) {
                //increase count
                toast.info("Product Quantity updated", {
                    autoClose: 2000,
                    className: "custom-toast",
                })
                return prevProducts.map(p => p.id === product.id ? { ...p, count: p.count + 1 } : p)
            } else {
                toast.success("Product added to cart!", {
                    autoClose: 2000,
                    className: "custom-toast",
                })
                return [...prevProducts, { ...product, count: 1 }];
            }
        })
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    return (

        <Layout>
            <div className='w-full min-h-screen bg-gray-800' >
                <div className='grid   p-4 gap-3 grid-cols-1 sm:grid-cols-2  md:grid-cols-4 justify-center mx-auto'>
                    {products.length > 0 ? (products.map((product) => (
                        <div key={product.id} className="flex justify-center">
                            <div className="h-[340px] shadow-md  w-[340px] rounded-xl bg-white p-3" >
                                <img
                                    className="h-[150px] object-contain w-full rounded-lg"
                                    src={product.image}
                                    alt={product.name}
                                />
                                <div className="p-[5px] text-center ">
                                    <h4 className="font-bold h-[70px]">{product.description}</h4>
                                    <p className="text-2xl font-bold   text-gray-600"> $ {product.price}</p>
                                    <button onClick={() => addToCart(product)} className='py-1 px-3 border-2 hover:shadow-blue-600 mt-3 rounded-full'>Add to Cart</button>
                                </div>

                            </div>
                        </div>
                    ))) : (
                        <p className="text-white text-center col-span-3">Loading...</p>
                    )}
                </div>

            </div>
        </Layout>
    )

}

export default Home
