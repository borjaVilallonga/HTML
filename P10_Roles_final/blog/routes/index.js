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
/* P10 - Para publicar un post el usuario debe estar logueado. */
router.get('/posts/new', sessionController.loginRequired, postController.new);

/* P6 - Tarea 8.2: POST /posts */
router.post('/posts', upload.single('image'), postController.create);

/* P6 - Tarea 8.3: GET /posts/:postId/edit */
/* P10 - Los posts solo pueden ser editados por su autor, o por un usuario administrador. */
router.get('/posts/:postId(\\d+)/edit', postController.adminOrAuthorRequired, postController.edit);

/* P6 - Tarea 8.4: GET /posts/:postId/update */
router.put('/posts/:postId(\\d+)', upload.single('image'), postController.update);

/* P6 - Tarea 8.5: DELETE /posts/:postId */
/* P10 - Los posts solo pueden ser borrados por su autor, o por un usuario administrador. */
router.delete('/posts/:postId(\\d+)', postController.adminOrAuthorRequired, postController.destroy);

/*
=======================
PRÁCTICA 8: Routes for the resource /users
=======================
*/

router.param('userId', userController.load);

/* P10 - La lista de usuarios registrados solo la puede ver un usuario administrador. */
router.get('/users',                    sessionController.adminRequired, userController.index);

/* P10 - El perfil de un usuario solo lo puede ver el propio usuario, o un usuario administrador. */
router.get('/users/:userId(\\d+)',      sessionController.adminOrMyselfRequired, userController.show);

/* P10 - Solo el administrador puede crear nuevos usuarios. */
router.get('/users/new',                sessionController.adminRequired, userController.new);

/* P10 - Solo el administrador puede crear nuevos usuarios. */
router.post('/users',                   sessionController.adminRequired, userController.create);

/* P10 - El perfil de un usuario solo lo puede editar el propio usuario, o un usuario administrador. */
router.get('/users/:userId(\\d+)/edit', sessionController.adminOrMyselfRequired, userController.edit);

/* P10 - El perfil de un usuario solo lo puede editar el propio usuario, o un usuario administrador. */
router.put('/users/:userId(\\d+)',      sessionController.adminOrMyselfRequired, userController.update);

/* P10 - Borrar a un usuario de la BBDD solo le está permitido al propio usuario, o a un usuario administrador. */
router.delete('/users/:userId(\\d+)',   sessionController.adminOrMyselfRequired, userController.destroy);

// Routes for the resource /session
router.get('/login',    sessionController.new);     // login form
router.post('/login',   sessionController.create);  // create sesion
router.delete('/login', sessionController.destroy); // close sesion

module.exports = router;
