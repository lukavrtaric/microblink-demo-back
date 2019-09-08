const express = require('express');
const scanRoutes = express.Router();

let MRTDModel = require('../models/MRTD');

// Create MRTD scan
scanRoutes.route('/create').post(function (req, res) {
  let scan = new MRTDModel(req.body);
  scan.save()
    .then(scan => {
        res.status(200).json(scan);
    })
    .catch(err => {
        res.json(err);
    });
});

// Get all MRTD scans
scanRoutes.route('/').get(function (req, res) {
  MRTDModel.find(function (err, scans) {
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

// Delete MRTD scan
scanRoutes.route('/delete/:id').get(function (req, res) {
  MRTDModel.findByIdAndRemove({_id: req.params.id}, function(err, user){
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