import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import HomeLayout from '../layout/HomeLayout';
import { login } from '../Redux/slices/AuthSlice';

function Signup() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    function handleUserInput(e) {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        });
    }

    async function onLogin(event) {
        event.preventDefault();
        if (!loginData.email || !loginData.password) {
            toast.error("Please fill all the details");
            return;
        }
        // Dispatch login action
        const response = await dispatch(login(loginData));
        if (response?.payload?.success) {
            navigate("/");

            setLoginData({
                email: "",
                password: ""
            });
        }
    }

    return (
        <HomeLayout>
            <div className='flex items-center justify-center h-[100vh]'>
                {/* Left half with background image */}
                <div className='w-1/2 h-full bg-cover bg-center' style={{ backgroundImage: 'url("https://hsc.co.in/wp-content/uploads/2015/11/backgrounds.jpg")' }}>
                </div>

                {/* Right half with login form */}
                <div className='w-1/2 flex items-center justify-center'>
                    <form noValidate onSubmit={onLogin} className='flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96'>
                        <h1 className="text-center text-2xl font-bold mb-14 text-font-color">Login Page</h1>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="email" className='font-semibold text-font-color'> Email </label>
                            <input
                                type="email"
                                required
                                name="email"
                                id="email"
                                placeholder="Enter your email.."
                                className="bg-transparent px-2 py-1 border border-black placeholder-gray-600 rounded-md"
                                onChange={handleUserInput}
                                value={loginData.email}
                            />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="password" className='font-semibold text-font-color'> Password </label>
                            <input
                                type="password"
                                required
                                name="password"
                                id="password"
                                placeholder="Enter your password.."
                                className="bg-transparent px-2 py-1 border border-black placeholder-gray-600 rounded-md"
                                onChange={handleUserInput}
                                value={loginData.password}
                            />
                        </div>

                        <button type="submit" className='mt-2 bg-font-color rounded-md hover:bg-button-color transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer'>
                            Log in
                        </button>

                        <p className="text-center">
                            Do not have an account? <Link to="/signup" className='link text-accent cursor-pointer text-black'> Sign Up</Link>
                        </p>
                    </form>
                </div>
            </div>
        </HomeLayout>
    );
}

export default Signup;
