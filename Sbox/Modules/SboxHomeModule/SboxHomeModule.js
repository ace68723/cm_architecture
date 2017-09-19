import SboxHomeAPI from './SboxHomeAPI';

export default  {
  async defaultFunc(io_data) {
    try {
      const lo_data = {}
      const res = await SboxHomeAPI.getDefaultData(lo_data);
      return res
    } catch (e) {
      throw e
    }
  }
}
