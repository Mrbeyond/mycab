import Axios from 'axios';
import { PROXY } from '../../constants/config';
import { ADMINS, AGENTS, CARDS, RES_KEY, hToken, TAGS, TERMINALS } from '../../constants/formKey';

export default {
  state: {
    admins: null,
    agents: null,
    cards: null,
    terminals: null,
    tags: null,
    resKey: null,
    intendedPage: '',

  },

  /** This is manually included */
  getters: {
    admins: state=> state.admins,

    tags: state=> state.tags,

    cards: state=> state.cards,

    terminals: state=>state.terminals,

    intendedRoute: state=>state.intendedPage,

    agents: state=>state.agents,

    resKey: state=> state.resKey,
  },

  mutations: {

    [ADMINS](state, payload){
      state.admins = payload;
    },

    [AGENTS](state, payload){
      state.agents = payload;
    },

    [CARDS](state, payload){
      state.cards = payload;
    },

    [TAGS](state, payload){
      state.tags = payload;
    },

    [TERMINALS](state, payload){
      state.terminals = payload;
    },

    [RES_KEY](state, payload){
      state.resErrorKey = payload;
    },
  },



  actions: {
    [TAGS]({commit}){
      Axios.get(`${PROXY}admin/vehicle_tags`, {headers: hToken()})
      .then(res=>{
        if(!res.data.error){
          let payload;
          try {
            payload = res.data.data
            commit(TAGS, payload);
            commit(RES_KEY, {status:0, owner: TAGS});
          } catch (e) {
            commit(RES_KEY, {status:1, owner: TAGS});
          }
        }else{
          commit(RES_KEY, {status:1, owner: TAGS});
        }
      })
      .catch(err => {
        if(err.response){
          commit(RES_KEY, {status:2, owner: TAGS});
        }
      })
    },

  [CARDS]({commit}){

    Axios.get(`${PROXY}admin/cards`, {headers: hToken()})
    .then(res=>{
      if(!res.data.error){
        let payload;
        try {
          payload = res.data.data
          commit(CARDS, payload);
          commit(RES_KEY, {status:0, owner: CARDS});
        } catch (e) {
          commit(RES_KEY, {status:1, owner: CARDS});
        }
      }else{
        commit(RES_KEY, {status:1, owner: CARDS});
      }
    })
    .catch(err => {
      if(err.response){
        commit(RES_KEY, {status:2, owner: CARDS});
      }
    })
  },

  [AGENTS]({commit}){

    Axios.get(`${PROXY}admin/agents`, {headers: hToken()})
    .then(res=>{
      if(!res.data.error){
        let payload;
        try {
          payload = res.data.data
          commit(AGENTS, payload);
          commit(RES_KEY, {status:0, owner: AGENTS});
        } catch (e) {
          commit(RES_KEY, {status:1, owner: AGENTS});
        }
      }else{
        commit(RES_KEY, {status:1, owner: AGENTS});
      }
    })
    .catch(err => {
      if(err.response){
        commit(RES_KEY, {status:2, owner: AGENTS});
      }
    })
  },

  [ADMINS]({commit}){

    Axios.get(`${PROXY}admin/admins`, {headers: hToken()})
    .then(res=>{
      if(!res.data.error){
        let payload;
        try {
          payload = res.data.data
          commit(ADMINS, payload);
          commit(RES_KEY, {status:0, owner: ADMINS});
        } catch (e) {
          commit(RES_KEY, {status:1, owner: ADMINS});
        }
      }else{
        commit(RES_KEY, {status:1, owner: ADMINS});
      }
    })
    .catch(err => {
      if(err.response){
        commit(RES_KEY, {status:2, owner: ADMINS});
      }
    })
  },

  [TERMINALS]({commit}){

    Axios.get(`${PROXY}admin/terminals`, {headers: hToken()})
    .then(res=>{
      if(!res.data.error){
        let payload;
        try {
          payload = res.data.data
          commit(TERMINALS, payload);
          commit(RES_KEY, {status:0, owner: TERMINALS});
        } catch (e) {
          commit(RES_KEY, {status:1, owner: TERMINALS});
        }
      }else{
        commit(RES_KEY, {status:1, owner: TERMINALS});
      }
    })
    .catch(err => {
      if(err.response){
        commit(RES_KEY, {status:2, owner: TERMINALS});
      }
    })
  },
},

}

