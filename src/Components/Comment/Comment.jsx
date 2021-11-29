const Comment = ({username, description}) => {
    return (
        <div className="w-full max-w-96 h-auto bg-gray-100 rounded-md p-2 mb-2">
            <div className="max-w-screen-md">
                <p className="text-gray-500 font-semibold text-sm 2xl:text-4xl"> {username} </p> <p className="text-sm 2xl:text-4xl overflow-ellipsis overflow-x-hidden max-h-16">{description}</p>
            </div>
        </div>
    )
}

export default Comment