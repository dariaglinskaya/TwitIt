const router = require('express').Router();
const AuthorizationController = require('../controllers/controller');

router.post('/login', AuthorizationController.login);
router.post('/registration', AuthorizationController.registration);

export default router;