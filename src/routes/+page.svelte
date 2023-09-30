<script>
	import 'gridjs/dist/theme/mermaid.css';
	import Grid from '$lib';

	const columns = ['Name', 'Email', 'Phone Number'];
	const data = [
		['John', 'john@example.com', '(353) 01 222 3333'],
		['Mark', 'mark@gmail.com', '(01) 22 888 4444']
	];
</script>

<Grid {columns} {data} />
