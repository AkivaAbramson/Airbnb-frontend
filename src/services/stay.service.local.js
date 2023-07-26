
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'stay'
const LABELS_KEY = 'labelDB'

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
;(async () => {
    await storageService.post(STORAGE_KEY, {
        "_id": "10006546",
        "name": "Ribeira Charming Duplex",
        "type": "House",
        "imgUrls": ["https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large", "otherImg.jpg"],
        "price": 80.00,
        "summary": "Fantastic duplex apartment with three bedrooms, located in the historic area of Porto, Ribeira (Cube)...",
        "capacity": 8,
        "amenities": [
          "TV",
          "Wifi",
          "Kitchen",
          "Smoking allowed",
          "Pets allowed",
          "Cooking basics"
        ],
        "labels": [
          "Top of the world",
          "Trending",
          "Play",
          "Tropical"
        ],
        "host": {
          "_id": "u101",
          "fullname": "Davit Pok",
          "imgUrl": "https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small",
        },
        "loc": {
          "country": "Portugal",
          "countryCode": "PT",
          "city": "Porto",
          "address": "17 Kombo st",
          "lat": -8.61308,
          "lng": 41.1413
        },
        "reviews": [
          {
            "id": "madeId",
            "txt": "Very helpful hosts. Cooked traditional...",
            "rate": 4,
            "by": {
              "_id": "u102",
              "fullname": "user2",
              "imgUrl": "/img/img2.jpg"
            }
          }
        ],
        "likedByUsers": ['mini-user'] // for user-wishlist : use $in
      })
    
})()

// ;(async () => {
//   await storageService.post(LABELS_KEY, {
//     "labels": [
//       {
//         "name": "Beachfront",
//         "imgUrl": "https://a0.muscache.com/pictures/bcd1adc0-5cee-4d7a-85ec-f6730b0f8d0c.jpg"
//       },
//       {
//         "name": "Amazing pools",
//         "imgUrl": "https://a0.muscache.com/pictures/3fb523a0-b622-4368-8142-b5e03df7549b.jpg"
//       },
//       {
//         "name": "OMG!",
//         "imgUrl": "https://a0.muscache.com/pictures/c5a4f6fc-c92c-4ae8-87dd-57f1ff1b89a6.jpg"
//       },
//       {
//         "name": "Islands",
//         "imgUrl": "https://a0.muscache.com/pictures/8e507f16-4943-4be9-b707-59bd38d56309.jpg"
//       },
//       {
//         "name": "Farms",
//         "imgUrl": "https://a0.muscache.com/pictures/aaa02c2d-9f0d-4c41-878a-68c12ec6c6bd.jpg"
//       },
//       {
//         "name": "Amazing views",
//         "imgUrl": "https://a0.muscache.com/pictures/aaa02c2d-9f0d-4c41-878a-68c12ec6c6bd.jpg"
//       },
//       {
//         "name": "Lakefront",
//         "imgUrl": "https://a0.muscache.com/pictures/677a041d-7264-4c45-bb72-52bff21eb6e8.jpg"
//       },
//       {
//         "name": "Countryside",
//         "imgUrl": "https://a0.muscache.com/pictures/732edad8-3ae0-49a8-a451-29a8010dcc0c.jpg"
//       },
//       {
//         "name": "Trending",
//         "imgUrl": "https://a0.muscache.com/pictures/3726d94b-534a-42b8-bca0-a0304d912260.jpg"
//       },
//       {
//         "name": "Cabins",
//         "imgUrl": "https://a0.muscache.com/pictures/1b6a8b70-a3b6-48b5-88e1-2243d9172c06.jpg"
//       },
//       {
//         "name": "Castles",
//         "imgUrl": "https://a0.muscache.com/pictures/1b6a8b70-a3b6-48b5-88e1-2243d9172c06.jpg"
//       },
//       {
//         "name": "Tiny homes",
//         "imgUrl": "https://a0.muscache.com/pictures/35919456-df89-4024-ad50-5fcb7a472df9.jpg"
//       },
//       {
//         "name": "Farms",
//         "imgUrl": "https://a0.muscache.com/pictures/aaa02c2d-9f0d-4c41-878a-68c12ec6c6bd.jpg"
//       },
//       {
//         "name": "Play",
//         "imgUrl": "https://a0.muscache.com/pictures/f0c5ca0f-5aa0-4fe5-b38d-654264bacddf.jpg"
//       },
//       {
//         "name": "Luxe",
//         "imgUrl": "https://a0.muscache.com/pictures/c8e2ed05-c666-47b6-99fc-4cb6edcde6b4.jpg"
//       },
//       {
//         "name": "Vineyards",
//         "imgUrl": "https://a0.muscache.com/pictures/60ff02ae-d4a2-4d18-a120-0dd274a95925.jpg"
//       },
//       {
//         "name": "National parks",
//         "imgUrl": "https://a0.muscache.com/pictures/c0a24c04-ce1f-490c-833f-987613930eca.jpg"
//       },
//       {
//         "name": "Rooms",
//         "imgUrl": "https://a0.muscache.com/pictures/7630c83f-96a8-4232-9a10-0398661e2e6f.jpg"
//       },
//       {
//         "name": "Design",
//         "imgUrl": "https://a0.muscache.com/pictures/50861fca-582c-4bcc-89d3-857fb7ca6528.jpg"
//       },
//       {
//         "name": "Boats",
//         "imgUrl": "https://a0.muscache.com/pictures/687a8682-68b3-4f21-8d71-3c3aef6c1110.jpg"
//       },
//       {
//         "name": "Iconic cities",
//         "imgUrl": "https://a0.muscache.com/pictures/ed8b9e47-609b-44c2-9768-33e6a22eccb2.jpg"
//       },
//       {
//         "name": "Camping",
//         "imgUrl": "https://a0.muscache.com/pictures/ca25c7f3-0d1f-432b-9efa-b9f5dc6d8770.jpg"
//       },
//       {
//         "name": "Tropical",
//         "imgUrl": "https://a0.muscache.com/pictures/ee9e2a40-ffac-4db9-9080-b351efc3cfc4.jpg"
//       },
//       {
//         "name": "Off-the-grid",
//         "imgUrl": "https://a0.muscache.com/pictures/9a2ca4df-ee90-4063-b15d-0de7e4ce210a.jpg"
//       },
//     ]
//   })
// })()