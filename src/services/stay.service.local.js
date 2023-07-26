
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'stay'

export const stayService = {
    query,
    getById,
    // save,
    // remove,
    getEmptyStay,
    // addStayMsg
}
window.cs = stayService


async function query(filterBy = { txt: '', price: 0 }) {
    var stays = await storageService.query(STORAGE_KEY)
    if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        stays = stays.filter(stay => regex.test(stay.vendor) || regex.test(stay.description))
    }
    if (filterBy.price) {
        stays = stays.filter(stay => stay.price <= filterBy.price)
    }
    return stays
}

function getById(stayId) {
    return storageService.get(STORAGE_KEY, stayId)
}


function getEmptyStay() {
    return {
        vendor: 'Susita-' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(1000, 9000),
    }
}


// Initial data
// ;(async ()=>{
//     await storageService.post(STORAGE_KEY, {
//         "_id": "10006546",
//         "name": "Ribeira Charming Duplex",
//         "type": "House",
//         "imgUrls": ["https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large"],
//         "price": 80.00,
//         "summary": "Fantastic duplex apartment with three bedrooms, located in the historic area of Porto, Ribeira (Cube)...",
//         "capacity": 8,
//         "amenities": [
//           "TV",
//           "Wifi",
//           "Kitchen",
//           "Smoking allowed",
//           "Pets allowed",
//           "Cooking basics"
//         ],
//         "labels": [
//           "Top of the world",
//           "Trending",
//           "Play",
//           "Tropical"
//         ],
//         "host": {
//           "_id": "u101",
//           "fullname": "Davit Pok",
//           "imgUrl": "https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small",
//         },
//         "loc": {
//           "country": "Portugal",
//           "countryCode": "PT",
//           "city": "Porto",
//           "address": "17 Kombo st",
//           "lat": -8.61308,
//           "lng": 41.1413
//         },
//         "reviews": [
//           {
//             "id": "madeId",
//             "txt": "Very helpful hosts. Cooked traditional...",
//             "rate": 4,
//             "by": {
//               "_id": "u102",
//               "fullname": "user2",
//               "imgUrl": "/img/img2.jpg"
//             }
//           }
//         ],
//         "likedByUsers": ['mini-user'] // for user-wishlist : use $in
//       })
    
// })()
