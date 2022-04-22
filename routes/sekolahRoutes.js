const Data_smkn = require('./../models/sekolah');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const smknRouter = express.Router();
smknRouter.use(bodyParser.json());

// localhost:3000/dish
smknRouter.route('/')
.get((req, res, next) => {
    Data_smkn.find({}).then(data_smkn => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(data_smkn);
    }, error => next(error))
    .catch(err=> next(err));
})
.post((req, res, next) => {
    let newData_smkn = Data_smkn(req.body);
    newData_smkn.save().then(data_smkn => {
        console.log("data smk created");

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(data_smkn);
    }, error => next(error))
    .catch(err=> next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('Put not supported');
})
.delete((req, res, next) => {
    Data_smkn.remove({})
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    }, error => next(error))
    .catch(err=> next(err));
})

// localhost:3000/dish/{id}
smknRouter.route('/:sekolahId')
.get((req, res, next) => {
    Data_smkn.findById({_id: req.params.sekolahId})
    .then(dish => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    }, error => next(error))
    .catch(err=> next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST not supported');
})
.put((req, res, next) => {
    Data_smkn.findByIdAndUpdate(req.params.sekolahId, {
        $set: req.body
    }, {new: true})
    .then(data_smkn => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(data_smkn);
    }, error => next(error))
    .catch(err=> next(err));
})
.delete((req, res, next) => {
    Data_smkn.findByIdAndRemove(req.params.sekolahId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    }, error => next(error))
    .catch(err=> next(err));
});

module.exports = smknRouter;