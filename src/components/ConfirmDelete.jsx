function ConfirmDelete({ product, onClose, onConfirm }) {
  return (
    <div className="fixed inset-0 bg-white/10 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-sm p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-xl font-semibold mb-4">Delete Product</h2>
        <p className="mb-6">
          Are you sure you want to delete <b>{product.title}</b>?
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDelete;
