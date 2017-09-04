/**
 * ExchangesDescriptionController
 *
 * @description :: Server-side logic for managing ExchangesDescriptions

 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    
      /**
       * `ExchangesDescriptionController.find()`
       * Find all ExchangesDescriptions
       */
      find: function (req, res) {
        console.log('ExchangesDescription.find');
        ExchangesDescription.find().exec(function (err, ExchangesDescriptions) {
          if(err) 
            return res.status(500).json(err);
          else 
            res.json(ExchangesDescriptions);
        });
      },
    
    
      /**
       * `ExchangesDescriptionController.findOne()`
       * Find one ExchangesDescription by ID
       */
      findOne: function (req, res) {
        ExchangesDescription.findOne({ id: req.params.id }).exec(function (err, ExchangesDescription) {
          if(err) 
            return res.status(500).json(err);
          else 
            res.json(ExchangesDescription);
        });
      },
    
    
      /**
       * `ExchangesDescriptionController.create()`
       * Create a new ExchangesDescription
       */
      create: function (req, res) {
        ExchangesDescription.create({ firstName: req.body.firstName, lastName: req.body.lastName}).exec(function (err, ExchangesDescription) {
          if(err) return res.status(500).json(err);
          else res.json(ExchangesDescription);
        });
      },
    
    
      /**
       * `ExchangesDescriptionController.update()`
       * Update an existing ExchangesDescription by ID
       */
      update: function (req, res) {
        ExchangesDescription.update({id: req.params.id}, {firstName: req.body.firstName}).exec(function (err, ExchangesDescription) {
          if(err) return res.status(500).json(err);
          else res.json(ExchangesDescription);
        });
      },
        
      /**
       * `ExchangesDescriptionController.destroy()`
       * Destroy an existing ExchangesDescription by ID
       */
      destroy: function (req, res) {
        ExchangesDescription.destroy({id: req.params.id}).exec(function (err, ExchangesDescription) {
          if(err) return res.status(500).json(err);
          else res.ok();
        });
      }
    };
    
