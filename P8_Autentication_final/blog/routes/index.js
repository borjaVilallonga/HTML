var express = require('express');
var router = express.Router();

const postController = require('../controllers/post');
const sessionController = require('../controllers/session');
const userController = require('../controllers/user');

const multer = require('multer');
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {fileSize: 20 * 1024 * 1024}
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Blog' });
});

/* GET author page. */
router.get('/author', (req, res, next) => {
  res.render('author', { variable: '<li>Paquito</li>' });
});

/* P7 - Tarea 4: load */
router.param('postId', postController.load);

/* P7 - Tarea 5: GET /posts/:postID/attachment */
router.get('/posts/:postId(\\d+)/attachment', postController.attachment);

/* P7 - Tarea 6: GET /posts */
router.get('/posts', postController.index);

/* P7 - Tarea 7: GET /posts/:postId */
router.get('/posts/:postId(\\d+)', postController.show);

/* P7 - Tarea 8.1: GET /posts/new */
router.get('/posts/new', postController.new);

/* P6 - Tarea 8.2: POST /posts */
router.post('/posts', upload.single('image'), postController.create);

/* P6 - Tarea 8.3: GET /posts/:postId/edit */
router.get('/posts/:postId(\\d+)/edit', postController.edit);

/* P6 - Tarea 8.4: GET /posts/:postId/update */
router.put('/posts/:postId(\\d+)', upload.single('image'), postController.update);

/* P6 - Tarea 8.5: DELETE /posts/:postId */
router.delete('/posts/:postId(\\d+)', postController.destroy);

/*
=======================
PRÁCTICA 8: Routes for the resource /users
=======================
*/

router.param('userId', userController.load);
router.get('/users',                    userController.index);
router.get('/users/:userId(\\d+)',      userController.show);
router.get('/users/new',                userController.new);
router.post('/users',                   userController.create);
router.get('/users/:userId(\\d+)/edit', userController.edit);
router.put('/users/:userId(\\d+)',      userController.update);
router.delete('/users/:userId(\\d+)',   userController.destroy);

// Routes for the resource /session
router.get('/login',    sessionController.new);     // login form
router.post('/login',   sessionController.create);  // create sesion
router.delete('/login', sessionController.destroy); // close sesion

module.exports = router;
