const User = require('./../models/users');
const express = require('express');
const sess = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { router } = require('../app');
const app = require('../app');

const userRouter = express.Router();
userRouter.use(bodyParser.json());

userRouter.post('/signup', (req, res, next) => {
    User.findOne({username: req.body.username}).then(user => {
        if (user != null) {
            var err = new Error('User ', + req.body + 'already exist!');
            err.status = 403;
            next(err);
        } else {
            return User.create({
                username: req.body.username,
                password: req.body.password,
                admin: req.body.admin
            })
        }
    }).then(user => {
        res.statusCode =200;
        res.setHeader('Content-Type', 'application/json');
        res.json({'status': 'Registration successfull', 'user': user});
    }, error => next(error))
    .catch(err=> next(err));
})

userRouter.post('/login', (req, res, next) => {
    if (!req.session.user) {
        let authHeader = req.headers.authorization;
        if (!authHeader) {
          let err = new Error("You're not authenticated!");
          res.setHeader('WWW-Authenticate', 'Basic');
          err.status = 401;
          next(err);
          return;
        }
      
        let auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
        let username = auth[0];
        let password = auth[1];
        let admin;
        // pastikan credential benar

        User.findOne({username: username})
        .then(user => {
            if (user === null) {
                var err = new Error('User '+ req.body.username +' did not exist!');
                err.status = 403;
                //next(err);
               // res.redirect(req.get('referer'));
            } else if (user.password !== password) {
                var err = new Error('Password incorrect!');
                err.status = 403;
                //next(err);
               // res.redirect(req.get('referer'));
            } else if (user.username === username && password === user.password && !user.admin) {
                var err = new Error('Not admin!');
                err.status = 403;
                //next(err);
               // res.redirect(req.get('referer'));
            } else if (user.username === username && password === user.password){
                req.session.user = "authenticated";
                req.session.username = user.username ;
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/plain');
                res.end("You're authenticated!");
                
            }
        }, error => next(error))
        .catch(err=> next(err));
        
      } 
      else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end("You're authenticated!");
        
      }
})


app.listen

module.exports = userRouter;