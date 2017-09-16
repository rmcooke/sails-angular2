/**
 * Request.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  
   tableName : "requests",
  
    attributes: {
      id :          { type: 'string', required:true },
      timestamp:    { type: 'string', required:true },
      lang :        { type: 'string', required:true },
      result :      { type: 'object', required:true },  
      status :      { type: 'object', required:true },
      sessionId:    { type: 'string', required:true }
    }
  };