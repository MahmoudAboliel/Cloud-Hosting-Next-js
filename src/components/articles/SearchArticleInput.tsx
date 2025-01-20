"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation';

const SearchArticleInput = () => {
    const router = useRouter();
    const [searchText, setSearchText] = useState("");
    
    const submitHandler = (e:React.FormEvent) => {
        e.preventDefault();
        console.log({searchText});
        router.push(`/articles/search?searchText=${searchText}`);
    }
  return (
    <form
        className="w-full my-2"
        onSubmit={submitHandler}>
        <input 
            className="w-full rounded-lg p-2 outline-none border border-gray-400 text-gray-900 text-lg"
            name="searchText" 
            type="search" 
            placeholder="Search for article"
            value={searchText} 
            onChange={e => setSearchText(e.target.value)}
        />
    </form>
  );
}

export default SearchArticleInput;