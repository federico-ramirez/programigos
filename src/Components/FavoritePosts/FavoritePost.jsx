import FavoritesCard from "../FavoritesCard/FavoritesCard"

const FavoritePost = ({ posts=[], handleFavorite, handleLike }) => {
    return (
        <div className="mt-16 m-auto grid grid-flow-row md:grid-cols-3 auto-col-auto bg-green-100 bg-opacity-10 w-full md:w-10/12 h-full md:mx-auto">
            {
                posts.map(post => {
                    return <FavoritesCard 
                    key={post._id} 
                    post={post} 
                    like={handleLike}
                    handleFavorite={handleFavorite}
                    />
                })
            }
        </div>
    )
}

export default FavoritePost