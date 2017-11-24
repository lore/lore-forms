/* global lore */

import React from 'react';
import _ from 'lodash';
import { AutoComplete } from 'material-ui';
import { Field } from 'lore-react-forms';

class AutoCompleteField extends Field {
  constructor(props) {
    super(props);
    this.handleUpdateInput = this.handleUpdateInput.bind(this);
    this.handleNewRequest = this.handleNewRequest.bind(this);
    this.updateOptions = this.updateOptions.bind(this);
    this.updateOptions = _.debounce(this.updateOptions, 250);

    const {
      props: {
        options,
        field
      }
    } = props;

    const initialOption = _.find(options.data, function(option) {
      // console.log(`props.data[props.name]: ${props.data[props.name]}`);
      return option.id === props.data[props.name];
    });

    const searchText = initialOption ? initialOption.data[field] : '';

    this.state = {
      searchText: searchText,
      isModified: false,
      options: options || {
        data: [],
        query: {}
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    const options = this.state.options;
    // if (!options || !options.data) {
    //   return;
    // }

    const query = options.query;
    const nextOptions = lore.store.getState().user.find[JSON.stringify(query)];
    this.setState({
      options: nextOptions || options
    });
  }

  updateOptions(searchText) {
    // console.log(`updateOptions: ${searchText}`);
    this.setState({
      // searchText: searchText,
      options: lore.getState('user.find', {
        where: {
          username_like: searchText
        }
      })
    });
  }

  handleUpdateInput(searchText) {
    // console.log(`handleUpdateInput: ${searchText}`);
    this.setState({
      searchText: searchText,
      isModified: true,
      // options: lore.getState('user.find', {
      //   where: {
      //     username_like: searchText
      //   }
      // })
      options: {
        data: [
          {
            id: 0,
            data: {
              id: 0,
              username: 'Searching...'
            }
          }
        ],
        query: {}
      }
    });

    this.updateOptions(searchText);

    // _.debounce(this.updateOptions.bind(this, searchText), 250);
  }

  handleNewRequest(item, index) {
    const {
      onChange,
      name
    } = this.props;
    // console.log('handleNewRequest');
    // this.setState({
    //   searchText: '',
    // });
    onChange(name, item.value);
  }

  render() {
    const {
      isModified,
      options
    } = this.state;

    const {
      props: {
        option,
        field
      }
    } = this.props;

    const searchText = option ? (
      isModified ? this.state.searchText : option.data[field]
    ) : this.state.searchText;

    // const options = {
    //   data: [
    //     {
    //       id: 1,
    //       data: {
    //         username: 'ayla'
    //       }
    //     },
    //     {
    //       id: 2,
    //       data: {
    //         username: 'crono'
    //       }
    //     }
    //   ]
    // };

    options.data = options.data || [];

    // console.log(this.state.options);

    function mapDataToOptions(data) {
      return data.map(function(datum) {
        return {
          value: datum.id,
          text: datum.data[field]
        };
      });
    }

    // const optionsData = mapDataToOptions(options.data);
    // const dataSource = [{ value: null, text: '' }].concat(optionsData);
    const dataSource = mapDataToOptions(options.data);
    const filter = function(a, b, c) {
      return true;
    };

    return (
      <AutoComplete
        fullWidth={true}
        floatingLabelText="User"
        searchText={searchText}
        dataSource={dataSource}
        dataSourceConfig={{ text: 'text', value: 'value' }}
        onUpdateInput={this.handleUpdateInput}
        onNewRequest={this.handleNewRequest}
        filter={filter}
      />
    );
  }

}

AutoCompleteField.propTypes = _.assign({}, {
  options: React.PropTypes.object.isRequired
});

AutoCompleteField.defaultProps = _.assign({}, {
  options: {
    data: []
  }
});

export default AutoCompleteField;
