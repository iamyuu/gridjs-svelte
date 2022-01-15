import "@testing-library/jest-dom";
import { cleanup, render, fireEvent, screen } from "@testing-library/svelte";
import Grid from "../src/lib/gridjs.svelte";

afterEach(() => cleanup());

async function renderGrid(props = {}) {
	const svl = render(Grid, { props });

	await new Promise(setImmediate);

	return svl;
}

test("should render gridjs", async () => {
	await renderGrid({
		data: [[1, 2, 3]],
	});

	expect(screen.getByRole("complementary")).toHaveClass("gridjs gridjs-container");
	expect(screen.getByRole("grid")).toHaveClass("gridjs-table");
});

test("should render a table without header", async () => {
	await renderGrid({
		data: [[1, 2, 3]],
	});

	expect(screen.getAllByRole("rowgroup")).toHaveLength(1);
	expect(screen.getAllByRole("row")).toHaveLength(1);
	expect(screen.getAllByRole("cell")).toHaveLength(3);
});

test("should render a table with headers", async () => {
	await renderGrid({
		data: [[1, 2, 3]],
		columns: ["a", "b", "c"],
	});

	expect(screen.getAllByRole("rowgroup")).toHaveLength(2);
	expect(screen.getAllByRole("row")).toHaveLength(2);
	expect(screen.getAllByRole("columnheader")).toHaveLength(3);
});

test("should render a table with search", async () => {
	await renderGrid({
		data: [[1, 2, 3]],
		columns: ["a", "b", "c"],
		search: true,
	});

	expect(screen.getByRole("searchbox")).toBeInTheDocument();
});

test("should render a table with search and pagination", async () => {
	const { container } = await renderGrid({
		data: [
			[1, 2, 3],
			[4, 5, 6],
			[7, 8, 9],
		],
		columns: ["a", "b", "c"],
		search: true,
		pagination: {
			enabled: true,
			limit: 1,
		},
	});

	expect(screen.getByRole("searchbox")).toBeInTheDocument();
	expect(container.querySelector(".gridjs-pagination")).toBeInTheDocument();
	expect(screen.getByRole("status")).toBeInTheDocument();
});

test("should receive the event", async () => {
	const { component } = await renderGrid({
		data: [[1, 2, 3]],
	});

	const mock = vi.fn();

	component.$on("rowClick", mock);
	component.$on("cellClick", mock);

	fireEvent.click(screen.getAllByRole("cell")[1]);

	expect(mock).toHaveBeenCalledTimes(2);
});