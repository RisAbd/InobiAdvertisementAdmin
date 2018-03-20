import React from 'react';
import PropTypes from 'prop-types';

const strOrNumber = PropTypes.oneOfType([PropTypes.number, PropTypes.string]);
const styles = {
  radio: {
    margin: '0 8px',
  },
  input: {
  }
};

export class RadioGroup extends React.Component {
  static propTypes = {
    active: strOrNumber.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
      label: strOrNumber,
      value: strOrNumber,
    })).isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string,
  };

  static defaultProps = {
    name: 'radioGroup',
  };

  constructor(props) {
    super();

    this.state = {
      currentValue: props.active,
    }
  }

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ currentValue: value });

    this.props.onChange(value);
  };

  render() {
    const { items, name, ...rest } = this.props;
    const { currentValue } = this.state;

    return (
      <div className="RadioGroup">
        {
          items.map(({ label, value }) => (
            <label style={styles.radio} key={label}>
              <input
                type="radio"
                name={name}
                checked={value === currentValue}
                value={value}
                onChange={this.handleChange}
                style={styles.input}
                />
              <span style={styles.text}>
                { label }
              </span>
            </label>
          ))
        }
      </div>
    )
  }

}
