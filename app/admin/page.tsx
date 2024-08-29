'use client'
import { useRouter } from 'next/navigation';

export default function Admin() {
  const router = useRouter();

  const handleClick = () => {
    router.push('admin/posts/');
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Painel de Administração</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Gerenciar Posts</h2>
          <p className="text-gray-600 mb-4">Visualize, edite ou exclua posts existentes.</p>
          <span onClick={handleClick} className="text-blue-500 cursor-pointer">Ir para Gerenciar Posts</span>
        </div>
      </div>
    </main>
  );
}