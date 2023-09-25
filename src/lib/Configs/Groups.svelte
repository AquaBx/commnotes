

<script>

import {currentGroups} from '../../stores/store'

function addGroup(){
    let val = self.crypto.randomUUID()
    while (Object.keys($currentGroups).includes(val)) {
        val = self.crypto.randomUUID()
    }

    $currentGroups[val] = {
        "name" : "Nouveau Groupe",
        "members": [],
        "notes":{},
    }
}

function addPerson(keyGroup){
    let val = self.crypto.randomUUID()
    while (Object.keys($currentGroups).includes(val)) {
        val = self.crypto.randomUUID()
    }

    $currentGroups[keyGroup].members[val] = {
        name:"Nouvelle Personne"
    }

    currentGroups.set($currentGroups)
}

function removePerson(keyGroup,memberKey){

    let obj = Object.fromEntries(
        Object.entries($currentGroups[keyGroup].members).filter(([key]) =>
        key !== memberKey)
    );

    $currentGroups[keyGroup].members = obj

    currentGroups.set($currentGroups)
}


</script>


<div>
    <h2>Edition des groupes</h2>
    {#each Object.keys($currentGroups) as keyGroup}
    <input bind:value={$currentGroups[keyGroup].name}>
    
        {#each Object.keys($currentGroups[keyGroup].members) as memberKey}
            <input bind:value={$currentGroups[keyGroup].members[memberKey].name}>
            <button on:click={(e) => removePerson(keyGroup,memberKey)}>remove</button>
        {/each}

        <button on:click={(e) => addPerson(keyGroup)}>add</button>
        <br><br>
    {/each}
    <button on:click={addGroup}>addGroupe</button>
</div>