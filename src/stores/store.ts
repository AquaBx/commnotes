import { writable } from 'svelte/store';

function genID(){
    return self.crypto.randomUUID()
}

class Member {
    name : string
    id : string
    constructor(id:string,name:string){
        this.name = name
        this.id = id
    }
}

class Groupe {
    name : string
    id : string
    members : {[key:string]:Member}
    notes: {[key:string]:number}
    criteresSum: number

    constructor(id:string,name:string,criteres:{[key:string]:Critere}){
        this.name = name
        this.members = {}
        this.notes = Object.keys(criteres).reduce((obj,key) =>  ({...obj , [key]:0}), {} )
        this.criteresSum = Object.values(criteres).reduce((sum,critere) => sum+critere.note, 0 )
        this.id = id
    }

    get noteTotal(){
        return ( Object.values(this.notes).reduce((sum,num) => sum+num, 0)/this.criteresSum*20 ).toFixed(3)
    }

    get getMembers(){
        return Object.values(this.members)
    }

    set addMember(name:string){
        let id = genID()
        this.members[id] = new Member(id,name)
    }

    set removeMember(id:string){
        delete this.members[id]
    }

    assignChilds(members:any,notes:any) {
        this.notes = notes

        console.log(members)

        for (let key in members ){
            let thisMem = members[key]
            let newMem = new Member(key,thisMem.name)
            Object.assign(newMem,thisMem)
            
            this.members[key] = newMem
        }
    }
}

class Critere {
    name:string
    id:string
    note:number
    constructor(id:string,name:string,note:number){
        this.name = name
        this.note = note
        this.id = id
    }
}

class Evaluation {
    id:string
    name:string
    criteres:{[key:string]:Critere}
    groupes: {[key:string]:Groupe}

    get getCriteres(){
        return Object.values(this.criteres)
    }

    set addCritere(name:string){
        let id = genID()
        this.criteres[id] = new Critere(id,name,0)
    }

    set removeCritere(id:string){
        delete this.criteres[id]
    }

    get getGroupes(){
        return Object.values(this.groupes)
    }

    set addGroupe(name:string){
        let id = genID()
        this.groupes[id] = new Groupe(id,name,this.criteres)
    }

    set removeGroupe(id:string){
        delete this.groupes[id]
    }

    constructor(id:string,name:string){
        this.id = id
        this.name = name
        this.criteres = {}
        this.groupes = {}
    }

    assignChilds() {
        for (let key in this.criteres ){
            let thisCrit = this.criteres[key]
            let newCrit = new Critere(key,thisCrit.name,thisCrit.note)
            Object.assign(newCrit,thisCrit)
            
            this.criteres[key] = newCrit
        }

        for (let key in this.groupes ){
            let thisGroupe = this.groupes[key]
            let newGroupe = new Groupe(key,thisGroupe.name,this.criteres)
            Object.assign(thisGroupe,newGroupe)
            newGroupe.assignChilds(thisGroupe.members,thisGroupe.notes)
            this.groupes[key] = newGroupe

            
        }
    }
}

class Evaluations {
    evaluations: {[key:string]:Evaluation}

    get getEvaluations(){
        return Object.values(this.evaluations)
    }
    
    set addEvaluation(name:string){
        let id = genID()
        this.evaluations[id] = new Evaluation(id,name)
    }

    set removeEvaluation(id:string){
        delete this.evaluations[id]
    }

    constructor(){
        this.evaluations = {}
    }

    get getMembersNotes(){
        let returnObject:{[key:string]:{[key:string]:number}} = {}
        for (let evaluation of this.getEvaluations) {

            returnObject[evaluation.name] = {}


            for (let groupe of evaluation.getGroupes) {
                for (let member of groupe.getMembers){

                    returnObject[evaluation.name][member.name] = groupe.noteTotal
                    
                }
            }
        }

        return returnObject
    }

    assignChilds() {
        for (let key in this.evaluations ){
            let thisEval = this.evaluations[key]
            let newEval = new Evaluation(key,thisEval.name)
            Object.assign(newEval,thisEval)
            newEval.assignChilds()
            this.evaluations[key] = newEval
        }
    }
}

export const evaluations = writable(new Evaluations())