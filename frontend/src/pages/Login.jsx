import React, { useContext, useState } from 'react'
import axios from 'axios'
import {Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../component/context/StoreContext';
import { toast } from 'react-toastify';


const Login = ({url}) => {
    
    const navigate=useNavigate();
    const {setToken} = useContext(StoreContext);

    const [user, setuser] = useState({
        email: "",
        password: ""
    })


    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setuser(user => ({ ...user, [name]: value }))
    }

    //login and token setup using api
    const submitlogininfo = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(url+"/api/user/login", user);
            if (response.data && response.data.token) {
                setToken(response.data.token)
                navigate("/")
            } else {
                toast.error("Token not found in response",{
                    autoClose:2000,
                    className: "custom-toast",
                })
            }
            setuser({
                email: "",
                password: ""
            })
        } catch (error) {
            toast.error("Login Failed",{
                autoClose:2000,
                className: "custom-toast",
            })
            setuser({
                email: "",
                password: ""
            })
        }
    }


    return (
        <div className='min-h-screen bg-white  md:bg-gray-800 flex justify-center items-center '>
            <form onSubmit={submitlogininfo} className='bg-white md:shadow-md flex flex-col h-[500px] w-[400px] p-[15px] md:p-[40px] rounded-3xl'>
                <h2 className='text-3xl font-bold text-center m-[30px]'>Login Page</h2>
                <div className='flex flex-col mt-[30px] mb-[30px]'>
                    <h4 className='mb-[10px]'>Email</h4>
                    <input type="email" onChange={(e) => onChangeHandler(e)} name='email' required value={user.email} className='bg-white border-2 border-gray-300 rounded-xl p-2 mb-[20px]' placeholder='enter your email' />
                    <h4 className='mb-[10px]'>password</h4>
                    <input type="password" onChange={(e) => onChangeHandler(e)} name='password' required value={user.password} className='bg-white border-2 border-gray-300 rounded-xl p-2 mb-[20px]' placeholder='enter your password' />
                </div>
                <button className='bg-orange-400 rounded-xl h-[40px]' type='submit'>Login</button>
                <Link to={'/register'}>New user register here?</Link>
            </form>
        </div>

    )
}

export default Login
