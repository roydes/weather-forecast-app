import React, { Component } from 'react';
import AppToolbar from './components/AppToolbar/AppToolbar.jsx';
import Footer from './components/Footer/Footer';
import AppRoutes from './AppRoutes'
import './App.scss';
import './assets/styles/texts.scss'
import { AppTheme } from './AppTheme';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { CSSTransition } from 'react-transition-group';
import LocationSearch from './components/LocationSearch/LocationSearch'
import fetchForecast from './redux/appActions';
import { connect } from 'react-redux';


class App extends Component {

  constructor(props) {
    super(props);
    const windowScrollTop = window.pageYOffset /  3;
    this.state = {
      height: window.innerHeight, 
      transform: 'translate3d(0, ' + windowScrollTop + 'px, 0)',
      isSidenavOpened: true
    };
    this.translateBanner = this.translateBanner.bind(this);
    this.onSelectCity = this.onSelectCity.bind();
  }

  componentDidMount() {
    var windowScrollTop = window.pageYOffset / 1.5;
    this.setState({
      transform: 'translate3d(0, ' + windowScrollTop + 'px, 0)'
    });
    window.addEventListener('scroll', this.translateBanner);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.translateBanner);
  }

  translateBanner() {
    const windowScrollTop = window.pageYOffset /  3;
    this.setState({
      transform: 'translate3d(0, ' + windowScrollTop + 'px, 0)'
    });
  }

  onSelectCity(location) {
    this.props.fetchForecast(location);
  }

  render() {
    const forecast = this.props.forecast
    const dailyForecast = forecast.map((dayForecast, index)=>{
      return ( <div className="Day-Forecast" key={index}>
                  <div className="Day-Name">{dayForecast.day}</div>
                  <img alt="weatherImg" src={'http://openweathermap.org/img/w/'+ dayForecast.icon + '.png'}></img>
                  <div className="Day-Temp">
                    <span className="Temp">{Math.round(dayForecast.tempMin - 273.15) + ' °C' }</span>
                    <span className="Temp">{Math.round(dayForecast.tempMax - 273.15) + ' °C' }</span>
                  </div>
              </div>)
    });
    return (
      <CSSTransition
      in={true}
      appear={true}
      timeout={600}
      classNames="fade">
        <MuiThemeProvider theme={AppTheme}>
          <div className="App">
            <AppToolbar
              behavior = {{ changeColorOnScroll: {
                height: 200,
                color: 'white'
              }}}
            >
            </AppToolbar>
            <div className="App-Banner" style={{...this.state}}>
              <div className="Wrapper">
                <div className="Header-Text">
                <LocationSearch onSelectedCompleted={this.props.fetchForecast}>
                </LocationSearch>
                <h3 className="City-Name">The weather in {this.props.location.place}</h3>
                <div className="Forecast-Container">
                  {dailyForecast}
                </div>
                </div>
              </div>
            </div>
            <AppRoutes></AppRoutes>
          </div>
          <Footer></Footer>
        </MuiThemeProvider>
      </CSSTransition>
    );
  }
}

const mapStateToProps = (state) => {
  const forecasts =  state.forecast;
  const dailyForecast = [];
  for (let i = 0; i < forecasts.length; i+= 8) {
    const dayForecasts =  forecasts.slice(i, i + 8);
    const minMax = [dayForecasts[0].main.temp_min, dayForecasts[0].main.temp_max]
    const [min, max] = dayForecasts.reduce((minMax, currentPeriod) => {
      return [
        Math.min( currentPeriod.main.temp_min, minMax[0]),
        Math.max( currentPeriod.main.temp_max, minMax[1])
      ]
    }, minMax);
    const day = new Date(Date.parse(dayForecasts[0].dt_txt))
    const map = {};
    const mapIcons = {}

    for(let i = 0; i < dayForecasts.length; i++) {
        const weather = dayForecasts[i].weather[0].main;
        const icon = dayForecasts[i].weather[0].icon;
        if (!map[weather]) {
          map[weather] = 0;
        }
        map[weather] += 1;
        if (!mapIcons[weather]) {
          mapIcons[weather] = icon;
        }
    }
    let weatherMode = Object.keys(map)[0];
    for (let key in  Object.keys(map)) {
      if (map[key] > map[weatherMode]) {
        weatherMode = key;
      }
    }

    const mainDayForecast = {
      tempMax: max,
      tempMin: min,
      day: day.toString().split(' ')[0],
      weather: weatherMode,
      icon: mapIcons[weatherMode]
    }
    dailyForecast.push(mainDayForecast)
  }
  return {
    forecast: dailyForecast,
    location: state.location
  }
}
const mapDispatchToProps = {fetchForecast}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

