import "@testing-library/jest-dom";
import { cleanup, render, fireEvent, screen } from "@testing-library/svelte";
import { h, PluginPosition } from "gridjs";
import Grid from "../src/lib/gridjs.svelte";
import { SvelteWrapper } from "../src/lib/plugins";
import SvelteComponent from "./component.svelte";

afterEach(() => cleanup());

async function renderGrid(overrideProps = {}) {
	const svl = render(Grid, {
		props: {
			data: [[1, 2, 3]],
			...overrideProps,
		},
	});

	await new Promise(setImmediate);

	return svl;
}

test("should render gridjs", async () => {
	await renderGrid();

	expect(screen.getByRole("complementary")).toHaveClass("gridjs gridjs-container");
	expect(screen.getByRole("grid")).toHaveClass("gridjs-table");
});

test("should render a table without header", async () => {
	await renderGrid();

	expect(screen.getAllByRole("rowgroup")).toHaveLength(1);
	expect(screen.getAllByRole("row")).toHaveLength(1);
	expect(screen.getAllByRole("cell")).toHaveLength(3);
});

test("should render a table with headers", async () => {
	await renderGrid({
		columns: ["a", "b", "c"],
	});

	expect(screen.getAllByRole("rowgroup")).toHaveLength(2);
	expect(screen.getAllByRole("row")).toHaveLength(2);
	expect(screen.getAllByRole("columnheader")).toHaveLength(3);
});

test("should render a table with search", async () => {
	await renderGrid({
		columns: ["a", "b", "c"],
		search: true,
	});

	expect(screen.getByRole("searchbox")).toBeInTheDocument();
});

test("should render a table with pagination", async () => {
	const { container } = await renderGrid({
		data: [
			[1, 2, 3],
			[4, 5, 6],
			[7, 8, 9],
		],
		columns: ["a", "b", "c"],
		pagination: {
			enabled: true,
			limit: 1,
		},
	});

	expect(container.querySelector(".gridjs-pagination")).toBeInTheDocument();
	expect(screen.getByRole("button", { name: /page 1/i })).toBeInTheDocument();
	expect(screen.getByRole("button", { name: /page 2/i })).toBeInTheDocument();
	expect(screen.getByRole("button", { name: /page 3/i })).toBeInTheDocument();

	expect(screen.getByRole("status")).toBeInTheDocument();
	expect(screen.getByRole("status", { name: /page 1 of 3/i })).toBeInTheDocument();
});

test("should force render when config changes", async () => {
	const { container, component } = await renderGrid({
		pagination: {
			enabled: true,
			limit: 1,
		},
	});

	expect(container.querySelector(".gridjs-search")).not.toBeInTheDocument();
	expect(screen.getByRole("status", { name: /page 1 of 1/i })).toBeInTheDocument();

	await component.$set({
		search: true,
		data: [
			[1, 2, 3],
			[4, 5, 6],
			[7, 8, 9],
		],
	});
	await new Promise(setImmediate);

	expect(container.querySelector(".gridjs-search")).toBeInTheDocument();
	expect(screen.getByRole("searchbox")).toBeInTheDocument();
	expect(screen.getByRole("status", { name: /page 1 of 3/i })).toBeInTheDocument();
});

test("should receive the event", async () => {
	const { component } = await renderGrid();

	const mock = vi.fn();

	component.$on("rowClick", mock);
	component.$on("cellClick", mock);

	fireEvent.click(screen.getAllByRole("cell")[1]);

	expect(mock).toHaveBeenCalledTimes(2);
});

test("should render a table with plugin", async () => {
	const headingPlugin = {
		id: "heading",
		position: PluginPosition.Header,
		component: () => h("h1", {}, "Hello World!"),
	};

	await renderGrid({
		plugins: [headingPlugin],
	});

	expect(screen.getByRole("heading", { name: /hello world!/i })).toBeInTheDocument();
});

test("should render a table with the wrapper plugin", async () => {
	await renderGrid({
		columns: [
			"a",
			"b",
			{
				name: "c",
				plugin: {
					component: SvelteWrapper,
					props: {
						component: SvelteComponent,
					},
				},
			},
		],
	});

	expect(screen.getByTestId("component-props")).toBeInTheDocument();
});

test("should allow for change element and add props to parent wrapper plugin", async () => {
	await renderGrid({
		columns: [
			"a",
			"b",
			{
				name: "c",
				plugin: {
					component: SvelteWrapper,
					props: {
						component: SvelteComponent,
						parentElement: "h1",
						parentProps: {
							"data-testid": "wrapper-plugin",
						},
					},
				},
			},
		],
	});

	expect(screen.getByRole("heading")).toBeInTheDocument();
	expect(screen.getByTestId("wrapper-plugin")).toBeInTheDocument();
	expect(screen.getByTestId("component-props")).toBeInTheDocument();
});
