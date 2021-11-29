import { 
  fetchAllPosts, getOnePost, updatePost, createPost, 
  stateVisibilityPost, handleLike, createComment, handleFavorite
} from "../Helpers/helper";

export const postServices = {
    getPosts: async (filters = {}) => {
      const { limit = 15, page = 0, query } = filters
      try {
        const result = await fetchAllPosts({ limit, page, query});
        return { items: result.items, isNextPageAvailable: result.isNextPageAvailable, success: true };
  
      } catch (error) {
        console.error({ error });
        return { items: [], isNextPageAvailable: false, success: false };
      }
    },

    getPost: async ( id ) => {
      try {
        const result = await getOnePost({ id });
        return { data: result, success: true };
  
      } catch (error) {
        console.error({ error });
        return { data: '', success: false };
      }
    },

    updatePost: async ( id, title, description, image ) => {
      try {
        const result = await updatePost({ id, title, description, image });
        return { data: result, success: true };
  
      } catch (error) {
        console.error({ error });
        return { data: '', success: false };
      }
    },

    createPost: async ( title, description, image ) => {
      try {
        const result = await createPost({ title, description, image });
        return { data: result, success: true };
  
      } catch (error) {
        console.error({ error });
        return { data: '', success: false };
      }
    },

    stateVisibilityPost: async ( id ) => {
      try {
        const result = await stateVisibilityPost(id);
        return { data: result, success: true };
  
      } catch (error) {
        console.error({ error });
        return { data: '', success: false };
      }
    },

    handleLike: async (id) => {
      try {
        const result = await handleLike(id);
        return { data: result, success: true };
  
      } catch (error) {
        console.error({ error });
        return { data: '', success: false };
      }
    },

    handleFavorite: async (id) => {
      try {
        const result = await handleFavorite(id);
        return { data: result, success: true };
  
      } catch (error) {
        console.error({ error });
        return { data: '', success: false };
      }
    },

    sendComment: async (id, comment) => {
      try {
        const result = await createComment(id, comment);
        return { data: result, success: true };
  
      } catch (error) {
        console.error({ error });
        return { data: '', success: false };
      }
    }
};