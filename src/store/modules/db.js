import Axios from 'axios';
import { PROXY } from '../../constants/config';
import { ADMINS, AGENTS, CARDS, RES_KEY, hToken, TAGS, TERMINALS, GARAGES, PORTS, LGS, AGENTTYPES, ADMINTYPES, PAYERS, FETCHING, AUTO_FETCHING, GETTINGTYPES } from '../../constants/formKey';

export default {
  state: {
    admins: null,
    agents: null,
    payers: null,
    cards: null,
    terminals: null,
    tags: null,
    resKey: null,
    intendedPage: '',
    ports:null,
    garages:null,
    lgs:null,
    agentTypes:null,
    adminTypes:null,
    fetching: {status:false, owner:''},
    autoFetching: false,
    gettingTypes: false,

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

    ports: state=> state.ports,

    garages: state=> state.garages,

    lgs: state=> state.lgs,

    agentTypes: state=> state.agentTypes,

    adminTypes: state=> state.adminTypes,

    payers: state=> state.payers,

    fetching: state=> state.fetching,

    autoFetching: state=> state.autoFetching,

    gettingTypes: state=> state.gettingTypes,

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
      // console.log(payload.owner);
      state.resKey = payload;
    },

    [GARAGES](state, payload){
      // console.log(payload.owner);
      state.garages = payload;
    },

    [PORTS](state, payload){
      // console.log(payload.owner);
      state.ports = payload;
    },

    [LGS](state, payload){
      // console.log(payload.owner);
      state.lgs = payload;
    },

    [AGENTTYPES](state, payload){
      // console.log(payload.owner);
      state.agentTypes = payload;
    },

    [ADMINTYPES](state, payload){
      // console.log(payload.owner);
      state.adminTypes = payload;
    },

    [FETCHING](state, payload){
      // console.log(payload.owner);
      state.fecthing = payload;
    },

    [AUTO_FETCHING](state){
      // console.log(state.autoFetching.status);
      state.autoFetching = !state.autoFetching;
    },

    [GETTINGTYPES](state){
      // console.log('from store');
      // console.log(state.autoFetching.status);
      state.gettingTypes = !state.gettingTypes;
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

    Axios.get(`${PROXY}admin/agent/details`, {headers: hToken()})
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

  [PAYERS]({commit}){

    Axios.get(`${PROXY}admin/payers`, {headers: hToken()})
    .then(res=>{
      if(!res.data.error){
        let payload;
        try {
          payload = res.data.data
          commit(PAYERS, payload);
          commit(RES_KEY, {status:0, owner: PAYERS});
        } catch (e) {
          commit(RES_KEY, {status:1, owner: PAYERS});
        }
      }else{
        commit(RES_KEY, {status:1, owner: PAYERS});
      }
    })
    .catch(err => {
      if(err.response){
        commit(RES_KEY, {status:2, owner: PAYERS});
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

  [PORTS]({commit}){

    Axios.get(`${PROXY}location/ports`, {headers: hToken()})
    .then(res=>{
      if(!res.data.error){
        let payload;
        try {
          payload = res.data.data
          commit(PORTS, payload);
          commit(RES_KEY, {status:0, owner: PORTS});
        } catch (e) {
          commit(RES_KEY, {status:1, owner: PORTS});
        }
      }else{
        commit(RES_KEY, {status:1, owner: PORTS});
      }
    })
    .catch(err => {
      if(err.response){
        commit(RES_KEY, {status:2, owner: PORTS});
      }
    })
  },

  [GARAGES]({commit}, id){
    commit(AUTO_FETCHING);
    Axios.get(`${PROXY}location/garages/${id}`, {headers: hToken()})
    .then(res=>{
      if(!res.data.error){
        let payload;
        try {
          payload = res.data.data
          commit(GARAGES, payload);
          commit(RES_KEY, {status:0, owner: GARAGES});
        } catch (e) {
          commit(RES_KEY, {status:1, owner: GARAGES});
        }
      }else{
        commit(RES_KEY, {status:1, owner: GARAGES});
      }
      commit(AUTO_FETCHING);
    })
    .catch(err => {
      if(err.response){
        commit(RES_KEY, {status:2, owner: GARAGES});
        commit(AUTO_FETCHING);
      }
    })
  },

  [LGS]({commit}){

    Axios.get(`${PROXY}location/local_governments`, {headers: hToken()})
    .then(res=>{
      if(!res.data.error){
        let payload;
        try {
          payload = res.data.data
          commit(LGS, payload);
          commit(RES_KEY, {status:0, owner: LGS});
        } catch (e) {
          commit(RES_KEY, {status:1, owner: LGS});
        }
      }else{
        commit(RES_KEY, {status:1, owner: LGS});
      }
    })
    .catch(err => {
      if(err.response){
        commit(RES_KEY, {status:2, owner: LGS});
      }
    })
  },

  [AGENTTYPES]({commit}){
    // commit(FETCHING, )
    commit(GETTINGTYPES);
    Axios.get(`${PROXY}admin/agent_types`, {headers: hToken()})
    .then(res=>{
      if(!res.data.error){
        let payload;
        try {
          payload = res.data.data
          commit(AGENTTYPES, payload);
          commit(RES_KEY, {status:0, owner: AGENTTYPES});
        } catch (e) {
          commit(RES_KEY, {status:1, owner: AGENTTYPES});
        }
      }else{
        commit(RES_KEY, {status:1, owner: AGENTTYPES});
      }
      commit(GETTINGTYPES);
    })
    .catch(err => {
      if(err.response){
        commit(RES_KEY, {status:2, owner: AGENTTYPES});
        commit(GETTINGTYPES);
      }
    })
  },

  [ADMINTYPES]({commit}){

    Axios.get(`${PROXY}admin/admins/types`, {headers: hToken()})
    .then(res=>{
      if(!res.data.error){
        let payload;
        try {
          payload = res.data.data
          commit(ADMINTYPES, payload);
          commit(RES_KEY, {status:0, owner: ADMINTYPES});
        } catch (e) {
          commit(RES_KEY, {status:1, owner: ADMINTYPES});
        }
      }else{
        commit(RES_KEY, {status:1, owner: ADMINTYPES});
      }

    })
    .catch(err => {
      if(err.response){
        commit(RES_KEY, {status:2, owner: ADMINTYPES});

      }
    })
  },
},

}

