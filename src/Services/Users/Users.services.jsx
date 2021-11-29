import axios from "axios";
import { BASE_URL, fetchFeedPosts, fetchAllFavoritePosts, getOnePost } from "../Helpers/helper";

const services = {};

services.login = async (username, password) => {
    const response = await axios.post(`${BASE_URL}auth/signin`,
        JSON.stringify({
            username: username,
            password: password
        }), {
        headers: {
            "Content-type": "application/json"
        }
    });

    if (response.status === 200) {
        const data = await response.data;
        return data;
    }

    return {};
};

services.verifyToken = async (token) => {
    const response = await axios.get(`${BASE_URL}auth/whoami`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (response.status === 200) {
        const data = await response.data;
        return data;
    }

    return {};
};

export const allPostServices = {
    getAllPosts: async (filters = {}) => {
        const { limit = 10, page = 0 } = filters
        try {
            const result = await fetchFeedPosts({ limit, page })
            return { items: result.items, isNextPageAvailable: result.isNextPageAvailable, success: true }
        } catch (error) {
            console.error({ error })
            return { items: [], isNextPageAvailable: false, success: false }
        }
    },

    getFavorites: async () => {
        try {
            const result = await fetchAllFavoritePosts()
            return { items: result.items, success: true }
        } catch (error) {
            console.error({ error })
            return { items: [], success: false }
        }
    }
}

export const favoritesServices = {
    getFavorites: async () => {
        try {
            const result = await fetchAllFavoritePosts()
            return { items: result.items }
        } catch (error) {
            console.error({ error })
            return { items: [], success: false }
        }
    }
}

export const getOnePostService = {
    getOnePost: async () => {
        try {
            const result = await getOnePost()
            return { items: result.items }
        } catch (error) {
            console.error({ error })
            return { items: [], success: false }
        }
    }
}


export default services;