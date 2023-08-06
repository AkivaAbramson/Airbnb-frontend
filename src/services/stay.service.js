import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

export const stayService = {
    query,
    getById,
    save,
    remove,
    getEmptyStay,
    addStayMsg
}

window.cs = stayService // for console usage

// async function query(filterBy = { txt: '', price: 0, destination: '' }, hostId = '') {
//     console.log('stay.service query Eran says hi')
//     const guests = {
//         adult: filterBy.adult || 0,
//         child: filterBy.child || 0,
//         infant: filterBy.infant || 0,
//     }

//     const guestKeys = ['adult', 'child', 'infant']
//     filterBy.guests = guestKeys.reduce((acc, key) => {
//         acc += +guests[key]
//         return acc
//     }, 0)

//     filterBy.hostId = hostId

//     return httpService.get('stay', filterBy)
// }

async function query(filterBy = { destination: '', }) {
    
    let stays = await httpService.get('stay', filterBy)
  
    if (filterBy.price) {
      stays = stays.filter(stay => stay.price <= filterBy.price)
    }
  
    if (filterBy.destination) {
        console.log('filterBy.destination',stays)
      const locRegex = new RegExp(filterBy.destination, 'i')
      const locKeys = ['country', 'countryCode', 'city', 'address']
      stays = stays.filter((stay) => {
        // return locKeys.forEach((key) => {
        //   locRegex.test(stay.loc[key])
        // })
        return locRegex.test(stay.loc.country)
      })
    }
  
    if (filterBy.adult || filterBy.child || filterBy.infant) {
      const guests = {
        adult: filterBy.adult,
        child: filterBy.child || 0,
        infant: filterBy.infant || 0,
      }
      const guestKeys = ['adult', 'child', 'infant']
      const guestSum = guestKeys.reduce((acc, key) => {
        acc += +guests[key]
        return acc
      }, 0)
      console.log(guestSum);
      stays = stays.filter((stay) => stay.capacity >= guestSum)
    }
  
    stays.forEach(stay => {
      stay.rate = +utilService.calcRating(stay)
      // save(stay)
    })
    stays.sort((a,b) => b.rate - a.rate)
    console.log(stays);

  
    return stays
  }

function getById(stayId) {
    return httpService.get(`stay/${stayId}`)
}

async function remove(stayId) {
    return httpService.delete(`stay/${stayId}`)
}
async function save(stay) {
    var savedStay
    if (stay._id) {
        savedStay = await httpService.put(`stay/${stay._id}`, stay)
    } else {
        savedStay = await httpService.post('stay', stay)
    }
    return savedStay
}

async function addStayMsg(stayId, txt) {
    const savedMsg = await httpService.post(`stay/${stayId}/msg`, { txt })
    return savedMsg
}


function getEmptyStay() {
    return {
        vendor: 'Susita-' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(1000, 9000),
    }
}