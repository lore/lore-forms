import React from 'react';
import _ from 'lodash';
import { Card, CardText, CardActions, RaisedButton } from 'material-ui';

export default function(modelName, attributes) {
  return {
    template: 'custom',
    render: (form) => {
      return (
        <Card>
          <CardText>
            <h4>
              Are you sure you want to delete this {_.upperFirst(modelName)}?
            </h4>
          </CardText>
          <CardActions style={{ textAlign: 'right' }}>
            <RaisedButton
              label="Destroy"
              primary={true}
              onTouchTap={(data) => {
                lore.actions[modelName].destroy(form.model);
              }}
            />
          </CardActions>
        </Card>
      );
    }
  };
}