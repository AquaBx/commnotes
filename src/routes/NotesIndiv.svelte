<script lang="ts">

  import {evaluations} from '../stores/store'

</script>

<table>
{#each Object.keys($evaluations.getMembersNotes) as name }
  <tr>
    <th>{name}</th>
    {#each Object.keys($evaluations.getMembersNotes[name]) as keyGroup }
      <td>{$evaluations.getMembersNotes[name][keyGroup].note}</td>
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