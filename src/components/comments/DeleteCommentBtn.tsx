"use client";

import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface DeleteCommentBtnPorps {
    commentId: string;
}

const DeleteCommentBtn = ({ commentId }: DeleteCommentBtnPorps) => {
    const router = useRouter();

    const deleteCommentHandler = async () => {
        try {
            if (window.confirm("You want to delete this article, Are you sure?")) {
                await axios.delete(`${DOMAIN}/api/comments/${commentId}`);
                router.refresh();
                toast.success("Deleted Successfully");
            }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error:any) {
            toast.error(error?.response?.data.message)
        }
    }
  return (
    <button 
        onClick={deleteCommentHandler}
        className="bg-red-500 hover:bg-red-600 text-white py-0.5 px-2 rounded-md font-medium"
    >Delete</button>
  );
}

export default DeleteCommentBtn;
