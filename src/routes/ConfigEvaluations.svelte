<script lang="ts">

	import {evaluations} from '../stores/store'

</script>
	
<div>
	<h2>Edition des Barèmes</h2>

	{#each $evaluations.getEvaluations as evaluation}
		<input bind:value={evaluation.name}>
	
		{#each evaluation.getCriteres as critere}
			<div class="row">
				<input bind:value={critere.name}>
				<input type="number" bind:value={critere.note}>
				<button on:click={(e) => evaluation.removeCritere = critere.id}>❌</button>
			</div>
		{/each}

		<button on:click={(e) => evaluation.addCritere = "Nouveau Critère"}>Ajouter un critère</button>

		<br><br>
	{/each}
	<button on:click={() => $evaluations.addEvaluation = "Nouvelle Evaluation"}>Ajouter une évaluation</button>
</div>


<style>
	div {
		display: grid;
	}
	.row {
		display: grid;
		grid-template-columns: 1fr 50px 50px ;
	}
</style>