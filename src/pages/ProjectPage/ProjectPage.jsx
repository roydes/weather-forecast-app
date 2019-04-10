import React, { Component } from 'react'
import './ProjectPage.scss';
import '../../assets/styles/animations.scss';
import '../../assets/styles/texts.scss';


export default class ProjectPage extends Component {
  render() {
    return (
      <section className="Project-page">
        <div className="Header">
          <h3 className="subtitle">About Weather Forecast Project</h3>
        </div>
        <div className="Content">
          <p>
            This is a simple web application build with Reactjs framework and Material CSS Framework. Forecast data is obtained from the <a href="https://openweathermap.org/api">Open Weather Map API </a>  
          </p>
          <p>
            Specifically, I used the 5 day / 3 hour forecast service. The weather forecast is available at any location or city. Also, 5 day forecast includes weather data every 3 hours. Forecast data is available in JSON and XML.
            THis service is available for Free and all other paid accounts.
          </p>
        </div>
      </section>
    );
  }
}
