import React from 'react';
import { useEffect, useState } from "react";
import { postServices } from '../../Services/Admin/Admin.services';
import { useParams } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/img/Programigos.png'
import { FaSignOutAlt, FaHome } from "react-icons/fa";
import { useUserContext } from '../../Contexts/UserContext'

const URLImageRegex = /(https?:\/\/.*\.(?:png|jpg))/i;

export default function Post() {
    const DEFAULT_IMG = "https://psicotecnicoelzahor.es/wp-content/uploads/2016/05/ef3-placeholder-image.jpg"
    const navigate = useNavigate()
    const { logout } = useUserContext()

    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');

    useEffect(() => {
        const getPost = async () => {
            try {
                const response = await postServices.getPost(id);
                setTitle(response.data.title);
                setDescription(response.data.description);
                setImage(response.data.image);
                if (!response.success) {
                    throw new Error('Something was wrong')
                }

            } catch (error) {
                console.error(error);
            }
        };
        if (id != null) getPost();
    }, [id]);

    const onChange = (e, save) => {
        save(e.target.value);
    }

    async function onSubmit(e) {
        e.preventDefault();
        if (id == null) create(); else update();
    }

    const logoutHandler = () => {
        logout()
        navigate("/login")
    }


    async function update() {
        try {
            const isValid = URLImageRegex.test(image !== '' ? image : DEFAULT_IMG)
            if (isValid) {
                if (title.length < 8 || description.length < 8) {
                    toast('Los campos deben contener mas de 8 caracteres', { type: 'error' });
                } else {
                    const response = await postServices.updatePost(id, title, description, image);
                    if (!response.success) {
                        throw new Error('Something was wrong')
                    }
                    toast('Actualizado Correctamente', { type: 'success' });
                }
            } else {
                toast('La URL de la imagen no es valida', { type: 'error' });
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function create() {
        try {
            const isValid = URLImageRegex.test(image !== '' ? image : DEFAULT_IMG)
            if (isValid) {
                if (title.length < 8 || description.length < 8) {
                    toast('Los campos deben contener mas de 8 caracteres', { type: 'error' });
                } else {
                    const response = await postServices.createPost(title, description, image);
                    if (!response.success) {
                        throw new Error('Something was wrong')
                    }
                    toast('Creado Correctamente', { type: 'success' });
                    setTitle('');
                    setDescription('');
                    setImage(DEFAULT_IMG);
                }
            } else {
                toast('La URL de la imagen no es valida', { type: 'error' });
            }
        } catch (error) {
            console.error(error);
        }
    }

    const adminPageHandler = () => {
        navigate("/admin")
    }

    return (
        <div className="w-full flex justify-center min-h-screen bg-green-100">
            <main className="w-max h-full">
                <div className="w-full h-12 min-h-12 bg-white text-center justify-center p-1 fixed left-0 right-0 flex flex-row shadow-2xl">
                    <div className="w-6/12 md:w-10/12 inline-flex text-center items-center">
                        <img src={logo} alt="<Programigos />" className="w-44 h-10" />
                    </div>
                    <div className="w-6/12 md:w-2/12 inline-flex items-center justify-center">
                        <button onClick={adminPageHandler} className="p-3 flex items-center text-green-500 max-w-max hover:bg-green-300 hover:shadow-lg rounded-full w-10 h-10">
                            <svg className="w-full h-full flex items-center"><FaHome /></svg>
                        </button>
                        <button onClick={logoutHandler} className="p-3 flex mx-4 items-center text-green-500 max-w-max hover:bg-green-300 hover:shadow-lg rounded-full w-10 h-10">
                            <svg className="w-full h-full flex items-center"><FaSignOutAlt /></svg>
                        </button>
                    </div>
                </div>
                <div className="mt-24 flex flex-col space-y-10 justify-center items-center">
                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={onSubmit}>
                        <ToastContainer
                            position="top-center"
                            autoClose={2000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                        />
                        <div className="mb-4">
                            <img className="w-72 h-72" src={URLImageRegex.test(image) ? image : DEFAULT_IMG} alt="Sunset in the mountains" />
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Titulo
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                placeholder=""
                                onChange={(e) => onChange(e, setTitle)}
                                value={title}
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Descripcion
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                placeholder=""
                                onChange={(e) => onChange(e, setDescription)}
                                value={description}
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Imagen
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                placeholder=""
                                onChange={(e) => onChange(e, setImage)}
                                value={image}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-auto" type="submit">
                                {id == null ? `Crear` : `Actualizar`}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    )
}