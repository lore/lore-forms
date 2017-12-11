import PropTypes from 'prop-types';
import React from 'react';
import createReactClass from 'create-react-class';
import _ from 'lodash';
import withMuiTheme from './withMuiTheme';
import { Dialog } from 'material-ui';
import { connect } from 'lore-hook-connect';

function getDisplayName(Component) {
  return Component.displayName || Component.name || 'Component';
}

export default function(options = {}) {
  return function(DecoratedComponent) {
    const displayName = 'Dialog(' + getDisplayName(DecoratedComponent) + ')';

    return connect(function(getState, props) {
      return {};
    }, { subscribe: true })(
      withMuiTheme(createReactClass({
        displayName: displayName,

        propTypes: {
          onSubmit: PropTypes.func
        },

        getDefaultProps: function(){
          return {
            onSubmit: function(){}
          }
        },

        getInitialState: function(){
          return {
            isOpen: false
          }
        },

        /**
         * Have the dialog open after we mount the component to make sure
         * we see the opening transition - if we don't do this, it will
         * immediately snap into view on the screen (without a gentle transition)
         */
        componentDidMount: function() {
          this.setState({
            isOpen: true
          });
          if (this.focus) {
            this.focus();
          }
        },

        onCancel: function(e){
          this.dismiss();
        },

        dismiss: function() {
          this.setState({
            isOpen: false
          });
        },

        onSubmit: function(data) {
          this.dismiss();
          this.props.onSubmit(data || {});
        },

        contextTypes: {
          store: PropTypes.object.isRequired
        },

        render: function() {
          const defaults = _.defaultsDeep({}, options, {
            // className: 'dialog formable',
            // bodyClassName: 'dialog-body',
            // contentClassName: 'compact-dialog medium',
            className: 'className',
            bodyClassName: 'bodyClassName',
            contentClassName: 'contentClassName',
            paperClassName: 'paperClassName',
            autoDetectWindowHeight: false,
            style: {
              color: 'red'
            },
            contentStyle: {
              overflow: 'scroll',
            },
            bodyStyle: {
              padding: 0,
              overflow: 'visible',
              maxHeight: '100%',
              marginBottom: '64px'
            }
          });

          return (
            <Dialog
              ref="dialog"
              modal={false}
              onRequestClose={this.onCancel}
              open={this.state.isOpen}
              // className={defaults.className}
              // bodyClassName={defaults.bodyClassName}
              // contentClassName={defaults.contentClassName}
              // bodyStyle={{ padding: 0 }}
              {...defaults}
            >
              <DecoratedComponent
                {...this.props}
                onCancel={this.onCancel}
                onSubmit={this.onSubmit}
              />
            </Dialog>
          );
        }
      }))
    );
  };
}
