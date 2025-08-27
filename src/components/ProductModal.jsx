import { useEffect, useState } from "react";

function ProductModal({ product, onClose, onSave }) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (product) {
      setTitle(product.title);
      setPrice(product.price);
      setDescription(product.description);
      setImage(product.image);
    } else {
      setTitle("");
      setPrice("");
      setDescription("");
      setImage("");
    }
  }, [product]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      id: product ? product.id : Date.now(),
      title,
      price,
      description,
      image,
    });
  };

  return (
    <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">
          {product ? "Edit Product" : "Add New Product"}
        </h2>
        <form onSubmit={handleSubmit} className="grid gap-3">
          <input
            type="text"
            placeholder="Title"
            className="px-3 py-2 border rounded-lg"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Price"
            className="px-3 py-2 border rounded-lg"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Image URL"
            className="px-3 py-2 border rounded-lg"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
            className="px-3 py-2 border rounded-lg"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
            >
              {product ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductModal;
