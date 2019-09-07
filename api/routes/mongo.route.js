const express = require('express');
const scanRoutes = express.Router();

let Scan = require('../models/Scan');

// Add scan
scanRoutes.route('/create').post(function (req, res) {
  let scan = new Scan(req.body);
  scan.save()
    .then(scan => {
        res.status(200).json(scan);
    })
    .catch(err => {
        res.json(err);
    });
});

// Get all scans
scanRoutes.route('/').get(function (req, res) {
  Scan.find(function (err, scans) {
    if (err) {
      console.log(err);
      res.json(err);
    }
    else {
      console.log(scans);
      res.status(200).json(scans);
    }
  });
});

// Get scan by id
scanRoutes.route('/details/:id').get(function (req, res) {
  Scan.findById(req.params.id, function (err, scan){
    if (err) {
      res.json(err);
    }
      res.status(200).json(scan);
  });
});

//  Update scan
/*
scanRoutes.route('/update/:id').post(function (req, res) {
    Scan.findById(req.params.id, function(err, user) {
    if (!user) {
      return next(new Error('Could not load User'));
    }
    else {
      user.first_name = req.body.first_name;
      user.last_name = req.body.last_name;
      user.email_address = req.body.email_address;

      user.save().then(user => {
        res.json('Update complete');
      })
      .catch(err => {
          res.status(400).send("Unable to update the database");
      });
    }
  });
});
*/

// Delete scan
scanRoutes.route('/delete/:id').get(function (req, res) {
    Scan.findByIdAndRemove({_id: req.params.id}, function(err, user){
        if (err) {
          res.json({
            status: false,
            message: "Error while removing user.",
            data: err
          });
        } 
        else {
          res.json({
            status: true,
            message: "User successfully removed",
            data: user
          });
        }
    });
});

module.exports = scanRoutes;