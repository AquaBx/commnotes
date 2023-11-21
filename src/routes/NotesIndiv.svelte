<script lang="ts">

  import {evaluations} from '../stores/store'

  let notes = $evaluations.getMembersNotes
</script>

<table>
{#each Object.keys(notes) as controle }
  <tr>
    <th>{controle}</th>
    {#each Object.keys(notes[controle]) as eleve }
      <td>{eleve} {notes[controle][eleve]}</td>
    {/each}
  </tr>
{/each}
</table>


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