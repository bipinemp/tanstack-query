"use client";
import { useQuery } from "@tanstack/react-query";
import { getSinglePost, getUserDetails } from "@/app/api/posts";
import { Suspense } from "react";

function page({ params }) {
  const { id } = params;
  const postQuery = useQuery({
    queryKey: ["posts", id],
    queryFn: () => getSinglePost(id),
  });

  const userQuery = useQuery({
    queryKey: ["users", postQuery?.data?.userId],
    enabled: postQuery?.data?.userId != null,
    queryFn: () => getUserDetails(postQuery?.data?.userId),
  });

  if (postQuery.status === "loading") return <h1>Loading...</h1>;
  if (postQuery.status === "error")
    return <h1>{JSON.stringify(postQuery.error)}</h1>;

  return (
    <div className="m-10">
      <h1>SinglePost</h1>
      <div
        key={postQuery.data.id}
        className="border border-white p-2 cursor-pointer hover:bg-gray-900"
      >
        <h1>
          Title: <small> {postQuery.data.title}</small>
        </h1>
        <h1>
          Body : <small> {postQuery.data.body}</small>
        </h1>
        <h1>
          Username:
          {userQuery.isLoading && "Loading User"}
          {userQuery.isError && JSON.stringify(userQuery.error)}
          {userQuery.data?.username ? userQuery.data?.username : "Unknown User"}
        </h1>
      </div>
    </div>
  );
}

export default page;
