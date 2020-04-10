<template>
	<div class="page-wrapper">
		<slot></slot>
	</div>
</template>

<style lang="scss">
	.page-wrapper {
		display: flex;
		flex-direction: column;
		flex: 1;
		margin: 10px;
		background-color: $overlay-background;
		color: $text-color;
	}
</style>
