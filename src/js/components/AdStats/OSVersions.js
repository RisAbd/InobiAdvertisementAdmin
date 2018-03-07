import React from 'react';
import PropTypes from 'prop-types';

import AdInfo from './';
import Table from '../Table';

import { pyRange as range } from '../../utils';

const tag = '@AdStats.OSVersions:'


export default class OSVersions extends React.Component {
  
  static propsTypes = {
    stats: PropTypes.object.isRequired,
  };

  static defaultProps = {
    stats: {},
  };

  render() {

    const { stats } = this.props;

    const headers = Object.keys(stats).sort();
    const rows = headers.map((os, i) => 
      [os, Object.keys(stats[os])
        .map((key) => parseInt(key))
        .filter((key) => !isNaN(key))
        .sort((a, b) => a > b)
        .map((version) => ({ version, stats: stats[os][version], }))
        ]
    ).filter(([os, arr]) => arr.length > 0)
      .map(([os, arr]) => [
          [os, ...arr.map(({version}) => version)],
          ['% of users', ...arr.map(({stats}) => stats.split(' ')[1].slice(1,-2))]
        ]);
      //   <p>{ os }<br/>% of users</p>, 
      //   ...arr.map(({version, stats}) => 
      //     (<p>{ `${version}.x`}<br/>{ stats.split(' ')[1].slice(1,-2) }</p>)
      //   )
      // ]);

    const _rows = [],
          o = _rows.push,
          i = rows.map((_rs) => _rs.map((row) => _rows.push(row)));


    return <AdInfo title='Operation system versions' >
      <Table rows={ _rows } borders='EVEN' zebra={1} />
    </AdInfo>;
  }
}