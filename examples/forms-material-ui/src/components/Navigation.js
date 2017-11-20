import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Drawer, AppBar, List, ListItem, Divider, Subheader } from 'material-ui';
import { makeSelectable } from 'material-ui/List';
import Header from './Header';

const SelectableList = makeSelectable(List);

export default withRouter(createReactClass({
  displayName: 'Layout',

  propTypes: {
    router: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  },

  onChange: function(event, value) {
    if (!value) {
      return;
    }
    this.props.router.push(value);
  },

  render: function() {
    const { location } = this.props;

    return (
      <Drawer width={256} open={true} >
        <AppBar
          title="Material UI Forms"
          showMenuIconButton={false}
        />
        <SelectableList value={location.pathname} onChange={this.onChange}>
          <Subheader>
            Walkthrough
          </Subheader>
          <ListItem primaryText="Concept" value="/quotes" />
          <ListItem primaryText="Basic Form" value="/tweets-basic" />
          <ListItem primaryText="Overlay Form" value="/tweets-overlay" />
          <ListItem primaryText="Wizard Form" value="/tweets-wizard" />
          <Divider />
          <Subheader>
            Methods
          </Subheader>
          <ListItem primaryText="Create" value="/create" />
          <ListItem primaryText="Update" value="/update" />
          <ListItem primaryText="Destroy" value="/destroy" />
          <Divider />
          <Subheader>
            Fields
          </Subheader>
          <ListItem primaryText="All Fields" value="/fields" />
        </SelectableList>
      </Drawer>
    );
  }

}));
