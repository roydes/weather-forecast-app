import React from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

class LocationSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.onSelectedCompleted = this.props.onSelectedCompleted
  }

  handleChange(address) {
    this.setState({ address });
  }

  handleSelect(address) {
    this.setState({ address: address });
    geocodeByAddress(address)
      .then( async results => {
        const city =  results[0].formatted_address;
        const cordinates = await getLatLng(results[0]);
        return { place: city, lat: cordinates.lat, lng: cordinates.lng }; 
      })
      .then(location => { this.onSelectedCompleted(location) })
      .catch(error => console.error('Error', error));
  }

  render() {
    const classes = this.props.classes;
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        className='SearchLocation'
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <TextField
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}

              id="standard-full-width"
              placeholder={this.props.placeholder ? this.props.placeholder: 'Search'}
              fullWidth
              margin="normal"
              InputProps={{
                classes: {
                    input: classes.multilineColor
                }
              }}
            />
            <div className="autocomplete-dropdown-container" style={{position:'absolute', width: '50%' }}>
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                const style = suggestion.active
                  ? { backgroundColor: '#16151552', cursor: 'pointer' }
                  : { backgroundColor: 'rgba(0, 0, 0, 0.5)', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}
const styles = theme => ({
  multilineColor:{
      color:'white',
      fontSize: '48px',
      opacity: 1,
      fontWeight: 700,
  }
});

LocationSearch.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LocationSearch);