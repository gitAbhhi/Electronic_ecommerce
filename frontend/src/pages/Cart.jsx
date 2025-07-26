import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../component/context/StoreContext'
import { toast } from 'react-toastify';
import Layout from './Layout';

const Cart = () => {
    const [total, setTotal] = useState(0);
    const { cartproducts, setcartproducts } = useContext(StoreContext)

    // Total price of all items
    const totalPrice = () => {
        const totalvalue = cartproducts.reduce((acc, product) => acc + product.price * product.count, 0)
        setTotal(totalvalue);
    }

    //Remove Item form cart
    const removeItemFromCart = (id) => {
        setcartproducts(prevproducts => prevproducts.filter(product => product.id !== id))
        toast.info("Product removed", {
            autoClose: 2000,
            className: "custom-toast",
        })
    }

    //Check out
    const checkout = () => {
        setcartproducts([])
        toast.success("Order placed successfully!", {
            autoClose: 4000,
            className: "custom-toast",
        })
    }

    // For Current Total 
    useEffect(() => {
        totalPrice()
    }, [cartproducts])


    return (
        <Layout>

        <div className='min-h-screen flex flex-col justify-start items-center'>
            {cartproducts.length > 0 ? cartproducts.map((product) => (
                <div key={product.id} className='block md:flex w-[95vw]  m-[20px] shadow-md rounded-2xl border-2 border-gray-200 md:h-[202px] h-[400px] '>
                    <div className='md:w-[40%] h-[50%]  md:h-[200px] flex flex-col items-center justify-center'>
                        <img src={product.image} alt="img" className='h-[120px] md:h-[150px]' />
                    </div>
                    <div className='md:w-[60%] h-[50%] pl-[30px] md:h-[200px] rounded-2xl bg-gray-800 flex flex-col gap-1 justify-center items-start text-white'>
                        <h1 className='text-1xl md:text-2xl font-semibold '>{product.name}</h1>
                        <h3 className='text-1xl md:text-1xl font-bold '>Price: ${product.price}</h3>
                        <h4 className='text-1xl md:text-1xl font-bold '>Count: {product.count}</h4>
                        <div>
                        <button onClick={() => {
                            setcartproducts(prev =>
                                prev.map(p => p.id === product.id && p.count > 1
                                    ? { ...p, count: p.count - 1 } : p))
                        }} className='px-3 py-1 hover:shadow-md inset-shadow-gray-900 bg-white text-gray-800  rounded-full'>-</button>
                        <span> Quantity </span>
                        <button onClick={() => {
                            setcartproducts(prev =>
                                prev.map(p => p.id === product.id ? { ...p, count: p.count + 1 } : p)
                            )
                        }} className='py-1 px-3 shadow-md bg-white text-gray-800  mr-3 rounded-full'>+</button>
                        <button onClick={() => removeItemFromCart(product.id)} className='py-1 px-3 border-2 border-white  rounded-full'>Remove Item</button>
                        </div>
                    </div>
                </div>
            )) : <><div className='h-[95vh] font-bold text-3xl flex items-center text-amber-400'><p>No product in your cart🛒</p></div></>}
            {cartproducts.length > 0 ? <>
                <div className='text-xl md:text-2xl  w-full flex justify-end p-3 gap-3 items-center  text-blue-900'>
                    <span>Total Price: $ {total.toFixed(2)}</span>
                    <button onClick={checkout} className='py-1 px-2 border-2 hover:shadow-md border-blue-900 rounded-full'>Checkout</button>
                </div>

            </> : <></>}
        </div>
        </Layout>

    )
}

export default Cart
