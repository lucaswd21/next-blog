import PostItem from './PostItem';

interface PostListProps {
  search: string;
  posts: {
    id: number;
    title: string;
    text: string;
    thumbnail: string;
    url: string;
    created_at: string;
  }[];
}

const PostList: React.FC<PostListProps> = ({ posts, search }) => {
  return (
    <div className="flex flex-wrap justify-start">
      {
        posts.length ? (
          posts.map((post) => (
            <PostItem
              key={post.id}
              id={post.id}
              title={post.title}
              text={post.text}
              thumbnail={post.thumbnail}
              url={post.url}
              created_at={post.created_at}
            />
          )
        )) : (
          <h1 className="text-lg font-semibold text-center text-gray-700 my-4">
              {
                  search.length ?
                      `Sua busca por "${search}" não obteve resultados` :
                      'Ainda não há posts'
              }
          </h1>
        )
      }
    </div>
  );
};

export default PostList;
