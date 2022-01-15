import type { SvelteComponentTyped } from "svelte";
import { h, createRef as gCreateRef, Component as gComponent } from "gridjs";

interface SvelteWrapperProps {
	parent?: string;
	component: SvelteComponentTyped;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: any;
}

function isFn(val) {
	return typeof val === "function";
}

export class SvelteWrapper extends gComponent<SvelteWrapperProps> {
	static defaultProps = {
		parent: "div",
	};

	ref = gCreateRef();
	instance = null;

	componentDidMount() {
		const { component: Component, parent: _parent, plugin: _plugin, ...props } = this.props;

		// @ts-expect-error - https://svelte.dev/docs#run-time-client-side-component-api-creating-a-component
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
		return h(this.props.parent, { ref: this.ref });
	}
}
