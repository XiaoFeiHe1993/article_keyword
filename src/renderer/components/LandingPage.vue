<template>
	<div id="wrapper">
		<main>
		</main>
	</div>
</template>

<script setup lang="ts">
</script>

<style>
* {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
}

body {
	font-family: "Source Sans Pro", sans-serif;
}

#wrapper {
	padding: 60px 80px;
}

main {
	display: flex;
	justify-content: space-between;
}

main > div {
	flex-basis: 50%;
}
</style>
