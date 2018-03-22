import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

const UNIT_BYTE = 1024 * 1024;

export class FileInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);

    this.state = {
      file: null
    }
  }

  handleClick(e) {
    e.preventDefault();

    if (!this.props.disabled) {
      this.file.click()
    }
  }

  handleChange() {
    let fileInput = this.file,
      fileVal = this.fileVal;

    let {required, validate} = this.props;

    if (fileInput.files.length > 0) {
      let errors = [];
      let file = fileInput.files[0];

      if (required) {
        if (file.size > validate.size * UNIT_BYTE) {
          errors.push({
            code:'file-too-large',
            params:{
              name: file.name,
              limit: validate.size
            }
          })
        }

        let extName = `.${this.parseExt(file.name)}`;
        if (Array.isArray(validate.ext)) {
          if (validate.ext.indexOf(extName) === -1) {
            errors.push({
              code:'file-wrong-format',
              params:{
                name: file.name,
                ext: validate.ext
              }
            })
          }
        }
        else {
          if (extName !== validate.ext) {
            errors.push({
              code:'file-wrong-format',
              params:{
                name: file.name,
                ext: validate.ext
              }
            })
          }
        }
      }

      if (errors.length > 0) {
        this.file.value = '';
        return <span>{errors}</span>
      }
      else {
        fileVal.value = file.name;

        this.setState(
          { file },
          () => this.props.onChange(file)
        )
      }
    }

  }

  handleCancel() {
    this.file.value = '';
    this.fileVal.value = '';

    this.setState({
      file: null
    })
  }

  parseExt(fileName) {
    let splitArr = fileName.split('.'),
      lastIdx = splitArr.length - 1;

    if (splitArr.length < 2 || splitArr[lastIdx - 1] === '') {
      return null
    }
    else {
      return splitArr[lastIdx]
    }
  }

  render() {
    let {id, containerClass, btnClass, textClass, placeholder, btnText, disabled, validate} = this.props;
    let {file} = this.state;
    let hasFile = Boolean(file);
    let ext = (validate && validate.ext) ? validate.ext : '';

    return <div id={id} className='c-file-input'>
      <input type='file' ref={ ref => this.file = ref} accept={ext} onChange={this.handleChange}  disabled={disabled} />
      <button className={'c-file-input-btn '+ btnClass} onClick={this.handleClick} disabled={disabled}>{btnText}</button>
      <input type='text' ref={ ref => this.fileVal = ref} className={'c-file-input-text ' + textClass} placeholder={placeholder} disabled={disabled} onClick={this.handleClick}/>
      <span className={'c-file-input-cancel ' + (!hasFile ? 'hide-cancel' : '')} onClick={hasFile ? this.handleCancel : null}>X</span>
      {/*<span className='c-file-input-error'>1111</span>*/}
    </div>
  }
}

FileInput.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string,
  btnClass: PropTypes.string,
  textClass: PropTypes.string,
  btnText: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  validate: PropTypes.shape({
    size: PropTypes.number,
    ext: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  }),
  onChange: PropTypes.func,
};

FileInput.defaultProps = {
  placeholder: 'Please choose a file',
  btnText: 'Choose file',
  disabled: false,
  onChange() {},
};
