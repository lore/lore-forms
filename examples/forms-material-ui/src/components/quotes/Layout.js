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
            title="Concept"
            showMenuIconButton={false}
          />
        </div>
        <div className="container-fluid" style={{ paddingTop: '15px', paddingLeft: '30px', paddingRight: '30px' }}>
          <div style={{paddingLeft: '256px'}}>
            <div className="row">
              <div style={{ paddingLeft: '15px', paddingRight: '15px', width: 'calc(100% - 300px)'}}>
                <h3>
                  Construction of Hook Pattern
                </h3>
                <h4 style={{ paddingTop: 0 }}>
                  At first, how the hooks build forms likely won't make much sense. This walks through a series of
                  refactors to demonstrate the pattern used by the hook and how it came to be.
                </h4>

                <br/>
                <h3>
                  1. Basic Form
                </h3>
                <h4 style={{ paddingTop: 0 }}>
                  Let's start with a basic form, built from components provided by
                  the <strong>lore-react-forms</strong> library. This form has two fields (Quote, Author) with
                  basic validation (fields are required) and a submit button that is only enabled once the form is
                  valid.
                </h4>
                <h4>
                  Created by manually building the form using React components
                </h4>
                <br/>
                <CodeExample
                  code={createCardFormCode}
                  title="Component Form"
                >
                  <CreateCardForm onSubmit={this.onSubmit} />
                </CodeExample>

                <br/>
                <h3>
                  2. Move Common Code into Config
                </h3>
                <h4 style={{ paddingTop: 0 }}>
                  Forms within an application are often quite similar. They have a set of <strong>fields</strong> and
                  a set of <strong>actions</strong>. So let's start by breaking our previous form up into one that
                  takes an array of fields and an array of actions. We'll create a special component that understands
                  how to render this configuration called <strong>ConfigForm</strong>.
                </h4>
                <h4>
                  Created by converting the form into a config object
                </h4>
                <br/>
                <CodeExample
                  code={createCardConfigCode}
                  title="Config Form"
                >
                  <CreateCardConfig onSubmit={this.onSubmit} />
                </CodeExample>

                <br/>
                <h3>
                  3. Create a Reusable Template
                </h3>
                <h4 style={{ paddingTop: 0 }}>
                  In the previous example, we didn't actually save any code, or really simplify anything. We just
                  converted each field into a object with a <strong>render</strong> method. But in reality, all fields
                  of a specific type (like a text field, or a checkbox) with an application look the same.
                </h4>
                <h4 style={{ paddingTop: 0 }}>
                  To reflect this, we're going to create a new component called a <strong>TemplateForm</strong> that
                  takes a series of config object. One that describes how to render form elements of a specific type,
                  such as a text field, and another that knows how to render actions. Then, we'll simply pass a config
                  object that descrbies what fields and actions we want to render.
                </h4>
                <h4 style={{ paddingTop: 0 }}>
                  To reflect this, we're going to create a new component called a <strong>TemplateForm</strong> that
                  takes a series of config object. One that describes how to render form elements of a specific type,
                  such as a text field, and another that knows how to render actions. Then, we'll simply pass a config
                  object that describes what fields and actions we want to render.
                </h4>
                <h4 style={{ paddingTop: 0 }}>
                  This essentially decouples <strong>what</strong> you want to render from <strong>how</strong> you
                  want it to be render. Instead of <strong>creating</strong> the form, you're
                  now <strong>describing</strong> the form.
                </h4>
                <h4>
                  Created by breaking common fields and actions out into a map
                </h4>
                <br/>
                <CodeExample
                  code={createCardTemplateCode}
                  title="Template Form"
                >
                  <CreateCardTemplate onSubmit={this.onSubmit} />
                </CodeExample>

                <br/>
                <h3>
                  4. Create a Configuration Schema
                </h3>
                <h4 style={{ paddingTop: 0 }}>
                  Our previous example required each field to have information about how any field should be render,
                  for example by being wrapped in a <strong>row</strong> and <strong>col-md-12</strong> class. This
                  time, we're going out that code into a <strong>schema</strong> that describes how the different
                  sections of a form should be rendered (fields, field, actions, action).
                </h4>
                <h4 style={{ paddingTop: 0 }}>
                  This allows us to have a single location where we can modify the common appearance of
                  forms, <strong>AND</strong> we can re-use sections of the schema without having to rewrite the
                  whole thing (for example, we could create a custom <strong>actions</strong> schema that includes
                  footer information, but keep everything else the same for that form.
                </h4>
                <h4>
                  Created by breaking form apart into defineable sections
                </h4>
                <br/>
                <CodeExample
                  code={createCardSchemaCode}
                  title="Schema Form"
                >
                  <CreateCardSchema onSubmit={this.onSubmit} />
                </CodeExample>

                <br/>
                <h3>
                  5. Move Common Values into Application Config
                </h3>
                <h4 style={{ paddingTop: 0 }}>
                  The <strong>schema</strong>, <strong>fieldMap</strong>, and <strong>actionMap</strong> we created
                  previously will be re-used across all our forms, so we're going to move them into our application
                  config under <strong>config/forms</strong>. This reduces are form to <strong>just</strong> the
                  config object we created, and our <strong>TemplateForm</strong> component that understands how to
                  construct a form from our various config objects.
                </h4>
                <h4>
                  Created by moving the schema, fieldMap and actionMap to config/forms
                </h4>
                <br/>
                <CodeExample
                  code={createCardHookCode}
                  title="Hook Form: Concept"
                >
                  <CreateCardHook onSubmit={this.onSubmit} />
                </CodeExample>

                <br/>
                <h3>
                  6. Create Custom Template
                </h3>
                <h4 style={{ paddingTop: 0 }}>
                  At this point, we have the ability to create a custom form from a description, but we may need to
                  change how that form looks, such adding a header or footer, or even breaking our form up into a
                  series of steps like a wizard.
                </h4>
                <h4 style={{ paddingTop: 0 }}>
                  To do that, we can simply create a new template and re-use the functionality in previous templates,
                  if that behavior is useful.
                </h4>
                <h4 style={{ paddingTop: 0 }}>
                  At this point, what we've really demonstrated is a way to create re-usable templates driven where
                  the underlying rendering behavior can be overridden. For example, you could keep the same config,
                  but swap out the component library, or redesign a template, and know it will sync across all forms
                  using it.
                </h4>
                <h4 style={{ paddingTop: 0 }}>
                  <strong>Full disclosure</strong>: the real motivation for creating this library was to a) remove
                  thought related to building forms, and b) create a solution that would work across multiple
                  products and component libraries.
                </h4>
                <h4>
                  Created by wrapping the basic schema-based for in a template
                </h4>
                <br/>
                <CodeExample
                  code={createCardHookTemplateCode}
                  title="Hook Form: Concept w/ Template"
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
