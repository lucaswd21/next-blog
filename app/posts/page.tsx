'use client';

import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { ChatBubbleLeftEllipsisIcon } from '@heroicons/react/24/outline';
import PostList from '../components/posts/PostList';
import SearchBar from '../components/SearchBar';
import TableFooter from '../components/table/TableFooter';

interface Post {
  id: number;
  title: string;
  text: string;
  thumbnail: string;
  url: string;
  created_at: string;
}

export default function PostsPage() {
  const posts = useSelector((state: RootState) => state.posts.posts);

  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState<keyof Post>('created_at')
  const [sortDesc, setSortDesc] = useState(true)
  const [actualPage, setActualPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  const filteredPosts = () => {
    return posts.filter((item) => (
        item.title.toString().toLowerCase().includes(search.toLowerCase()) ||
        item.text.toString().toLowerCase().includes(search.toLowerCase())
      )
    )
  }

  const sortedPosts = () => {
    return filteredPosts().sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];
  
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDesc ? bValue - aValue : aValue - bValue;
      } else if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDesc ? bValue.localeCompare(aValue) : aValue.localeCompare(bValue);
      } else {
        return 0;
      }
    });
  };
  

  const totalItems = filteredPosts().length;

  const currentItems = useMemo(() => {
    const start = (actualPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return sortedPosts().slice(start, end);
  }, [actualPage, itemsPerPage, posts, search, sortBy, sortDesc]);

  return (
    <div className="container mx-auto px-4">
    <div className="flex items-center px-8 py-4 my-4 space-x-2 text-2xl font-semibold">
        <ChatBubbleLeftEllipsisIcon className="mt-2 h-8 w-8 text-blue-500" />
        <h1>Posts</h1>
    </div>
      <SearchBar search={search} setSearch={setSearch}/>
      <PostList posts={currentItems} search={search}/>
      <TableFooter
          actualPage={actualPage}
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
          onPageChange={setActualPage}
          onItemsPerPageChange={(newItemsPerPage) => {
              setItemsPerPage(newItemsPerPage);
              setActualPage(1);
          }}
      />
    </div>
  );
}
