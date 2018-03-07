import React from 'react';
import PropTypes from 'prop-types';

import { pyRange as range } from '../utils';

const tag = '@Table:'


export default class Table extends React.Component {

  static borderStyle = {
    'NORMAL': '',
    'ALL': 'ia-ad-stats-table--borders-all',
    'NONE': 'ia-ad-stats-table--boders-none',
    'ODD': 'ia-ad-stats-table--borders-odd',
    'EVEN': 'ia-ad-stats-table--borders-even',
  };

  iterate(row, times) {
    return range(times).map((num) => row.length > num ? row[num] : null);
  }

  render () {
    const { headers, rows, justify, borders, zebra, ..._rest } = this.props;

    const borderStyle = Table.borderStyle[borders];

    const zebraStyle = {
      0: 'ia-ad-stats-table--zebra-none',
      1: 'ia-ad-stats-table--zebra-odd',
      2: 'ia-ad-stats-table--zebra-even',
    }[zebra]

    let { spans, ...rest } = _rest;

    spans = spans || rows[0].map(() => justify ? 1 : undefined);
    const sum = spans.reduce(((a, b) => a+b), 0);
    const percents = spans.map((span,i) => `${(span/sum)*100}%`);

    const getStyle = (index) => {
      return { style: { width: percents[index], }, };
    };

    const max = Math.max(...rows.map((row) => row.length));

    return <table class={ `ia-ad-stats-table ia-ad-stats-table--borders-normal ${borderStyle} ${zebraStyle}` } { ...rest }>
      { headers ? 
        <thead>
          <tr>{ headers.map((item, index) => 
            <th key={ index } { ...getStyle(index) }>{ item }</th>) }
          </tr>
        </thead>
        : null }
      <tbody>
        { rows.map( (row, index) => 
            <tr key={ index }>{ this.iterate(row, max).map((content, index) => 
              <td key={ index } { ...getStyle(index) }>{ content }</td>) }
            </tr> ) }
      </tbody>
    </table>;
  }
}



Table.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string),
  rows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.node)).isRequired,
  spans: PropTypes.arrayOf(PropTypes.number),
  borders: PropTypes.oneOf(Object.keys(Table.borderStyle)),
  justify: PropTypes.bool,
  zebra: PropTypes.oneOf([0, 1, 2])
};

Table.defaultProps = {
  borders: 'NORMAL',
  spans: [],
  zebra: 0,
};