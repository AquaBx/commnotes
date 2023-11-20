import { writable } from 'svelte/store';

export const selectedGroupNote = writable(["",""]);


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
        return Object.values(this.notes).reduce((sum,num) => sum+num, 0)/this.criteresSum*20
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
}

export class Evaluations {
    evaluations: {[key:string]:Evaluation}

    get getEvaluations(){
        return Object.values(this.evaluations)
    }

    getEvaluation(id:string){
        return this.evaluations[id]
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
}

export const evaluations = writable(new Evaluations())