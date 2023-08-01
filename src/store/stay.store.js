import { stayService } from '../services/stay.service.local'
// import { stayService } from '../services/stay.service'



export const stayStore = {
    state: {
        stays: []
    },
    getters: {
        stays({ stays }) { return stays },
    },
    mutations: {
        setStays(state, { stays }) {
            state.stays = stays
        },
        saveStay(state, { stay }) {
            const idx = state.stays.findIndex(currStay => currStay._id === stay._id)
            if (idx !== -1) state.stays.splice(idx, 1, stay)
            else state.stays.push(stay)
        },
        removeStay(state, { id }) {
            const idx = state.stays.findIndex(stay => stay._id === id)
            state.stays.splice(idx, 1)
        },
    },
    actions: {
        async loadStays(context, filterBy) {
            try {
                // const stays = await stayService.query(filterBy)
                const stays = await stayService.query(filterBy)
                context.commit({ type: 'setStays', stays })
            } catch (err) {
                console.log('stayStore: Error in loadStays', err)
                throw err
            }
        },
        async saveStay({ commit }, { stay }) {
            try{
              const newStay = await stayService.save(stay)
              commit({ type: 'saveStay', stay: newStay })
            } catch (err){
              console.log('Could Not save stay')
              throw new Error(err)
            }
           
          },
          async removeStay({ commit }, { id }) {
            try {
                const res = await stayService.remove(id)
                commit({ type: 'removeStay', id })
                return res
            } catch (err) {
                console.log('Could Not remove stay')
                throw new Error(err)
            }
        },
    }
}