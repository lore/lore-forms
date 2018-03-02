import React from 'react';
import createReactClass from 'create-react-class';
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
      <div className="row">
        <div className="col-md-8">
          <div>
            {React.cloneElement(this.props.children)}
          </div>
        </div>
        <div className="col-md-4">
          <h3>
            Tweets
          </h3>
          <List onClick={this.onClick} />
        </div>
      </div>
    );
  }

});
