import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import { withRouter } from 'react-router';
import { Paper, Subheader } from 'material-ui';
import PayloadStates from '../../constants/PayloadStates';
import Spinner from '../common/Spinner';
import SelectableList from '../SelectableList';
import Quote from './Quote';

export default lore.connect(function(getState, props){
  return {
    quotes: getState('quote.find')
  }
})(
withRouter(createReactClass({
  displayName: 'List',

  propTypes: {
    quotes: PropTypes.object.isRequired
  },

  render: function() {
    const {
      quotes
    } = this.props;

    if (quotes.state === PayloadStates.FETCHING) {
      return (
        <Spinner/>
      );
    }

    return (
      <div>
        <Paper>
          <Subheader>
            Quotes
          </Subheader>
          <SelectableList defaultValue={0}>
            {quotes.data.map((quote) => {
              return (
                <Quote
                  key={quote.id || quote.cid}
                  value={quote.id || quote.cid}
                  quote={quote}
                />
              );
            })}
          </SelectableList>
        </Paper>
      </div>
    );
  }

}))
);
