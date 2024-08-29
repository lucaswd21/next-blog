'use client';

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store/store';
import { createItem, editItem, deleteItem } from '../../../store/postReducer';
import { ChatBubbleLeftEllipsisIcon } from '@heroicons/react/24/outline';
import Table from '../../components/table/Table';

interface Post {
  id: number;
  title: string;
  text: string;
  thumbnail: string;
  url: string;
  created_at: string;
}

interface Header {
  key: string;
  label: string;
  type: string;
  content: string | number | File | null;
  column: boolean;
  field: boolean;
  required: boolean;
}

export default function Posts() {
  const dispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.posts.posts);
  const tableIcon = ChatBubbleLeftEllipsisIcon;
  const [tableTitle, setTableTitle] = useState('Posts');

  const [sortByDefault, setSortByDefault] = useState('created_at');
  const [sortDescDefault, setSortDescDefault] = useState(true);

  const crudMethods = {
    createItem: (item: Omit<Post, 'id' | 'created_at'>) => dispatch(createItem(item)),
    editItem: (item: Post) => dispatch(editItem(item)),
    deleteItem: (item: Post) => dispatch(deleteItem({ id: item.id })),
  };

  const [headers, setHeaders] = useState<Header[]>([
    {
      key: 'id',
      label: 'ID',
      type: 'number',
      content: '',
      column: false,
      field: false,
      required: false
    },
    {
      key: 'title',
      label: 'Título',
      type: 'text',
      content: '',
      column: true,
      field: true,
      required: true
    },
    {
      key: 'text',
      label: 'Texto',
      type: 'text',
      content: '',
      column: true,
      field: true,
      required: true
    },
    {
      key: 'thumbnail',
      label: 'Thumbnail',
      type: 'file',
      content: '',
      column: false,
      field: true,
      required: true
    },
    {
      key: 'created_at',
      label: 'Postado em',
      type: 'date',
      content: '',
      column: true,
      field: false,
      required: false
    },
  ]);

  return (
    <main>
      <div>
        <Table
          tableTitle={tableTitle}
          tableIcon={tableIcon}
          crudMethods={crudMethods}
          list={posts}
          headers={headers}
          sortByDefault={sortByDefault}
          sortDescDefault={sortDescDefault}
        />
      </div>
    </main>
  );
}
