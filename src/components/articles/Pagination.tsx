import Link from "next/link";

interface PaginationProps {
  pages: number;
  pageNumber: number;
  route: string;
}

const Pagination = ({ pages, pageNumber, route }:PaginationProps) => {

  // eslint-disable-next-line prefer-const
  let pagesArray:number[] = [];
  for (let i = 1; i <= pages; i++) {
    pagesArray.push(i);
  }

  return (
    <div className="flex justify-center space-x-2 mt-12 mb-4">
      {pageNumber > 1 && 
        <Link 
          href={`${route}?pageNumber=${pageNumber - 1}`}
          className="border border-gray-500 p-2 w-10 h-10 flex justify-center items-center rounded-full hover:bg-gray-300 cursor-pointer transition">
            prev
        </Link>
      }
        {pagesArray.map(page => 
            <Link
              href={`${route}?pageNumber=${page}`} 
              key={page} 
              className={`${pageNumber === page && "bg-gray-300"} border border-gray-500 p-2 w-10 h-10 flex justify-center items-center rounded-full hover:bg-gray-300 cursor-pointer transition`}>
                {page}
            </Link>
        )}
        {pageNumber < pages && 
        <Link
          href={`${route}?pageNumber=${pageNumber + 1}`} 
          className="border border-gray-500 p-2 w-10 h-10 flex justify-center items-center rounded-full hover:bg-gray-300 cursor-pointer transition">
            next
        </Link>
        }
    </div>
  );
}

export default Pagination;