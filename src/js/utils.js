import axios from 'axios';
import { HOST } from './constants';

const tag = '@Utils:'


export function timeout(seconds, fn) {
  setTimeout(fn, seconds*1000);
}

export function mapObject(obj, fn) {
  const mapped = [];
  for (let key in obj) {
    mapped.push(fn(key, obj[key], obj));
  }
  return mapped;
}

export function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function jwt() {
  return localStorage.getItem('jwt');
}

export function jwtAsGetArg() {
  return `?jwt=${jwt()}`;
}

export function fetch(url, data={}, method='POST', withJWT=true) {
    if (!data) {
      data = {};
    }
    if (withJWT && !data.jwt) {
      data.jwt = jwt();
    }
    if (method === 'POST') {
      return axios.post(url, data);
    }
    return axios({
      url,
      method,
      params: data,
    });
}

export function searchParamsToObject(search, typeIt = false) {
  if (!search) {
    return null;
  }
  const chunks = search.slice(1).split('&');
  return chunks.reduce( (params, chunk) => {
    const kv = chunk.split('=');
    params[kv[0]] = kv[1];
    return params;
  }, {});
}

export function teachHistory(history) {
  history.getSearch = function() {
    return searchParamsToObject(this.location.search);
  }
  history.getSearch.bind(history);
}

export function addedStyle(elemStyle, style) {
  return `${elemStyle} ${style}`;
}

export function removedStyle(elemStyle, style) {
  return elemStyle.split(' ').filter((i) => i != style).join(' ');
}

export function randomColor() {
  const r = (ceil) => Math.round(Math.random()*(ceil || 255));
  return `rgb(${[r(), r(), r()].join(', ')})`;
}

export function pyRange(start, end, step) {
  const _start = start
  start = end === undefined ? 0 : start;
  end = end === undefined ? _start : end;
  if (step === undefined) {
    step = 1;
  }
  const out = [];
  for (let i = start; (end > start) ? i < end : i > end; i += step) {
    out.push(i);
  }
  return out;
}

export function pySet(arr) {
  return arr.reduce((set, item) => {
    if (!set.includes(item)) {
      set.push(item);
    }
    return set;
  }, [])
}

export function required(pattern='', message = 'This field is required') {
  return {
    pattern,
    required: true,
    onInvalid: (e) => { e.target.setCustomValidity(message); },
  };
}

export function adDescriptor(ad, main_key='title', filler_key='description', length=30) {
  const { 
    [main_key]: title, 
    [filler_key]: filler, 
  } = ad;

  let s = filler;
  if ((title.length+filler.length+3) > length) {
    s = filler.substr(0, (length-6) - title.length)+'...';
  }
  return `${title} (${s})`;
}

export function mround(float, to=1) {
  const r = Math.pow(10, to);
  return Math.round(float*r)/r;
}

export function downloadFileLink(partial_url) {
  return `${HOST}${partial_url}${jwtAsGetArg()}`;
}

export function isInFullscreen() {
  // print(tag, 'return isInFullscreen func back to normal soon');
  return (!window.screenTop && !window.screenY);
}