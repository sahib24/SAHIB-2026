export default function Card({ title, description, image, price, children }) {
  return (
    <div className="border rounded-xl shadow-md p-4 w-72">
      <h2 className="text-xl font-bold mt-2">{title}</h2>

      {description && (
        <p className="text-gray-600 text-sm mt-1">{description}</p>
      )}

      {price && <p className="text-green-600 font-semibold mt-2">${price}</p>}
    </div>
  );
}
