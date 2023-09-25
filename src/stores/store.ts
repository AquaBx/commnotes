import { derived, writable } from 'svelte/store';

export const selectedGroupNote = writable(["",""]);


export const currentGroups = writable(
    { 
        "gr1" : {
        name:"Groupe 1",
        notes:{
        },
        members : [
          {name:"Tom",},
          {name:"Tanguy"},
        ]
      },
        "gr2" : {
        name:"Groupe 2",
        notes:{
        },
        members : [
          {name:"Damien",},
          {name:"Baptise"},
        ]
      }
    }
);

export function derivedCurrentGroups(GroupID:string,NoteID:string) {
    const {subscribe} = derived(currentGroups, (currentGroups2) => {

        let sum = 0

        for (let item of Object.values(currentGroups2[GroupID].notes[NoteID].criteres)) {
            sum += item.note 
        }

        return sum
    })

    return {subscribe}
} 

export const currentNotes = writable(
    {
        nt1:{
            name:"CC1",
            commentaire:"",
            criteres : {
                crit1:{
                    name:"Structure globale du diaporama",
                    note:2
                },
                crit2:{
                    name:"Qualité de la communication orale",
                    note:5
                },
                crit3:{
                    name:"Qualité de la communication non-verbale",
                    note:2
                },
                crit4:{
                    name:"Clarté et lisibilité du support",
                    note:2
                },
                crit5:{
                    name:"Pertinence de l’introduction",
                    note:2
                },
                crit6:{
                    name:"Pertinence du développement et structuration des idées",
                    note:10
                },
                crit7:{
                    name:"Pertinence de la conclusion",
                    note:2
                }
            }
        },
        nt2:{
          name:"CC2",
          commentaire:"",
          criteres : {
            crit1:{
                name:"Structure globale du diaporama",
                note:2
            },
            crit2:{
                name:"Qualité de la communication orale",
                note:5
            },
            crit3:{
                name:"Qualité de la communication non-verbale",
                note:2
            },
            crit4:{
                name:"Clarté et lisibilité du support",
                note:2
            },
            crit5:{
                name:"Pertinence de l’introduction",
                note:2
            },
            crit6:{
                name:"Pertinence du développement et structuration des idées",
                note:10
            },
            crit7:{
                name:"Pertinence de la conclusion",
                note:2
            }
        }
        }
      }
);