import React from 'react';
import createReactClass from 'create-react-class';
import { Drawer, AppBar } from 'material-ui';
import List from '../_common/List';
import PayloadStates from '../../constants/PayloadStates';

export default createReactClass({
  displayName: 'Layout',

  componentDidMount: function() {
    window.scrollTo(0, 0);
  },

  onClick(tweet) {
    const { router, route } = this.props;
    router.push(`/${route}/${tweet.id}`);
  },

  render: function() {
    const { title } = this.props;

    return (
      <div>
        <div style={{ paddingLeft: '256px' }}>
          <AppBar
            title={title || 'Forms'}
            showMenuIconButton={false}
          />
        </div>
        <div className="container-fluid" style={{ paddingTop: '15px', paddingLeft: '30px', paddingRight: '30px' }}>
          <div style={{paddingLeft: '256px'}}>
            <div className="row">
              <div style={{ paddingLeft: '15px', paddingRight: '15px', width: 'calc(100% - 300px)'}}>
                {React.cloneElement(this.props.children)}
              </div>
              <Drawer width={300} openSecondary={true} open={true} >
                <AppBar
                  title="Tweets"
                  showMenuIconButton={false}
                />
                <List onClick={this.onClick} />
              </Drawer>
            </div>
          </div>
        </div>
      </div>
    );
  }

});
