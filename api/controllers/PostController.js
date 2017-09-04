/**
 * Controller
 *
 * @description :: Server-side logic for managing Posts

 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    
      /**
       * `PostController.find()`
       * Find all Posts
       */
      find: function (req, res) {
        console.log('Post.find');
        Post.find().exec(function (err, Posts) {
          if(err) 
            return res.status(500).json(err);
          else 
            res.json(Posts);
        });
      },
    
    
      /**
       * `PostController.findOne()`
       * Find one Post by ID
       */
      findOne: function (req, res) {
        Post.findOne({ id: req.params.id }).exec(function (err, Post) {
          if(err) 
            return res.status(500).json(err);
          else 
            res.json(Post);
        });
      },
    
    
      /**
       * `PostController.create()`
       * Create a new Post
       */
      create: function (req, res) {
        console.log('Post.create');
        Post.create({ firstName: req.body.firstName, lastName: req.body.lastName}).exec(function (err, Post) {
          if(err) return res.status(500).json(err);
          else res.json(Post);
        });
      },
    
    
      /**
       * `PostController.update()`
       * Update an existing Post by ID
       */
      update: function (req, res) {
        Post.update({id: req.params.id}, {firstName: req.body.firstName}).exec(function (err, Post) {
          if(err) return res.status(500).json(err);
          else res.json(Post);
        });
      },
        
      /**
       * `PostController.destroy()`
       * Destroy an existing Post by ID
       */
      destroy: function (req, res) {
        Post.destroy({id: req.params.id}).exec(function (err, Post) {
          if(err) return res.status(500).json(err);
          else res.ok();
        });
      }
    };
    
