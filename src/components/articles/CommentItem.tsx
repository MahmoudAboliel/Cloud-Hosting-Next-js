"use client";

import { CommentWithUser } from '@/utils/types';
import { FaEdit, FaTrash } from 'react-icons/fa';
import UpdateComment from '../forms/UpdateComment';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import axios from 'axios';
import { DOMAIN } from '@/utils/constants';

interface CommentItemProps {
  comment: CommentWithUser;
  userId: string | undefined;
}
const CommentItem = ({ comment, userId }: CommentItemProps) => {
  const router = useRouter();
  const [editComment, setEditComment] = useState(false);
  const commentDelete = async () => {
    try {
      if (window.confirm("You want delete this comment, Are you sure?")) {
        await axios.delete(`${DOMAIN}/api/comments/${comment.id}`);
        toast.success("Comment deleted");
        router.refresh();
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
      toast.error(error?.response?.data.message);
    }
  }
  
  return (
    <div className='bg-gray-200 border border-gray-400 rounded-xl p-3 mb-3'>
        <div className='flex justify-between items-center mb-2'>
            <strong>{comment.user.name}</strong>
            <span className='bg-yellow-700 text-white text-sm rounded-md p-0.5'>
              {new Date(comment.createdAt).toDateString()}
            </span>
        </div>
        <p className='text-gray-700'>{comment.text}</p>
        {userId && userId === comment.userId && (
          <div className='flex justify-end items-center gap-2'>
              <FaEdit onClick={() => setEditComment(true)} className='text-green-600 cursor-pointer' />
              <FaTrash onClick={commentDelete} className='text-red-600 cursor-pointer' />
          </div>
        )}
        {editComment && <UpdateComment 
          setEditComment={setEditComment} 
          text={comment.text}
          commentId={comment.id}
        />}
    </div>
  )
}

export default CommentItem