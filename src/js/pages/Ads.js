import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import ScrollArea from 'react-scrollbar';
import { getTranslate } from 'react-localize-redux';

import Ad from '../components/Ad';
import CreateAdButton from '../components/CreateAdButton';
import Spinner from '../components/LoadingIndicator';
import { fetchAds } from '../actions/adsActions';
import CreateAdModalView from '../components/CreateAdModalView';
import { RadioGroup } from '../components/RadioGroup';
import { INTERVAL } from '../constants';

import { selectors } from "../reducers/adsReducer";

const tag = '@AdsPage:';

const RADIO_FILTERS = {
  ALL: 'ALL',
  ENABLED: 'ENABLED',
  DISABLED: 'DISABLED'
};

const mapStateToProps = ({ locale, ...restState }) => ({
  ads: selectors.getSortedAds(restState),
  isFetching: restState.ads.isFetching,
  translate: getTranslate(locale),
});
@connect(mapStateToProps)
export default class Ads extends React.Component {

  state = {
    isOnAdCreate: false,
    currentRadioFilter: RADIO_FILTERS.ALL,
  };

  componentWillMount() {
    this.props.dispatch(fetchAds());

    this.radioFilters = Object
      .keys(RADIO_FILTERS)
      .map(key => RADIO_FILTERS[key])
      .map(value => ({ label: this.props.translate(value.toLowerCase()), value }));
  }

  onRadioChange = value => this.setState({ currentRadioFilter: value });

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

  renderAds() {
    const { ads  } = this.props;
    console.log(this.props.ads);
    const { currentRadioFilter } = this.state;

    return ads
      .filter(ad => {
        switch (currentRadioFilter) {
          case RADIO_FILTERS.ALL:
            return true;
          case RADIO_FILTERS.ENABLED:
            return ad.enabled;
          case RADIO_FILTERS.DISABLED:
            return !ad.enabled;
          default:
            return true;
        }
      })
      .map((ad, idx) => <Ad key={ad.id + idx} ad={ad} />)
  }

  render() {
    const { isFetching, translate } = this.props;
    const { currentRadioFilter } = this.state;

    const { isOnAdCreate } = this.state;
    const adsItems = this.renderAds();
    const hasItems = adsItems.length > 0;
    const localizedItemState = translate(RADIO_FILTERS[currentRadioFilter].toLowerCase());

    return (
      <div class={ 'ia-tab ia-ads-tab' + (isOnAdCreate ? ' ia-lock' : '') } >
        <div class='ia-ads-container'>
          <div class='ia-ads-list'>
            {
              hasItems
                ? adsItems
                : <p> { translate('no-ads', { state: localizedItemState }) } </p>
            }
          </div>
          <div className="ia-ads-filters">
            <h2> { translate('filters') } </h2>
            <h3> { translate('stat-filter-state') } </h3>
            <RadioGroup
              items={this.radioFilters}
              active={currentRadioFilter}
              onChange={this.onRadioChange}
            />
          </div>

          { isFetching && <Spinner centered height='100px' width='100px' /> }
          <CreateAdButton handler={ this.openCreateAd } />
        </div>
        { isOnAdCreate && (
          <CreateAdModalView
            title={translate('ads-modal-title')}
            isOpen={true}
            onCloseClick={ this.onCreateAdClose }
            onAdCreated={ this.onAdCreated }
          />
        )}
      </div>
    );
  }
}
