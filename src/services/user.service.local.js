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

async function update(updatedUser, key = 'user') {
    // const user = await storageService.get('user', updatedUser._id)
    // user.score = score
    await storageService.put(key, updatedUser)

    // Handle case in which admin updates other user's details
    if (getLoggedinUser()._id === updatedUser._id) saveLocalUser(updatedUser)
    return updatedUser
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
    console.log('loggedinuser', user);
    if (!user) throw new Error('No logged in user')
    const { _id, price, name, imgUrls, capacity } = await stayService.getById(stayId)
    // TODO - change to dynnamic from hard-coded
    const startDate = new Date('September 19, 2023')
    const endDate = new Date('October 01 2023')
    let stayToAdd = {
        _id, price, name, imgUrls, capacity,
        startDate, endDate,
        guests: 2,
        // TODO - startDate and endDate will be dynnamic 
        days: utilService.timestampToDays(endDate - startDate),
        notes: ''
        // notes will be added by user. TODO - edit + add
    }
    console.log('does user\'s wishlist exist?', user.wishlist);
    if (user.wishlist) {
        console.log('user wishlist already exists', user.wishlist);
        if (user.wishlist.find((stay) => stay._id === _id)) return user.wishlist
        user.wishlist.push(stayToAdd)
    } else {
        console.log('user wishlist doesn\'t exist', user.wishlist);
        user.wishlist = [stayToAdd]
    }
    console.log('user wishlist after update', user.wishlist);
    console.log('user\'s id:', user._id);
    await update(user, STORAGE_KEY_LOGGEDIN_USER)
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
    user = {_id: user._id, fullname: user.fullname, imgUrl: user.imgUrl, wishlist: user.wishlist}
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