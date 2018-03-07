import React from 'react';
import PropTypes from 'prop-types';

import { Chart } from 'react-google-charts';

import AdInfo from '../';

const tag = '@AdStats.Graphs:'


export default class Graphs extends React.Component {

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

/*backgroundColor.stroke  
The color of the chart border, as an HTML color string.

Type: string
Default: '#666'
backgroundColor.strokeWidth 
The border width, in pixels.

Type: number
Default: 0*/

    const data = [
        ["2017-04-10", 235],
        ["2017-04-11", 654],
        ["2017-04-12", 772],
        ["2017-04-13", 695],
        ["2017-04-14", 1046],
        ["2017-04-15", 995],
        ["2017-04-16", 616],
        ["2017-04-17", 1208],
        ["2017-04-18", 977],
        ["2017-04-19", 750],
        ["2017-04-20", 764],
        ["2017-04-21", 823],
        ["2017-04-22", 649],
        ["2017-04-23", 474],
        ["2017-04-24", 790],
        ["2017-04-25", 692],
        ["2017-04-26", 672],
        ["2017-04-27", 699],
        // ["2017-04-28", 726],
        // ["2017-04-29", 641],
        // ["2017-04-30", 389],
        // ["2017-05-01", 479],
        // ["2017-05-02", 815],
        // ["2017-05-03", 851],
        // ["2017-05-04", 791],
        // ["2017-05-05", 466],
        // ["2017-05-06", 549],
        // ["2017-05-07", 428],
        // ["2017-05-08", 587],
        // ["2017-05-09", 466],
        // ["2017-05-10", 841],
      ],
      maxViews = Math.max(...data.map(([date, views])=>views)),
      minViews = Math.min(...data.map(([date, views])=>views)),
      rows = data.map(([date, views]) => [this.normalizeDate(date), views]),
      options = {
        hAxis: { 
          title: 'date', 
          minValue: minViews-100, 
          color: '#333', 
          count: Math.ceil((maxViews-minViews)/100),
          maxValue: maxViews+100, 
        },
        vAxis: { title: 'views', },
        pointSize: 3,
        lineWidth: 1,
        colors:['#0082dd',],
        chartArea:{
          left: '10%',
          top:'10%',
          width: '85%',
          height: '85%'
        }
      },
      columns = [
        {
          type: 'string',
          label: 'date',
        },
        {
          type: 'number',
          label: 'views',
        },
      ];


    return <AdInfo title='Number of view per month' style={ { flexGrow: 2, } }>
      <Chart 
        chartType='ScatterChart'
        rows={ rows }
        columns={ columns }
        options={ options }
        graph_id='interval_views'
        legend_toggle />
    </AdInfo>;
  }
}