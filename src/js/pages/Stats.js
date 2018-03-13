import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import { getTranslate } from 'react-localize-redux';

import ViewReport from '../components/AdStats/ViewReport';
import Generals from '../components/AdStats/Generals';
import ViewFrequency from '../components/AdStats/ViewFrequency';

import IntervalViews from '../components/AdStats/Graphs/IntervalViews';
import DailyViews from '../components/AdStats/Graphs/DailyViews';

import OSVersions from '../components/AdStats/OSVersions';
import OSStats from '../components/AdStats/OS';

import Header from '../components/AdStats/Header';
import Requester from '../components/AdStats/Requester';
import LoadingLayerView from '../components/LoadingLayerView';

import { fetchAds } from '../actions/adsActions';
import { setFullscreen } from '../actions/statsActions';

import { INTERVAL } from '../constants';

import { pySet as set } from '../utils';

const tag = '@StatsPage:';

const mapStateToProps = ({ stats, locale }) => ({
  stats,
  translate: getTranslate(locale),
});

@connect(mapStateToProps)
export default class Stats extends React.Component {

  componentWillMount() {
    window.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
  }

  onKeyDown = (e) => {
    if (e.keyCode === 27 && this.props.stats.fullscreen) {
      this.props.dispatch(setFullscreen(false));
    }
  };

  render() {

    const { stats, translate } = this.props;
    const { fetched, fullscreen } = stats;

    const generals = <Generals
      request={ fetched ? stats.stats.request : undefined }
      redirect={ fetched ? stats.stats.redirect : undefined }
      translate={translate}
      />;

    const m = fullscreen && fetched;

    const p = m ? 30 : 0;

    const title = !m ? '-?-' : set(stats.stats.request.found.map((ad) => ad.title))[0];

    let main = <div class={ `ia-tab ia-stats-tab${ m ? ' ia-stats-tab--fullscreened' : ''}`}>
      { m ? null : <Requester /> }
      <LoadingLayerView hidden={ !stats.isFetching } style={ {position: 'fixed', } } />
      <div class='ia-stats-tab__column' style={ { flexGrow: 6, maxWidth: '53%', } }>
        { generals }
        <ViewReport
          views={ fetched ? stats.stats : undefined }
          translate={translate}
          />
        <IntervalViews views={ fetched ? stats.stats.time_average[0].in_interval : undefined } />
      </div>
      <div class='ia-stats-tab__column' style={ { flexGrow: 5, maxWidth: '47%', } }>
        <DailyViews
          views={ fetched ? stats.stats.time_average[0].daily : undefined }
          translate={translate}
          />
        <ViewFrequency
          uviews={ fetched ? stats.stats.uniqueness.general : undefined }
          translate={translate}
          />
        <OSStats stats={ fetched ? stats.stats.devices.summary : undefined } />
        <OSVersions stats={ fetched ? stats.stats.devices.summary : undefined } />
      </div>
    </div>;

    return !m ? main : <div class='ia-ad-stats-tab__fullscreen-tab-wrapper'>
      <Header title={title} />
      { main }
    </div>;
  }
}

