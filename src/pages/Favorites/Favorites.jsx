import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../../Contexts/UserContext'
import { FaSignOutAlt, FaHome } from "react-icons/fa";
import { allPostServices } from "../../Services/Users/Users.services";
import { postServices } from "../../Services/Admin/Admin.services"
import FavoritePost from "../../Components/FavoritePosts/FavoritePost";
import logo from '../../assets/img/Programigos.png'

const Favorites = () => {
    const navigate = useNavigate()
    const { logout } = useUserContext()

    const [posts, setPosts] = useState([]);
    const [recharge, setRecharge] = useState(false);

    useEffect(() => {
        const fetchFavoritePosts = async () => {
            try {
                const response = await allPostServices.getFavorites()
                if (!response.success) {
                    throw new Error('Something was wrong')
                }
                setPosts([]);
                await response.items.map(async id => {
                    const postResponse = await postServices.getPost(id)   
                    const isDuplicated = posts.find(element => element._id === postResponse.data._id)
                    if(postResponse.success && isDuplicated == null) setPosts(oldPosts => [...oldPosts, postResponse.data])
                });
                setRecharge(false);
            } catch (error) {
                console.error(error);
            }
        };
        fetchFavoritePosts();
    },[recharge]);


    const handleLike = async (id) => {
        try {
            const response = await postServices.handleLike(id)

            if (!response.success) {
                throw new Error('Something was wrong')
            }
            setRecharge(true)
        } catch (error) {
            console.error(error);
        }
    }

    const handleFavorite = async (id) => {
        try {
            const response = await postServices.handleFavorite(id)

            if (!response.success) {
                throw new Error('Something was wrong')
            }
            setRecharge(true)
        } catch (error) {
            console.error(error);
        }
    }

    const logoutHandler = () => {
        logout()
        navigate("/login")
    }

    const feedPageHandler = () => {
        navigate("/user")
    }

    return (
        <div className="w-full flex justify-center min-h-screen bg-green-100">
            <main className="w-max h-full">
                <div className="w-full h-12 min-h-12 bg-white text-center justify-center p-1 fixed left-0 right-0 flex flex-row shadow-2xl">
                    <div className="w-6/12 md:w-10/12 inline-flex text-center items-center">
                        <img src={logo} alt="<Programigos />" className="w-44 h-10" />
                    </div>
                    <div className="w-6/12 md:w-2/12 inline-flex items-center justify-center">
                        <button onClick={feedPageHandler} className="p-3 flex items-center text-green-500 max-w-max hover:bg-green-300 hover:shadow-lg rounded-full w-10 h-10">
                            <svg className="w-full h-full flex items-center"><FaHome /></svg>
                        </button>
                        <button onClick={logoutHandler} className="p-3 flex mx-4 items-center text-green-500 max-w-max hover:bg-green-300 hover:shadow-lg rounded-full w-10 h-10">
                            <svg className="w-full h-full flex items-center"><FaSignOutAlt /></svg>
                        </button>
                    </div>
                </div>
                {posts.length === 0 ? <p className="mt-32 font-bold text-green-700 border-2 border-green-700 p-3 rounded-md bg-white">No hay elementos guardados</p> :
                <FavoritePost 
                    posts={posts} 
                    handleLike={handleLike}
                    handleFavorite={handleFavorite}
                />}
            </main>
        </div>
    )
}

export default Favorites