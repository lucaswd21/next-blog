'use client';

import { useParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

export default function PostPage() {
  const { url } = useParams();

  const post = useSelector((state: RootState) =>
    state.posts.posts.find((post) => post.url === url)
  );

  if (!post) {
    return <div>Artigo não encontrado</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <img className="w-full h-64 object-cover mb-4" src={post.thumbnail} alt={post.title} />
      <p className="text-gray-600 text-sm mb-4">
        Publicado em: {new Date(post.created_at).toLocaleDateString('pt-BR')}
      </p>
      <div className="text-lg text-gray-800">{post.text}</div>
    </div>
  );
};