import React from 'react';

const tag = '@NoMatch:';


export default class NoMatch extends React.Component {


  render() {

    const { pathname } = this.props.location;

    return <div class='ia-match-parent' style={ {backgroundColor: '#aaddff', } }>
      <span class='ia-centered'>404 - NOT FOUND ({ pathname })</span>
    </div>;
  }
}
