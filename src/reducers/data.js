import {RECEIVE_API_DATA, DELETE_INBOX_MAIL} from "../actions/inbox.js"


let initialState = {};


export default (state=initialState,action) => {
  switch(action.type){
    case RECEIVE_API_DATA:
    
      initialState={data:action.payload};
    	return initialState;
    	break;
    
    case DELETE_INBOX_MAIL:
    		

      return {data:initialState.data.filter(obj=>obj.id!=action.payload)};
      break;
          
    default:
      return state;
  }
};