export const utilService = {
    makeId,
    makeLorem,
    getRandomIntInclusive,
    debounce,
    randomPastTime,
    saveToStorage,
    loadFromStorage,
    formatNumber,
    timestampToDays,
    formatPlural,
    trimTxt,
    calcRating
}

function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}


function randomPastTime() {
    const HOUR = 1000 * 60 * 60
    const DAY = 1000 * 60 * 60 * 24
    const WEEK = 1000 * 60 * 60 * 24 * 7

    const pastTime = getRandomIntInclusive(HOUR, WEEK)
    return Date.now() - pastTime
}

function debounce(func, timeout = 300) {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => { func.apply(this, args) }, timeout)
    }
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
    const data = localStorage.getItem(key)
    return (data) ? JSON.parse(data) : undefined
}

function formatNumber(num, decimal = 0, toLocale = true) {
    const splitNum = num.toFixed(decimal).split('.')
    if (toLocale) {
        splitNum[0] = parseInt(splitNum[0]).toLocaleString()
    }
    return splitNum.join('.')
}

function timestampToDays(timestamp) {
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    const days = Math.floor(timestamp / millisecondsPerDay)
    return days
}

function formatPlural(countMap, delim = '') {
    const plurals = []
    for (const key in countMap) {
        const count = countMap[key]
        if (count) {
            plurals.push(`${count} ${key}${count > 1 ? 's' : ''}`)
        }
    }
    return plurals.join(delim)
}

function trimTxt(txt, maxLength = 35) {
    if (txt.length <= maxLength) return txt

    return txt.slice(0, maxLength) + '...'
}
function calcRating({ reviews }) {
    // console.log('util calcRating', reviews);
    let rateSum = reviews.reduce((acc, review) => {
        acc += review.rate.Value
        return acc
    }, 0)
    // console.log('rateSum:', rateSum)
    return (rateSum / reviews.length).toFixed(2)
}
