import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router';
import { AppBar, Tabs, Tab, IconButton, Paper, Toolbar, ToolbarGroup } from 'material-ui';
import { ActionHome } from 'material-ui/svg-icons';
import createReactClass from 'create-react-class';
import HeaderLink from './HeaderLink';

var Routes = {
  QUOTES: '/quotes',
  TWEETS: '/tweets',
  USERS: '/users',
  COMBINED: '/combined'
};

const styles = {
  tabs: {
    // marginTop: '8px'
  },
  tab: {
    // marginBottom: '8px',
    // width: '150px'
  }
};

export default withRouter(createReactClass({
  displayName: 'Header',

  contextTypes: {
    muiTheme: PropTypes.object.isRequired
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
    const { muiTheme } = this.context;
    var tabValue = this.getTabValue();

    var logoIcon = (
      <IconButton onTouchTap={this.onLeftIconButtonTouchTap}>
        <ActionHome />
      </IconButton>
    );

    return (
      <Paper rounded={false} zDepth={2} style={{
        backgroundColor: muiTheme.palette.primary1Color,
        // zIndex: muiTheme.zIndex.appBar,
        position: 'relative'
      }}>
        <div className="container">
        <Toolbar style={{ backgroundColor: muiTheme.palette.primary1Color }}>
          <ToolbarGroup firstChild={true}>
            <div>
              <HeaderLink key="home" to="/" matches={[/^\//]}>
                Material UI Forms
              </HeaderLink>
            </div>
          </ToolbarGroup>
          <ToolbarGroup>
            <HeaderLink key="services" to="/services" matches={[/^\/service\//]}>Concept</HeaderLink>
            <HeaderLink key="powered-services" to="/powered-services" matches={[/^\/powered-service\//]}>Tweets</HeaderLink>
            <HeaderLink key="help-resources" to="/help-resources" matches={[/^\/help-resource\//]}>Users</HeaderLink>
            <HeaderLink key="forms" to="/forms" matches={[/^\/forms\//]}>Combined</HeaderLink>
          </ToolbarGroup>
          <ToolbarGroup lastChild={true}>
          </ToolbarGroup>
        </Toolbar>
          <Paper style={{ backgroundColor: muiTheme.palette.primary1Color }}>
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
          </Paper>
        </div>
      </Paper>
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
