import React, { useState } from 'react'
import loginSignUp from '../assest/login-animation.gif'
import { BiShow, BiHide } from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { loginRedux } from '../redux/userSlice'



const Login = () => {
    const [showPassword, setShowPassword] = useState(false)
    
    const [data, setdata] = useState({
        email : "", 
        password : ""
    })
    const navigate = useNavigate()
    const userData = useSelector(state=>state)
    // const userData = useSelector((state)=>state.user)
    // console.log(userData.user)

    const dispatch = useDispatch()

    const handleShowPassword = () => {
        setShowPassword(preve => !preve)
    }
    const handleOnChange = (e) => {
        const {name, value} = e.target
        setdata((preve) => {
            return{
                ...preve,
                [name]:value
            }
        })

    }
    const handleSubmit = async(e) => {
        e.preventDefault()
        const {email, password} = data
        if(email && password)
        {
            const fetchdata = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}login`, {
                method : "POST",
                headers:{
                    "content-type":"application/json"
                },
                body : JSON.stringify(data)
            })

            const dataRes = await fetchdata.json()
            // console.log(dataRes)
            toast(dataRes.message)
            if (dataRes.alert) {
                dispatch(loginRedux(dataRes))
                setTimeout(() => {
                    navigate("/")
                }, 1000);
            }
            // console.log(userData)
        }
        else
        {
            alert("Please Enter required fields")
        }
    }
  return (
    <div className='p-2 md:p-4'>
    <div className='w-full max-w-md bg-white m-auto flex items-center flex-col p-4 dark:bg-slate-800 rounded-lg'>
      {/* <h1 className='text-center text-2xl foot-bold'>Sign Up</h1> */}
      <div className='w-20 overflow-hidden rounded-full drop-shadow-md
       shadow-md'>
      <img src={loginSignUp} className='w-full'/>

      </div>

      <form className='w-full py-3 flex flex-col' action="" onSubmit={handleSubmit}>
        <label htmlFor='email'>E-Mail</label>
        <input type={"email"} id='email' name='email' className='w-full bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded mt-1 mb-2 focus-within:outline-blue-300' value = {data.email} onChange={handleOnChange} />
        <label htmlFor='password'>Password</label>
        <div className='flex px-2 py-1  bg-slate-200 dark:bg-slate-700 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300'>
        <input type={showPassword?"text":"password"} id = 'password' name='password' className='w-full bg-slate-200 dark:bg-slate-700 border-none outline-none ' value = {data.password} onChange={handleOnChange} />
        <span className='flex text-xl cursor-pointer' onClick={handleShowPassword}>
            {showPassword?<BiShow/>:<BiHide/>}
        </span>
        </div>
        
        <button className='max-w-[150px] w-full m-auto bg-blue-500 hover:bg-blue-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-4'>Log IN</button>
      </form>
      <p>Don't have an account ? <Link to = {"/signup"} className='text-blue-500 underline'>Sign Up</Link> </p>
    </div>

    </div>
  )
}

export default Login
