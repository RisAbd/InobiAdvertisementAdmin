import React from "react";

import './styles.css';

export const Switch = ({ checked, name, onChange }) => (
  <div className={`ks-switch ${checked && 'ks-switch--checked'}`}>
    <input
      className="ks-switch__input"
      type="checkbox"
      id={name}
      checked={checked}
      onChange={onChange}
      />
    <div className="ks-switch__track">
      <span className="ks-switch__toggler"/>
    </div>
  </div>
);

Switch.defaultProps = {
  name: 'switch_' + Date.now(),
  onChange() {}
};
