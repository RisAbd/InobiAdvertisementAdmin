import React from 'react';
import PropTypes from 'prop-types';

import AdInfo from './';
import Table from '../Table';

const tag = '@AdStats.OS:'


export default class OS extends React.Component {
  render() {

    const { stats } = this.props;

    const rows = Object.keys(stats).sort()
      .filter((os) => stats[os].hasOwnProperty('total'))
      .map((os) => [os, `${Math.round(stats[os].total.ratio*10, 1)/10}%`])

    const spans = [1, 4];

    return <AdInfo title='Operation system' >
      <Table rows={ rows } spans={ spans } zebra={2} />
    </AdInfo>;
  }
}


OS.propTypes = {
  stats: PropTypes.object.isRequired,
};

OS.defaultProps = {
  stats: {},
};