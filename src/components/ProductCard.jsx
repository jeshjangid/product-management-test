function ProductCard({ product, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
      <img
        src={product.image}
        alt={product.title}
        className="h-40 object-contain p-4"
      />
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
        <p className="text-gray-600 text-sm flex-1">
          {product.description.substring(0, 60)}...
        </p>
        <div className="mt-3 flex justify-between items-center">
          <span className="text-blue-600 font-bold">${product.price}</span>
          <div className="flex gap-2">
            <button
              onClick={onEdit}
              className="px-2 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 cursor-pointer"
            >
              Edit
            </button>
            <button
              onClick={onDelete}
              className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
