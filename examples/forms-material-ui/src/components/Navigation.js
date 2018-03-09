import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Drawer, AppBar, List, ListItem, Divider, Subheader } from 'material-ui';
import { makeSelectable } from 'material-ui/List';

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
        <SelectableList value={`/${location.pathname.split('/')[1]}`} onChange={this.onChange}>
          <Subheader>
            ---- Forms ----
          </Subheader>
          <Divider />
          <Subheader>
            Create
          </Subheader>
          <ListItem primaryText="Optimistic" value="/forms-create-optimistic" />
          <ListItem primaryText="Overlay" value="/forms-create-overlay" />
          <ListItem primaryText="Wizard" value="/forms-create-wizard" />
          <ListItem primaryText="Wizard - Generic" value="/forms-create-wizard-generic" />
          <Divider />
          <Subheader>
            Update
          </Subheader>
          <ListItem primaryText="Optimistic" value="/forms-update-optimistic" />
          <ListItem primaryText="Overlay" value="/forms-update-overlay" />
          <ListItem primaryText="Wizard" value="/forms-update-wizard" />
          <ListItem primaryText="Wizard - Generic" value="/forms-update-wizard-generic" />
          <Divider />
          <Subheader>
            Destroy
          </Subheader>
          <ListItem primaryText="Optimistic" value="/forms-destroy-optimistic" />
          <ListItem primaryText="Overlay" value="/forms-destroy-overlay" />
          <ListItem primaryText="Wizard" value="/forms-destroy-wizard" />
          <ListItem primaryText="Wizard - Generic" value="/forms-destroy-wizard-generic" />
          <Divider />
          <Subheader>
            ---- Dialogs ----
          </Subheader>
          <Divider />
          <Subheader>
            Create
          </Subheader>
          <ListItem primaryText="Optimistic" value="/dialogs-create-optimistic" />
          <ListItem primaryText="Overlay" value="/dialogs-create-overlay" />
          <ListItem primaryText="Wizard" value="/dialogs-create-wizard" />
          <ListItem primaryText="Wizard - Generic" value="/dialogs-create-wizard-generic" />
          <Divider />
          <Subheader>
            Update
          </Subheader>
          <ListItem primaryText="Optimistic" value="/dialogs-update-optimistic" />
          <ListItem primaryText="Overlay" value="/dialogs-update-overlay" />
          <ListItem primaryText="Wizard" value="/dialogs-update-wizard" />
          <ListItem primaryText="Wizard - Generic" value="/dialogs-update-wizard-generic" />
          <Divider />
          <Subheader>
            Destroy
          </Subheader>
          <ListItem primaryText="Optimistic" value="/dialogs-destroy-optimistic" />
          <ListItem primaryText="Overlay" value="/dialogs-destroy-overlay" />
          <ListItem primaryText="Wizard" value="/dialogs-destroy-wizard" />
          <ListItem primaryText="Wizard - Generic" value="/dialogs-destroy-wizard-generic" />
        </SelectableList>
      </Drawer>
    );
  }

}));
