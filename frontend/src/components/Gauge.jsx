import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const Gauge = ({ value = 0 }) => {
  const clamped = Math.max(0, Math.min(100, value));
  const data = [
    { name: "value", value: clamped },
    { name: "rest",  value: 100 - clamped },
  ];

  // Color-code by score range
  const fillColor =
    clamped >= 70 ? "#10b981" :   // emerald — high liquidity
    clamped >= 45 ? "#f59e0b" :   // amber   — medium
                    "#f43f5e";    // rose    — low / risky

  const COLORS = [fillColor, "rgba(255,255,255,0.04)"];

  return (
    <div className="w-full h-[130px] relative flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            innerRadius={42}
            outerRadius={58}
            startAngle={210}
            endAngle={-30}
            paddingAngle={0}
            dataKey="value"
            stroke="none"
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={COLORS[index]}
                style={{
                  filter:
                    index === 0
                      ? `drop-shadow(0 0 8px ${fillColor}88)`
                      : "none",
                }}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Gauge;