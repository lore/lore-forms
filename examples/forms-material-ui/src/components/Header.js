import React from 'react';
import { withRouter } from 'react-router';
import { AppBar, Tabs, Tab, IconButton } from 'material-ui';
import { ActionHome } from 'material-ui/svg-icons';
import createReactClass from 'create-react-class';

var Routes = {
  QUOTES: '/quotes',
  TWEETS: '/tweets',
  USERS: '/users',
  COMBINED: '/combined'
};

export default withRouter(createReactClass({
  displayName: 'Header',

  getStyles: function(){
    return {
      floatingActionButton: {
        top: '32px',
        right: '64px',
        position: 'fixed',
        zIndex: 5
      },
      tabs: {
        marginTop: '8px'
      },
      tab: {
        marginBottom: '8px',
        width: '150px'
      }
    }
  },

  onLeftIconButtonTouchTap: function() {
    this.props.router.push('/');
  },

  getTabValue: function() {
    var router = this.props.router;

    if (router.isActive(Routes.QUOTES)) {
      return Routes.QUOTES;
    }

    if (router.isActive(Routes.TWEETS)) {
      return Routes.TWEETS;
    }

    if (router.isActive(Routes.USERS)) {
      return Routes.USERS;
    }

    if (router.isActive(Routes.COMBINED)) {
      return Routes.COMBINED;
    }
  },

  onTabChange: function(route) {
    this.props.router.push(route);
  },

  render: function() {
    var styles = this.getStyles();
    var tabValue = this.getTabValue();

    var logoIcon = (
      <IconButton onTouchTap={this.onLeftIconButtonTouchTap}>
        <ActionHome />
      </IconButton>
    );

    return (
      <AppBar
        title="Material UI Forms"
        iconElementLeft={logoIcon}
        titleStyle={{flex: 'inherit', paddingRight: '48px'}}>
        <Tabs
          style={styles.tabs}
          value={tabValue}
          onChange={this.onTabChange}>
          <Tab
            value={Routes.QUOTES}
            label="Concept"
            style={styles.tab}
            onActive={() => {
              this.props.router.push(Routes.QUOTES);
            }}/>
          <Tab
            value={Routes.TWEETS}
            label="Tweets"
            style={styles.tab}
            onActive={() => {
              this.props.router.push(Routes.TWEETS);
            }}/>
          <Tab
            value={Routes.USERS}
            label="Users"
            style={styles.tab}
            onActive={() => {
              this.props.router.push(Routes.USERS);
            }}/>
          <Tab
            value={Routes.COMBINED}
            label="Combined"
            style={styles.tab}
            onActive={() => {
              this.props.router.push(Routes.COMBINED);
            }}/>
        </Tabs>
      </AppBar>
    );
  }
}));
