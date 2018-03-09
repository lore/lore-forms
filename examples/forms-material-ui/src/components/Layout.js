/**
 * This component is intended to reflect the high level structure of your application,
 * and render any components that are common across all views, such as the header or
 * top-level navigation. All other components should be rendered by route handlers.
 **/

import React from 'react';
import createReactClass from 'create-react-class';
import Navigation from './Navigation';

export default createReactClass({
  displayName: 'Layout',

  render: function() {
    return (
      <div>
        <Navigation />
        {React.cloneElement(this.props.children)}
      </div>
    );
  }

});
