import React, { useContext } from 'react'
import {  Header } from 'antd/es/layout/layout'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from './context/StoreContext';
import { toast } from 'react-toastify';

const Navbar = () => {
    const navigate=useNavigate();
    const {setToken,cartproducts} = useContext(StoreContext);

    //Logout
    const userlogout = () => {
        setToken(null)
        navigate('/login')
        toast.success("logout successfully",{
            autoClose:2000,
            className: "custom-toast",
        })
    }
    return (
        <Header className='flex items-center p-0 m-0 justify-between'>
            <h1 className='text-white text-2xl mr-[20px] md:text-3xl'>Electronic-Shop</h1>

            <div className="flex items-center gap-2 text-xl">
            
                <Link to="/" ><span className="text-amber-400 text-[14px] md:text-2xl  hover:underline">Home</span></Link>
                <Link to="/cart" className='w-[50px] md:w-[150px]'><span className=' text-amber-400 text-[14px]  md:text-2xl hover:underline'>cart {cartproducts.length}</span></Link>
            </div>
            <div>
                <button onClick={userlogout} className='bg-amber-400 rounded-xl p-2'>logout</button>
            </div>
        </Header>
        
    )
}

export default Navbar
