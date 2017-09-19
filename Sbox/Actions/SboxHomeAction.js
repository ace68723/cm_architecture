import SboxConstants from '../SboxConstants/SboxConstants';
import {dispatch, register} from '../Dispatchers/SboxDispatcher;'
import SboxHomeModule from '../Modules/SboxHomeModule/SboxHomeModule';
export default {
  async doAction(io_data){
      try{
        const io_data = {
          // lv_id:lv_id
        }
        const data = await SboxHomeModule.defaultFunc(io_data);
        dispatch({
            actionType: SboxConstants.DEFAULT_FUNC, data
        })
      }catch(error){
        console.log(error)
      }
    },
}
