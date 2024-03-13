import React, { useState } from 'react'
import loginSignUp from '../assest/login-animation.gif'
import { BiShow, BiHide } from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'
import { ImagetoBase64 } from '../utility/imagetoBase64'
import { toast } from 'react-hot-toast'

const SignUp = () => {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [data, setdata] = useState({
        firstname : "",
        lastname : "",
        email : "", 
        password : "", 
        confirmpassword : "", 
        image:""
    })
    const handleShowPassword = () => {
        setShowPassword(preve => !preve)
    }
    const handleShowConfirmPassword = () => {
        setShowConfirmPassword(preve => !preve)
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
    const handleUploadProfileImage = async(e) => {
        const data = await ImagetoBase64(e.target.files[0]);
        // console.log(data)
        setdata((preve)=>{
            return{
                ...preve,
                image : data
            }
        })


    }
    // console.log(process.env.REACT_APP_SERVER_DOMAIN);
    const handleSubmit = async(e) => {
        e.preventDefault()
        const {firstname, lastname, email, password, confirmpassword} = data
        if(firstname && lastname && email && password && confirmpassword)
        {
            if(password.length<6)
            {
                // alert("Password Length is low")
                toast("Password Length is low")
            }
            else if(password===confirmpassword)
            {
                const fetchdata = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/signup`, {
                    method : "POST",
                    headers:{
                        "content-type":"application/json"
                    },
                    body : JSON.stringify(data)
                })

                const dataRes = await fetchdata.json()
                // console.log(dataRes)
                // alert(dataRes.message)
                toast(dataRes.message)
                if(dataRes.alert)
                {
                    navigate("/login")
                }
                // navigate("/login")
            }
            else
            {
                toast("password and confirm password not equal")
            }
        }
        else
        {
            toast("Please Enter required fields")
        }
    }
  return (
    <div className='p-2 md:p-4'>
    <div className='w-full max-w-md dark:bg-slate-800 bg-white m-auto flex items-center flex-col p-4 rounded'>
      {/* <h1 className='text-center text-2xl foot-bold'>Sign Up</h1> */}
      <div className='w-20 h-20 overflow-hidden rounded-full drop-shadow-md
       m-auto relative'>
      <img src={data.image ? data.image : loginSignUp} className='w-full h-full'/>
      <label htmlFor='profileImage'>
      <div className='absolute bottom-0 h-1/3 bg-slate-500 bg-opacity-50 w-full text-center'>
      <p className='text-sm p-1 text-white cursor-pointer' >Upload</p>

      </div>
      <input type="file" accept='image/*' id='profileImage' className='hidden' onChange={handleUploadProfileImage} />
      </label>

      </div>

      <form className='w-full py-3 flex flex-col' action="" onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name</label>
        <input type={"text"} id='firstname' name='firstname' className='w-full dark:bg-slate-700 bg-slate-200 px-2 py-1 rounded mt-1  mb-2 focus-within:outline-blue-300' value = {data.firstname} onChange={handleOnChange} />
        <label htmlFor='lastName'>Last Name</label>
        <input type={"text"} id='lastname' name='lastname' className='w-full dark:bg-slate-700 bg-slate-200 px-2 py-1 rounded mt-1 mb-2 focus-within:outline-blue-300 ' value = {data.lastname} onChange={handleOnChange} />
        <label htmlFor='email'>E-Mail</label>
        <input type={"email"} id='email' name='email' className='w-full dark:bg-slate-700 bg-slate-200 px-2 py-1 rounded mt-1 mb-2 focus-within:outline-blue-300' value = {data.email} onChange={handleOnChange} />
        <label htmlFor='password'>Password</label>
        <div className='flex px-2 py-1 dark:bg-slate-700  bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300'>
        <input type={showPassword?"text":"password"} id = 'password' name='password' className='dark:bg-slate-700 w-full bg-slate-200 border-none outline-none ' value = {data.password} onChange={handleOnChange} />
        <span className='flex text-xl cursor-pointer' onClick={handleShowPassword}>
            {showPassword?<BiShow/>:<BiHide/>}
        </span>
        </div>
        <label htmlFor='confirmpassword'>Confirm Password</label>
        <div className='flex px-2 py-1 dark:bg-slate-700 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300'>
        <input type={showConfirmPassword?"text":"password"} id = 'confirmpassword' name='confirmpassword' className='w-full bg-slate-200 border-none outline-none dark:bg-slate-700' value = {data.confirmpassword} onChange={handleOnChange} />
        <span className='flex text-xl cursor-pointer' onClick={handleShowConfirmPassword}>
            {showConfirmPassword?<BiShow/>:<BiHide/>}
        </span>
        </div>
        <button className='max-w-[150px] w-full m-auto bg-blue-500 hover:bg-blue-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-4'>Sign UP</button>
      </form>
      <p>Already Registered ? <Link to = {"/login"} className='text-blue-500 underline'>Login</Link> </p>
    </div>

    </div>
  )
}

export default SignUp
