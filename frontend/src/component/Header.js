import React, { useState } from 'react';
import logo from '../assest/logo.png'
import { Link } from 'react-router-dom'
import { HiOutlineUserCircle } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux';
import { BsFillCartFill } from 'react-icons/bs'
import logoAK from '../assest/AK.png'
import techZone from '../assest/techzone.png'
import ThemeToggle from './ThemeToggle';

const Header = () => {
    const [showMenu, setShowMenu] = useState(false)
    const userData = useSelector((state)=>state.user)
    // console.log(userData.user.email)
    // console.log(userData.user.image)
    // console.log(userData.user.email)
    const dispatch  = useDispatch() 

    const handleshowmenu = () => {
        setShowMenu(preve => ! preve)
    }
    const handleLogOut = () =>{

    }
    // console.log(process.env.REACT_APP_ADMIN_EMAIL)
    const cartItemNumber = useSelector((state)=>state.product.cartItem)
    return(
        <header className='fixed shadow-md w-full h-16 px-2 md:px-4 z-50 bg-blue-200 dark:bg-black dark:text-slate-300'>
        
    {/* desktop */}
        <div className='flex items-center h-full justify-between'>
            <Link to = {""}>
                <div className="h-16">
                    <img src={techZone} className='h-full overflow-hidden rounded-2xl'  alt="" />
                </div>
            </Link>
            
            <div className='flex items-center gap-4 md:gap-7'>
                <nav className='gap-4 md:gap-6 text-base md:text-lg hidden md:flex '>
                    <Link className='dark:hover:text-white hover:text-black' to={""}>Home</Link>
                    <Link className='dark:hover:text-white hover:text-black' to={"menu/64ad44a7195d5b693f7665eb"}>Menu</Link>
                    <Link className='dark:hover:text-white hover:text-black' to={"about"}>About</Link>
                    <Link className='dark:hover:text-white hover:text-black' to={"contact"}>Contact</Link>
                </nav>
                <ThemeToggle/>
                <div className='text-2xl dark:text-slate-300 text-slate-600 relative'>
                    {/* <ThemeToggle/> */}
                    <Link to={"cart"}> <BsFillCartFill/>
                    <div className='absolute -top-2 -right-1 text-white bg-blue-500 h-4 w-4 rounded-full m-0 p-0 text-sm text-center'>{cartItemNumber.length}</div>
                    </Link>
                </div>
                <div className='dark:text-slate-200 text-slate-600' onClick={handleshowmenu}>
                    <div className='text-3xl cursor-pointer h-8 w-8 rounded-full overflow-hidden drop-shadow' >
                    {userData.user.image ? <img src={userData.user.image} className='h-full w-full'/> :<HiOutlineUserCircle/>}
                
                    </div>
                    {
                        showMenu && <div className='absolute right-2 bg-white dark:bg-slate-700 py-2 shadow drop-shadow-md cursor-pointer flex flex-col min-w-[120px] text-center'>
                        {
                            userData.user.email===process.env.REACT_APP_ADMIN_EMAIL && <Link to = {"newproduct"}className='whitespace-nowrap cursor-pointer px-2'>New Product</Link>
                        }
                        
                    
                    {
                        userData.user.image ? <p className='cursor-pointer text-white bg-red-500 px-2' onClick={handleLogOut}>Log Out ({userData.user.firstname})</p> : <Link to={"login"} className='whitespace-nowrap cursor-pointer px-2'>Log IN</Link>
                    }
                    <nav className='gap-4 text-base md:text-lg flex flex-col md:hidden'>
                    <Link to={""} className='px-2 py-1'>Home</Link>
                    <Link to={"menu/64ad44a7195d5b693f7665eb"} className='px-2 py-1'>Menu</Link>
                    <Link to={"about"} className='px-2 py-1'>About</Link>
                    <Link to={"contact"} className='px-2 py-1'>Contact</Link>
                    </nav>
                    </div>
                    }
                    

                    
                </div>
            </div>

        </div>





    {/* mobile */}

        </header>

        
    )
}

export default Header
