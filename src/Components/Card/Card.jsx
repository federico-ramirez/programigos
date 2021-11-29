import { FaRegHeart, FaRegBookmark, FaRegComment, FaHeart, FaBookmark, FaEye, FaEyeSlash, FaAngleRight } from "react-icons/fa";
import Comment from "../Comment/Comment";
import { useState } from 'react';
import '../../App.css'
import { ToastContainer, toast } from 'react-toastify';

const getUsername = () => localStorage.getItem("username");

const Card = ({ post, like, favorites, handleComment, handleFavorite, isAdmin, onClick, visibility }) => {
    const src = post?.image;
    const [comment, setComment] = useState('');

    const user = JSON.stringify(post.user.username)
    let userNumber = ""

    if (user[4] === "_") {
        userNumber = 0+user[3]
    } else {
        userNumber = user[3]+user[4]
    }
    
    const onChange = (e, save) => {
        save(e.target.value);
    }

    const sendComment = () => {
        if(comment.length < 8) {
            toast('El comentario debe contener mas de 8 caracteres', { type: 'error' });
        } else {
            handleComment(post._id, comment);
            setComment('');
        }
    }

    const isLikedByUser = () => post.likes.find(like => like.username === getUsername()) != null;

    const isFavoriteByUser = (id) => favorites.find(item => item === id) != null;

    var moment = require('moment')
    moment().locale()

    let createdAtJSON = post.createdAt;
    let createdJSONDate = Date.parse(createdAtJSON.toString())
    let createdAtDate = moment(createdJSONDate).format('DD/MM/YYYY, hh:mm a')

    let updatedAtJSON = post.updatedAt
    let updatedJSONDate = Date.parse(updatedAtJSON.toString())
    let updatedAtDate = moment(updatedJSONDate).format('DD/MM/YYYY, hh:mm a')


    return (
        <div className="m-4 w-auto md:w-11/12 max-w-full mb-5 bg-white rounded-md p-3 shadow-2xl overflow-x-hidden">
            <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    /> 
            <div className="w-full inline-flex items-center border-b-2">
                <div className="w-full inline-flex items-center">
                    <div className="p-2 items-center bg-green-500 text-white max-w-max shadow-sm rounded-full w-8 h-8 text-center" >
                        <div className="w-full h-full flex items-center text-center font-semibold">
                            <p className="text-white text-sm w-full">{userNumber}</p>
                        </div>
                    </div>
                    <h3 className="font-semibold p-4 2xl:text-5xl">{post.user.username} </h3>
                    { post.user.username === getUsername() && isAdmin && <div onClick={() => visibility(post._id)} className="p-4 cursor-pointer">
                    { post.active ? <FaEye/> : <FaEyeSlash/> } </div> }
                </div>
                { post.user.username === getUsername() && isAdmin && <div onClick={() => onClick(post._id, post.active, post.user.username)} className="p-4 float-right cursor-pointer"><FaAngleRight/> </div> }
            </div>
            <img src={src} alt={post.title} className="w-96 h-60 sm:h-96 border-b-2 post-image" />
            <br></br>
            { !isAdmin &&
            <div className="w-full flex flex-row">
                <div className="inline-flex items-center mr-4">
                    <button onClick={() => like(post._id)} className={`p-3 flex items-center bg-white  max-w-max shadow-sm hover:bg-green-200 hover:shadow-lg rounded-full w-10 h-10  `}>
                        <svg className={`w-full h-full flex items-center ${isLikedByUser() && `text-red-600`}`}>
                            {isLikedByUser() ? <FaHeart /> : <FaRegHeart className="text-gray-700" />}
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
                    <p className="text-blue-900 font-semibold ml-2"> {post.comments.length} </p>
                </div>
                <div className="inline-flex items-center mr-4">
                    <button className="p-3 flex items-center bg-white text-yellow-400 max-w-max shadow-sm hover:bg-green-200 hover:shadow-lg rounded-full w-10 h-10 " onClick={() => handleFavorite(post._id)}>
                        <svg className={`w-full h-full flex items-center ${isFavoriteByUser(post._id) && `text-yellow-400`}`}>
                            {isFavoriteByUser(post._id) ? <FaBookmark /> : <FaRegBookmark />}
                        </svg>
                    </button>
                </div>
            </div> }
            <div className="w-4/5 max-w-1/3">
                <h4 className="text-sm md:text-base 2xl:text-5xl font-semibold overflow-x-hidden">{post.title}</h4>
                <p className="w-60 max-w-full text-sm md:text-base 2xl:text-5xl overflow-x-hidden">{post.description} </p>
                <p className="text-gray-500 text-xs 2xl:text-3xl">Publicado el {createdAtDate}</p>
                <p className="text-gray-500 text-xs 2xl:text-3xl">Actualizado el {updatedAtDate}</p>
            </div>
            <hr className="mb-2" />
            {
                post.comments.map(function (item, index) {
                    return <Comment key={index} username={item.user.username} description={item.description} />
                })
            }
            { !isAdmin &&
            <div className="w-full inline-flex">
                <input type="text" name="comment" id="comment"
                    placeholder="Escribe un comentario"
                    className="w-11/12 border border-gray-700 rounded-md mr-1"
                    onChange={(e) => onChange(e, setComment)}
                    value={comment} />

                <button className="p-3 pt-4 flex items-center bg-white text-blue-900 max-w-max shadow-sm hover:bg-green-200 hover:shadow-lg rounded-full w-10 h-10 "
                    onClick={sendComment}>
                    <svg className="w-5 h-5 flex items-center"><FaRegComment /></svg>
                </button>
            </div> }
        </div>
    )
}

export default Card