// function wait(duration) {
//   return new Promise((resolve) => setTimeout(resolve, duration));
// }
// const { data, isLoading, isError } = useQuery({
//   queryKey: ["posts"],
//   queryFn: () => getPosts(),
//   // staleTime: 1000 * 60 * 5,
//   // refetchInterval: 1000,
// });

"use client";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getPosts } from "./api/posts";
import { Suspense, useEffect, useRef } from "react";
import { useIntersection } from "@mantine/hooks";
import PostDetails from "./components/PostDetails";
import Skeleton from "react-loading-skeleton";

function Home() {
  const { fetchNextPage, isFetchingNextPage, data, isLoading, isError, error } =
    useInfiniteQuery({
      queryKey: ["posts"],
      queryFn: ({ pageParam = 0 }) => getPosts(pageParam),
      getNextPageParam: (_, pages) => {
        return pages.length + 1;
      },
    });

  const lastPostRef = useRef(null);

  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  useEffect(() => {
    if (entry?.isIntersecting) fetchNextPage();
  }, [entry]);

  const _posts = data?.pages.flatMap((page) => page);

  if (isLoading) return <h1>Loading..</h1>;
  if (isError) return <h1>{JSON.stringify(error)}</h1>;

  return (
    <div className="m-10 flex flex-col gap-3">
      <h1>
        <b>POSTS LIST</b>
      </h1>
      {_posts?.map((post, i) => {
        if (i === _posts.length - 1) return <div key={post.id} ref={ref}></div>;
        return <PostDetails key={post.id} post={post} />;
      })}

      <span className="text-red-400 text-3xl text-center">
        {isFetchingNextPage
          ? "Loading more..."
          : (data?.pages.length ?? 0) < 10
          ? "Load more"
          : "Nothing to load :("}
      </span>
    </div>
  );
}

export default Home;
