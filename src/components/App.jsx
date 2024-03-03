import {Component} from "react";
import Weather from "./Weather";
import Input from "./Input";

function convertToFlag(countryCode) {
    const codePoints = countryCode
        .toUpperCase()
        .split("")
        .map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
}


export default class App extends Component {
    state = {
        location: "",
        isLoading: false,
        displayLocation: "",
        weather: {}
    }

    constructor(props) {
        super(props);

        this.fetchWeather = this.fetchWeather.bind(this);
    }

    async fetchWeather() {
        if (this.state.location.length < 2) return this.setState({weather: {}});

        try {
            this.setState({isLoading: true});
            // 1) Getting location (geocoding)
            const geoRes = await fetch(
                `https://geocoding-api.open-meteo.com/v1/search?name=${this.state.location}`
            );
            const geoData = await geoRes.json();
            console.log(geoData);

            if (!geoData.results) throw new Error("Location not found");

            const {latitude, longitude, timezone, name, country_code} =
                geoData.results.at(0);
            this.setState({
                displayLocation: `${name} ${convertToFlag(country_code)}`
            });

            // 2) Getting actual weather
            const weatherRes = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
            );
            const weatherData = await weatherRes.json();
            this.setState({weather: weatherData.daily});
        } catch (err) {
            console.error(err);
        } finally {
            this.setState({isLoading: false});
        }
    }

    // this is like useEffect with [location] & NOT CALLED ON MOUNT
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.location === prevState.location) return;

        this.fetchWeather();
        localStorage.setItem("location", this.state.location);
    }

    render() {
        return (
            <div className="app">
                <h1>Classy Počasí</h1>
                <Input
                    location={this.state.location}
                    setLocation={x => this.setState({location: x})}/>
                {this.state.isLoading && <p className="loader">Načítání...</p>}
                {this.state.weather.weathercode &&
                    <Weather
                        weather={this.state.weather}
                        location={this.state.displayLocation}/>}
            </div>
        )
    }
}