import { useRouter } from 'next/navigation';

interface PostItemProps {
  id: number;
  title: string;
  text: string;
  thumbnail: string;
  url: string;
  created_at: string;
}

const PostItem: React.FC<PostItemProps> = ({ id, title, text, thumbnail, created_at, url }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/posts/${url}`);
  };

  return (
    <div onClick={handleClick} className="max-w-sm rounded overflow-hidden shadow-lg m-4 cursor-pointer">
      <img className="w-full h-48 object-cover" src={thumbnail} alt={title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <div className="px-6 pt-4 pb-2">
          <span className="text-gray-600 text-sm">Publicado em: {new Date(created_at).toLocaleDateString('pt-BR')}</span>
        </div>
        <p className="text-gray-700 text-base">
          {text.length > 100 ? `${text.substring(0, 100)}...` : text}
        </p>
      </div>
    </div>
  );
};

export default PostItem;
