<template>
	<div class="page-wrapper">
		<slot></slot>
	</div>
</template>

<style lang="scss">
	.page-wrapper {
		flex: 1;
		padding: 10px;
		background-color: $overlay-background;
		color: $text-color;
	}
</style>
