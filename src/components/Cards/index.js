function Card({ title, description }) {
  return (
    <div className="border p-4 rounded">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

export default Card;
