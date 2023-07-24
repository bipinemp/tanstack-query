"use client";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Pagination from "../components/Pagination";
import { getAllPosts, getPostsPaginated } from "../api/posts";

function page() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, isPreviousData } = useQuery({
    queryKey: ["postspaginated", { page }],
    keepPreviousData: true,
    // queryFn: () => getAllPosts(),
    queryFn: () => getPostsPaginated(page),
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  // Get Current Posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  //   const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h1>Paginatated Posts</h1>
      {/* {currentPosts.map((post) => (
        <div key={post.id}>
          <p>{post.title}</p>
        </div>
      ))} */}

      {data.posts.map((post) => (
        <div key={post.id}>
          <p>
            {post.id}: &nbsp;{post.title}
          </p>
        </div>
      ))}

      {data.previousPage && (
        <button
          className="border border-white p-2"
          onClick={() => setPage(data.previousPage)}
          disabled={!data.previousPage}
        >
          Prev
        </button>
      )}
      {data.nextPage && (
        <button
          className="border border-white p-2"
          onClick={() => setPage(data.nextPage)}
          disabled={!data.nextPage}
        >
          Next
        </button>
      )}
      {!data.nextPage && <p>Nothing to show :(</p>}

      {/* <Pagination
        postsPerPage={postsPerPage}
        totalPosts={data.length}
        paginate={paginate}
      /> */}
    </div>
  );
}

export default page;
