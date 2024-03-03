import {Component} from "react";

export default class Input extends Component {

    // this is like useEffect with []
    componentDidMount() {
        this.props.setLocation(localStorage.getItem("location") ?? "")
    }

    render() {
        return (
            <div>
                <input
                    type="text"
                    placeholder="Najít svou lokaci..."
                    value={this.props.location}
                    onChange={e => this.props.setLocation(e.target.value)}/>
            </div>
        )
    }
}