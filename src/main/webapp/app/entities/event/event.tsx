import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudSearchAction, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities } from './event.reducer';
import { IEvent } from 'app/shared/model/event.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

import { Chart } from 'primereact/chart';
import moment from 'moment';

export interface IEventProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IEventState {
  search: string;
}

export class Event extends React.Component<IEventProps, IEventState> {
  state: IEventState = {
    search: ''
  };

  componentDidMount() {
    this.props.getEntities();
  }

  search = () => {
    if (this.state.search) {
      this.props.getSearchEntities(this.state.search);
    }
  };

  clear = () => {
    this.props.getEntities();
    this.setState({
      search: ''
    });
  };

  handleSearch = event => this.setState({ search: event.target.value });

  render() {
    const { eventList, match } = this.props;

    const data = {
      labels: [],
      datasets: []
    };

    let dateIndex = -1;
    let date;
    const devices = [];
    let deviceIndex = -1;
    eventList.forEach(element => {
      date = moment(element.published_at).format('DD/MM/YYYY');
      dateIndex = data.labels.indexOf(date);
      deviceIndex = devices.indexOf(element.device.core_id);

      // creating a dataset for device if not exists
      if (deviceIndex <= -1) {
        deviceIndex = devices.push(element.device.core_id) - 1;
        data.datasets.push({
          label: 'Dataset ' + element.device.core_id,
          data: [],
          fill: false,
          borderColor: '#' + Math.floor(Math.random() * 0xffffff).toString(16)
        });
        for (const elem of data.labels) {
          data.datasets[deviceIndex].data.push(0);
        }
      }

      if (dateIndex <= -1) {
        dateIndex = data.labels.push(date) - 1;
        data.datasets.forEach(dataset => {
          dataset.data.push(0);
        });
      }
      data.datasets[deviceIndex].data[dateIndex] += 1;
    });

    return (
      <div>
        <h2 id="event-heading">
          Events
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp; Create new Event
          </Link>
        </h2>
        <Row>
          <Col sm="12">
            <AvForm onSubmit={this.search}>
              <AvGroup>
                <InputGroup>
                  <AvInput type="text" name="search" value={this.state.search} onChange={this.handleSearch} placeholder="Search" />
                  <Button className="input-group-addon">
                    <FontAwesomeIcon icon="search" />
                  </Button>
                  <Button type="reset" className="input-group-addon" onClick={this.clear}>
                    <FontAwesomeIcon icon="trash" />
                  </Button>
                </InputGroup>
              </AvGroup>
            </AvForm>
          </Col>
        </Row>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Data</th>
                <th>Published At</th>
                <th>Device</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {eventList.map((event, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${event.id}`} color="link" size="sm">
                      {event.id}
                    </Button>
                  </td>
                  <td>{event.name}</td>
                  <td>{event.data}</td>
                  <td>
                    <TextFormat type="date" value={event.published_at} format={APP_DATE_FORMAT} />
                  </td>
                  <td>{event.device ? <Link to={`device/$event.device.id}`}>{event.device.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${event.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${event.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${event.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div className="content-section introduction">
          <div className="feature-intro">
            <h1>LineChart</h1>
            <p>
              A line chart or line graph is a type of chart which displays information as a series of data points called 'markers' connected
              by straight line segments.
            </p>
          </div>
        </div>

        <div className="content-section implementation">
          <Chart type="line" data={data} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ event }: IRootState) => ({
  eventList: event.entities
});

const mapDispatchToProps = {
  getSearchEntities,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Event);
