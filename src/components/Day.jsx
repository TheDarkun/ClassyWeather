import {Component} from "react";

function getWeatherIcon(wmoCode) {
    const icons = new Map([
        [[0], "☀️"],
        [[1], "🌤"],
        [[2], "⛅️"],
        [[3], "☁️"],
        [[45, 48], "🌫"],
        [[51, 56, 61, 66, 80], "🌦"],
        [[53, 55, 63, 65, 57, 67, 81, 82], "🌧"],
        [[71, 73, 75, 77, 85, 86], "🌨"],
        [[95], "🌩"],
        [[96, 99], "⛈"],
    ]);
    const arr = [...icons.keys()].find((key) => key.includes(wmoCode));
    if (!arr) return "NOT FOUND";
    return icons.get(arr);
}
function formatDay(dateStr) {
    
    return new Intl.DateTimeFormat("cs", {
        weekday: "short",
    }).format(new Date(dateStr));
}
export default class Day extends Component {
    render() {
        const {isToday, date,max,min,code} = this.props;
        return (
            <li className="day">
                <span>{getWeatherIcon(code)}</span>
                <p>{isToday ? "Dnes" : formatDay(date)}</p>
                <p><b>{min}&deg;</b> &mdash; <b>{max}&deg;</b></p>
            </li>
        );
    }
}