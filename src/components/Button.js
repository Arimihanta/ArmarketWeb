import { Button as MaterialButton, Row } from "react-materialize"
import { colors } from "../global/colors"

const { primary } = colors

export const Button = (props) => {
    const { type, text, children, size, onClick, disabled, flat,floating,small, color, id, name, icon,className,value } = props

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
                borderColor: type === "default" ? "#999" : primary,
                background: !color ? primary : color,
                color:"#ffffff"
            }}
            className={className +" button-hover"}
            value={value}
        >

            {children || text}
        </MaterialButton>
    )
}