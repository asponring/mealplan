var bodyParser = require('body-parser');
var session = require('express-session');
var utils = require('./utility');
var recipeController = require('../recipe/recipeController.js');
var mealPlanController = require('../mealPlan/mealPlanController.js');
var userController = require('../user/userController.js');
var recipePreferenceController = require('../recipePreference/recipePreferenceController');
var appController = require('../app/appController');

module.exports = function(app, express) {

  var router = express.Router();

  app.use(bodyParser.json());

  app.use(express.static(__dirname + '/../../client'));

  app.use(session({
    secret: 'pizza boat with anchovies',
    resave: false,
    saveUninitialized: true
  }));


  // 'api/users' routing
  // router.get('/api/users', utils.checkUser, utils.sendLoggedInStatus);
  router.get('/users/:username', appController.login);
  router.post('/users', appController.signup);

  // 'api/recipes' routing
  router.post('/recipes', appController.getUserRecipes);
  router.put('/recipes', appController.refillCourseQueue);
  //router.get('/recipes', utils.checkUser, recipeController.getYummlyRecipe);
  router.post('/recipes/ingredients', recipeController.createIngredientsList);
  // 'api/mealplan' routing
  router.post('/mealplan', utils.checkUser, appController.saveUserMealPlan);
  router.get('/mealplan', utils.checkUser, appController.getUserMealPlans);

  // 'api/preferences' routing
  router.post('/recipePreferences', recipePreferenceController.updatePreferences);
  router.put('/recipePreferences', recipePreferenceController.updatePreferences);


  router.get('/logout', utils.logout);
  
  app.use('/api', router);
};
