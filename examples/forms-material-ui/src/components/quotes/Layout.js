import React from 'react';
import createReactClass from 'create-react-class';
import { Drawer, AppBar } from 'material-ui';

import CreateCardForm from './CreateCard.form';
import createCardFormCode from '!raw-loader!./CreateCard.form';
import CreateCardConfig from './CreateCard.config';
import createCardConfigCode from '!raw-loader!./CreateCard.config';
import CreateCardTemplate from './CreateCard.template';
import createCardTemplateCode from '!raw-loader!./CreateCard.template';
import CreateCardSchema from './CreateCard.schema';
import createCardSchemaCode from '!raw-loader!./CreateCard.schema';
import CreateCardHook from './CreateCard.hook';
import createCardHookCode from '!raw-loader!./CreateCard.hook';
import CreateCardHookTemplate from './CreateCard.hook.template';
import createCardHookTemplateCode from '!raw-loader!./CreateCard.hook.template';

import List from './List';
import CodeExample from '../CodeExample';

export default createReactClass({
  displayName: 'Layout',

  getInitialState: function() {
    return {
      key: 0
    }
  },

  onSubmit: function(data) {
    lore.actions.quote.create(data);
    this.setState({
      key: this.state.key + 1
    });
  },

  render: function() {
    const { key } = this.state;

    return (
      <div key={key}>
        <div style={{paddingLeft: '256px'}}>
          <AppBar
            title="Basic Form"
            showMenuIconButton={false}
          />
        </div>
        <div className="container-fluid" style={{ paddingTop: '15px', paddingLeft: '30px', paddingRight: '30px' }}>
          <div style={{paddingLeft: '256px'}}>
            <div className="row">
              <div style={{ paddingLeft: '15px', paddingRight: '15px', width: 'calc(100% - 300px)'}}>
                <h2 className="text-center">
                  Construction of Hook Pattern
                </h2>
                <br/>
                <CodeExample
                  code={createCardFormCode}
                  title="Component Form"
                  description="Created by manually building the form using React components"
                >
                  <CreateCardForm onSubmit={this.onSubmit} />
                </CodeExample>
                <br/>
                <CodeExample
                  code={createCardConfigCode}
                  title="Config Form"
                  description="Created by converting the form into a config object"
                >
                  <CreateCardConfig onSubmit={this.onSubmit} />
                </CodeExample>
                <br/>
                <CodeExample
                  code={createCardTemplateCode}
                  title="Template Form"
                  description="Created by breaking common fields and actions out into a map"
                >
                  <CreateCardTemplate onSubmit={this.onSubmit} />
                </CodeExample>
                <br/>
                <CodeExample
                  code={createCardSchemaCode}
                  title="Schema Form"
                  description="Created by breaking form apart into defineable sections"
                >
                  <CreateCardSchema onSubmit={this.onSubmit} />
                </CodeExample>
                <br/>
                <CodeExample
                  code={createCardHookCode}
                  title="Hook Form: Concept"
                  description="Created by moving the schema, fieldMap and actionMap to config/forms"
                >
                  <CreateCardHook onSubmit={this.onSubmit} />
                </CodeExample>
                <br/>
                <CodeExample
                  code={createCardHookTemplateCode}
                  title="Hook Form: Concept w/ Template"
                  description="Created by wrapping the basic schema-based for in a template"
                >
                  <CreateCardHookTemplate onSubmit={this.onSubmit} />
                </CodeExample>
              </div>
              <Drawer width={300} openSecondary={true} open={true} >
                <AppBar
                  title="Quotes"
                  showMenuIconButton={false}
                />
                <List />
              </Drawer>
            </div>
          </div>
        </div>
      </div>
    );
  }

});
