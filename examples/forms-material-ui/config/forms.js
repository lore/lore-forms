/**
 * Configuration file for forms
 *
 * This file is where you define overrides for the default forms behavior.
 */
import React from 'react';
import UsernameField from '../src/components/_common/UsernameField';

export default {

  fieldMap: {
    username: function(form, props, name) {
      const {
        getOptions,
        ...other
      } = props;
      
      return (
        <UsernameField
          name={name}
          props={props}
        />
      );

      // return (
      //   <Connect callback={getOptions}>
      //     <UsernameField
      //       name={name}
      //       props={other}
      //     />
      //   </Connect>
      // );
    },
  }

};
