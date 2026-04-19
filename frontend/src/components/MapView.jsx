import { PieChart, Pie, Cell } from "recharts";

const Gauge = ({ value }) => {
  const data = [
    { name: "value", value: value },
    { name: "rest", value: 100 - value }
  ];

  const COLORS = ["#22c55e", "#1f2937"];

  return (
    <PieChart width={200} height={200}>
      <Pie
        data={data}
        innerRadius={60}
        outerRadius={80}
        startAngle={180}
        endAngle={0}
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={index} fill={COLORS[index]} />
        ))}
      </Pie>
    </PieChart>
  );
};

export default Gauge;