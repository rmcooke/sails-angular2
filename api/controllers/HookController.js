/**
 * HookController
 *
 * @description :: Server-side logic for managing Hooks
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
    let id = req.param('id'),
        timestamp = req.param('timestamp'),
        lang = req.param('lang'),
        result = req.param('result'),
        status = req.param('status'),
        sessionId = req.param('sessionId');



    Hook.create({
      id : id,
      timestamp : timestamp,
      lang : lang,
      result : result,
      status : status,
      sessionId : sessionId
    })
    .then(_hook => {
      if(!_hook) return res.serverError({err:'Unable to create hook'});
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
      .then(_hook => {
        if (!_hook) throw new Error('Unable to create new post');
        return res.json({ hook: _hook });
      })
    }}).catch(err => res.serverError(err.message));
  },

  /**
   * `HookController.findAll()`
   */  
  findAll: function (req, res) {
    Hook.find()
      .populate('timestamp')
      .populate('lang')
      .populate('status')
      .populate('sessionId')
      .then(_hooks => {
        if (!_hooks || _hooks.length === 0) {
          throw new Error('No hook found');
        }
        return res.ok(_hooks);
      })
      .catch(err => res.serverError(err));
  },


  /**
   * `HookController.findOne()`
   */

  findOne: function (req, res) {

    let hookId = req.params.id;

    if (!hookId) return res.badRequest({ err: 'missing hook_id field' });

    Hook.findOne({ id: hookId })
      .populate('timestamp')
      .populate('lang')
      .populate('status')
      .populate('sessionId')      
      .then(_hook => {
        if (!_hook) return res.notFound({ err: 'No hook found' });

        return res.ok(_hook);
      })
      .catch(err => res.serverError(err));
  },
};

