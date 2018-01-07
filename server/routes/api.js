const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

// Connect
const connection = (closure) => {
<<<<<<< HEAD
    return MongoClient.connect('mongodb://localhost:27017/recipes', (err, db) => {
=======
    return MongoClient.connect('mongodb://localhost:27017/recipebook', (err, db) => {
>>>>>>> d7486ff7be9d3e1aa04cba26cf198cbb6489396f
        if (err) return console.log(err);

        closure(db);
    });
};

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

// Get users
<<<<<<< HEAD
router.get('/users', (req, res) => {
    connection((db) => {
        db.collection('users')
            .find()
            .toArray()
            .then((users) => {
                response.data = users;
=======
router.get('/recipes', (req, res) => {
    connection((db) => {
        db.collection('recipes')
            .find()
            .toArray()
            .then((recipes) => {
                response.data = recipes;
>>>>>>> d7486ff7be9d3e1aa04cba26cf198cbb6489396f
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

module.exports = router;