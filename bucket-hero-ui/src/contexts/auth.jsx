import {createContext, useState, useContext, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

import apiClient from '../services/apiClient';

const AuthContext = createContext(null);

export const AuthContextProvider = ({children}) => {
    
    const [user, setUser] = useState({});
    const [initialized, setInitialized] = useState();
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        //console.log("useEffect", user)
    }, [])

    async function loginUser(form) {
        console.log("login context");
        setIsProcessing(true)
        setError((e) => ({ ...e, form: null }))

        const {data, error} = await apiClient.loginUser({email: form.email, password: form.password});
        if (error) {
          setError((e) => ({ ...e, form: error }))
          const message = error?.response?.data?.error?.message
          setError((e) => ({ ...e, form: message ? String(message) : String(error) }))
          setIsProcessing(false);
          return false;
        }
        if (data?.user) {
          setUser(data.user);
          apiClient.setToken(data.token);
          setIsProcessing(false);
          return true;
        }

    }

    async function signupUser(form) {
        console.log("signup context");
        setIsProcessing(true)
        setError((e) => ({ ...e, form: null }))

        if (form.confirmpassword !== form.password) {
        setError((e) => ({ ...e, confirmpassword: "Passwords do not match." }))
        setIsProcessing(false)
        return false
        } else {
        setError((e) => ({ ...e, confirmpassword: null }))
        }
        const {data, error} = await apiClient.signupUser({email: form.email, password: form.password, confirmpassword: form.confirmpassword, first_name: form.first_name, last_name: form.last_name, username: form.username});
        if (error) {
            setError((e) => ({ ...e, form: error }))
            const message = error?.response?.data?.error?.message
            setError((e) => ({ ...e, form: message ? String(message) : String(error) }))
            setIsProcessing(false);
            return false;
        }
        if (data?.user) {
            setUser(data.user);
            apiClient.setToken(data.token);
            setIsProcessing(false);
            
            return true;
        }
        setIsProcessing(false);
    }

    const updateProfile = async(form) => {
        const edit = async () => {
            const {data, err} = await apiClient.editProfile(form);
            console.log("user", user, data);

            if (data) {
                if(data.email !== user.email){
                    
                    return true;
                    //navigate
                }
                else {
                    const user = await fetchUserFromToken();
                    setUser(user.data.user);
                    console.log("user after update", user.data.user);
                    return false;
                    
                }
                //logout before this if email changed
                
            } else if (err) {
                setError(error)
            }
        }
        return await edit();
    }

    const updatePassword = async(form) => {
        const editPass = async () => {
            const {data, err} = await apiClient.editPassword(form);
            if (data) {
                await fetchUserFromToken();
            } else if (err) {
                console.log("err", err);
                setError((e) => ({ ...e, updatePassword: err }))
            }
        }
        await editPass();
    }

    async function fetchUserFromToken() {
        //console.log("fetch context");
        return await apiClient.fetchUserFromToken();

    }

    async function logoutUser() {
        console.log("logout context");
        await apiClient.logoutUser();
        setUser({});
        setError(null);
    }

    const authValue = {user, 
        setUser, 
        initialized, 
        setInitialized,
        isProcessing,
        setIsProcessing,
        error,
        setError,
        loginUser,
        signupUser,
        fetchUserFromToken,
        logoutUser,
        updateProfile, updatePassword
    }

    return (
        <AuthContext.Provider value={authValue}>
            <>{children}</>
        </AuthContext.Provider>
    )

}

export const useAuthContext = () => useContext(AuthContext)