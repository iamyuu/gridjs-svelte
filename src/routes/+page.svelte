<script lang="ts">
	import { gridjs } from "./action.svelte";
	import { h, html, PluginPosition } from "gridjs";
	import { useSelector, useState, useEffect } from "gridjs";
	import type { Config } from "gridjs";
	import type { TColumnSort } from 'gridjs/dist/src/types.js';

	const limit = 25
	const lowestStock = 25
	const columnsName = ["thumbnail", "title", "category", "price", "stock"]

	const getSortField = (columns: TColumnSort[]) => {
		const column = columns[0]

		if (!column) {
			return
		}

		const sortBy = columnsName[column.index]
		const order = column.direction === 1 ? "asc" : "desc"

		return { sortBy, order }
	}

	/** @see https://github.com/grid-js/gridjs/issues/84 */
	const getFixServerUrl = (url: string, params: Record<string, any>) => {
		const fixUrl = [url, url.includes("?") ? "&" : "?"].join("")

		return [fixUrl, new URLSearchParams(params).toString()].join("")
	}

	const formatPrice = (price: number) => {
		return Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(price)
	}

	/**
	 * Preact component
	 * @see https://preactjs.com/guide/v10/hooks
	 * @see https://preactjs.com/guide/v10/api-reference/#h--createelement
	 */
	function LowestStock(props: any) {
		const [products, setProducts] = useState([]);
		const data = useSelector((state) => state.data);
		const lowestStock = props.plugin.props.lowestStock || 10

		useEffect(() => {
			if (!data) return;

			const listLowestStock = data.toArray().reduce((prev: any, curr: any) => {
				const title = curr[1]
				const stock = curr[4]

				return stock < lowestStock ? [...prev, `${title} (${stock})`] : prev
			}, [])

			setProducts(listLowestStock)
		}, [data, lowestStock]);

		const hasLowStock = products.length > 0
		const list = hasLowStock ? h('ul', null, products.map(item => h('li', null, item))) : null

		return h('div', null, h('p', null, `Lowest Stock: ${products.length}`), list)
	}

	// https://gridjs.io/docs/plugins/basics
	const lowestStockPlugin = {
		id: "lowest-stock",
		position: PluginPosition.Footer,
		component: LowestStock,
		props: {
			lowestStock,
		},
	};

	function SveltePlugin(props: any) {
		console.log('👾 ~ SveltePlugin ~ props:', props)

		return h('div', null, 'Svelte Plugin')
	}

	// https://gridjs.io/docs/config/className
	const className: Config['className'] = {
		error: "error",
	};

	// https://gridjs.io/docs/config/style
	const style: Config['style'] = {
		table: {
			width: "100%",
		},
		header: {
			display: "flex",
			alignItems: "center",
			flexDirection: "row-reverse",
		},
	};

	// https://gridjs.io/docs/config/language
	const language: Config['language'] = {
		search: {
			placeholder: "Find product",
		},
	};

	// https://gridjs.io/docs/config/columns
	const columns: Config['columns'] = [
		{
			id: "thumbnail",
			name: "Thumbnail",
			width: "10%",
			sort: false,
			formatter: (cell, row) => {
				const alt = row.cell(1).data || "Thumbnail"
				return html(`<img src="${cell}" alt="${alt}" style="width: 64px; height: 64px; object-fit: contain;" />`)
			},
			// plugin: {
			// 	id: "product-preview",
			// 	component: () => {
			// 		console.log('👾 ~ ProductPreview ~ component:')
			// 		return h('div', null, 'Product Preview')
			// 	},
			// 	props: {
			// 		component: ProductPreview,
			// 	},
			// },
		},
		"Title",
		{
			name: "Category",
			sort: false,
			formatter: (cell) => {
				return h('span', { class: "capitalize" }, cell)
			},
		},
		{
			name: "Price",
			formatter: (cell) => {
				return html(`<span class="num">${formatPrice(Number(cell))}</span>`)
			},
		},
		{
			name: "Stock",
			formatter: (cell) => {
				return h('span', { class: "num" }, cell)
			},
			attributes: (cell: number) => {
				if (!cell) return

				const isLowStock = cell < lowestStock

				// CAVEAT: If you return key `class`, it will override the default `class`
				return {
					'data-low-stock': isLowStock,
				}
			},
		},
	];

	// https://gridjs.io/docs/config/server
	const server: Config['server'] = {
		url: 'https://dummyjson.com/products',
		total: (data) => data.total,
		then: (data) => data.products.map((item: any) => ([
			item.thumbnail,
			item.title,
			item.category,
			item.price,
			item.stock,
		])),
	};

	// https://gridjs.io/docs/config/search
	const search: Config['search'] = {
		server: {
			url: (prev, keyword) => getFixServerUrl(`${prev}/search`, { q	: keyword }),
		},
	};

	// https://gridjs.io/docs/config/search
	const sort: Config['sort'] = {
		server: {
			url: (prev, columns) => {
				const sortParams = getSortField(columns)
				return sortParams ? getFixServerUrl(prev, sortParams) : prev
			},
		},
	};

	// https://gridjs.io/docs/config/pagination
	const pagination: Config['pagination'] = {
		limit,
		server: {
			url: (prev, page, limit) => getFixServerUrl(prev, { limit, skip: page * limit }),
		},
	};

	// example for force re-render
	// let data = $state([
	// 	{ name: "John", email: "john@example.com" },
	// 	{ name: "Mark", email: "mark@gmail.com" },
	// ]);

	// $effect(() => {
	// 	setTimeout(() => {
	// 		data = [
	// 			{ name: "Yusuf", email: "yusuf@iamyuu.dev" },
	// 		]
	// 	}, 3_000)
	// });

</script>

<article
	use:gridjs={{
		columns,
		server,
		search,
		sort,
		pagination,
		language,
		className,
		style,
		plugins: [lowestStockPlugin],
	}}
></article>

<style global>
	@import "https://cdn.jsdelivr.net/npm/gridjs/dist/theme/mermaid.min.css";

	:root {
		--primary-color: #18181b;
		--error-color: red;
	}

	:global(p) {
		margin: 0;
	}

	:global(.btn) {
		background-color: var(--primary-color);
		color: white;
		padding: 0.5rem 1rem;
		border-width: 0;
		border-radius: 0.5rem;
		cursor: pointer;
	}

	:global(.error) {
		color: var(--error-color);
	}

	:global(.num) {
		display: block;
		text-align: right;
	}

	:global(.capitalize) {
		text-transform: capitalize;
	}

	:global([data-low-stock="true"]) {
		color: var(--error-color);
	}
</style>
