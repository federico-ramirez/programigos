import Card from "../Card/Card"

const Feed = ({ posts=[], handleLike, handleComment, handleFavorite, favorites }) => {
    return (
        <div className="mt-16 flex flex-col bg-gray-300 bg-opacity-10 w-full md:w-2/5 md:min-w-2/5 2xl:w-2/3 h-full md:mx-auto">
            {
                posts.map(post => {
                    return <Card 
                    key={post._id}
                     post={post} 
                     like={handleLike}
                     handleComment={handleComment} 
                     handleFavorite={handleFavorite}
                     favorites={favorites}
                     isAdmin={false}/>
                })
            }
        </div>
    )
}

export default Feed