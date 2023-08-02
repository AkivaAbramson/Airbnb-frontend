
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


async function query(filterBy = { txt: '', price: 0, loc: '', destination: '', }) {
  console.log('query: filterBy', filterBy);

  var stays = await storageService.query(STORAGE_KEY)

  // if (filterBy.txt) {
  //   const txtRegex = new RegExp(filterBy.txt, 'i')
  //   stays = stays.filter(stay => txtRegex.test(stay.vendor) || txtRegex.test(stay.description))
  // }

  if (filterBy.price) {
    stays = stays.filter(stay => stay.price <= filterBy.price)
  }

  // if (filterBy.loc) {
  //   const locRegex = new RegExp(filterBy.loc, 'i')
  //   const locKeys = ['country', 'countryCode', 'city', 'address']
  //   stays = stays.filter((stay) => {
  //     locKeys.forEach((key) => {
  //       locRegex.test(stay.loc[key])
  //     })
  //   })
  // }

  if (filterBy.destination) {
    stays = stays.filter((stay) => stay.loc.country === filterBy.destination)
  }

  // if (filterBy.guests) {
  //   const guestKeys = ['adult', 'child', 'infant', 'pet']
  //   stays = stays.filter((stay) => {
  //     guestKeys.forEach((key) => stay.guests[key] >= filterBy.guests[key])
  //   })
  // }

  console.log('after filtering, stays:', stays);

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
    name: "",
    type: "House",
    imgUrls: ["https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large"],
    price: 0,
    summary: "Fantastic duplex apartment with three bedrooms, located in the historic area of Porto, Ribeira (Cube)...",
    capacity: 8,
    amenities: [
      "TV",
      "Wifi",
      "Kitchen",
      "Smoking allowed",
      "Pets allowed",
      "Cooking basics"
    ],
    labels: [
      "Top of the world",
      "Trending",
      "Play",
      "Tropical"
    ],
    wishlist: [],
    host: {
      _id: "u101",
      fullname: "Davit Pok",
      imgUrl: "https://a0.muscache.com/im/pictures/user/User-369818264/original/8fbc6d95-73f9-452a-b427-76a7a4ea4335.jpeg?im_w=240",
    },
    loc: {
      country: "Portugal",
      countryCode: "PT",
      city: "Porto",
      address: "17 Kombo st",
      lat: -8.61308,
      lng: 41.1413
    },
    "reviews": [
      {
        id: "madeId",
        txt: "Very helpful hosts. Cooked traditional...",
        rate: 4,
        by: {
          _id: "u102",
          fullname: "user2",
          imgUrl: "/img/img2.jpg"
        }
      }
    ],
    likedByUsers: ['mini-user']

  }
}

// Initial data
; (async () => {
  let stays = await query()
  if (!stays?.length) {
    stays = await (await fetch('src/assets/data/stay.json')).json()
    for (const stay of stays) {
      await storageService.post(STORAGE_KEY, stay)
    }
  }
})()

