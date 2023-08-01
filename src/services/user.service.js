import { httpService } from './http.service'
import { stayService } from './stay.service'

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
    // changeScore,
    // addToWishlist,
    // removeFromWishlist,
}

window.userService = userService

function getUsers() {
    return httpService.get(`user`)
}

async function getById(userId) {
    const user = await httpService.get(`user/${userId}`)
    return user
}

function remove(userId) {
    return httpService.delete(`user/${userId}`)
}

async function update(user) {
    user = await httpService.put(`user/${user._id}`, user)
  
    // Handle case in which admin updates other user's details
    if (getLoggedinUser()._id === user._id) saveLocalUser(user)
    return user
}

async function login(userCred) {
    const user = await httpService.post('auth/login', userCred)
    if (user) {
        socketService.login(user._id)
        return saveLocalUser(user)
    }
}

async function signup(userCred) {
    if (!userCred.imgUrl) userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
    const user = await httpService.post('auth/signup', userCred)
    socketService.login(user._id)
    return saveLocalUser(user)
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    socketService.logout()
    return await httpService.post('auth/logout')
}

async function changeScore(by) {
    const user = getLoggedinUser()
    if (!user) throw new Error('Not loggedin')
    user.score = user.score + by || by
    await update(user)
    return user.score
}

function saveLocalUser(user) {
    user = {_id: user._id, fullname: user.fullname, imgUrl: user.imgUrl}
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

// async function addToWishlist(stayId) {
//     const user = getLoggedinUser()
//     if (!user) throw new Error('No logged in user')
//     const stayToAdd = await stayService.getById(stayId)
//     if(user.wishlist){
//         user.wishlist.push(stayToAdd)
//     } else {
//         user.wishlist = [stayToAdd]
//     }

//     await update(user)
//     return user.wishlist
// }

// async function removeFromWishlist(stayId) {
//     const user = getLoggedinUser()
//     if (!user) throw new Error('No logged in user')
//     const stayToRemove = await stayService.getById(stayId)

//     const idx = user.wishlist.indexOf(stayToRemove)
//     if (idx <= 0) {
//         user.wishlist.splice(idx, 1)
//     } else {
//         throw new Error('Remove error: Stay is not part of user\'s wishlist')
//     }

//     await update(user)
//     return user.wishlist
// }