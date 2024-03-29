/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { LockClosedIcon } from '@heroicons/react/solid'
import {useState} from 'react'
import Logo from "../assets/BH.png";
import apiClient from '../services/apiClient';
import { useAuthContext } from "../contexts/auth";
import {useNavigate} from 'react-router-dom';



export default function SignIn() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const {user, setUser, error, setError, isProcessing, setIsProcessing, loginUser} = useAuthContext();
    // console.log("error", error);
    //const [error, setError] = useState({});
    //const [isLoading, setIsLoading] = useState(false)

    const handleOnInputChange = (event) => {
        if (event.target.name === "email") {
          if (event.target.value.indexOf("@") === -1) {
            setError((e) => ({ ...e, email: "Please enter a valid email." }))
          } else {
            setError((e) => ({ ...e, email: null }))
          }
        }
    
        setForm((f) => ({ ...f, [event.target.name]: event.target.value }))
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const res = await loginUser(form);
        // console.log("submitted", res);
        //const nav = await loginUser(form);
        if (res) navigate("/");
        
    }

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-50">
        <body class="h-full">
        ```
      */}
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-20 w-auto"
              src={Logo}
              alt="Workflow"
              
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
            <p className="mt-4 text-center text-red-600">{error?.form}</p>
            <p className="mt-4 text-center text-red-600">{error?.email}</p>

          </div>
          <form className="mt-8 space-y-6" onSubmit={handleOnSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md ">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={handleOnInputChange}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={form.password}
                  onChange={handleOnInputChange}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
              
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-orange-500 group-hover:text-orange-400" aria-hidden="true" />
                </span>
                {isProcessing ? "Loading..." : "Sign In"}
              </button>
            </div>
            <div className='my-2 flex items-center justify-center'>
              <p >Don't have an account? Register <a className='text-orange-500 underline ' href="/register">Here</a> </p>
              </div>
          </form>
        </div>
      </div>
    </>
  )
}