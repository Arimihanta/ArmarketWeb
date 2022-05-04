export class DateTime{
    constructor(date){
        this.date=date
    }
    getDay(){
        return parseInt(this.date.split('/')[0])
    }
    getMonth(){
        return parseInt(this.date.split('/')[1])
    }
    getYear(){
        return parseInt(this.date.split('/')[2])
    }
    compareTo(obj)
    {
        let other = new DateTime(obj)
        if (this.date===other) return 0
        else
        {
            if (this.getYear() > other.getYear()) return -1;
            if (this.getYear() < other.getYear()) return 1;
            else
            {
                if (this.getMonth() > other.getMonth()) return -1;
                if (this.getMonth() < other.getMonth()) return 1;
                else
                {
                    if (this.getDay() > other.getDay()) return -1;
                    if (this.getDay() < other.getDay()) return 1;
                }
            }
        }
        return -1;
    }
    toString(){
        return this.date
    }
}
export const getMoisCompletLettre=(mois)=>{
    switch(mois){
        case 1 : return 'Janvier'
        case 2 : return 'Fevrier'
        case 3 : return 'Mars'
        case 4 : return 'Avril'
        case 5 : return 'Mai'
        case 6 : return 'Juin'
        case 7 : return 'Juillet'
        case 8 : return 'Aout'
        case 9 : return 'Septembre'
        case 10 : return 'Octobre'
        case 11 : return 'Novembre'
        case 12 : return 'Decembre'
        default :return 'Janvier'
    }
}
export const getAbbrMoisLettre=(mois)=>{
    switch(mois){
        case 1 : return 'Jan.'
        case 2 : return 'Fev.'
        case 3 : return 'Mar.'
        case 4 : return 'Avr.'
        case 5 : return 'Mai'
        case 6 : return 'Jui.'
        case 7 : return 'Juil.'
        case 8 : return 'Aout'
        case 9 : return 'Sept.'
        case 10 : return 'Oct.'
        case 11 : return 'Nov.'
        case 12 : return 'Dec.'
        default : return 'Jan.'
    }
}