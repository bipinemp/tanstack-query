"use client";

import { useState } from "react";
import { addNewPost } from "../api/posts";
// import { useRouter } from "next/navigation";

function page() {
  // const router = useRouter();
  const queryClient = useQueryClient();

  const [postData, setPostData] = useState({
    title: "",
    body: "",
  });

  const handleChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const createPostMutation = useMutation({
    mutationFn: addNewPost,
    onSuccess: (data) => {
      queryClient.setQueryData(["posts", data.id], postData);
      queryClient.invalidateQueries({ queryKey: ["posts"], exact: true });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createPostMutation.mutate({ postData });
  };

  return (
    <div className="w-96 mx-auto mt-5">
      <h1>Add New Post</h1>
      <p>{JSON.stringify(createPostMutation.data)}</p>
      {createPostMutation.isError && JSON.stringify(createPostMutation.error)}
      <br />
      <form onSubmit={handleSubmit} className=" flex flex-col gap-2">
        <input
          value={postData.title}
          onChange={handleChange}
          type="text"
          name="title"
          placeholder="Title..."
          className="p-2 bg-transparent border border-white"
        />
        <input
          value={postData.body}
          onChange={handleChange}
          type="text"
          name="body"
          placeholder="body..."
          className="p-2 bg-transparent border border-white"
        />
        <button
          disabled={createPostMutation.isLoading}
          type="submit"
          className="border-2 border-white p-2 cursor-pointer"
        >
          {createPostMutation.isLoading ? "Creating" : "Create Post"}
        </button>
      </form>
    </div>
  );
}

export default page;
