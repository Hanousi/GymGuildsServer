const express = require('express');

const router = express.Router();
const HomeController = require('../app/controllers/HomeController');
const AuthController = require('../app/controllers/AuthController');
const ChallengeController = require('../app/controllers/ChallengeController');
const FriendsController = require('../app/controllers/FriendsController');
const UserController = require('../app/controllers/UserController');
const BannerController = require('../app/controllers/BannerController');
const BadgeController = require(('../app/controllers/BadgeController'));

router.get('/', HomeController.homePage);
router.get('/login', AuthController.loginPage);
router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);
router.get('/sign-up', AuthController.signUpPage);
router.post('/sign-up', AuthController.signUp);
router.get('/forgot-password', AuthController.forgotPasswordPage);
router.post('/forgot-password', AuthController.forgotPassword);
router.post('/challenge', ChallengeController.createChallenge);
router.post('/challenge/user', ChallengeController.addUserToChallenge);
router.post('/friends', FriendsController.addFriend);
router.get('/user/:userId', UserController.getUser);
router.put('/user/:userId/points', UserController.addPoints);
router.post('/banner', BannerController.addBanner);
router.post('/banner/user', BannerController.unlockBannerForUser);
router.post('/badge', BadgeController.addBadge);
router.post('/badge/user', BadgeController.unlockBadgeForUser);

module.exports = router;
