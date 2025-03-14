let posts = [
    {id: 1, 'title': 'Post One'},
    {id: 2, 'title': 'Post Two'},
    {id: 3, 'title': 'Post Three'}
];

//@desc Get all posts
//@route GET /api/posts
export const getPosts = (req,res) => {
    const limit = parseInt(req.query.limit);

    if(!isNaN(limit) && limit > 0){
           return res.status(200).json(posts.slice(0, limit)); 
    }

    res.status(200).json(posts);
};

//@desc get posts by id
//@route GET /api/posts/:id
export const getPost = (req,res, next) => {
    const id = parseInt(req.params.id);
    const post = posts.find(post => post.id === id);    
    
    if(!post){
        const err = new Error("Error!")
        err.status =404;
        return next(err);
    }
        
    res.status(200).json(post);
}

//@desc post new title
//@route POST /api/posts
export const createPost = (req,res, next) => {

    const newPost = {
        id: posts.length + 1,
        title: req.body.title
    };


    if(!newPost.title){
        const err = new Error("Error! include a title")
        err.status = 400;
        return next(err);
    }

    posts.push(newPost);
    res.status(200).json(posts);

}

//@desc update post
//@route UPDATE /api/posts/:id
export const updatePost = (req,res,next) => {
    const id = parseInt(req.params.id)
    const post = posts.find(post => post.id === id);

    if(!post){
        
        const err = new Error("Error!")
        err.status = 400;
        return next(err);
    }

    post.title = req.body.title
    res.status(200).json(post);
}

//@dec delete post
//@route DELETE /api/posts/:id
export const delPost = (req,res) => {
    const id = parseInt(req.params.id)
    const post = posts.find(post => post.id === id);

    if(!post){
        return res.status(404).json({ msg: `A post with the id of ${id} was not found!`})
    }

    posts = posts.filter((post) => post.id !==id);
    res.status(200).json(posts);
}

