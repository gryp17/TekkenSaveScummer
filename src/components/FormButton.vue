<template>
	<button
		:class="['form-button', {outline, transparent, red}, className]"
		:type="type"
		v-on="{
			...$listeners
		}"
	>
		<slot>Click me</slot>
	</button>
</template>

<script>
	export default {
		props: {
			className: String,
			type: {
				type: String,
				default: 'button'
			},
			outline: {
				type: Boolean,
				default: false
			},
			transparent: {
				type: Boolean,
				default: false
			},
			red: {
				type: Boolean,
				default: false
			}
		}
	};
</script>

<style scoped lang="scss">
	.form-button {
		padding: 8px 20px;
		border: solid 1px transparent;
		background-color: $blue;
		color: $white;
		transition: all 0.4s ease-in-out;
		font-size: 16px;
		font-weight: bold;
		cursor: pointer;

		&:hover, &:active, &:focus, &.active {
			background-color: darken($blue, 15%);
		}

		&:disabled {
			background-color: lighten($blue, 15%);
			cursor: not-allowed;

			&:hover {
				background-color: lighten($blue, 15%);
			}
		}

		&.outline {
			background-color: $white;
			color: $blue;
			border: solid 1px $blue;

			&:hover, &:active, &:focus, &.active {
				background-color: $blue;
				color: $white;
			}
		}

		&.transparent {
			padding: 0px 10px;
			background-color: transparent;
			color: $blue;

			&:hover, &:active, &:focus, &.active {
				background-color: transparent;
				color: $blue;
			}
		}

		&.red {
			background-color: $red;

			&:hover, &:active, &:focus, &.active {
				background-color: darken($red, 15%);
			}
		}

		> svg {
			margin-right: 3px;
		}
	}
</style>
