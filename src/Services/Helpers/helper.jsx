import axios from "axios";
export const BASE_URL = "https://posts-pw2021.herokuapp.com/api/v1/";

const getToken = () => localStorage.getItem('token');

export const fetchAllPosts = async ({ limit, page, query }) => {
    const response = await axios.get(`${BASE_URL}post/${query}`, 
    {
        headers: {
            "Authorization": `Bearer ${getToken()}`
        },
        params: {
            limit: limit, 
            page: page
        }
    });
    const postResponse = await response.data;
    
    return { items: postResponse.data, isNextPageAvailable: page + 1 < postResponse.pages }
};

export const updatePost = async ({ id, title, description, image }) => {
    const formData = new URLSearchParams();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);

    const response = await axios.put(`${BASE_URL}post/update/${id}`,formData,
    {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": `Bearer ${getToken()}`
            
        } 
    });

    return response.data;
}

export const createPost = async ({ title, description, image }) => {
    const formData = new URLSearchParams();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);

    const response = await axios.post(`${BASE_URL}post/create`, formData,
    {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": `Bearer ${getToken()}`
            
        } 
    });

    return response.data;
}

export const stateVisibilityPost = async ( id ) => {
    const response = await axios.patch(`${BASE_URL}post/toggle/${id}`, null, 
    {
        headers: {
            "Authorization": `Bearer ${getToken()}`
        } 
    });

    return response.data;
}


export const fetchFeedPosts = async ({ limit, page }) => {
    const response = await axios.get(`${BASE_URL}post/all`,
        {
            headers: {
                "Authorization": `Bearer ${getToken()}`
            },
            params: {
                limit: limit,
                page: page
            }
        });
    const postResponse = await response.data;

    return { items: postResponse.data, isNextPageAvailable: page < postResponse.pages }
};

export const fetchAllFavoritePosts = async () => {
    const response = await axios.get(`${BASE_URL}post/fav`,
        {
            headers: {
                "Authorization": `Bearer ${getToken()}`
            }
        });
    const postResponse = await response.data;

    return { items: postResponse.favorites }
};

export const getOnePost = async ({ id }) => {
    const response = await axios.get(`${BASE_URL}post/one/${id}`,
        {
            headers: {
                "Authorization": `Bearer ${getToken()}`
            }
        })
    return response.data
};

export const transformPostData = (postRaw) => {
    if (!postRaw) return null

    return {
        user: postRaw.user.username,
        title: postRaw.title,
        description: postRaw.description,
        comments: postRaw.comments.map((comment) => comment.comments.description),
        userComments: postRaw.comments.map((user) => user.comments.user.username),
        createdDate: postRaw.createdAt,
        updatedDate: postRaw.updatedAt,
        likes: postRaw.likes.map().count()
    }
};

export const handleLike = async (id) => {
    const response = await axios.patch(`${BASE_URL}post/like/${id}`, null, 
    {
        headers: {
            "Authorization": `Bearer ${getToken()}`
        } 
    });

    return response.data;
}

export const handleFavorite = async (id) => {
    const response = await axios.patch(`${BASE_URL}post/fav/${id}`, null, 
    {
        headers: {
            "Authorization": `Bearer ${getToken()}`
        } 
    });

    return response.data;
}

export const createComment = async (id, comment) => {
    const formData = new URLSearchParams();
    formData.append("description", comment);
    const response = await axios.patch(`${BASE_URL}post/comment/${id}`, formData, 
    {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": `Bearer ${getToken()}`
        } 
    });

    return response.data;
}