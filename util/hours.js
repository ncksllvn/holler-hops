var moment = require('moment')
var timezone = require('moment-timezone')

var days = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday'
]

module.exports = (req, res, next) => {
    var now = moment().tz('America/Kentucky/Monticello')
    var dayIndex = now.weekday()
    var day = days[dayIndex]
    var hour = now.hour() // returns 0-12; 0=12AM, 12=12PM
    var isOpen = false

    switch (day)
    {
        case 'monday':
        case 'tuesday':
        case 'wednesday':
        case 'thursday':
            isOpen = hour >= 15 && hour <= 23 // 3PM - 12AM
            break

        case 'sunday':
            isOpen = hour >= 12 && hour <= 23 // 12PM - 12AM
            break

        case 'friday':
            isOpen = hour >= 15 || hour < 2 // 3PM - 2AM
            break

        case 'saturday':
        default:
            isOpen = hour >= 12 || hour < 2 // 12PM - 2AM
    }

    res.locals.isOpen = isOpen
    next()
}