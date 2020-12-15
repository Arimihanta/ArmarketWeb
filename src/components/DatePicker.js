import { DatePicker as MaterialDatePicker } from "react-materialize"
import { colors } from "../global/colors"

const { primary } = colors

export const DatePicker = (props) => {
    const { label, size, onClick, onChange, id, name,value } = props

    return (
        <MaterialDatePicker
            label={label}
            onClick={onClick}
            onChange={onChange}
            id={id}
            name={name}
            value={value}
            options={{
                autoClose:true,
                i18n:{
                    months: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
                    weekdaysAbbrev: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
                    monthsShort:['Jan', 'Fév', 'Mars', 'Avr', 'Mai', 'Jui', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc'],
                    weekdaysShort:['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
                    today: 'aujourd\'hui',
                    clear: 'effacer',
                    cancel:'Annuler'
                }
            }}
            autoComplete="off"
        >
        </MaterialDatePicker>
    )
}