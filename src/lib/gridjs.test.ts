import "@testing-library/jest-dom";
import { cleanup, render, screen } from "@testing-library/svelte";
import Grid from "./gridjs.svelte";

afterEach(() => cleanup());

test("should render", () => {
	render(Grid, {
		data: [
			{ name: "John", email: "john@example.com" },
			{ name: "Mark", email: "mark@gmail.com" },
		],
	});

	expect(screen.getByRole("complementary")).toBeInTheDocument();
});
