import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { mapObject, jwtAsGetArg } from '../utils';

import AdThumbnailImage from './AdThumbnailImage';

import { disableAd } from '../actions/adsActions';

const tag = '@Ad:';


@connect(null)
export default class Ad extends React.Component {

  onEnableButtonClick = (event) => {
    print(tag, 'enable button clicked');
  };

  onDeleteButtonClick = (event) => {
    print(tag, 'delete button clicked');
    this.props.dispatch(disableAd(this.props.ad, true));
  };

  onIdClick = (event) => {
    const { innerHTML } = event.target;
    window.prompt('Copy Identifier: Ctrl + C, Enter', innerHTML);
  };

  render() {
    const { ad } = this.props;
    const created = new Date(ad.created*1000);

    return <div class='ia-ad' title={ ad.id }>

        <AdThumbnailImage src={ ad.source } type={ ad.type } />

        <div class='ia-ad__info'>

          <div class='ia-ad__info-left'>
            <div class='ia-ad__title-container'>
              <h3 class='ia-ad__title'>{ ad.title }</h3>
              { ad.description ? <p>{ ad.description }</p> : null }
            </div>
            <div class='ia-ad__views-container'>
              <p class='ia-ad__views-text'>Views: { ad.views }</p>
              <p class='ia-ad__requests-text'>
                Requests: { ad.requests }<br/>
                Identifier: <span onClick={ this.onIdClick }>{ ad.id }</span>
              </p>
            </div>
          </div>

          <div class='ia-ad__info-right' style={ { flexFlow: 'row wrap' } }>
            <div class='ia-ad__enable-button' onClick={ this.onEnableButtonClick }>
              <img class='ia-ad__enable-image' src={`images/icons/ad_${ad.enabled ? 'enabled' : 'disabled'}2.svg`} />
            </div>

            <div class='ia-ad__enable-button' onClick={ this.onDeleteButtonClick }>
              <img class='ia-ad__enable-image' src={`images/modal-close-pink.svg`} />
            </div>

            <div class='ia-ad__stuff-container'>
              <p>Created: { created.toLocaleDateString() }</p>
              <p>Redirect: { ad.redirect_url }</p>
              <div class='ia-ad__iconed-stuff-text ia-ad__duration'>
                <span class='ia-ad__iconed-stuff-text ia-ad__duration-text'>Duration: { ad.duration }s</span>
              </div>
              <div class='ia-ad__iconed-stuff ia-ad__weight'>
                <span class='ia-ad__iconed-stuff-text ia-ad__weight-text'>Weight: { ad.weight }</span>
              </div>
            </div>
          </div>

        </div>
      </div>;
  }
}

Ad.propTypes = {
  ad: PropTypes.object.isRequired,
};
