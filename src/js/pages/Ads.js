import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import ScrollArea from 'react-scrollbar';

import Ad from '../components/Ad';
import CreateAdButton from '../components/CreateAdButton';
import Spinner from '../components/LoadingIndicator';
import { fetchAds } from '../actions/adsActions';
import CreateAdModalView from '../components/CreateAdModalView';

import { INTERVAL } from '../constants';

const tag = '@AdsPage:';


@connect((store) => ({ads: store.ads}))
export default class Ads extends React.Component {

  state = {
    isOnAdCreate: false,
  };

  componentWillMount() {
    if (Date.now()-this.props.ads.fetched > INTERVAL.updateAdsList) {
      this.props.dispatch(fetchAds());
    }
  }

  onCreateAdClose = (e, caller) => {
    this.setState({
      ...this.state,
      isOnAdCreate: false,
    })
  };

  openCreateAd = () => {
    this.setState({
      ...this.state,
      isOnAdCreate: true,
    });
  };

  onAdCreated = () => {
    this.props.dispatch(fetchAds());
    this.setState({
      ...this.state,
      isOnAdCreate: false,
    })
  };

  render() {

    const { ads } = this.props;
    const adComponents = ads.ads.map((ad, i) => <Ad key={ad.id+i} ad={ad} />);

    const { isOnAdCreate } = this.state;

    return <div class={ 'ia-tab ia-ads-tab' + (isOnAdCreate ? ' ia-lock' : '') } >
      <CreateAdModalView title='Create Ad' isOpen={ isOnAdCreate } 
      onCloseClick={ this.onCreateAdClose } onAdCreated={ this.onAdCreated } />
      { adComponents }
      { ads.isFetching ? <Spinner centered height='100px' width='100px' /> : null }
      <CreateAdButton handler={ this.openCreateAd } />
    </div>;
  }
}
