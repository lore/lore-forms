/**
 * This component is intended to reflect the high level structure of your application,
 * and render any components that are common across all views, such as the header or
 * top-level navigation. All other components should be rendered by route handlers.
 **/

import React from 'react';
import createReactClass from 'create-react-class';
import { Drawer, AppBar, List, ListItem } from 'material-ui';
import Header from './Header';
import Navigation from './Navigation';

export default createReactClass({
  displayName: 'Layout',

  render: function() {
    return (
      <div>
        <Navigation />
        {/*<div style={{paddingLeft: '256px'}}>*/}
          {/*<AppBar*/}
            {/*title="Concept - Required Knowledge"*/}
            {/*showMenuIconButton={false}*/}
          {/*/>*/}
        {/*</div>*/}
        {React.cloneElement(this.props.children)}
        {/*<div className="container-fluid" style={{ paddingTop: '64px', paddingLeft: '30px', paddingRight: '30px' }}>*/}
          {/*<div style={{paddingLeft: '256px'}}>*/}
            {/*{React.cloneElement(this.props.children)}*/}
          {/*</div>*/}
        {/*</div>*/}
      </div>
    );
  }

});
