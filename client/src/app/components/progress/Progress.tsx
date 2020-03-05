import React, { Component } from "react";
import { Progress } from "antd";
import "./progress.scss";
import Event from "../../event/Event";

export default class MProgress extends Component {
	componentWillUnmount() {
		Event.remove("progress");
	}

	componentDidMount() {
		Event.add("progress", v => this.progress(v));
	}
	progress(v: number) {
		this.setState({ progress: v });
	}

	state = { progress: 0 };

	render() {
		return (
			<Progress
				strokeColor={{
					"0%": "#108ee9",
					"100%": "#87d068"
				}}
				style={{ width: "100%", height: "1px" }}
				showInfo={false}
				strokeWidth={3}
				percent={this.state.progress}
				className="progress"
			/>
		);
	}
}