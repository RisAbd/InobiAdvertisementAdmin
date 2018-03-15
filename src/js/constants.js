const { protocol, hostname } = window.location;
const PORT = 5000;

// export const MEDIA_HOST = 'http://176.123.244.5';
const BASE_URL = 'http://transport.inobi.kg:5010';
export const MEDIA_HOST = `${BASE_URL}/advertisement`;
export const HOST = MEDIA_HOST;

export const URL = {
  host:                 HOST,
  login:                BASE_URL + '/app/v2/login',
  checkToken:           HOST + '/v1/admin/check_token',

  createAd:             HOST + '/v1/admin/create',
  updateAd:             HOST + '/v1/admin/update',
  disableAd:            HOST + '/v1/admin/disable',

  ads:                  HOST + '/v1/admin/ads',
  media:                MEDIA_HOST + '/media/',
  thumbnail:            MEDIA_HOST + '/v1/uploads/thumbnail/',
  temp:                 MEDIA_HOST + '/temp/',
  thumbnailTemp:        HOST + '/temp/thumbnail/',
  uploads:              HOST + '/v1/uploads/',
  thumbnail_uploads:    HOST + '/v1/uploads/thumbnail/',
  views:                HOST + '/v1/admin/list/views',

  listUploads:          HOST + '/v1/admin/list_uploads/',

  stats:                HOST + '/v1/admin/stats',
  testStats:            '/js/debug/data/stats.json',
};

export const INTERVAL = {
  oneMinute:            1*60*1000,
  threeMinutes:         3*60*1000,
  oneMonth:             30*24*60*60*1000,
  halfAMonth:           15*24*60*60*1000,
  oneWeek:              7*24*60*60*1000,

  updateAdsList:        3*60*1000,

  refreshAfterAdCreate: 3, // seconds
}

export const MEDIA_TYPES = {
  video:                ['mp4', 'avi'],
  banner:               ['png', 'jpg', 'bmp', 'svg'],
  iframe:               ['html'],
}

export const MEDIA_TYPES_INLINE = Object.keys(MEDIA_TYPES)
  .map((key) => MEDIA_TYPES[key])
  .reduce((all, arr) => { all.push(...arr); return all;}, [])
