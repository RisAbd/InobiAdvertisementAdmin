import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';
import { mapObject, jwtAsGetArg } from '../utils';

import AdThumbnailImage from './AdThumbnailImage';

import { disableAd, updateAd } from '../actions/adsActions';
import { Switch } from "./Switch";

const tag = '@Ad:';

const formatRedirectLink = str => {
  const match = str.match(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})/);

  return match ? match[0] : str;
};

const mapStateToProps = ({ locale }) => ({ translate: getTranslate(locale) });

@connect(mapStateToProps, null)
export default class Ad extends React.Component {
  onEnableButtonClick = (event) => {
    print(tag, 'enable button clicked');
    const { ad, dispatch } = this.props;
    const updatedAd = { id: ad.id, enabled: !ad.enabled };

    dispatch(updateAd(updatedAd));
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
    const { ad, translate } = this.props;
    const created = new Date(ad.created*1000);
    return (
      <div class='ia-ad'>
        <AdThumbnailImage src={ ad.source } type={ ad.type }>
          <span className="ia-ad__badge ia-ad__badge--alpha">
            { translate('duration')}: { ad.duration }s
          </span>
        </AdThumbnailImage>
        <div class='ia-ad__info'>
          <div class='ia-ad__info-left'>
            <div class='ia-ad__title-container'>
              <h2 class='ia-ad__title'>
                { ad.title }
              </h2>
              { ad.description ? <p className="ia-ad__description">{ ad.description }</p> : null }
            </div>
            <div className="ia-ad__meta">
              <span className="ia-ad__date">
                { translate('created')}: { created.toLocaleDateString() }
              </span>
              <span className="ia-ad__badge">
                { translate(ad.type) }
              </span>
            </div>
            <div class='ia-ad__info-description'>
              <p class='ia-ad__info-text'>
                { translate('views') }: { ad.views }
              </p>
              <p class='ia-ad__info-text'>
                { translate('requests') }: { ad.requests }<br/>
              </p>
              <p class='ia-ad__info-text'>
                { translate('weight')}: { ad.weight }
              </p>
              <p class="ia-ad__info-text">
                { translate('redirect') }:&nbsp;
                <a href={`http://${ad.redirect_url}`} target="_blank">
                  { formatRedirectLink(ad.redirect_url) }
                </a>
              </p>
            </div>
          </div>

          <div class='ia-ad__info-right' style={ { flexFlow: 'row wrap' } }>
            <div class='ia-ad__stuff-container'>
              <span class='ia-ad__iconed-stuff-text ia-ad__weight-text'></span>
            </div>
            <Switch
              onChange={this.onEnableButtonClick}
              checked={ad.enabled}
            />
          </div>

        </div>
      </div>
    );
  }
}

Ad.propTypes = {
  ad: PropTypes.object.isRequired,
};
