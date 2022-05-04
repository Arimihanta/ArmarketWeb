import { Button as MaterialButton} from "react-materialize"
import { colors } from "../global/colors"

const { primary } = colors

export const Button = (props) => {
    const { text, children, size, onClick, disabled, flat,floating,small, color, id, name, icon,className,value,tooltip } = props

    return (
        <MaterialButton
            onClick={onClick}
            disabled={disabled}
            id={id}
            name={name}
            size={size || "small"}
            flat={flat}
            floating={floating}
            small={small}
            icon={icon}
            style={{
                ...props.style,
                borderColor: flat ? "transparent" : primary,
                background: !color ? primary : color,
                color:"#ffffff"
            }}
            className={className +" button-hover"}
            value={value}
            tooltip={tooltip}
        >

            {children || text}
        </MaterialButton>
    )
}