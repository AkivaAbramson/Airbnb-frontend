import { storageService } from './async-storage.service'
import { stayService } from './stay.service.local'
import { utilService } from './util.service'
// import { stayService } from './stay.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    saveLocalUser,
    getUsers,
    getById,
    remove,
    update,
    addToWishlist,
    removeFromWishlist
}

window.userService = userService

function getUsers() {
    return storageService.query('user')
}

async function getById(userId) {
    const user = await storageService.get('user', userId)
    return user
}

function remove(userId) {
    return storageService.remove('user', userId)
}

async function update({_id}) {
    const user = await storageService.get('user', _id)
    // user.score = score
    await storageService.put('user', user)

    // Handle case in which admin updates other user's details
    if (getLoggedinUser()._id === user._id) saveLocalUser(user)
    return user
}

async function login(userCred) {
    const users = await storageService.query('user')
    const user = users.find(user => user.username === userCred.username)
    if (user) {
        return saveLocalUser(user)
    }
}

async function signup(userCred) {
    
    if (!userCred.imgUrl) userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
    const user = await storageService.post('user', userCred)
    return saveLocalUser(user)
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
}

async function addToWishlist(stayId) {
    const user = getLoggedinUser()
    if (!user) throw new Error('No logged in user')
    const { _id, price, name, imgUrls, capacity } = await stayService.getById(stayId)
    let stayToAdd = {
        _id, price, name, imgUrls, capacity,
        guests: 2,
        startDate: new Date('September 19, 2023'),
        endDate: new Date('October 01 2023'),
        // TODO - startDate and endDate will be dynnamic 
        days: utilService.timestampToDays(endDate - startDate),
        notes: ''
        // notes will be added by user. TODO - edit + add
    }
    if (user.wishlist.find((stay) => stay._id === _id)) return user.wishlist
    if (user.wishlist) {
        user.wishlist.push(stayToAdd)
    } else {
        user.wishlist = [stayToAdd]
    }

    await update(user)
    return user.wishlist
}

async function removeFromWishlist(stayId) {
    const user = getLoggedinUser()
    if (!user) throw new Error('No logged in user')

    const idx = user.wishlist.findIndex((stay) => stay._id === stayId)
    if (idx <= 0) {
        user.wishlist.splice(idx, 1)
    } else {
        throw new Error('Remove error: Stay is not part of user\'s wishlist')
    }

    await update(user)
    return user.wishlist
}

function saveLocalUser(user) {
    user = {_id: user._id, fullname: user.fullname, imgUrl: user.imgUrl}
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

// Initial data
// ;(async ()=>{
//     await userService.signup({fullname: 'Puki Norma', username: 'puki', password:'123',isAdmin: false})
//     await userService.signup({fullname: 'Master Adminov', username: 'admin', password:'123',isAdmin: true})
//     await userService.signup({fullname: 'Muki G', username: 'muki', password:'123',})
// })()

// user = {_id, fullname, username, password, wishlist: [{stayid, stay.name, stayImgs}]}