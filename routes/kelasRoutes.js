const data_smkn_kelas = require('./../models/kelas');
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
    data_smkn_kelas.find({}).then(data_smkn_kelas => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(data_smkn_kelas);
    }, error => next(error))
    .catch(err=> next(err));
})
.post(cors.corsWithOption,(req, res, next) => {
    let newdata_smkn_kelas = data_smkn_kelas(req.body);
    newdata_smkn_kelas.save().then(data_smkn_kelas => {
        console.log("data smk created");

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(data_smkn_kelas);
    }, error => next(error))
    .catch(err=> next(err));
})
.put(cors.corsWithOption,(req, res, next) => {
    res.statusCode = 403;
    res.end('Put not supported');
})
.delete(cors.corsWithOption,(req, res, next) => {
    data_smkn_kelas.remove({})
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    }, error => next(error))
    .catch(err=> next(err));
})

// localhost:3000/dish/{id}
smknRouter.route('/:kelasId')
.get((req, res, next) => {
    data_smkn_kelas.findById({_id: req.params.kelasId})
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
    data_smkn_kelas.findByIdAndUpdate(req.params.kelasId, {
        $set: req.body
    }, {new: true})
    .then(data_smkn_kelas => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(data_smkn_kelas);
    }, error => next(error))
    .catch(err=> next(err));
})
.delete((req, res, next) => {
    data_smkn_kelas.findByIdAndRemove(req.params.kelasId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    }, error => next(error))
    .catch(err=> next(err));
});

module.exports = smknRouter;