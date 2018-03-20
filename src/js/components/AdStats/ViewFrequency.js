import React from 'react';
import PropTypes from 'prop-types';

import AdInfo from './';
import Table from '../Table';

const tag = '@AdStats.ViewFrequency:'


export default class ViewFrequency extends React.Component {
  render() {

    // const uviews = {
    //   "1": "8895 (68.8%)",
    //   "2": "2251 (17.4%)",
    //   "3": "827 (6.4%)",
    //   "4": "392 (3.0%)",
    //   "5+": "564 (4.4%)"
    // };

    const { uviews, translate } = this.props;

    const headers = [translate('number-of-views'), translate('number-of-users'), translate('percentage-of-users')];
    const rows = Object.keys(uviews)
      .map((views) => views.toString())
      .sort()
      .map((views) => [views, ...uviews[views].split(' ')])
      .map(([views, users, ratio]) => [views, users, ratio.slice(1,-2)]);

    const spans= [1, 2, 2];

    return <AdInfo title={translate('frequency-of-views')} >
      <Table headers={ headers } rows={ rows } spans={ spans } />
    </AdInfo>;
  }
}


ViewFrequency.propTypes = {
  uviews: PropTypes.object.isRequired,
  translate: PropTypes.func.isRequired,
};

ViewFrequency.defaultProps = {
  uviews: {},
};
