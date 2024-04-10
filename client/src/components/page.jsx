import React from 'react';
import LogInForm from './logInForm';

export default class Page extends React.Component{
  addAssociation = (associationType, associationAttributes = {}) => {
    const { intakeData } = this.state;

    const postData = {
      id: intakeData.get('id'),
      association_type: associationType,
      association_attributes: associationAttributes
    };

    fetch(`${this.apiPrefix}/intake/${intakeData.get('project_id')}/add_association`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.querySelector("meta[name=csrf-token]").content
      },
      body: JSON.stringify(postData)
    }).then(res => res.json())
      .then(
        (result) => {
          console.log('============================')
          console.log(result)
          console.log(associationAttributes)
          console.log('============================')
          const updatedAssoc = {
            id: result.assoc_id,
            ...associationAttributes
          };

          if (intakeData.get(associationType)) {
            const newAssocIndex = intakeData.get(associationType).size;
            this.updateIntakeData(
              [associationType, newAssocIndex],
              Map(updatedAssoc)
            )
          } else {
            this.updateIntakeData(
              [associationType],
              [Map(updatedAssoc)]
            )
          }
        },
        (error) => {
          console.log(error);
        }
      )

    return true;
  }
  render() {
    return(
      < LogInForm />
    )
  }
};
