"use client";
import Link from "next/link";

interface ErrorProps {
    error:Error;
    reset: () => void;
}

const error = ({error, reset}:ErrorProps) => {
  return (
    <div className="container mx-auto ">
        <div className="h-[calc(100vh-150px)] flex flex-col justify-center items-center">
            <h1 className="text-2xl font-bold text-red-600">Something went wrong</h1>
            <p className="text-lg font-semibold text-gray-500">Error Message: {error.message}</p>
            <button 
                onClick={() => reset()}
                className="text-lg font-semibold bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 my-4 rounded-full">
                Try again
            </button>
            <Link className="block text-lg font-semibold text-blue-500 underline" href='/'>Go to Home Page</Link>
        </div>
    </div>
  );
}

export default error;