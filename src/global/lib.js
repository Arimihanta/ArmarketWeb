String.prototype.sansAccent = function(){
    var accent = [
        /[\300-\306]/g, /[\340-\346]/g, // A, a
        /[\310-\313]/g, /[\350-\353]/g, // E, e
        /[\314-\317]/g, /[\354-\357]/g, // I, i
        /[\322-\330]/g, /[\362-\370]/g, // O, o
        /[\331-\334]/g, /[\371-\374]/g, // U, u
        /[\321]/g, /[\361]/g, // N, n
        /[\307]/g, /[\347]/g, // C, c
    ];
    var noaccent = ['A','a','E','e','I','i','O','o','U','u','N','n','C','c'];
     
    var str = this;
    for(var i = 0; i < accent.length; i++){
        str = str.replace(accent[i], noaccent[i]);
    }
    return str;
}
Array.prototype.remove=function(){
    var what, a=arguments, L=a.length, ax ;
    while(L && this.length){
        what=a[--L]
        while((ax=this.indexOf(what))!==-1){
            this.splice(ax,1)
        }
    }
    return this
}
export class Conversion{
    static dateToEn(dateFr){
        let d=dateFr.split('-')
        return d[2]+'-'+d[1]+'-'+d[0]
    }
    static dateToFr(dateEn){
        let d=dateEn.split('-')
        return d[2]+'-'+d[1]+'-'+d[0]
    }
    static getDateFromReactDate(date){
        let dt=date.split(' ')
        let mois=''
        if(this.getMoisChiffre(dt[1])<10)
            mois='0'+this.getMoisChiffre(dt[1])
        else mois=this.getMoisChiffre(dt[1])
        return dt[3]+'-'+mois+'-'+dt[2]
    }
    static getMoisChiffre(mois){
        switch(mois){
            case 'Jan' : return 1
            case 'Feb' : return 2
            case 'Mar' : return 3
            case 'Apr' : return 4
            case 'May' : return 5
            case 'Jun' : return 6
            case 'Jul' : return 7
            case 'Aug' : return 8
            case 'Sep' : return 9
            case 'Oct' : return 10
            case 'Nov' : return 11
            case 'Dec' : return 12
            default : return 0
        }
    }
}



export const isValidNumber = (val) => {
    let patern = "^[0-9].*$"
    if(val.toString().match(patern) != null) {
        if(val){
            return true 
        }
    }
    return false
}
export const isValidText = (val) => {
    let  patern = "^[a-zA-Z0-9-_., &']*$"
    if(val.sansAccent().match(patern) != null) {
        if(val.sansAccent() !== ''){
            return true 
        }
    }
    return false
}