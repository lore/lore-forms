import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router';

export default withRouter(createReactClass({
  displayName: 'Layout',

  propTypes: {
    router: PropTypes.object.isRequired
  },

  render: function() {
    return (
      <div className="bd-sidebar">
        <nav className="bd-links">
          <div className="bd-toc-link">
            Forms
          </div>
          <div className="bd-toc-item active">
            <div className="bd-toc-link">
              Create
            </div>
            <div className="nav bd-sidenav">
              <Link to="/forms-create-optimistic" activeClassName="active">Optimistic</Link>
              <Link to="/forms-create-overlay" activeClassName="active">Overlay</Link>
              <Link to="/forms-create-wizard" activeClassName="active">Wizard</Link>
              <Link to="/forms-create-wizard-generic" activeClassName="active">Wizard - Generic</Link>
            </div>
          </div>

          <div className="bd-toc-item active">
            <div className="bd-toc-link">
              Update
            </div>
            <div className="nav bd-sidenav">
              <Link to="/forms-update-optimistic" activeClassName="active">Optimistic</Link>
              <Link to="/forms-update-overlay" activeClassName="active">Overlay</Link>
              <Link to="/forms-update-wizard" activeClassName="active">Wizard</Link>
              <Link to="/forms-update-wizard-generic" activeClassName="active">Wizard - Generic</Link>
            </div>
          </div>

          <div className="bd-toc-item active">
            <div className="bd-toc-link">
              Delete
            </div>
            <div className="nav bd-sidenav">
              <Link to="/forms-destroy-optimistic" activeClassName="active">Optimistic</Link>
              <Link to="/forms-destroy-overlay" activeClassName="active">Overlay</Link>
              <Link to="/forms-destroy-wizard" activeClassName="active">Wizard</Link>
              <Link to="/forms-destroy-wizard-generic" activeClassName="active">Wizard - Generic</Link>
            </div>
          </div>

          <div className="bd-toc-link">
            Dialogs
          </div>
          <div className="bd-toc-item active">
            <div className="bd-toc-link">
              Create
            </div>
            <div className="nav bd-sidenav">
              <Link to="/dialogs-create-optimistic" activeClassName="active">Optimistic</Link>
              <Link to="/dialogs-create-overlay" activeClassName="active">Overlay</Link>
              <Link to="/dialogs-create-wizard" activeClassName="active">Wizard</Link>
              <Link to="/dialogs-create-wizard-generic" activeClassName="active">Wizard - Generic</Link>
            </div>
          </div>

          <div className="bd-toc-item active">
            <div className="bd-toc-link">
              Update
            </div>
            <div className="nav bd-sidenav">
              <Link to="/dialogs-update-optimistic" activeClassName="active">Optimistic</Link>
              <Link to="/dialogs-update-overlay" activeClassName="active">Overlay</Link>
              <Link to="/dialogs-update-wizard" activeClassName="active">Wizard</Link>
              <Link to="/dialogs-update-wizard-generic" activeClassName="active">Wizard - Generic</Link>
            </div>
          </div>

          <div className="bd-toc-item active">
            <div className="bd-toc-link">
              Delete
            </div>
            <div className="nav bd-sidenav">
              <Link to="/dialogs-destroy-optimistic" activeClassName="active">Optimistic</Link>
              <Link to="/dialogs-destroy-overlay" activeClassName="active">Overlay</Link>
              <Link to="/dialogs-destroy-wizard" activeClassName="active">Wizard</Link>
              <Link to="/dialogs-destroy-wizard-generic" activeClassName="active">Wizard - Generic</Link>
            </div>
          </div>
        </nav>
      </div>
    );
  }

}));
