import React from 'react';
import PropTypes from 'prop-types';

import AdInfo from './';
import Table from '../Table';

import { mround } from '../../utils';

const tag = '@AdStats.ViewReport:'


export default class ViewReport extends React.Component {
  render() {

    let { views } = this.props;

    let [ _, total ] = views.time_average;
    let { uniqueness: uniques } = views;

    const { views_per_day: vpd, views_per_week: vpw } = total;
    const { uniques_per_day: upd, uniques_per_week: upw } = uniques

    const headers = ['', 'Views', 'Unique views'];
    const rows = [
      ['Average per 1 day', mround(vpd, 1) || '-', mround(upd, 1) || '-'],
      ['Average per 1 week', mround(vpw, 1) || '-', mround(upw, 1) || '-'],
      ['Total for interval', uniques.total || '-', uniques.uniques || '-'],
    ];
    const spans= [2, 1, 1];

    return <AdInfo title='View report'>
      <Table headers={ headers } rows={ rows } spans={ spans } />
    </AdInfo>;
  }
}


ViewReport.propTypes = {
  views: PropTypes.shape({
    time_average: PropTypes.arrayOf(PropTypes.object).isRequired,
    uniqueness: PropTypes.object,
  })
};

ViewReport.defaultProps = {
  views: {
    time_average: [{}, {}], 
    uniqueness: {}
  }
}
