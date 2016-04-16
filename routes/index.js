var GoogleSpreadsheet = require('google-spreadsheet')
var Promise = require('bluebird')
var email = require('../util/email')
var express = require('express')
var router = express.Router()
var _ = require('underscore')
var moment = require('moment')
var { foodMenuSpreadsheetId, beerListSpreadsheetId } = require('../locals')
var beerList = new GoogleSpreadsheet(beerListSpreadsheetId)
var foodMenu = new GoogleSpreadsheet(foodMenuSpreadsheetId)

Promise.promisifyAll(beerList)

router.get('/', (req, res, next) =>
  res.render('index', {
    title: 'Home'
  })
)

router.get('/menu', (req, res, next) => {

  foodMenu.getRows(1, (err, food) => {

    if (err)
    {
      let foodError = new Error('Sorry, were having trouble accessing our menu at the moment. Please try again later.')

      foodError.status = 500

      return next(foodError)
    }

    var foodsGrouped = _.groupBy(food, 'category')
    var counter = 0

    _.each(foodsGrouped, (category, index)=>{
      category.scrollspyId = 'menu-category-' + counter++
    })

    res.render('menu', {
      title: 'Menu',
      food: foodsGrouped,
      description: 'See what\'s cookin\' at your favorite neighborhood bar and grill.'
    })

  })

})

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



router.get('/tap', (req, res, next) => {
  
  var requests = [
    beerList.getInfoAsync(),
    beerList.getRowsAsync(1)
  ]
  
  Promise.all(requests).spread((info, beers) => {
    
    res.render('tap', {
      title: 'On Tap',
      beers: beers,
      description: 'See what beers we got flowin\' at your favorite neighborhood bar and grill.',
      updated: moment(info.updated).fromNow()
    })
    
    
  }).catch(err => {
    let beerError = new Error('Sorry, were having trouble accessing our beer list at the moment. Please try again later.')

    beerError.status = 500

    return next(beerError)
  })

})

module.exports = router
