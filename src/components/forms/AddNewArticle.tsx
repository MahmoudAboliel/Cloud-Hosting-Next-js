"use client";

import { useState } from "react";
import InputType from "@/components/forms/InputType";
import { toast } from 'react-toastify';
import axios from "axios";
import { DOMAIN } from "@/utils/constants";
import { useRouter } from "next/navigation";
import ButtonSpinner from "../home/ButtonSpinner";

const AddNewArticleForm = () => {

    const router = useRouter();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    const submitHandler = async (e:React.FormEvent) => {
        e.preventDefault();
        
        if (title === "" || description === "")
           return toast.error("All Field is Required");

        try {
            setLoading(true);
            await axios.post(`${DOMAIN}/api/articles`, { title, description });
            setTitle("");
            setDescription("");
            toast.success("New Article Added");
            setLoading(false);
            router.refresh();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error:any) {
            console.log(error);
            toast.error(error?.response?.data.message);
            setLoading(false);
        }
    }
  return (
    <form
    
        onSubmit={submitHandler} 
        className="space-y-2">
        <InputType
            id="title"
            name="title"
            type="text"
            label="Enter Article Title"
            value={title}
            setValue={setTitle}
        />
        <label className="inline-block ml-2 text-lg font-medium">Enter Article Description</label>
        <textarea
            className="w-full resize-none outline-none border border-gray-300 rounded-lg p-2 text-xl text-gray-700"
            rows={5}
            placeholder="Enter Article Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
        />
        <button 
            type="submit"
            className="w-full h-[40px] text-xl font-semibold text-white bg-blue-400 hover:bg-blue-500 duration-500 rounded-lg p-1 ">
            {loading ? <ButtonSpinner /> : "Add"}
        </button>
    </form>
  );
}

export default AddNewArticleForm;