<script>
	export let fieldsRules = {},
		execFront = false;
	export let initialFields = {};
	import { createEventDispatcher } from 'svelte';
	import * as yup from 'yup';
	import { DataFormater } from '../../libs/helper-classes';

	const dispatch = createEventDispatcher();

	async function runValidations() {
		const Schema = yup.object().shape(fieldsRules);
		return await DataFormater.validateFormErrors(() =>
			Schema.validate(initialFields, { abortEarly: false })
		);
	}
</script>

<!-- on:change={async (e) => {
    console.log(e);

    return dispatch("submited", await runValidations());
}} -->

<form
	novalidate
	on:submit|preventDefault={async () =>
		dispatch('submited', !execFront ? await runValidations() : { runValidations })}
>
	<slot />
</form>
