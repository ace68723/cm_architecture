Constants
Dispatch
import {EventEmitter} from 'events';
const CHANGE_EVENT = 'change';

const Store = Object.assign({},EventEmitter.prototype,{
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
  updateState(newState) {
    this.state = Object.assign({},this.state,newState);
  },
  getState(){
    return this.state
  },
	dispatcherIndex: register(function(action) {
	   switch(action.actionType){
				case SboxConstants.DEFAULT_FUNC:
          Store.updateState(action.data);
          Store.emitChange();
					break;
        default:
         // do nothing
		  }

	})

});
module.exports = SboxAddressStore;
