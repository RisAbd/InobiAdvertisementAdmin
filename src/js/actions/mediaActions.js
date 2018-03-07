import { URL } from '../constants';
import { fetch } from '../utils';


export function fetchList(dir) {
  return (dispatch) => {
    const type = 'LIST_UPLOADS';
    dispatch({
      type: type + '_PENDING',
      dir,
    });
    fetch(URL.listUploads + dir, {}, 'GET')
      .then((resp) => {
        dispatch({
          type: type + '_OK',
          dir,
          payload: resp.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: type + '_ERR',
          dir,
          payload: err,
        })
      });
  }
}
