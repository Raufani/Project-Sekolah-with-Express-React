const data_smkn_guru = require('./../models/guru');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const cors = require('./cors');

const smknRouter = express.Router();
smknRouter.use(bodyParser.json());

// localhost:3000/dish
smknRouter.route('/')
.options(cors.corsWithOption, (req, res) => {res.sendStatus(200);})
.get(cors.cors,(req, res, next) => {
    data_smkn_guru.find({}).then(data_smkn_guru => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(data_smkn_guru);
    }, error => next(error))
    .catch(err=> next(err));
})
.post(cors.corsWithOption,(req, res, next) => {
    let newdata_smkn_guru = data_smkn_guru(req.body);
    newdata_smkn_guru.save().then(data_smkn_guru => {
        console.log("data smk created");

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(data_smkn_guru);
    }, error => next(error))
    .catch(err=> next(err));
})
.put(cors.corsWithOption,(req, res, next) => {
    res.statusCode = 403;
    res.end('Put not supported');
})
.delete(cors.corsWithOption,(req, res, next) => {
    data_smkn_guru.remove({})
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    }, error => next(error))
    .catch(err=> next(err));
})

// localhost:3000/dish/{id}
smknRouter.route('/:guruId')
.get((req, res, next) => {
    data_smkn_guru.findById({_id: req.params.guruId})
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
    data_smkn_guru.findByIdAndUpdate(req.params.guruId, {
        $set: req.body
    }, {new: true})
    .then(data_smkn_guru => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(data_smkn_guru);
    }, error => next(error))
    .catch(err=> next(err));
})
.delete((req, res, next) => {
    data_smkn_guru.findByIdAndRemove(req.params.guruId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    }, error => next(error))
    .catch(err=> next(err));
});

module.exports = smknRouter;