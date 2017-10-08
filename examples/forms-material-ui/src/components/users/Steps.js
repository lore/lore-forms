import React from 'react';
import createReactClass from 'create-react-class';
import _ from 'lodash';

export default createReactClass({
  displayName: 'Steps',

  // getInitialState: function() {
  //   return {
  //     stepIndex: 0
  //   }
  // },
  //
  // handleNext: function() {
  //   const {stepIndex} = this.state;
  //   this.setState({
  //     stepIndex: stepIndex + 1,
  //     finished: stepIndex >= 0,
  //   });
  // },
  //
  // handlePrev: function() {
  //   const {stepIndex} = this.state;
  //   if (stepIndex > 0) {
  //     this.setState({
  //       stepIndex: stepIndex - 1
  //     });
  //   }
  // },

  render: function () {
    const {
      stepIndex,
      children
    } = this.props;

    return _.flatten(children)[stepIndex];
  }
});
