
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
//     "_id": "10006546",
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
//         "at": "2016-06-12T04:00:00.000Z",
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
//     ],
//     "likedByUsers": ['mini-user'] // for user-wishlist : use $in
//   })

// })()
