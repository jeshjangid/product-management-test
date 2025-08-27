import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./components/ProductCard";
import ProductModal from "./components/ProductModal";
import ConfirmDelete from "./components/ConfirmDelete";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://fakestoreapi.com/products");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const addProduct = async (product) => {
    try {
      await axios.post("https://fakestoreapi.com/products", product);
      setProducts([...products, { ...product, id: Date.now() }]);
    } catch (err) {
      console.error(err);
    }
  };

  const updateProduct = async (product) => {
    try {
      await axios.put(`https://fakestoreapi.com/products/${product.id}`, product);
      setProducts(products.map((p) => (p.id === product.id ? product : p)));
    } catch (err) {
      console.error(err);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`https://fakestoreapi.com/products/${id}`);
      setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">🛍 Product Management</h1>

      {/* Search + Add Button */}
      <div className="flex justify-between items-center mb-6 max-w-5xl mx-auto">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full max-w-md px-4 py-2 border rounded-lg shadow-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={() => {
            setEditingProduct(null);
            setShowModal(true);
          }}
          className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
        >
           Add Product
        </button>
      </div>

      {/* Loader */}
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={() => {
                setEditingProduct(product);
                setShowModal(true);
              }}
              onDelete={() => setDeletingProduct(product)}
            />
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <ProductModal
          product={editingProduct}
          onClose={() => setShowModal(false)}
          onSave={(p) => {
            if (editingProduct) {
              updateProduct(p);
            } else {
              addProduct(p);
            }
            setShowModal(false);
          }}
        />
      )}

      {/* Confirm Delete */}
      {deletingProduct && (
        <ConfirmDelete
          product={deletingProduct}
          onClose={() => setDeletingProduct(null)}
          onConfirm={() => {
            deleteProduct(deletingProduct.id);
            setDeletingProduct(null);
          }}
        />
      )}
    </div>
  );
}

export default App;
