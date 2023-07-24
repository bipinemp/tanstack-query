import Link from "next/link";

function Navbar() {
  return (
    <nav>
      <ul className="flex bg-gray-900 justify-center gap-4 p-3">
        <li>
          <Link href="/">Posts</Link>
        </li>
        <li>
          <Link href="/addpost">Add Post</Link>
        </li>
        <li>
          <Link href="/pagination">Paginated Posts</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
