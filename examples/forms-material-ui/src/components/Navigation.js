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
            Hook
          </Subheader>
          <ListItem primaryText="Create" value="/hook/create" />
          <ListItem primaryText="Update" value="/hook/update" />
          <ListItem primaryText="Destroy" value="/hook/destroy" />
          <Divider />
          <Subheader>
            Fields
          </Subheader>
          <ListItem primaryText="All Fields" value="/fields" />
          <Divider />
          <Subheader>
            Dialogs
          </Subheader>
          <ListItem primaryText="Basic Dialog" value="/dialogs-basic" />
          <ListItem primaryText="Overlay Dialog" value="/dialogs-overlay" />
          <ListItem primaryText="Wizard Dialog" value="/dialogs-wizard" />
          <Divider />
        </SelectableList>
      </Drawer>
    );
  }

}));
