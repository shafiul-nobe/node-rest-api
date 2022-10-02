const { validationResult } = require("express-validator");
const Post = require("../models/post");

exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [
      {
        _id: 1,
        title: "First post",
        content: "This is the first post!",
        imageUrl: "image/duck.jpg",
        creator: {
          name: "Shohan",
        },
        date: new Date(),
      },
    ],
  });
};

exports.createPost = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('validation failed');
    error.statusCode = 422;
    throw error;
  }
  const title = req.body.title;
  const content = req.body.content;
  const imageUrl = req.body.imageUrl;
  const creator = req.body.creator;
  console.log(title);

  const post = new Post({
    title: title,
    content: content,
    imageUrl: imageUrl,
    creator: creator,
  });

  post
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "created",
        post: result,
      });
    })
    .catch((err) => {
        if(!err.statusCode)
        {
            err.statusCode = 500;
        }
        next(err);
        console.log(err);
    });
};
