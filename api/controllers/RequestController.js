/**
 * requestController
 *
 * @description :: Server-side logic for managing requests
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

/* The below is needed because API.AI sends dots in keys
 * which is not tolerated by Mongo
 */ 

//var mongoObject = require('mongo-object-escape');
var googleFinance = require('google-finance');

module.exports = {
  /**
   * This is the controller which is called on
   * each and every request made to the webhook.
   */
  create: function (req, res) {

    Request.create({
      id : req.param('id'),
      timestamp : req.param('timestamp'),
      lang : req.param('lang'),
      result : req.param('result'),
      status : req.param('status'),
      sessionId : req.param('sessionId')
    })
    .then(_request => 
    {
      if(!_request) return res.serverError({err:'Unable to service request'});
      // Fetch the ticker symbol from the JSON
      // <TODO> Work out what to do when ticker has not been figured out by
      // API.AI layer 
      var now = new Date();
      var today = now.toJSON().substr(0, 10);
      now.setDate(now.getDate() - 1);
      var yesterday = now.toJSON().substr(0, 10);
      console.log("Date is:" + today);
      googleFinance.historical({
              symbol: req.param('result').parameters.tickerSymbol,
              from: yesterday,
              to: today
      })
      .then(_quote => 
      {
         if (!_quote) throw new Error('Error calling google finance module');
        return _quote;
      })
    })
    .catch(err => res.serverError(err.message));
  },

  /**
   * `requestController.findAll()`
   */  
  findAll: function (req, res) {
    Request.find()
      .populate('timestamp')
      .populate('lang')
      .populate('status')
      .populate('sessionId')
      .then(_requests => {
        if (!_requests || _requests.length === 0) {
          throw new Error('No request found');
        }
        return res.ok(_requests);
      })
      .catch(err => res.serverError(err));
  },


  /**
   * `requestController.findOne()`
   */

  findOne: function (req, res) {

    let requestId = req.params.id;

    if (!requestId) return res.badRequest({ err: 'missing request_id field' });

    Request.findOne({ id: requestId })
      .populate('timestamp')
      .populate('lang')
      .populate('status')
      .populate('sessionId')      
      .then(_request => {
        if (!_request) return res.notFound({ err: 'No request found' });

        return res.ok(_request);
      })
      .catch(err => res.serverError(err));
  },
};

