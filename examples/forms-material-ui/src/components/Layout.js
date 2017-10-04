/**
 * This component is intended to reflect the high level structure of your application,
 * and render any components that are common across all views, such as the header or
 * top-level navigation. All other components should be rendered by route handlers.
 **/

import React from 'react';
import Header from './Header';

export default React.createClass({
  displayName: 'Layout',

  render: function() {
    return (
      <div>
        <Header />
        <div className="container" style={{paddingTop: '64px'}}>
          {React.cloneElement(this.props.children)}
        </div>
      </div>
    );
  }

});
