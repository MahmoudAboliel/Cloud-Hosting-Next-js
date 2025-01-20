import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="container mx-auto ">
        <div className="h-[calc(100vh-150px)] flex flex-col justify-center items-center">
            <h1 className="text-6xl font-bold text-red-600">404</h1>
            <p className="text-2xl font-semibold text-gray-500">Page Not found</p>
            <Link className="block text-lg font-semibold text-blue-500 underline" href='/'>Go to Home Page</Link>
        </div>
    </div>
  );
}

export default NotFound;