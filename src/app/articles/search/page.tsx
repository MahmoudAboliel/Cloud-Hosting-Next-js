
interface SearchArticleProps {
  searchParams: { searchText: string }
}

const Search = ({searchParams}:SearchArticleProps) => {
  console.log(searchParams)
  return (
    <div>Search {searchParams?.searchText}</div>
  );
}

export default Search;