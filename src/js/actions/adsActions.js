import { fetch, sleep } from '../utils';
import { URL } from '../constants';


export function fetchAds() {
  const { jwt } = localStorage;
  return {
    type: 'FETCH_ADS',
    payload: fetch(URL.ads, { jwt }),
  }
}

export function setCreateAdReset() {
  return {
    type: 'CREATE_AD_RESET',
  };
}

export function createAd(ad) {
  return {
    type: 'CREATE_AD',
    payload: fetch(URL.createAd, { ...ad }, 'POST'),
  };
  // return (dispatch) => {
  //   dispatch({
  //     type: 'CREATE_AD_PENDING',
  //   });
  //   setTimeout(() => {
  //     fetch(URL.createAd, ad, 'POST')
  //     .then((data) => {dispatch({
  //       type: 'CREATE_AD_OK',
  //       payload: data,
  //     });})
  //     .catch((err) => {dispatch({
  //       type: 'CREATE_AD_ERR',
  //       payload: err,
  //     });})
  //   }, 3000);
  // }
}

export function updateAd({id, ...propsToUpdate}) {
  return {
    type: 'UPDATE_AD',
    payload: fetch(URL.updateAd, {id, ...propsToUpdate}, 'POST')
  };
}

export function disableAd(ad, del=false) {
  return {
    type: 'DELETE_AD',
    payload: fetch(URL.disableAd, { ad_id: ad.id, delete: del }, 'POST'),
  }
}

export function uploadAdSource(data) {
  const { jwt } = localStorage;

  return {
    type: 'UPLOAD_AD_SOURCE',
    payload: fetch(`${URL.upload_files}?jwt=${jwt}`, data, 'POST', true)
  };
}
