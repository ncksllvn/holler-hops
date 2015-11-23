var GoogleSpreadsheet = require("google-spreadsheet");
var express = require('express')
var router = express.Router()

router.get('/', (req, res, next) => 
  res.render('index', { title: 'Home' })
)

router.get('/menu', (req, res, next) => 
  res.render('menu', { title: 'Menu' })
)

router.get('/story', (req, res, next) => 
  res.render('story', { title: 'Our Story' })
)

router.get('/contact', (req, res, next) =>
  res.render('contact', { title: 'Contact Us' })
)

// Get Beer List from Google Spreadsheet
var { beerListSpreadsheetId } = require('../locals')
var beerList = new GoogleSpreadsheet(beerListSpreadsheetId);

router.get('/tap', (req, res, next) => {
  
  beerList.getRows(1, (err, beers) => {
    
    if (err){
      let beerError = new Error('Sorry, were having trouble accessing our beer \
      list at the moment. Please try again later.')
      
      beerError.status = 500
      
      return next(beerError)
    }
    
    res.render('tap', { title: 'On Tap', beers: beers })
    
  })
  
})

module.exports = router
