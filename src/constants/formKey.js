export const ADD_ADMIN = "add_admin";
export const ADD_AGENT = "add_agent";
export const ADD_CARD = "add_card";
export const ADD_TAG = "add_tag";
export const ADD_PAYER = "add_payer";
export const ADD_CV = "add_commercial";
export const ADD_IV = "add_imported";
export const ADD_WALLET= "add_wallet";
export const ADD_TERMINAL = "add_terminal";
export const ADD_LG = "add_lg";
export const ADD_PORT = "add_port";
export const ADD_GARAGE = "add_garage";
export const ADD_AGENT_TYPE = "add_agent_type";


export const ADMINS = "ADMINS";
export const AGENTS = "AGENTS";
export const CARDS = "CARDS";
export const TERMINALS = "TERMINALS";
export const TAGS = "TAGS";
export const RES_KEY = "RES_KEY";
export const VEHICLES = "VEHICLES";
export const PORTS = "PORTS";
export const LGS = "LGS";
export const GARAGES = "GARAGES";
export const AGENTTYPES = "AGENTTYPES";
export const ADMINTYPES = "ADMINTYPES";
export const PAYERS = "PAYERS";
export const FETCHING = "FETCHING";
export const AUTO_FETCHING = "AUTO_FETCHING";
export const GETTINGTYPES = "GETTINGTYPES";
export const ALL_GARAGES = "ALL_GARAGES";
export const VEHICLE_TYPES = "VEHICLE_TYPES";
export const REFRESHER = "REFRESHER";
export const REFRESHING = "REFRESHING";

export const hToken=()=>{
  try {
     let ls = localStorage.authToken? localStorage.authToken: "";
     return { authorization: `Bearer ${ls}`}
  } catch (e) {

  }
}

export const resCoder=(status)=>{
  let defaulter = "Something went wrong, please try again";
  if(typeof Number(status) === "number"){
    const code = Number(status);
    switch (code) {
      case 404:
          return "Sorry, page not found";
        break;
      case 403:
        return "Sorry, forbidden from this action"
      break;
      case 401:
        return "Sorry, unathorized to performe this operation"
      break;
      case 200:
        return "Your operation was successful"
      break;
      case 201:
        return "Your operation was successful";
      break;
      case 400:
        return "Operation aborted, please check your values";
      break;

      default:
        return defaulter;
        break;
    }

  }
  return defaulter;
}

export const LUX_ZONE=(time)=>{
  if(!time) return '';
  if(window.luxon){
      const local = window.luxon.DateTime.local();
      const format = time.trim().replace(' ',"T")
      const ms = window.luxon.DateTime.fromISO(format, {zone: 'Africa/Accra'});
      const rezoned = ms.setZone(local.zoneName);
      let dater = new Date(Date.parse(rezoned)).toString()
      dater = dater.slice(0,dater.indexOf('GMT'))
      return `${dater}`;
  }
  return '';
}

export const plainTimeZone=(time)=>{
  if(!time) return '';
  if(window.luxon){
      const local = window.luxon.DateTime.local();
      const format = time.trim().replace(' ',"T")
      const ms = window.luxon.DateTime.fromISO(format, {zone: 'Africa/Accra'});
      const rezoned = ms.setZone(local.zoneName);
      return new Date(Date.parse(rezoned));
  }
  return '';
}

export const statusA = ["Inactive", "Active"];
export const statusS = ["Unsuccessfull", "Successfull"];
export const statusV = ["NO","YES"];

export const toMoney = (val)=>{
  return parseInt(val).toLocaleString();

};

export const enroute=(route)=>{
  // console.log(route);
  let arr = ["agents","payers","admins","terminals", "cards", 'tags', 'garages' ];
  let formSets= [ADD_AGENT, ADD_PAYER, ADD_ADMIN, ADD_TERMINAL, ADD_CARD, ADD_TAG, ALL_GARAGES];
  if(route.split('/').length === 3){
    let curr = arr.find(data=>data.toString().toLowerCase() === route.split('/')[2].toString().toLowerCase());
    if(curr){
      curr = curr.toString();
     let ind = arr.indexOf(curr);
      return {
        formKey :  formSets[ind],
        current_path : curr.charAt(0).toUpperCase()+curr.slice(1, curr.length),
        showMenuTop : true,
      }
    }else{
      return  { formKey:"", current_path:"", showMenuTop : false, }
    }
  }else{
    return  { formKey:"", current_path:"", showMenuTop : false, }
  }
}



export const loadash = window._.noConflict();
