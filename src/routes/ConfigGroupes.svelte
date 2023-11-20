<script lang="ts">
import {evaluations} from '../stores/store'

  let selected : string
</script>

<div class="flex">

  <div class="grid">
    <h2>Edition des groupes</h2>
  
    <select bind:value={selected}>
  
        {#each $evaluations.getEvaluations as evaluation}
            <option value={evaluation.id}>{evaluation.name}</option>
        {/each}
  
    </select>
  
    {#if selected}
        {#each $evaluations.evaluations[selected].getGroupes as groupe}
            <input bind:value={groupe.name}>
  
            {#each groupe.getMembers as member}
            
                <div class="row">
                    <input bind:value={member.name}>
                    <button on:click={(e) => groupe.removeMember = member.id}>❌</button>
                </div>
                {/each}
                
            <button on:click={(e) => groupe.addMember = "Nouveau Membre"}>Ajouter un membre</button>
            <br>
  
        {/each}
        <button on:click={() => $evaluations.evaluations[selected].addGroupe = "Nouveau Groupe"}>Ajouter un groupe</button>
    {/if}
  
    <br>
  
    <button disabled on:click={()=>{}}>Importer les Groupes</button>
  
  
  </div>
</div>


<style>
  div.flex {
    display: flex;

  }
  div.grid {
    display: grid;
  }
  .row {
    display: grid;
    grid-template-columns: 1fr 50px ;
  }
</style>