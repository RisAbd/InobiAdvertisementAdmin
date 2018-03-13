import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getTranslate } from 'react-localize-redux';

import ModalView from './ModalView';

import ItemPickerModal from './ItemPickerModal';
import Item from './ItemPickerModal/Item';
import SrcItem from './ItemPickerModal/SrcItem';
import Thumbnail from './AdThumbnailImage';
import ErrorMessage from './MessageView/HTTPError';
import SuccessMessage from './MessageView/Success';
import Spinner from './LoadingIndicator';

import { INTERVAL, MEDIA_TYPES } from '../constants';
import { fetchList } from '../actions/mediaActions';
import { setCreateAdReset, createAd } from '../actions/adsActions';

import { timeout } from '../utils';

const tag = '@CreateAdModalView:';

const mapStateToProps = ({ mediaLists, ads, locale }) => ({
  mediaLists,
  create: ads.create,
  translate: getTranslate(locale),
});

@connect(mapStateToProps)
export default class CreateAdModalView extends React.Component {

  _DEFAULT_STATE = {
    ad: {
      title: null,
      description: null,
      redirect_url: null,
      weight: 12,
      duration: 8,
      type: 'unknown',
      source: null,
    },
    showItemPicker: false,
    dir: 'temp',
    created: null,
  };

  state = {
    ...this._DEFAULT_STATE,
  };

  resetState = () => {
    this.setState({
      ...this._DEFAULT_STATE,
      created: Date.now(),
    });
    this.props.dispatch(fetchList(this.state.dir));
    timeout(INTERVAL.refreshAfterAdCreate, () => {
      this.setState({
        ...this._DEFAULT_STATE,
      });
      this.props.onAdCreated();
    });
  };

  componentWillReceiveProps(props) {
    if (props.create.shouldReset) {
      this.resetState();
      props.dispatch(setCreateAdReset());
    }
  }

  componentWillMount() {
    const { dir } = this.state;
    const { [dir]: ds } = this.props.mediaLists;
    if (!ds.isFetching && Date.now() - ds.fetched > INTERVAL.oneMinute) {
      this.props.dispatch(fetchList(dir));
    }
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    this.props.dispatch(createAd(this.state.ad));
  };

  onPickSourceButtonClick = (e) => {
    this.setState({
      ...this.state,
      showItemPicker: true,
    })
  };

  onItemPickerClose = (e, reason) => {
    this.setState({
      ...this.state,
      showItemPicker: false,
    })
  };

  onSourceItemClick = (src) => {
    const chunks = src.split('.');
    const ext = chunks[chunks.length-1];
    let { type } = this.state.ad;
    for (let _type in MEDIA_TYPES) {
      if (MEDIA_TYPES[_type].includes(ext)) {
        type = _type;
        break;
      }
    }
    this.setState({
      ...this.state,
      ad: {
        ...this.state.ad,
        type: type,
        source: src,
      },
      showItemPicker: false,
    });
  };

  onAdValueChange = (e) => {
    this.setState({
      ...this.state,
      ad: {
        ...this.state.ad,
        [e.target.name]: e.target.value,
      }
    });
  };

  render() {
    const { ad, showItemPicker, dir, created } = this.state;

    const { create, mediaLists, onAdCreate, translate, ...rest } = this.props;

    const { [dir]: media } = mediaLists;

    return <ModalView { ...rest }>

      { !!media.fetched ?
        <ItemPickerModal
          title={translate('Ads.Modal.pick-a-source')}
          isOpen={ showItemPicker }
          onCloseClick={ this.onItemPickerClose }

          onItemClick={ this.onSourceItemClick }
          ItemConstructor={ SrcItem }
          items={ media.files } /> : null }

      <form method='post' class='ia-create-ad-form'
        onSubmit={ this.handleFormSubmit }>

        { create.error ? <ErrorMessage error={ create.error } /> : null }
        { created ? <SuccessMessage content={translate('Ads.Modal.success')} /> : null }

        { create.isPosting ? <Spinner centered width='80px' height='80px' withShim />  : null }

        <div class='ia-create-ad-form__single-field'
          style={{display: 'flex', justifyContent: 'center', margin: '5px 0'}}>
          <Thumbnail dir={ dir } src={ ad.source || null } type={ ad.type }
          onClick={ this.onPickSourceButtonClick } />
        </div>

        <input type='text' name='source'
          readOnly hidden
          value={ ad.source || '' } />

        { /*<div class='ia-create-ad-form__single-field'>
          <label to='type'>Type: </label>
          <select name='type' value={ ad.type }
            onChange={ this.onAdValueChange }>
            <option value="unknown">unknown</option>
            <option value="video">video</option>
            <option value="banner">picture</option>
            <option value="iframe">iframe</option>
          </select>
        </div>*/ }

        <input class='ia-create-ad-form__single-field'
          type='text' name='title'
          value={ ad.title || '' }
          onChange={ this.onAdValueChange }
          class='ia-create-ad-form__title'
          placeholder={translate('Ads.Modal.title')} />

        <textarea class='ia-create-ad-form__single-field'
          name="description"
          cols="25" rows="4"
          onChange={ this.onAdValueChange }
          value={ ad.description || '' }
          placeholder={translate('Ads.Modal.description')} />

        <div class='ia-create-ad-form__single-field'>
          <label to='weight'>{ translate('Ads.Modal.weight') }: </label>
          <input type='range' name='weight'
            min='1' max='15' step='1'
            onChange={ this.onAdValueChange }
            value={ ad.weight || 1 } />
          <span>{ ad.weight }</span>
        </div>

        <div class='ia-create-ad-form__single-field'>
          <label to='duration'>{ translate('Ads.Modal.duration') }: </label>
          <input type='number' name='duration'
          onChange={ this.onAdValueChange }
          value={ ad.duration } />
        </div>

        <div class='ia-create-ad-form__single-field'>
          <label to='redirect_url'>{ translate('Ads.Modal.redirect-to') }: </label>
          <input type='text' name='redirect_url'
            value={ ad.redirect_url || '' }
            onChange={ this.onAdValueChange }
            placeholder='example.com' />
        </div>

        <div class='ia-create-ad-form__single-field'>
          <input type='submit' value={translate('Ads.Modal.create')} />
        </div>
      </form>

    </ModalView>;
  }
}

CreateAdModalView.propTypes = {
  onAdCreated: PropTypes.func.isRequired,
};
