"use client";

import { useState } from "react";
import { toast } from 'react-toastify';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { DOMAIN } from "@/utils/constants";

interface AddCommentFormProps {
  articleId: string;
}
const AddComment = ({ articleId }: AddCommentFormProps) => {

  const router = useRouter();
  const [text, setText] = useState("");
    
  const submitHandler = async (e:React.FormEvent) => {
      e.preventDefault();
      if (text === "") return toast.info("Please write something");
      else {
        try {
          await axios.post(`${DOMAIN}/api/comments`, { text, articleId });
          router.refresh();
          toast.success("Add Comment Successfully");
          setText("");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error:any) { 
          toast.error(error?.response?.data.message);
          console.log(error);
        }
      }
  }

  return (
    <form
        className="w-full my-2"
        onSubmit={submitHandler}>
        <input 
            className="w-full rounded-lg p-2 outline-none border border-gray-400 text-gray-900 text-lg"
            name="comment" 
            type="text" 
            placeholder="Add comment..."
            value={text} 
            onChange={e => setText(e.target.value)}
        />
        <button 
          className="bg-green-700 hover:bg-green-800 text-white py-2 px-4 my-2 rounded-xl transition"
          type="submit">
            Comment
        </button>
    </form>
  );
}

export default AddComment;