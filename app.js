//* load modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const connectMongo = require('connect-mongo');
const connectFlash = require('connect-flash');
const edge = require('edge.js');

//* load controllers
const createPostController = require('./controllers/createPost');
const homePageController = require('./controllers/homePage');
const storePostController = require('./controllers/storePost');
const getPostController = require('./controllers/getPost');
const createUserController = require('./controllers/createUser');
const storeUserController = require('./controllers/storeUser');
const loginController = require('./controllers/login');
const loginUserController = require('./controllers/loginUser');
const logoutController = require('./controllers/logout');

// init app
const app = express();

// connect to mongo
mongoose.connect("mongodb://localhost:27017/node-js-blog", {
  useNewUrlParser: true
})

// serving static files
app.use(express.static('public'));

// set template engine Edge
app.use(require('express-edge'));
app.set('views', `${__dirname}/views`);

// set body-parser middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

// save session
const mongoStore = connectMongo(session);

// set express session middleware
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  store: new mongoStore({
    mongooseConnection: mongoose.connection
  })
}));

// set connect flash middleware
app.use(connectFlash());

// set file upload middleware
app.use(fileUpload());

// load custom middleware for validation to store posts
const storePost = require('./middleware/storePost');

// load custom middleware for authorization
const auth = require('./middleware/auth');

// load custom middleware to check if user is authenticated then redirect
const redirectIfAuthenticated = require('./middleware/redirectIfAuthenticated');

// set global variable auth
app.use('*', (req, res, next) => {
  edge.global('auth', req.session.userId);
  next();
})
// get req to home
app.get('/', homePageController);

// get req to create a new post
app.get('/posts/new', auth, createPostController);

// post req to store a post
app.post('/posts/store', auth, storePost, storePostController);

// get req to specific post
app.get('/post/:id', getPostController)

// get req to register
app.get('/auth/register', redirectIfAuthenticated, createUserController)

// post req to register
app.post('/auth/register', redirectIfAuthenticated, storeUserController);

// get req to login
app.get('/auth/login', redirectIfAuthenticated, loginController);

// post req to login
app.post('/auth/login', redirectIfAuthenticated, loginUserController);

// get req to logout
app.get('/auth/logout', logoutController);

// waiting for a port to listen
app.listen(4000, () => {
  console.log('App listening on port 4000');
})