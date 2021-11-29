import Card from "../Card/Card";

const Posts = ({ posts=[], navigate, changeVisibility }) => { 
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 mt-12">
      {
        posts.map( post => {
          return <Card 
            key={post._id}
            post={post} 
            favorites={[]}
            isAdmin={true}
            onClick={navigate}
            visibility={changeVisibility}
            />
        })
      }
    </div>  
  );
}

export default Posts;