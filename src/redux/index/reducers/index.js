import * as types from '../actions/types';
import configDB from 'config/config_db';
// import indexedDB from '@/utils/db-src';

// indexedDB.createStore(configDB.dbs.db_1.name, { key: 'name', val: 0 });

const reducer = (state = { value:0 }, action) => {

  switch (action.type) {
    case types.INCREMENT:
      // console.log(indexedDB.getStore('name'));
      return {
        value: state.value + 1
      }
    case types.DECREAMENT:
      return {
        value: state.value - 1
      }
    default:
      return state;
  }
}

export default reducer;
