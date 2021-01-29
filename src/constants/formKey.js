export const ADD_ADMIN = "add_admin";
export const ADD_AGENT = "add_agent";
export const ADD_CARD = "add_card";
export const ADD_TAG = "add_tag";
export const ADD_PAYER = "add_payer";
export const ADD_CV = "add_commercial";
export const ADD_IV = "add_imported";

export const hToken=()=>{
  try {
     let ls = localStorage.authToken? localStorage.authToken: "";
     return { authorization: `Bearer ${ls}`}
  } catch (e) {

  }
}
