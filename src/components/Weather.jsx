import {Component} from "react";
import Day from "./Day";


export default class Weather extends Component {
    
    // this runs after the component is destroyed
    componentWillUnmount() {
        console.log("Weather will unmount")
    }

    render() {
        const {
            temperature_2m_max: max,
            temperature_2m_min: min,
            time: dates,
            weathercode: codes
        } = this.props.weather
        return (
            <div>
                <h2>Počasí v {this.props.location}</h2>
                <ul className="weather">
                    {dates.map((date, i) => <Day 
                        isToday={i === 0}
                        key={date}
                        date={date} 
                        max={max.at(i)} 
                        min={min.at(i)} 
                        code={codes.at(i)}/>)}
                </ul>
            </div>
        )
    }
}