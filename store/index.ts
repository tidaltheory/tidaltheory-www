import { ActionTree, GetterTree, MutationTree } from 'vuex'

export const state = () => ({
    pages: [],
    posts: [],
    work: [],
    projects: [],
    galleries: [],
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
    work: (state) => state.work,
}

export const mutations: MutationTree<RootState> = {
    SET_WORK_POSTS: (state, posts) => (state.work = posts),
}

export const actions: ActionTree<RootState, RootState> = {
    // async nuxtServerInit({ commit }) {
    //     let workData = await require.context('~/content/work/', false, /\.json$/);
    //     let workPosts = workData.keys().map(key => {
    //       let res = workData(key);
    //       res.slug = key.slice(2, -5);
    //       return res;
    //     });
    //     commit('SET_WORK_POSTS', workPosts);
    //   },
}
