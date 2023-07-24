const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul className="flex gap-1">
        {pageNumbers.map((number) => (
          <li
            onClick={() => paginate(number)}
            className="px-4 py-1 border border-white cursor-pointer hover:bg-gray-800"
            key={number}
          >
            <button>{number}</button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
