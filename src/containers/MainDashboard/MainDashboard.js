import React from 'react';
import AppBarComponent from '../../components/AppBarComponent/AppBarComponent';
import Map from '../../components/Map/Map'
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import { connect } from 'react-redux';
import { getBookings } from '../../actions/bookings_actions'
import { changeMapDirection } from '../../actions/map_actions'
import EnhancedTable from "../../components/Table/Table"
import { bindActionCreators } from 'redux';
import Loader from '../../components/Loader/Loader';

class MainDashboard extends React.Component {
    componentDidMount() {
        this.props.getBookings();
    }

    handleTableClick(record) {
        this.props.changeMapDirection(record);
    }
    render() {
        var MapLoader = withScriptjs(withGoogleMap((props) =>
            <Map pickup={props.pickup} dropoff={props.dropoff}></Map>
        ))
        return (
            <div>
                <AppBarComponent />
                {this.props.bookings.bookings.length > 0 ?
                    <div>
                        <MapLoader
                            // This key should be replaced from my key
                            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDurZQBXjtSzKeieXwtFeGe-jhZu-HEGQU"
                            loadingElement={<div />}
                            containerElement={<div />}
                            mapElement={<div />}
                            pickup={this.props.pickup}
                            dropoff={this.props.dropoff}

                        />
                        <EnhancedTable
                            data={this.props.bookings.bookings}
                            handleTableClick={(record) => this.handleTableClick(record)}
                        />
                    </div> :
                    <Loader />
                }
            </div>)
    }
}

const mapStateToProps = (state) => {
    return {
        bookings: state.bookings,
        pickup: state.map.pickup,
        dropoff: state.map.dropoff
    };
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getBookings, changeMapDirection }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MainDashboard);
