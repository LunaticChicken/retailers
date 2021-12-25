import React, { Component, createRef } from 'react';
import AuthService from '../../service/AuthService';

class LocationItems extends Component {
  constructor(props) {
    super(props);
    this.modalRef = createRef();
    this.toastRef = createRef();
    this.managerContactsModalRef = createRef();
    this.noAvailableSpaceModalRef = createRef();
    this.forwardModalRef = createRef();
    this.state = {
      currentLocation: {
        location: {},
        availableAmount: 0
      },
      locationItems: [],
      dispatchRequest: {
        applicationNumber: '',
        destLocation: '',
        itemsToDispatch: [{
          upc: 0,
          amount: 0,
          cost: 0,
        }]
      },
      forwardLocation: '',
      locationIds: [],
      applications: [],
      applicationNumber: '',
      status: ''
    };
  }

  render() {
    let userCanDispatch = AuthService.currentUserHasRole('application:post');
    return (
      <table className='table table-striped'>
        <thead>
        <tr>
          <th scope='col' />
          <th scope='col'>Upc</th>
          <th scope='col'>Label</th>
          {userCanDispatch && <th scope='col'>Amount to dispatch</th>}
          <th scope='col'>Amount</th>
        </tr>
        </thead>
        <tbody>
        {this.props.locationItems && this.props.locationItems.map((item, index) => {
          return (
            <tr key={item.id}>
              <th scope='row'>

              </th>
              <td>{item.upc}</td>
              <td>{item.label}</td>
              {userCanDispatch && <td>
                <input
                  type='number'
                  className='form-control'
                  aria-describedby='inputGroupPrepend'
                  autoComplete='off'
                  required
                  min='0'
                  style={{ width: 150 }}
                  value={this.props.itemsToDispatch[index] && this.props.itemsToDispatch[index].amount}
                  onChange={() => this.props.onItemsToDispatchInput(window.event, index)}
                />
              </td>}
              <td>{item.amount}</td>
            </tr>
          );
        })}
        </tbody>
      </table>
    );
  }
}

export default LocationItems;