import SboxConstants from '../SboxConstants/SboxConstants';
import {dispatch, register} from '../Dispatchers/SboxDispatcher;'
import {EventEmitter} from 'events';
const CHANGE_EVENT = 'change';

const SboxHomeStore = Object.assign({},EventEmitter.prototype,{
  state:{

  },
	emitChange() {
			this.emit(CHANGE_EVENT)
	},
	addChangeListener(callback) {
			this.on(CHANGE_EVENT, callback)
	},
	removeChangeListener(callback) {
			this.removeListener(CHANGE_EVENT, callback)
	},
  updateState({iv_id, iv_name, iv_address}) {
    const id = iv_id;
    const name = iv_name;
    const address = iv_address;
    const newState = Object.assign({},{id, name, address});
    this.state = Object.assign({},this.state,newState);
  },
  getState(){
    return this.state
  },
	dispatcherIndex: register(function(action) {
	   switch(action.actionType){
				case SboxConstants.DEFAULT_FUNC:
          SboxHomeStore.updateState(action.data);
          SboxHomeStore.emitChange();
					break;
        default:
         // do nothing
		  }

	})

});
module.exports = SboxHomeStore;
