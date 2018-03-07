import { get } from 'axios';

export function fetchViews(date) {
  return {
    type: 'FETCH_VIEWS',
    payload: get('http://localhost:5000/v1/admin/list/views'),
  }
}
