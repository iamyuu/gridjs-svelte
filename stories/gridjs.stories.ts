import { h } from "gridjs";
import { object, boolean, number } from "@storybook/addon-knobs";
import Grid from "../src/gridjs.svelte";

export default {
  title: "Gridjs Svelte",
  component: Grid,
};

export const basic = () => ({
  Component: Grid,
  props: {
    data: object("data", [
      { name: "John Doe", email: "john@doe.com" },
      { name: "Jane Doe", email: "jane@doe.com" },
      { name: "Mark Doe", email: "mark@doe.com" },
    ]),
  },
});

export const serverSide = () => ({
  Component: Grid,
  props: {
    columns: [
      "Title",
      "Director",
      {
        name: "Date",
        formatter: (cell) =>
          new Date(cell).toLocaleString("en-US", {
            month: "short",
            year: "numeric",
          }),
      },
      {
        name: "Actions",
        sort: false,
        formatter: (cell, row) => {
          const onClick = () =>
            alert(`Episode ID: ${cell}. Title: ${row.cells[0].data}`);

          return h("button", { onClick }, "Edit");
        },
      },
    ],
    server: {
      url: "https://swapi.dev/api/films/",
      then: (data) =>
        data.results.map((movie) => [
          movie.title,
          movie.director,
          movie.release_date,
          movie.episode_id,
        ]),
    },
    // for server side search, see https://gridjs.io/docs/examples/server-side-search
    search: boolean("enable search", true),
    // for server side sort, see https://gridjs.io/docs/examples/server-side-sort
    sort: boolean("enable sort", true),
    // for server side pagination, see https://gridjs.io/docs/examples/server-side-pagination
    pagination: {
      enabled: boolean("enable pagination", true),
      limit: number("limit pagination", 3),
    },
  },
});
