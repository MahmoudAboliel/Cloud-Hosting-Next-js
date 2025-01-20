"use client";

import { useState } from "react";
import InputType from "./InputType";
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { DOMAIN } from "@/utils/constants";
import ButtonSpinner from "../home/ButtonSpinner";

const LoginForm = () => {
    
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const submitHandler = async (e:React.FormEvent) => {
        e.preventDefault();
        
        if (name === "" || email === "" || password === "")
        {
            toast.error("All Field is Required");
        } else {
            try {
                setLoading(true);
                await axios.post(`${DOMAIN}/api/users/register`, { email, password, name });
                router.push('/');
                toast.success("Create new account")
                setLoading(false);
                router.refresh();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error:any) {
                toast.error(error?.response?.data.message);
                console.log(error);
                setLoading(false);
            }
        }
        
    }
  return (
    <form
    
        onSubmit={submitHandler} 
        className="space-y-2">
        <InputType
            id="name"
            name="name"
            type="text"
            label="Enter your Name"
            value={name}
            setValue={setName}
        />
        <InputType
            id="email"
            name="email"
            type="email"
            label="Enter your Email"
            value={email}
            setValue={setEmail}
        />
        <InputType
            id="password"
            name="password"
            type="password"
            label="Enter your Password"
            value={password}
            setValue={setPassword}
        />
        <button 
            type="submit"
            disabled={loading}
            className="disabled:cursor-not-allowed h-[40px] w-full text-xl font-semibold text-white bg-blue-400 hover:bg-blue-500 duration-500 rounded-lg p-1 ">
            {loading ? <ButtonSpinner /> : "Register"}
        </button>
    </form>
  )
}

export default LoginForm