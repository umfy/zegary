import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      clocks: [],
    }
  },
  onMounted() {},
  getters: {
    clocks(state) {
      return state.clocks
    },
    clock(state) {
      return (clockId) => {
        return state.clocks.find((clock) => clock.id === clockId)
      }
    },
  },
  mutations: {
    addClock(state, newClock) {
      state.clocks.unshift(newClock)
    },
    setClocks(state, clocks) {
      state.clocks = clocks
    },
    removeClock(state, clockId) {
      state.clocks = state.clocks.filter((el) => {
        return el.id != clockId
      })
    },
    modifyClock(state, newClock) {
      const foundIndex = state.clocks.findIndex((x) => x.id === newClock.id)
      state.clocks[foundIndex] = newClock
    },
  },
  actions: {
    async addClock(context, clockData) {
      const newClock = {
        title: clockData.title,
        image: clockData.image,
        description: clockData.description,
        // history: [{id: ? date ?,  start: null, stop: null }],
      }
      // backend here
      const response = await fetch(
        `https://zegary-33e82-default-rtdb.europe-west1.firebasedatabase.app/clocks/.json`,
        {
          method: 'POST',
          body: JSON.stringify(newClock),
        }
      )
      if (!response.ok) {
        const error = new Error('Failed to submit data.')
        throw error
      }
      // console.log('post response', response)
      // console.log('post response body', response.name)
      // ;(newClock['id'] = new Date().toISOString()),
      context.commit('addClock', newClock)
    },
    async modifyClock(context, clockData) {
      let newClock = {
        title: clockData.title,
        image: clockData.image,
        description: clockData.description,
        history: clockData.history,
        // history: [
        //   {
        //     id: new Date().toISOString(),
        //     start: '2021-06-11',
        //     stop: '2021-06-14',
        //   },
        // ],
      }
      // console.log('clock data in modify clock:', clockData)
      const response = await fetch(
        `https://zegary-33e82-default-rtdb.europe-west1.firebasedatabase.app/clocks/${clockData.id}.json`,
        {
          method: 'PUT',
          body: JSON.stringify(newClock),
        }
      )
      if (!response.ok) {
        const error = new Error('Failed to modify data.')
        throw error
      }

      newClock['id'] = clockData.id
      context.commit('modifyClock', newClock)
    },
    async removeClock(context, clockId) {
      const response = await fetch(
        `https://zegary-33e82-default-rtdb.europe-west1.firebasedatabase.app/clocks/${clockId}.json`,
        {
          method: 'DELETE',
        }
      )
      if (!response.ok) {
        const error = new Error('Failed to remove data.')
        throw error
      }
      context.commit('removeClock', clockId)
    },
    async loadClocks(context) {
      const response = await fetch(
        `https://zegary-33e82-default-rtdb.europe-west1.firebasedatabase.app/clocks.json`
      )
      const responseData = await response.json()
      if (!response.ok) {
        const error = new Error(responseData.message || 'Failed to Fetch!')
        throw error
      }
      const clocks = []
      for (const key in responseData) {
        const clock = {
          id: key,
          title: responseData[key].title,
          description: responseData[key].description,
          image: responseData[key].image,
          history: responseData[key].history,
        }
        clocks.push(clock)
      }
      // console.log('clocks', clocks)
      context.commit('setClocks', clocks)
    },
  },
})

export default store
