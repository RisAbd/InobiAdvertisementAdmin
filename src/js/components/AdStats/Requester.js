import React from 'react';
import PropTypes from 'prop-types';

import ErrorMessage from '../MessageView/HTTPError';

import { connect } from 'react-redux';
import { unix, now, utc } from 'moment';

import { INTERVAL } from '../../constants';

import { fetchAds } from '../../actions/adsActions';
import { fetchStats, setFullscreen } from '../../actions/statsActions';

import { randomColor, adDescriptor, downloadFileLink } from '../../utils';

const tag = '@AdStatsRequester:';


@connect((store) => ({ads: store.ads, stats: store.stats}))
export default class AdStatsRequester extends React.Component {
  state = {
    shouldReset: this.props.stats.fetched,
    expanded: false,
    request: {
      ads: [],
      withFile: true,
      interval: {
        start: (now()-INTERVAL.halfAMonth)/1000,  // (Date.now()-INTERVAL.halfAMonth)/1000,
        end: now()/1000,  // Date.now()/1000,
      }
    }
  };

  componentWillMount() {
    if (Date.now()-this.props.ads.fetched > INTERVAL.updateAdsList) {
      this.props.dispatch(fetchAds());
    }
  }

  componentWillReceiveProps(nextProps) {
    const { shouldReset: prev } = this.state;
    const cur = nextProps.stats.fetched;
    if (cur != prev) {
      this.setState({
        ...this.state,
        shouldReset: cur,
        expanded: false,
      });
    }
  }

  onEscDown = (e) => {
    if (e.keyCode === 27 && this.state.expanded) {
      this.setState({
        ...this.state,
        expanded: false,
      });
    }
  };

  onExpandClick = (e) => {
    this.setState({
      ...this.state,
      expanded: !this.state.expanded,
    })
  };

  onAdSelected = (ad) => {
    let { ads } = this.state.request;
    if (ads.includes(ad)) {
      ads.splice(ads.indexOf(ad), 1);
    } else {
      ads = ads.concat(ad);
    }

    this.setState({
      ...this.state,
      request: {
        ...this.state.request,
        ads: [
          ...ads,
        ]
      }
    });
  };

  onWithFileClick = (checked) => {
    this.setState({
      ...this.state,
      request: {
        ...this.state.request,
        withFile: !checked,
      },
    });
  };

  onStatsSubmit = (e) => {
    e.stopPropagation();
    e.preventDefault();

    this.props.dispatch(fetchStats(this.state.request));
  };

  onStartDateChange = (e) => {
    const { value } = e.target;
    this.setState({
      ...this.state,
      request: {
        ...this.state.request,
        interval: {
          ...this.state.request.interval,
          start: utc(value).unix(),
        },
      },
    });
  };

  onEndDateChange = (e) => {
    const { value } = e.target;
    this.setState({
      ...this.state,
      request: {
        ...this.state.request,
        interval: {
          ...this.state.request.interval,
          end: utc(value).unix(),
        },
      },
    });
  };

  onFullscreenClick = (e) => {
    this.props.dispatch(setFullscreen(true));
  };

  render() {

    const { stats } = this.props;
    const { ads } = this.props.ads;

    const { fetched } = stats;

    const { request } = this.state;
    const { ads: requestedAds } = request;

    const adComponents = ads.map((ad, i) => {
      const selected = requestedAds.includes(ad.id);
      return <li key={ ad.id }
        class={ selected ? 'ia-ad-stats-requester__ad--selected' : null }>
        <label>
          <input type='checkbox' 
            checked={ selected }
            onClick={ this.onAdSelected.bind(this, ad.id) } />
          { adDescriptor(ad) }
        </label>
      </li>;
    });

    const enableFileLink = !!(fetched && stats.stats.file);

    const { expanded } = this.state;

    return <div class={ `ia-ad-stats-requester${ expanded ? '': ' ia-ad-stats-requester--hidden'}` }
        onKeyDown={ this.onEscDown }>
      
      <form class='ia-ad-stats-requester__form'
        onSubmit={ this.onStatsSubmit }>
        { stats.error ? <ErrorMessage error={ stats.error } style={ {maxWidth: '250px'} }/> : null }
        <ul class='ia-ad-stats-requester__list'>
          { adComponents }
        </ul>
        <label>Date from:&nbsp;
          <input type='date' 
            value={ unix(request.interval.start).format('YYYY-MM-DD') } 
            onChange={ this.onStartDateChange } />
        </label> 
        <label>To:&nbsp;
          <input type='date' 
            value={ unix(request.interval.end).format('YYYY-MM-DD') } 
            onChange={ this.onEndDateChange } />
          </label>
        <label>With File: 
          <input
            type='checkbox' checked={ request.withFile } 
            onChange={ this.onWithFileClick.bind(this, request.withFile) } />
        </label>
        <input type='submit' value='Get Stats' />
      </form>
      <div class='ia-ad-stats-requester__buttons-container'>
        <button class={ 'ia-ad-stats-requester__fullscreen-button' + (fetched ? ' ia-ad-stats-requester__fullscreen-button--active' : '') } 
          onClick={ fetched ? this.onFullscreenClick : null }/>
        <a class={ 'ia-ad-stats-requester__download-button' + (!enableFileLink ? ' ia-ad-stats-requester__download-button--disabled' : '') }
          href={ enableFileLink ? downloadFileLink(stats.stats.file) : '' }
          title='Download report as file'
          target='_blank'
          onClick={ this.onDownloadClick } />
        <button class='ia-ad-stats-requester__expand-button' 
          onClick={ this.onExpandClick } />
      </div>
    </div>;
  }
}