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
        <nav className="navbar navbar-default navbar-static-top header">
          <div className="container">
            <div className="navbar-header">
              <a className="navbar-brand" href="/">Lore Example: Bootstrap Forms & Dialogs</a>
            </div>
          </div>
        </nav>
        <div className="container">
          <div className="row">
            <div className="col-md-2">
              <Navigation/>
            </div>
            <div className="col-md-10">
              {React.cloneElement(this.props.children)}
            </div>
          </div>
        </div>
      </div>
    );
  }

});
