import Link from 'next/link';

export default function Navbar() {
  return (
    <div className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-3xl font-semibold">
          <Link href="/">Next Blog</Link>
        </div>
        <div className="flex space-x-4">
          <Link href="/" className="text-white hover:text-gray-300">Início</Link>
          <Link href="/posts" className="text-white hover:text-gray-300">
            Posts
          </Link>
          <Link href="/admin" className="text-white hover:text-gray-300">
            Admin
          </Link>
        </div>
      </div>
    </div>
  );
}
