var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', (req, res, next) => 
  res.render('index', { title: 'Home' })
)

router.get('/tap', (req, res, next) => 
  res.render('tap', { title: 'On Tap' })
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

module.exports = router
