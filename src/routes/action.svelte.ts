import { Grid } from 'gridjs';
import type { Action } from 'svelte/action';
import type { Config } from 'gridjs';
import type { TCell, TColumn } from 'gridjs/dist/src/types.js';
// import Tabular from 'gridjs/dist/src/tabular.js';
// import Row from 'gridjs/dist/src/row.js';

export interface GridjsProps extends Partial<Config> {}

export interface GridjsAttributes {
	// https://github.com/grid-js/gridjs/blob/master/src/view/events.ts
	onready: () => void;
	onbeforeLoad: () => void;
	onload: (e: CustomEvent<{ data: unknown /* Tabular */ }>) => void;

	// https://github.com/grid-js/gridjs/blob/master/src/view/table/events.ts
	oncellClick: (e: CustomEvent<{ cell: TCell, column: TColumn, row: unknown /* Row */ }>) => void;
	onrowClick: (e: CustomEvent<{ row: unknown /* Row */ }>) => void;
}

export type GridjsAction = Action<HTMLElement, GridjsProps, GridjsAttributes>;

export const gridjs: GridjsAction = (node, config) => {
	const grid = new Grid(config).render(node);

	// https://github.com/grid-js/gridjs/blob/master/src/view/events.ts
	grid.on("beforeLoad", () => {
		node.dispatchEvent(new CustomEvent('beforeLoad'))
	});
	grid.on("load", (data) => {
		node.dispatchEvent(new CustomEvent('load', { detail: { data } }))
	});
	grid.on("ready", () => {
		node.dispatchEvent(new CustomEvent('ready'))
	});

	// https://github.com/grid-js/gridjs/blob/master/src/view/table/events.ts
	grid.on("cellClick", (_event, cell, column, row) => {
		node.dispatchEvent(new CustomEvent('cellClick', { detail: { cell, column, row } }))
	});
	grid.on("rowClick", (_event, row) => {
		node.dispatchEvent(new CustomEvent('rowClick', { detail: { row } }))
	});

	return {
		update: (newConfig) => {
			grid.updateConfig(newConfig).forceRender();
		},
		destroy: () => {
			grid.destroy();
		}
	}
};
