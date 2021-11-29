import React, { useState, useEffect } from "react";
import Feed from "../../Components/Feed/Feed";
import Pagination from "../../Components/Pagination/Pagination"
import { FaSignOutAlt, FaBookmark } from "react-icons/fa";
import { useUserContext } from '../../Contexts/UserContext'
import { allPostServices } from "../../Services/Users/Users.services";
import { postServices } from "../../Services/Admin/Admin.services"
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/img/Programigos.png'

const UserFeed = () => {
    const navigate = useNavigate()
    const { logout } = useUserContext()

    const [posts, setPosts] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [page, setPage] = useState(0);
    const [isNextPageAvailable, setIsNextPageAvailable] = useState(true);
    const [recharge, setRecharge] = useState(false);

    useEffect(() => {
        const fetchFeedPosts = async () => {
            try {
                const filters = { limit: 10, page: page };
                const response = await allPostServices.getAllPosts(filters)
                const favorites = await allPostServices.getFavorites()


                setIsNextPageAvailable(response.isNextPageAvailable);
                if (!response.success) {
                    throw new Error('Something was wrong')
                }
                setRecharge(false)
                setPosts(response.items)
                setFavorites(favorites.items)
            } catch (error) {
                console.error(error);
            }
        };
        fetchFeedPosts();
    }, [page, recharge]);

    const next = () => {
        if (isNextPageAvailable) {
            window.scrollTo(0, 0);
            setPage(page + 1);
        }
    }

    const prev = () => {
        if (page > 0) {
            window.scrollTo(0, 0);
            setPage(page - 1);
        }
    }

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

    const handleComment = async (id, comment) => {
        try {
            const response = await postServices.sendComment(id, comment);

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

    const favoritePageHandler = () => {
        navigate("/favorites")
    }

    return (
        <div className="w-full flex justify-center min-h-screen bg-green-100 overflow-x-hidden">
            <main className="w-full h-full">
                <div className="w-full h-12 min-h-12 bg-white text-center justify-center p-1 fixed left-0 right-0 flex flex-row shadow-2xl">
                    <div className="w-6/12 md:w-10/12 inline-flex text-center items-center">
                        <img src={logo} alt="<Programigos />" className="w-44 h-10" />
                    </div>
                    <div className="w-6/12 md:w-2/12 inline-flex items-center justify-center">
                        <button onClick={favoritePageHandler} className="p-3 flex items-center text-green-500 max-w-max hover:bg-green-300 hover:shadow-lg rounded-full w-10 h-10">
                            <svg className="w-full h-full flex items-center"><FaBookmark /></svg>
                        </button>
                        <button onClick={logoutHandler} className="p-3 flex mx-4 items-center text-green-500 max-w-max hover:bg-green-300 hover:shadow-lg rounded-full w-10 h-10">
                            <svg className="w-full h-full flex items-center"><FaSignOutAlt /></svg>
                        </button>
                    </div>
                </div>
                <Feed
                    posts={posts}
                    handleLike={handleLike}
                    handleComment={handleComment}
                    handleFavorite={handleFavorite}
                    favorites={favorites} />
                <Pagination next={next} prev={prev} />
            </main>
        </div>
    )
}

export default UserFeed