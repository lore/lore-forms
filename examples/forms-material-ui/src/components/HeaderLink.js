import PropTypes from 'prop-types';
import React from 'react';
import createReactClass from 'create-react-class';
import { withRouter, Link } from 'react-router';
import _ from 'lodash';

export default withRouter(createReactClass({
  displayName: 'HeaderLink',

  propTypes: {
    to: PropTypes.string.isRequired,
    children: PropTypes.string.isRequired,
    matches: PropTypes.array.isRequired
  },

  getDefaultProps: function() {
    return {
      matches: []
    }
  },

  getStyles: function() {
    var styles = {
      listItem: {
        display: 'inline-block',
        paddingRight: '5px',
        paddingLeft: '5px'
      },
      link: {
        cursor: 'pointer',
        textDecoration: 'none',
        color: 'rgba(255, 255, 255, 0.701961)',
        marginLeft: '15px',
        marginRight: '15px',
        fontSize: '21px',
        fontWeight: '400'
      }
    };

    styles.activeLink = _.extend({}, styles.link, {
      color: 'white'
    });

    return styles;
  },

  render: function() {
    var route = this.props.to;
    var styles = this.getStyles();
    var router = this.props.router;
    var regexRoutes = this.props.matches;
    var isActive = false;
    var currentRoute = router.getCurrentLocation().pathname;

    regexRoutes.forEach(function(regex) {
      if (isActive) return;

      if (currentRoute.match(regex)) {
        isActive = true;
      }
    });

    isActive = isActive || router.isActive(route);

    return (
      <li style={styles.listItem}>
        <Link to={route} style={isActive ? styles.activeLink : styles.link}>
          {this.props.children}
        </Link>
      </li>
    )
  }

}));
