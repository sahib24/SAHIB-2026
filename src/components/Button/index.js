export default function Card({
  title,
  desc,
  image,
  className = "",
  style = {},
}) {
  return (
    <div
      className={className}
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "20px",
        borderRadius: "10px",
        color: "Black",
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        margin: "15px 0",
        width: "200px",
        height: "90px",
        cursor: "pointer",
        ...style,
      }}
    >
      <h2>{title}</h2>
      <p>{desc}</p>
    </div>
  );
}
