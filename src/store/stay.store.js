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
    },
    actions: {
        async loadStays(context) {
            try {
                const stays = await stayService.query()
                context.commit({ type: 'setStays', stays })
            } catch (err) {
                console.log('stayStore: Error in loadStays', err)
                throw err
            }
        },
    }
}