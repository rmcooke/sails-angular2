/**
 * UserController
 *
 * @description :: Server-side logic for managing Users

 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    
      /**
       * `UserController.find()`
       * Find all users
       */
      find: function (req, res) {
        console.log('User.find');
        User.find().exec(function (err, users) {
          if(err) 
            return res.status(500).json(err);
          else 
            res.json(users);
        });
      },
    
    
      /**
       * `UserController.findOne()`
       * Find one user by ID
       */
      findOne: function (req, res) {
        User.findOne({ id: req.params.id }).exec(function (err, user) {
          if(err) 
            return res.status(500).json(err);
          else 
            res.json(user);
        });
      },
    
    
      /**
       * `UserController.create()`
       * Create a new user
       */
      create: function (req, res) {
        User.create({ firstName: req.body.firstName, lastName: req.body.lastName}).exec(function (err, user) {
          if(err) return res.status(500).json(err);
          else res.json(user);
        });
      },
    
    
      /**
       * `UserController.update()`
       * Update an existing user by ID
       */
      update: function (req, res) {
        User.update({id: req.params.id}, {firstName: req.body.firstName}).exec(function (err, user) {
          if(err) return res.status(500).json(err);
          else res.json(user);
        });
      },
        
      /**
       * `UserController.destroy()`
       * Destroy an existing user by ID
       */
      destroy: function (req, res) {
        User.destroy({id: req.params.id}).exec(function (err, user) {
          if(err) return res.status(500).json(err);
          else res.ok();
        });
      }
    };
    
