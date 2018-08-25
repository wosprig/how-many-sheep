const express = require('express');
const app = express();
const servestatic = require('serve-static');

app.use(servestatic("."));

app.get('/sheep/:region', (req, res) => getSheep(req.params.region).then((data) => {
  res.send(data); 
}));

app.get('/humans/:region', (req, res) => getPopulation(req.params.region).then((data) => {
  res.send(data); 
}));

app.listen(3001, () => console.log('Example app listening on port 3001!'))

function getSheep(region) {
    var csv = require("csv-query");
    var numbers;
    var promise = new Promise((resolve, reject) => { csv.createFromFile(
        "livestock-data.csv"
      ).then(function (db) {
        numbers = db.find( { Livestock: 'Total sheep', Area: region } );
        numbers = numbers.value();
        population = numbers[numbers.length-1];
        resolve(population.Value);
      }).then(function (record) {
        // Do some stuff
      }).catch(function (error) {
        throw error;
    })}).catch(function (error) {
      throw error;
    });
    return promise;
  }

  function getPopulation(region) {
    var csv = require("csv-query");
    var numbers;
    var promise = new Promise((resolve, reject) => { 
      
      switch(region) {
        case "Total New Zealand": 
          csv.createFromFile(
            "national-population-estimates.csv"
          ).then(function (db) {
            numbers = db.find();
            numbers = numbers.value();
            population = numbers[numbers.length-1];
            resolve(population.population);
          }).catch(function (error) {
            throw error;
          })
          break;
        default:
          csv.createFromFile(
            "population-by-region.csv"
          ).then(function (db) {
            numbers = db.find({ Region: region });
            numbers = numbers.value();
            population = numbers[numbers.length-1];
            resolve(population.Population);
          }).catch(function (error) {
            throw error;
          })
      }
    }).catch(function (error) {
      throw error;
    });
    return promise;
  }

