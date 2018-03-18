var express = require('express');
var router = express.Router();
const common = require("../config/common");
const db = require("../config/db");
const Joi = require( 'joi' );

router.get('/', (request, response, next) => {
  response.json({
    status: true,
    message: 'respond with a resource'
  });
});


router.post('/authenticate', (request, response, next) => {
  common.log(request.body);
  let schema = {
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
  };
  Joi.validate(request.body, schema, (err, value) => {
    try {
      if(err) throw err;
      db.query('select * from users where username = ? and password = ?', [
        value.username,
        common.hash(value.password)
      ], (err, res) => {
        try {
          if(err || !res[0]) throw 'Username / Password is invalid';
          response.json({
            status: true,
            message: 'Login successful',
            data: res[0]
          });
        }
        catch (err) {
          response.json({
            status: false,
            message: res
          });
        }
      })
    }
    catch (err) {
      response.json({
        status: false,
        message: err.details[0].message
      });
    }
  });
});

module.exports = router;
