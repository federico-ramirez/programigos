
import { FaRegHeart, FaRegComment, FaBookmark, FaHeart } from "react-icons/fa";

const getUsername = () => localStorage.getItem("username");

const FavoritesCard = ({ post, like, handleFavorite }) => {
    const src = post?.image;

    var moment = require('moment')
    moment().locale()

    let createdAtJSON = post.createdAt;
    let createdJSONDate = Date.parse(createdAtJSON.toString())
    let createdAtDate = moment(createdJSONDate).format('DD/MM/YYYY, hh:mm a')

    let updatedAtJSON = post.updatedAt
    let updatedJSONDate = Date.parse(updatedAtJSON.toString())
    let updatedAtDate = moment(updatedJSONDate).format('DD/MM/YYYY, hh:mm a')

    const isLikedByUser = () => post.likes.find(like => like.username === getUsername()) != null;

    return (
        <div className="w-auto max-w-full h-auto max-h-1/12 bg-white rounded-md p-3 shadow-2xl m-2">
            <h3 className="font-semibold p-4 2xl:text-5xl border-b-2"> {post.user.username} </h3>
            <img src={src} alt={post.title} className="w-full h-80 border-b-2" />
            <br></br>
            <div className="w-max flex flex-row">
                <div className="inline-flex items-center mr-4">
                    <button onClick={() => like(post._id)} className={`p-3 flex items-center bg-white  max-w-max shadow-sm hover:bg-green-200 hover:shadow-lg rounded-full w-10 h-10  `}>
                        <svg className={`w-full h-full flex items-center ${isLikedByUser() && `text-red-600`}`}>
                            {isLikedByUser() ? <FaHeart /> : <FaRegHeart />}
                        </svg>
                    </button >
                    <p className="text-red-600 font-semibold ml-2">
                        {post.likes.length}
                    </p>
                </div>
                <div className="inline-flex items-center mr-4">
                    <div className="p-3 flex items-center bg-white text-blue-900 max-w-max shadow-sm rounded-full w-10 h-10" disabled>
                        <svg className="w-full h-full flex items-center"><FaRegComment /></svg>
                    </div>
                    <p className="text-blue-900 font-semibold"> {post.comments.length} </p>
                </div>
                <div className="inline-flex items-center mr-4">
                    <button className="p-3 flex items-center bg-white text-yellow-400 max-w-max shadow-sm hover:bg-gray-300 hover:shadow-lg rounded-full w-10 h-10 " onClick={() => handleFavorite(post._id)}>
                        <svg className="w-full h-full flex items-center"><FaBookmark /></svg>
                    </button>
                </div>
            </div>
            <h4 className="text-sm md:text-base 2xl:text-5xl font-semibold">{post.title}</h4>
            <p className="text-sm md:text-base 2xl:text-5xl"> {post.description} </p>
            <p className="text-gray-500 text-xs 2xl:text-3xl">Publicado el {createdAtDate} </p>
            <p className="text-gray-500 text-xs 2xl:text-3xl">Actualizado el {updatedAtDate} </p>
        </div>
    )
}

export default FavoritesCard