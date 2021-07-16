import React, { useState } from 'react'
import { login, getUserProfile } from '../apis/auth'
import Lottie from 'react-lottie';
import animationData from '../assets/loading.json'
import {useHistory} from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
export const LoginPage = ({setIsLoggedIn}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [responseError, setResponseError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const history = useHistory()
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    isStopped: !isLoading
  };


  const handleLogin = async () => {
    let isValid = true

    if (email.length === 0) {
      isValid = false
      setEmailError("Email is required!")
    }
    if (password.length === 0) {
      isValid = false
      setPasswordError("Password is required!")
    }

    if (isValid === true) {
      setIsLoading(true)
      const response = await login({ username: email, password })
      if (response.token) {
        await localStorage.setItem('token', response.token)
        const {data, statusCode, message} = await getUserProfile()
        if(statusCode && message) {
          toast.error(message, {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            });
        }
        if(data) {
          const {role} = data
          if(role === "admin") {
            setIsLoggedIn(true)
            setIsLoading(false)
            history.push("/styles")
          }
        }
      } else {
        toast.error("Email or password is not correct!", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          });
        setIsLoggedIn(false)
        setIsLoading(false)

      }
    }
  }
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12" style={{backgroundImage: `url("https://wallpapercave.com/wp/wp3869308.jpg")` }}>
      <ToastContainer/>
      <div
        className={isLoading
          ? "w-full z-50 flex items-center h-full absolute bg-white"
          : "w-full flex items-center h-full absolute bg-white hidden"}
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.85)"
        }}>
        <Lottie options={defaultOptions} height={100} width={100} />
      </div>
      <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
        <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
          <div className="px-5 py-7">
            <label className="font-semibold text-sm text-gray-600 pb-1 block">E-mail</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="text"
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
            <label className="font-semibold text-sm text-gray-600 pb-1 block">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
            <button
              type="button"
              className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block mb-3"
              onClick= {async () => {
                await handleLogin()
              }}
              >
              <span className="inline-block mr-2">Login</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="w-4 h-4 inline-block">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}