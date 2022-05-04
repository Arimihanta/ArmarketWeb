import React,{useEffect,useState}from "react"
import { PieChart, Cell, Pie, Sector,Legend } from "recharts"
import { Row } from "react-materialize"

const CustomPie = (props) => {
    const [width,setWidth]=useState(window.innerWidth)
    useEffect(() => {
        function handleResize() {
            setWidth(window.innerWidth)
        }
        window.addEventListener('resize', handleResize)
    })
    const renderActiveShape = (props) => {
        const RADIAN = Math.PI / 180
        const {
            cx,
            cy,
            midAngle,
            innerRadius,
            outerRadius,
            startAngle,
            endAngle,
            fill,
            payload,
            percent,
            value
        } = props
        const sin = Math.sin(-RADIAN * midAngle)
        const cos = Math.cos(-RADIAN * midAngle)
        const sx = cx + (outerRadius + 10) * cos
        const sy = cy + (outerRadius + 10) * sin
        const mx = cx + (outerRadius + 30) * cos
        const my = cy + (outerRadius + 30) * sin
        const ex = mx + (cos >= 0 ? 1 : -1) * 22
        const ey = my
        const textAnchor = cos >= 0 ? "start" : "end"

        return (
            <g>
                <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
                    {payload.name}
                </text>
                <Sector
                    cx={cx}
                    cy={cy}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    fill={fill}
                />
                <Sector
                    cx={cx}
                    cy={cy}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    innerRadius={outerRadius + 6}
                    outerRadius={outerRadius + 10}
                    fill={fill}
                />
                <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
                <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />

                <svg style={{ backgroundColor: "red  " }}>
                    <text
                        x={ex + (cos >= 0 ? 1 : -1) * 12}
                        y={ey}
                        textAnchor={textAnchor}
                        fill="#333"
                        fontSize={12}
                    >{`Nb: ${value}`}</text>
                    <text
                        x={ex + (cos >= 0 ? 1 : -1) * 12}
                        y={ey}
                        dy={18}
                        enableBackground
                        textAnchor={textAnchor}
                        fill="#999"
                        fontSize={10}
                    >
                        {`(Taux: ${(percent * 100).toFixed(2)}%)`}
                    </text>
                </svg>
            </g>
        )
    }

    const [activeIndex, setActiveIndex] = useState(0)

    const onPieEnter = (data, index) => {
        setActiveIndex(index)
    }

    return (
        <Row align="middle" justify="center" style={{ zIndex: 5000 }}>
            <PieChart width={(width/3)-80} height={(((width/2)-80)/2)}>
                <Pie
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    data={props.data}
                    cx={((width/3)/2)-80}
                    cy={130}
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    onMouseEnter={onPieEnter}
                >
                    {props.data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={props.colors[index % props.colors.length]} />
                    ))}
                </Pie>
                <Legend align="right" verticalAlign="bottom"/>
            </PieChart>
        </Row>
    )
}

export default CustomPie
