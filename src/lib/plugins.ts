import { h, createRef as gCreateRef, Component as gComponent } from "gridjs";

interface SvelteWrapperProps {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	component: any;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	parentProps?: Record<string, any>;
	parentElement?: string;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: any;
}

function isFn(val) {
	return typeof val === "function";
}

export class SvelteWrapper extends gComponent<SvelteWrapperProps> {
	static defaultProps = {
		parentElement: "div",
		parentProps: {},
	};

	ref = gCreateRef();
	instance = null;

	componentDidMount() {
		const {
			component: Component,
			parentElement: _parentElement,
			parentProps: _parentProps,
			plugin: _plugin,
			...props
		} = this.props;

		this.instance = new Component({ target: this.ref.current, props });
	}

	componentDidUpdate() {
		if (isFn(this.instance.set)) {
			this.instance.set(this.props);
		}
	}

	componentWillUnmount() {
		if (isFn(this.instance.destroy)) {
			this.instance.destroy();
		}
	}

	render() {
		return h(this.props.parentElement, { ...this.props.parentProps, ref: this.ref });
	}
}
