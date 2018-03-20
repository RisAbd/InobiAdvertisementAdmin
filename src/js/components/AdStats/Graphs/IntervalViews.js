import React from 'react';
import PropTypes from 'prop-types';

import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

import AdInfo from '../';
import Label from './CustomLabel';

import { mround, pyRange as range } from '../../../utils';

const tag = '@AdStats.IntervalViews:'


function RotatedTick(props) {
  const {x, y, stroke, payload} = props;
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dx={-2} dy={3} textAnchor="end" fill="#666" fontSize='10' transform="rotate(-90)">{payload.value}</text>
    </g>
  );
}

function FontResizedTick(props) {
  const {x, y, stroke, payload} = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dx={-5} dy={4} textAnchor="end" fill="#666" fontSize='12'>{payload.value}</text>
    </g>
  );
}

export default class IntervalViews extends React.Component {

  static propTypes = {
    views: PropTypes.object.isRequired,
    translate: PropTypes.func.isRequired,
  };

  static defaultProps = {
    views: {},
  };

  normalizeDate = (date) => {
    const [year, month, day] = date.split('-');
    const hMonth = {
      1: 'Jan',
      2: 'Feb',
      3: 'Mar',
      4: 'Apr',
      5: 'May',
      6: 'Jun',
      7: 'Jul',
      8: 'Aug',
      9: 'Sep',
      10: 'Oct',
      11: 'Nov',
      12: 'Dec',
    }[parseInt(month)];
    return `${day}-${hMonth}`;
  };

  render() {

    const { views, translate } = this.props;
    const VIEWS_LOCALIZED_STRING = translate('views');

    const data = Object.keys(views)
      .sort()
      .map((date) => ({ date: this.normalizeDate(date), [VIEWS_LOCALIZED_STRING]: views[date] }));

    const min = mround(Math.min(...data.map(({views, ...r}) => views)), -1)-40,
          max = mround(Math.max(...data.map(({views, ...r}) => views)), -1)+40;

    return <AdInfo title={translate('number-of-view-in-interval')} style={ { flexGrow: 2, maxHeight: '100%'} }>
      <ResponsiveContainer width='100%' height='80%' minHeight={370} minWidth={400}>
        <LineChart data={data} margin={ {top: 30, left: 0, bottom: 40, right: 40} }>
          <Line
            type="monotone"
            dataKey={VIEWS_LOCALIZED_STRING}
            barSize={50}
            fill="#0093ee"
            isAnimationActive={ false }
            />
          <XAxis dataKey='date' label={ <Label>{ translate('days') }</Label> } interval={0} tickCount={data.length} tick={RotatedTick} />
          <YAxis dataKey={VIEWS_LOCALIZED_STRING} label={ <Label>{ VIEWS_LOCALIZED_STRING }</Label> } domain={[min, max]} tick={FontResizedTick} />
          <CartesianGrid stroke="#ccc"
            vertical={ false } />
          <Tooltip labelFormatter={ (date) => date } animationDuration={100}/>
        </LineChart>
      </ResponsiveContainer>
    </AdInfo>;
  }
}
