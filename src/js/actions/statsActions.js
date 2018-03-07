import { URL } from '../constants';
import { fetch } from '../utils';

const tag = '@actions.stats:';

export function fetchStats(request) {

  // print(tag, 'return fetch stats func back to normal');
  // url and method POST
  return {
    type: 'FETCH_STATS',
    // payload: fetch(URL.testStats, { ...request, with_file: request.withFile }, 'GET'),
    payload: fetch(URL.stats, { ...request, with_file: request.withFile }, 'POST'),
  }
}

export function downloadFile(partial_url) {
  return {
    type: 'DOWNLOAD_STATS_FILE',
    payload: fetch(URL.host+partial_url, {}, 'GET')
  }
}

export function setFullscreen(fullscreen) {
  return {
    type: 'SET_FULLSCREEN',
    payload: fullscreen,
  };
}