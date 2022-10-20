var express = require('express');
var router = express.Router();
const user_controller = require('../Service/controller/user_controller');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/join', function(req, res)
{
  res.render('join');
})

router.post('/join', function(req, res)
{
  user_controller.c_UserJoin(req, res);
})

router.post('/join',user_controller.c_UserJoin);

router.get('/leave', function(req, res)
{
  res.render('leave');
})

router.post('/leave', function(req, res)
{
  user_controller.c_UserLeave(req, res);
})

router.get('/login', function(req, res)
{
  res.render('login');
})

router.post('/login', function(req, res)
{
  user_controller.c_UserLogin(req, res);
})

router.get('/error', function(req, res)
{
  console.log(req.body);
  res.json(req.body);
})
// 전체 경로 localhost:3000/users/list
router.get('/list',user_controller.c_UserList);

module.exports = router;
