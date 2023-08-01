
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'stay'
const LABELS_KEY = 'labelDB'

export const stayService = {
  query,
  getById,
  save,
  remove,
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
function save(stay) {
  if (stay._id) {
    return storageService.put(STORAGE_KEY, stay)
  } else {
    return storageService.post(STORAGE_KEY, stay)
  }
}

function remove(stayId) {
  return storageService.remove(STORAGE_KEY, stayId)
}

function getById(stayId) {
  return storageService.get(STORAGE_KEY, stayId)
}


function getEmptyStay() {
  return {
    "name": "",
    "type": "House",
    "imgUrls": ["https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large"],
    "price": 0,
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
      "imgUrl": "https://a0.muscache.com/im/pictures/user/User-369818264/original/8fbc6d95-73f9-452a-b427-76a7a4ea4335.jpeg?im_w=240",
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
    "likedByUsers": ['mini-user']

  }
}


// Initial data
// ; (async () => {
//   await storageService.post(STORAGE_KEY, {
//     "_id": "45478gj487dh",
//     "name": "Ribeira Charming Duplex",
//     "type": "House",
//     "imgUrls": ["https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large",
//       "https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large",
//       "https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large",
//       "https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large",
//       "https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large",
//       "https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large"],
//     "price": 80.00,
//     "summary": "Fantastic duplex apartment with three bedrooms, located in the historic area of Porto, Ribeira (Cube)...",
//     "capacity": 8,
//     "amenities": [
//       "TV",
//       "Wifi",
//       "Kitchen",
//       "Smoking allowed",
//       "Pets allowed",
//       "Cooking basics"
//     ],
//     "labels": [
//       "Top of the world",
//       "Trending",
//       "Play",
//       "Tropical"
//     ],
//     "host": {
//       "_id": "u101",
//       "fullname": "Davit Pok",
//       "imgUrl": "https://a0.muscache.com/im/pictures/user/User-369818264/original/8fbc6d95-73f9-452a-b427-76a7a4ea4335.jpeg?im_w=240",
//     },
//     "loc": {
//       "country": "Portugal",
//       "countryCode": "PT",
//       "city": "Porto",
//       "address": "17 Kombo st",
//       "lat": -8.61308,
//       "lng": 41.1413
//     },
//     "reviews": [
//       {
//         "id": "10711825",
//         "at": 1624147574832,
//         "by": {
//           "_id": "622f3407e36c59e6164fc004",
//           "fullname": "Kiesha",
//           "imgUrl": "https://res.cloudinary.com/dtaiyvzq5/image/upload/v1670705495/kmfst5hn9pq3xax2bxad.webp",
//         },
//         "txt": "I had a great experience working with Patty and Beckett.  Both were very attentive in sorting out the booking details and following up directly when I had questions.  I rented a 2 bedroom unit at the Westin Villas  in Maui and both the unit and property was absolutely amazing.  I think we had the best unit on the resort complete with 2 outdoor patios with direct access  to  the  beach.  I would HIGHLY recommend renting with Patty and Beckett.",
//         "rate": {
//           "Cleanliness": 4.5,
//           "Communication": 4.7,
//           "Check-in": 4.7,
//           "Accuracy": 4.5,
//           "Location": 4.9,
//           "Value": 5.0
//         }
//       },
//       {
//         "id": "10712425",
//         "at": 1550016495867,
//         "by": {
//           "_id": "622f3607e36c59e6164fc004",
//           "fullname": "Mary",
//           "imgUrl": "https://a0.muscache.com/im/pictures/user/d2a27baf-c81d-4258-a8ac-898600a40da1.jpg?im_w=240",
//         },
//         "txt": "Beautiful home in a quiet area. The downstairs is really two apartments, one larger and one small for one or two people. It took me some time to figure that out when reading the description. We were only four people but we value space and privacy. A larger group, unless they are a family might find it a bit cramped. The outside area is spacious and location on the water is really great. The outside/pool is shared with the upstairs unit. It was occupied when we were there but without issue. Renting the entire space, both upstairs and downstairs, for a group that know each other well would be ideal. Local restaurants are good, not great. Grocery nearby is convenient. Ierapetra is a 20 minute drive for more expansive services.",
//         "rate": {
//           "Cleanliness": 4.8,
//           "Communication": 5.0,
//           "Check-in": 4.9,
//           "Accuracy": 4.9,
//           "Location": 5.0,
//           "Value": 5.0
//         }
//       },
//       {
//         "id": "10678825",
//         "at": 1478217658374,
//         "by": {
//           "_id": "622f3507e36c59e6164fc004",
//           "fullname": "Sapien",
//           "imgUrl": "https://a0.muscache.com/im/pictures/user/3c41c6d7-b688-4951-aa83-221571dfbdcb.jpg?im_w=240",
//         },
//         "txt": "The best till date",
//         "rate": {
//           "Cleanliness": 4.3,
//           "Communication": 4.6,
//           "Check-in": 4.9,
//           "Accuracy": 4.8,
//           "Location": 4.9,
//           "Value": 5.0
//         }
//       },
//     ],
//     "likedByUsers": ['mini-user'] // for user-wishlist : use $in
//   })

// })()
