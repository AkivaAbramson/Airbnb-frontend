import { userService } from '../services/user.service.local'
// import { userService } from '../services/user.service'


export const userStore = {
    state: {
        loggedinUser: null,
        users: [
            {
                fullname: "Edgar",
                imgUrl: "https://a0.muscache.com/im/pictures/d17abb7c-beb0-4dbe-976e-fc633de18b4b.jpg?aki_policy=profile_small",
                password: "75091963",
                wishlist: [],
                username: "Edgar",
                _id: "622f3401e36c59e6164fab4d",
            },
            {
                fullname: "Patty And Beckett",
                imgUrl: "https://res.cloudinary.com/dtaiyvzq5/image/upload/v1670700573/tovimdeubexsdzmzdycu.webp",
                password: "36133410",
                whishlist: [],
                username: "Patty",
                id: "36133410",
                _id: "622f3403e36c59e6164faf93"
            },
        ],
        isLoading: false,
    },
    getters: {
        users({ users }) { return users },
        loggedinUser({ loggedinUser }) { return loggedinUser },
        usersExcludeMe({ users, loggedinUser }) {
            return users.filter(u => u._id !== loggedinUser._id)
        },
        usersIsLoading({ isLoading }) {
            return isLoading
        },
        wishlist({ loggedinUser }) {
            console.log('user store, wishlist:', loggedinUser.wishlist);
            return loggedinUser.wishlist
        }
    },
    mutations: {
        setLoggedinUser(state, { user }) {
            // Yaron: needed this workaround as score not reactive from birth
            state.loggedinUser = (user) ? { ...user } : null
        },
        setUsers(state, { users }) {
            state.users = users
        },
        setIsLoading(state, { isLoading }) {
            state.isLoading = isLoading
        },
        removeUser(state, { userId }) {
            state.users = state.users.filter(user => user._id !== userId)
        },
        setWishlist(state, { wishlist }) {
            state.wishlist = wishlist;
        },
        addToWishlist(state, { stayToAdd }) {
            console.log('stayToAdd', stayToAdd);
            if (state.loggedinUser.wishlist) {
                state.loggedinUser.wishlist.push(stayToAdd)
            } else {
                state.loggedinUser.wishlist = [stayToAdd]
            }
            console.log('added to wishlist');
            // console.log('user\'s wishlist:', state.loggedinUser.wishlist);
            console.log('user', state.loggedinUser);
        },
        removeFromWishlist(state, { stayToRemove }) {

        },
        saveToUser(state, { stay }) {
            // console.log(stay)
            // console.log('hi')
            // const idx = state.users.findIndex(currUser => currUser._id === user._id)
            // if (idx !== -1) state.users.splice(idx, 1, user)
            // else state.users.push(user)
        },
        
    },
    actions: {
        async login({ commit }, { userCred }) {
            try {
                const user = await userService.login(userCred)
                commit({ type: 'setLoggedinUser', user })
                return user
            } catch (err) {
                console.log('userStore: Error in login', err)
                throw err
            }
        },
        async signup({ commit }, { userCred }) {
            console.log('signup test', userCred);
            try {
                const user = await userService.signup(userCred)
                commit({ type: 'setLoggedinUser', user })
                return user
            } catch (err) {
                console.log('userStore: Error in signup', err)
                throw err
            }

        },
        async logout({ commit }) {
            try {
                await userService.logout()
                commit({ type: 'setLoggedinUser', user: null })
            } catch (err) {
                console.log('userStore: Error in logout', err)
                throw err
            }
        },
        async loadUsers({ commit }) {
            commit({ type: 'setIsLoading', isLoading: true })
            try {
                const users = await userService.getUsers()
                commit({ type: 'setUsers', users })
                commit({ type: 'setIsLoading', isLoading: false })
            } catch (err) {
                console.log('userStore: Error in loadUsers', err)
                throw err
            }
        },
        async removeUser({ commit }, { userId }) {
            try {
                await userService.remove(userId)
                commit({ type: 'removeUser', userId })
            } catch (err) {
                console.log('userStore: Error in removeUser', err)
                throw err
            }
        },
        async updateUser({ commit }, { user }) {
            try {
                user = await userService.update(user)
                commit({ type: 'setUser', user })
            } catch (err) {
                console.log('userStore: Error in updateUser', err)
                throw err
            }

        },
        async addToWishlist({ commit }, { stayId }) {
            try {
                const stayToAdd = await userService.addToWishlist(stayId)
                commit({ type: 'addToWishlist', stayToAdd: stayToAdd })
                // console.log('hi')

            } catch (err) {
                console.log('userStore: Error in addToWishlist', err)
                throw err
            }
        },
        async removeFromWishlist({ commit }, { stayId }) {
            try {
                const stayToRemove = await userService.removeFromWishlist(stayId)
                commit({ type: 'removeFromWishlist', stayToRemove: stayToRemove })
                console.log('removed!');
            } catch (err) {
                console.log('userStroe: Error occured while trying to remove from Wishlist. Please try again later.', err)
                throw err
            }
        },
        async setToUser({ commit, getters }, { stay }) {
            try {
                const user = getters.loggedinUser
                console.log(user._id)
                await userService.addUserStay(user._id,stay)
            
                // if(user){
                //     commit({ type: 'saveToUser', stay: stay })
                // }
            } catch (err) {
                console.log(err)
                throw new Error(err)
            }

        },
    }
}