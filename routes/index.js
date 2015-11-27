var GoogleSpreadsheet = require("google-spreadsheet")
var email = require('../util/email')
var express = require('express')
var router = express.Router()

router.get('/', (req, res, next) => 
  res.render('index', { 
    title: 'Home'
  })
)

router.get('/menu', (req, res, next) => 
  res.render('menu', { 
    title: 'Menu',
    description: 'See what\'s cookin\' at your favorite neighborhood bar and grill.'  
  })
)

router.get('/story', (req, res, next) => 
  res.render('story', { 
    title: 'Our Story',
    description: 'The story of Holler Hops and the people behind it.' 
  })
)

router.get('/contact', (req, res, next) => 
  res.render('contact', { 
    title: 'Contact Us',
    description: 'View our hours, address, and phone number, or send us a message.' 
  })
)

router.post('/contact', (req, res, next) => {
  email(req.body, (err, success) => {
    if (err)
      return next(err)
    
    res.status(200).end()
  })
})

// Get Beer List from Google Spreadsheet
var { beerListSpreadsheetId } = require('../locals')
var beerList = new GoogleSpreadsheet(beerListSpreadsheetId);

router.get('/tap', (req, res, next) => {
  
  beerList.getRows(1, (err, beers) => {
    
    if (err)
    {
      let beerError = new Error('Sorry, were having trouble accessing our beer \
      list at the moment. Please try again later.')
      
      beerError.status = 500
      
      return next(beerError)
    }
    
    res.render('tap', { 
      title: 'On Tap', 
      beers: beers, 
      description: 'See what beers we got flowin\' at your favorite neighborhood bar and grill.' 
    })
    
  })
  
})

module.exports = router
