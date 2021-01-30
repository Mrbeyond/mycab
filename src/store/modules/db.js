import Axios from 'axios';
import { PROXY } from '../../constants/config';
import { ADMINS, RES_KEY,CARDS, hToken, TAGS, TERMINALS, AGENTS } from '../../constants/formKey';
// import { TEST, AUTHMODAL, STUDENT, CHANGE_LOGIN_STATUS, INTENDED_PAGE,
//   AUTH_CONFIRM_ERROR

// } from '../Constants/storeConst';

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
  }

}

