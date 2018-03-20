import React from 'react';
import PropTypes from 'prop-types';

import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Cell } from 'recharts';

import AdInfo from '../';
import Label from './CustomLabel';

const tag = '@AdStats.DailyViews:'


function RotatedTick(props) {
  const {x, y, stroke, payload} = props;
  return (
    <g transform={`translate(${x+payload.offset-2},${y})`}>
      <text x={0} y={0} dx={3} textAnchor="end" fill="#666" fontSize='9' transform="rotate(-90)">{payload.value}:00</text>
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


export default class DailyViews extends React.Component {

  normalizeHour = (hour) => {
    return `${hour}:00`;
  };

  render() {

    const { views, translate } = this.props;

    const VIEWS_LOCALIZED_STRING = translate('views');

    const data = Object.keys(views).map((hourStr) => parseInt(hourStr))
      .map((hour) => ({ hour, [VIEWS_LOCALIZED_STRING]: views[hour], }));

    return <AdInfo title={translate('avg-daily-views')} style={ { flexGrow: 2, } }>
      <ResponsiveContainer width='100%' height='80%' minHeight={320}>
        <BarChart data={data}  margin={ {top: 30, left: 0, bottom: 20, right: 20} }>

          <XAxis dataKey='hour' label={ <Label>{ translate('views') }</Label> } tickLine={false} interval={0} tickCount={ data.length } tickFormatter={ (hour) => `${hour}:00` } tick={ RotatedTick } />
          <YAxis dataKey={VIEWS_LOCALIZED_STRING} label={ <Label>{ translate('hours') }</Label> } tick={ FontResizedTick } />
          <CartesianGrid stroke="#ccc"
            isAnimationActive={ false }
            vertical={ false } />
          <Bar type="monotone" dataKey={VIEWS_LOCALIZED_STRING}
            barSize={50} fill="#0093ee"
            isAnimationActive={ false }>
            {
              data.map((entry, index) => {
                const color = index%2===0 ? '#55ad5e' : '#7cff92';
                return <Cell key={index} fill={color} />;
              })
            }
          </Bar>
          <Tooltip formatter={ (views) => Math.round(views*10)/10 }
            labelFormatter={ (hour) => `${hour}:00` }
            animationDuration={100} cursor={{fill: '#0093ee', fillOpacity: 0.1}} />

        </BarChart>
      </ResponsiveContainer>
    </AdInfo>;
  }
}

DailyViews.propTypes = {
  views: PropTypes.object.isRequired,
};

DailyViews.defaultProps = {
  views: {},
};
