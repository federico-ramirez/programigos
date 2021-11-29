import { useState, useEffect } from "react";
import { useUserContext } from '../../Contexts/UserContext'
import { useNavigate } from 'react-router-dom'
import { postServices } from '../../Services/Admin/Admin.services'
import Post from '../../Components/Post/Posts';
import Pagination from '../../Components/Pagination/Pagination';
import { FaSignOutAlt, FaFileMedical } from "react-icons/fa";
import logo from '../../assets/img/Programigos.png'


const getUsername = () => localStorage.getItem("username");

export default function Admin() {

    const navigate = useNavigate();
    const { logout } = useUserContext();

    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(0);
    const [isNextPageAvailable, setIsNextPageAvailable] = useState(true);
    const [recharge, setRecharge] = useState(false);
    const [query, setQuery] = useState('owned');

    useEffect(() => {
        const fetchPosts = async () => {
            try {

                const filters = { limit: 6, page: page, query: query };
                const response = await postServices.getPosts(filters);

                setIsNextPageAvailable(response.isNextPageAvailable);
                if (!response.success) {
                    throw new Error('Something was wrong')
                }
                setPosts(response.items);
                setRecharge(false);
            } catch (error) {
                console.error(error);
            }
        };
        fetchPosts();
    }, [page, recharge, query]);

    const logoutHandler = () => {
        logout()
        navigate("/login")
    }

    async function changeVisibility(id) {
        try {
            const response = await postServices.stateVisibilityPost(id);
            if (!response.success) {
                throw new Error('Something was wrong')
            }
            setRecharge(true);
        } catch (error) {
            console.error(error);
        }
    }

    const changeAllPosts = (type) => {
        setQuery(type)
        setPage(0)
    }

    const createPost = () => {
        navigate("/post")
    }

    const navigateToPost = (id, active, username) => {
        if (active && username === getUsername()) navigate('/post/' + id)
    }

    const next = () => {
        if (isNextPageAvailable) {
            setPage(page + 1);
        }
    }

    const prev = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    }

    return (
        <div className="w-full flex justify-center min-h-screen bg-green-100 overflow-x-hidden">
            <main className="w-max h-full">
                <div className="w-full h-12 min-h-12 bg-white text-center justify-center p-1 fixed left-0 right-0 flex flex-row">
                    <div className="w-6/12 md:w-10/12 inline-flex text-center items-center">
                        <img src={logo} alt="<Programigos />" className="w-44 h-10" />
                    </div>
                    <div className="w-6/12 md:w-2/12 inline-flex items-center justify-center">
                        <button onClick={createPost} className="p-3 flex items-center text-green-500 max-w-max hover:bg-green-300 hover:shadow-lg rounded-full w-10 h-10">
                            <svg className="w-full h-full flex items-center"><FaFileMedical /></svg>
                        </button>
                        <button onClick={logoutHandler} className="p-3  mx-4 flex items-center text-green-500 max-w-max hover:bg-green-300 hover:shadow-lg rounded-full w-10 h-10">
                            <svg className="w-full h-full flex items-center"><FaSignOutAlt /></svg>
                        </button>
                    </div>
                </div>
                <div className="bg-white mt-12 shadow-2xl">
                    <nav className="flex flex-col justify-center sm:flex-row">
                        <button onClick={() => changeAllPosts('owned')} className={`text-gray-600 py-4 px-6 block hover:text-green-500 focus:outline-none ${query === `owned` && `text-green-500 border-b-2 font-medium border-green-500`}`}>Posts del Admin</button>
                        <button onClick={() => changeAllPosts('all')} className={`text-gray-600 py-4 px-6 block hover:text-green-500 focus:outline-none ${query === `all` && `text-green-500 border-b-2 font-medium border-green-500`}`}>Posts de los Usuarios</button>
                    </nav>
                </div>
                <Post posts={posts} navigate={navigateToPost} changeVisibility={changeVisibility} />
                <Pagination next={next} prev={prev} />
            </main>
        </div>
    )
}

