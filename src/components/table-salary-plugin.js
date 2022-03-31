import { PluginPosition, BaseComponent, h } from "gridjs";

// https://gridjs.io/docs/plugins/writing-plugin
class TotalSalaryPlugin extends BaseComponent {
	constructor(...props) {
		super(...props);

		this.state = {
			total: 0,
		};
	}

	setTotal() {
		this.config.pipeline.process().then(data => {
			this.setState({
				total: data.toArray().reduce((prev, row) => prev + row[1], 0),
			});
		});
	}

	componentDidMount() {
		this.setTotal();
		this.config.pipeline.on("updated", this.setTotal.bind(this));
	}

	render() {
		// https://preactjs.com/guide/v10/api-reference/#h--createelement
		return h(
			// html tag
			"div",
			// props / attribute
			{
				style: {
					marginTop: "1rem",
					textAlign: "right",
					fontWeight: "bold",
				},
			},
			// children
			`Total: $${this.state.total.toLocaleString()}`,
		);
	}
}

export default {
	id: "salaryPlugin",
	component: TotalSalaryPlugin,
	// https://gridjs.io/docs/plugins/basics#plugin-position
	position: PluginPosition.Footer,
};
