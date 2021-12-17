import React, { Component, createRef } from 'react';
import Util from '../../service/Util';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Toast from '../common/Toast';
import Modal from '../common/Modal';
import ApplicationsInnerModal from './ApplicationsInnerModal';

class Applications extends Component {
  constructor(props) {
    super(props);
    this.modalRef = createRef();
    this.toastRef = createRef();
    this.state = {
      locationIds: [],
      applications: [],
      applicationNumber: '',
      location: {
        identifier: ''
      },
      status: '',
      items: [{
        upc: '',
        amount: '',
        cost: null
      }],
      redirect: null
    };
  }

  componentDidMount() {
    Util.redirectIfDoesntHaveRole(this, 'DISPATCHER');
    axios.get('admin/locations').then(
      (response) => {
        this.setState({
          locationIds: response.data.map(location => location.identifier)
        });
      }
    );
    this.updateApplications();
  }

  updateApplications = () => {
    axios.get('applications').then(
      (response) => {
        this.setState({
          applications: response.data
        });
      }
    );
  };

  submit = () => {
    this.modalRef.current.click();
    axios.post('/applications', this.state).then(
      (response) => {
        Util.showPositiveToast(this, response, this.toastRef);
        this.updateApplications();
      },
      (error) => {
        Util.showNegativeToast(this, error, this.toastRef);
      }
    );
  };

  handleLocationSelection = (event, id) => {
    if (event.target.checked) {
      this.setState({
        ids: [...this.state.ids, id]
      });
    } else {
      let array = this.state.ids;
      let index = array.indexOf(id);
      if (index !== -1) {
        array.splice(index, 1);
      }
      this.setState({
        ids: array
      });
    }

  };

  deleteLocations = () => {
    axios.delete('admin/locations', {
      data: this.state.ids
    })
    .then(
      (response) => {
        Util.showPositiveToast(this, response, this.toastRef);
        this.setState({ ids: [] });
        this.updateLocations();
      }
    );
  };

  changeItem = (event, index) => {
    let name = event.target.name;
    let value = event.target.value;
    let optionalIntValue = parseInt(value);
    if (!isNaN(optionalIntValue) && !value.includes('-')) {
      value = optionalIntValue;
    }
    const newItems = this.state.items;
    newItems[index][name] = value;
    this.setState({
      items: newItems
    }, () => console.log(this.state.items));
  };

  addItem = () => {
    const newItems = this.state.items;
    newItems.push({ upc: '', amount: '', coast: null });
    console.log(newItems);
    this.setState({
      ...this.state,
      items: newItems
    });
  };

  acceptApplication = (id) => {

  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <div>
        <Toast
          toastType={this.state.toastType}
          message={this.state.message}
          ref={this.toastRef}
        />
        <div className='row align-items-center mb-3'>
          <div className='col align-items-center'>
            <button
              type='button'
              className='btn btn-primary me-3'
              onClick={() => Util.openModal(this.modalRef)}
            >
              Add
            </button>
          </div>
        </div>
        <Modal
          ref={this.modalRef}
          submit={this.submit}
        >
          <ApplicationsInnerModal applicationNumber={this.state.applicationNumber} location={this.state.location}
                                  locationIds={this.state.locationIds}
                                  status={this.state.status} items={this.state.items}
                                  addItem={this.addItem}
                                  onItemChange={this.changeItem}
                                  onLocationChange={(value) => Util.handleLocationChange(this, value)}
                                  onChange={() => Util.handleChange(this, window.event)}
          />
        </Modal>
        <table className='table table-striped'>
          <thead>
          <tr>
            <th scope='col' />
            <th scope='col'>Number</th>
            <th scope='col'>Source location</th>
            <th scope='col'>Destination location</th>
            <th scope='col'>Last updated time</th>
            <th scope='col'>Last updated by</th>
            <th scope='col'>Status</th>
          </tr>
          </thead>
          <tbody>
          {this.state.applications && this.state.applications.map((application) => (
            <tr key={application.id}>
              <th scope='row' onClick={() => this.openEditModal(application.id)}>
                {/*<input className='form-check-input' type='checkbox' value={location.id}*/}
                {/*       onChange={() => this.handleLocationSelection(window.event, location.id)} />*/}
              </th>
              <td>{application.applicationNumber}</td>
              <td>{application.srcLocation.identifier}</td>
              <td>{application.destLocation.identifier}</td>
              <td>{application.lastUpdDateTime}</td>
              <td>{application.lastUpdBy}</td>
              <td>{application.status}</td>

            </tr>
          ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Applications;