/**
 * ObjectController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

/* The below is needed because API.AI sends dots in keys
 * which is not tolerated by Mongo
 */ 

//var mongoObject = require('mongo-object-escape');
var googleFinance = require('google-finance');

module.exports = {
  /**
   * This is the controller which is called on
   * each and every request made to the webobject.
   */
  create: function (req, res) {
    let id = req.param('id'),
        timestamp = req.param('timestamp'),
        lang = req.param('lang'),
        result = req.param('result'),
        status = req.param('status'),
        sessionId = req.param('sessionId');

    object.create({
      id : id,
      timestamp : timestamp,
      lang : lang,
      result : result,
      status : status,
      sessionId : sessionId
    })
    .then(_object => {
      if(!_object) return res.serverError({err:'Unable to create object'});
      // Fetch the ticker symbol from the JSON
      // <TODO> Work out what to do when ticker has not been figured out by
      // API.AI layer 
      if (req.param('result').tickerSymbol !== undefined) {
          var ticker = req.parameters.tickerSymbol;
          var now = new Date();
          var formatDate = now.toJSON().substr(0, 10);
          now.setDate(now.getDate() - 1);
          var yesterday = now.toJSON().substr(0, 10);
          console.log("Date is:" + formatDate);
          googleFinance.historical({
              symbol: ticker,
              from: yesterday,
              to: formatDate
          }).then(_quote => {
            if (!_quote) throw new Error('Error calling google finance module');
            return _quote;
          })
      .then(_object => {
        if (!_object) throw new Error('Unable to create new post');
        return res.json({ object: _object });
      })
    }}).catch(err => res.serverError(err.message));
  },

  /**
   * `objectController.findAll()`
   */  
  findAll: function (req, res) {
    object.find()
      .populate('timestamp')
      .populate('lang')
      .populate('status')
      .populate('sessionId')
      .then(_objects => {
        if (!_objects || _objects.length === 0) {
          throw new Error('No object found');
        }
        return res.ok(_objects);
      })
      .catch(err => res.serverError(err));
  },


  /**
   * `objectController.findOne()`
   */

  findOne: function (req, res) {

    let objectId = req.params.id;

    if (!objectId) return res.badRequest({ err: 'missing object_id field' });

    object.findOne({ id: objectId })
      .populate('timestamp')
      .populate('lang')
      .populate('status')
      .populate('sessionId')      
      .then(_object => {
        if (!_object) return res.notFound({ err: 'No object found' });

        return res.ok(_object);
      })
      .catch(err => res.serverError(err));
  },
};



