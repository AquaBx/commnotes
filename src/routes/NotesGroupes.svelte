<script lang="ts">

import {evaluations} from '../stores/store'

  let selectedEval : string
</script>


  <div class="grid">
    <h2>Edition des notes des groupes</h2>
  
    <select bind:value={selectedEval}>
  
        {#each $evaluations.getEvaluations as evaluation}
            <option value={evaluation.id}>{evaluation.name}</option>
        {/each}
  
    </select>

    {#if selectedEval} 

      <table>
        <thead>
            <tr>
                <td>Nom du groupe</td>
                <td>Moyenne Globale</td>
                {#each $evaluations.evaluations[selectedEval].getCriteres as critere}
                    <td>{critere.name}</td>
                {/each}
            </tr>
        </thead>   
      
        {#each $evaluations.evaluations[selectedEval].getGroupes as  groupe}
            <tr>
                <th>{groupe.name}</th>
                <td>{groupe.noteTotal}</td>
                {#each $evaluations.evaluations[selectedEval].getCriteres as critere}
                    <td><input type="number" bind:value={groupe.notes[critere.id]}>/{critere.note}</td>
                {/each}
        
            </tr>
        {/each}
      
      </table>

    {/if} 
  
</div>


<style>
table {
  border-collapse: collapse;
  width: 100%;
  border: 1px solid #ddd;
}

th, td {
  text-align: left;
  padding: 16px;
  border: 1px solid #ddd;
}


</style>