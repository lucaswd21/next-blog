import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Post {
  id: number;
  title: string;
  text: string;
  thumbnail: string;
  url: string;
  created_at: string;
}

interface PostsState {
  posts: Post[];
  nextId: number;
}

const initialState: PostsState = {
  posts: [],
  nextId: 1,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    createItem: (state, action: PayloadAction<Omit<Post, 'id' | 'created_at'>>) => {
      const url = action.payload.title.toLowerCase().replace(/\s+/g, '-');
      const newPost: Post = {
        id: state.nextId,
        ...action.payload,
        url,
        created_at: new Date().toISOString(),
      };
      newPost.id = state.nextId
      state.posts.push(newPost);
      state.nextId += 1;
    },

    editItem: (state, action: PayloadAction<Post>) => {
      const index = state.posts.findIndex((post) => post.id === action.payload.id);
      if (index !== -1) {
        state.posts[index] = { ...action.payload, url: action.payload.title.toLowerCase().replace(/\s+/g, '-') };
      }
    },

    deleteItem: (state, action: PayloadAction<{ id: number }>) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload.id);
    },
  },
});

export const { createItem, editItem, deleteItem } = postsSlice.actions;

export default postsSlice.reducer;
