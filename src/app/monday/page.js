import Conditionss from "@/components/Conditionss";
import Button from "@/components/Button";
import Card from "@/components/Card";

export default function condition() {
  return (
    <div>
      <Conditionss />
      <Button
        title="Special Card"
        desc="Different style page"
        style={{
          transform: "scale(1.05)",
          border: "3px solid yellow",
          boxShadow: "0 0 20px yellow",
          margin: "20px 35px",
          width: "195px",
        }}
      />
      <Card title="Samsung S24" description="Android flagship" price={1000} />
    </div>
  );
}
