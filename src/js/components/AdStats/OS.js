import React from 'react';
import PropTypes from 'prop-types';

import AdInfo from './';
import Table from '../Table';

const tag = '@AdStats.OS:'


export default class OS extends React.Component {
  render() {

    const { stats, translate } = this.props;

    const rows = Object.keys(stats).sort()
      .filter((os) => stats[os].hasOwnProperty('total'))
      .map((os) => [os, `${Math.round(stats[os].total.ratio*10, 1)/10}%`])

    const spans = [1, 4];

    return <AdInfo title={ translate('os-heading') } >
      <Table rows={ rows } spans={ spans } zebra={2} />
    </AdInfo>;
  }
}


OS.propTypes = {
  stats: PropTypes.object.isRequired,
  translate: PropTypes.func.isRequired,
};

OS.defaultProps = {
  stats: {},
};
