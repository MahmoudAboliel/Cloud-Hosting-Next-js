"use client";

import { useState, Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { DOMAIN } from "@/utils/constants";

interface UpdateCommentProps {
    setEditComment: Dispatch<SetStateAction<boolean>>;
    text: string;
    commentId: string;
}

const UpdateComment = ({ setEditComment, text, commentId }: UpdateCommentProps) => {
    const router = useRouter();
    const [updatedText, setUpdatedText] = useState(text);

    const formSubmitHandler = async (e:React.FormEvent) => {
        e.preventDefault();
        if (updatedText === "") return toast.info("Please write something");
        try {
            await axios.put(`${DOMAIN}/api/comments/${commentId}`, { text: updatedText });
            router.refresh();
            setUpdatedText("");
            setEditComment(false);    
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error:any) {
            toast.error(error?.response?.data.message);
            console.log(error)
        }
    }
    return (
        <div className="fixed top-0 left-0 bottom-0 right-0 z-10 bg-black bg-opacity-55 flex items-center justify-center">
            <div className="w-11/12 md:w-1/2 bg-white rounded-lg p-3">
                <div className="flex justify-end text-2xl text-red-700 my-2 cursor-pointer">
                    <IoMdCloseCircleOutline onClick={() => setEditComment(false)} />
                </div>
                <form onSubmit={formSubmitHandler}>
                    <input
                        className="text-lg rounded-lg py-2 w-full focus:outline-none border border-gray-400 p-2" 
                        type="text" 
                        placeholder="Edit Comment..." 
                        value={updatedText}
                        onChange={e => setUpdatedText(e.target.value)}
                    />
                    <button className="w-full bg-green-600 hover:bg-green-700 text-white text-xl font-semibold my-2 rounded-md">
                        Update
                    </button>
                </form>
            </div>
        </div>
  )
}

export default UpdateComment
