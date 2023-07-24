import { useRouter } from "next/navigation";

function PostDetails({ post }) {
  const router = useRouter();

  return (
    <div
      className="p-2 border border-white cursor-pointer"
      onClick={() => router.push(`/singlepost/${post.id}`)}
    >
      {post.title}
    </div>
  );
}

export default PostDetails;
