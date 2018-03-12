import React from 'react';
import PropTypes from 'prop-types';

import { unix } from 'moment';

import AdInfo from './';
import Table from '../Table';

import { adDescriptor, pySet as set, mround } from '../../utils';

const tag = '@AdStats.Generals:'


export default class Generals extends React.Component {
  render() {

    const { request, redirect } = this.props;
    const { found: ads, interval } = request;

    const namesRow = [
      'Name', 
      ads.length === 0 ? '-' : ads.map((ad, i) => adDescriptor(ad, 'title', 'id', 20)).join(' + '),
    ];
    const intervalRow = [
      'Duration',
      Object.keys(interval).length === 0 ? '-' : `${unix(interval.start).format('YYYY.MM.DD')}-${unix(interval.end).format('YYYY.MM.DD')}`,
    ];
    // const createdRow = [
    //   'Created', 
    //   ads.length === 0 ? '-' : unix(Math.min(...ads.map((ad, i) => ad.created))).format('DD.MM.YYYY HH:mm:ss'),
    // ];
    const DESCRIPTION_MAX_LENGTH = 45;
    const description = ads.filter(ad => (typeof ad.description === 'string')).map((ad, i) => `${ad.description}`).join(', ') || [''];
    const descriptionRow = [
      'Description', 
      ads.length === 0 ? '-' : (description.length > DESCRIPTION_MAX_LENGTH) ? (description.substr(0, DESCRIPTION_MAX_LENGTH) + '...') : description,
    ];
    const redirectRow = [
      'Redirect', 
      Object.keys(redirect).length === 0 ? '-' : `about ${mround(redirect.ratio, 0)}%`,
    ];
    const REDIRECT_TO_MAX_LENGTH = 35;
    const redirectToString = set(ads.map((ad, i) => ad.redirect_url)).join(', ');
    const redirectToRow = [
      'Redirect to', 
      ads.length === 0 ? '-' : redirectToString.length > REDIRECT_TO_MAX_LENGTH ? redirectToString.slice(0, REDIRECT_TO_MAX_LENGTH)+'...' : redirectToString,
    ];
    const mediaTypesRow = [
      'Media Type', 
      ads.length === 0 ? '-' : set(ads.map((ad, i) => ad.type)).join(', '),
    ];
    const durationsRow = [
      'Guarantied duration per view', 
      ads.length === 0 ? '-' : `${Math.round(Math.min(...ads.map((ad, i) => ad.duration))*10)/10} seconds`,
    ];

    const rows = [
      namesRow,
      intervalRow,
      // createdRow,
      descriptionRow,
      redirectRow,
      redirectToRow,
      mediaTypesRow,
      durationsRow,
    ];
    const spans= [1, 1];

    return <AdInfo title='General Information' >
      <Table rows={ rows } spans={ spans } />
    </AdInfo>;
  }
}


Generals.propTypes = {
  request: PropTypes.shape({
    found: PropTypes.arrayOf(PropTypes.object.isRequired),
    interval: PropTypes.object.isRequired,
  }).isRequired,
  redirect: PropTypes.object.isRequired,
};

Generals.defaultProps = {
  request: {
    found: [],
    interval: {},
  },
  redirect: {},
};
