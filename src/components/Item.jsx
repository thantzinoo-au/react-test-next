import { useState, useRef } from "react";

export default function Item({ item, onDelete, onEdit }) {
  const { itemName, itemCategory, itemPrice } = item;
  const [isEdit, setIsEdit] = useState(false);
  const itemNameEdit = useRef(null);
  const itemCategoryEdit = useRef(null);
  const itemPriceEdit = useRef(null);

  const deleteItem = async () => await onDelete(item._id);

  const editItem = async () => {
    setIsEdit(!isEdit);
    if (isEdit) {
      const tmpItem = {
        name: itemNameEdit.current.value,
        category: itemCategoryEdit.current.value,
        price: itemPriceEdit.current.value,
      };
      await onEdit(item._id, tmpItem);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1">
      {isEdit ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Item Name
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="Enter item name"
              type="text"
              ref={itemNameEdit}
              defaultValue={itemName}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Category
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="Enter category"
              type="text"
              ref={itemCategoryEdit}
              defaultValue={itemCategory}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Price (THB)
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="Enter price"
              type="number"
              ref={itemPriceEdit}
              defaultValue={itemPrice}
            />
          </div>
        </div>
      ) : (
        <div className="space-y-3 mb-4">
          <h3 className="text-xl font-bold text-gray-800 truncate">
            {itemName}
          </h3>
          <div className="flex items-center gap-2">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              {itemCategory}
            </span>
          </div>
          <p className="text-2xl font-bold text-green-600">฿{itemPrice}</p>
        </div>
      )}

      <div className="flex gap-2 mt-4">
        <button
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
          onClick={editItem}
        >
          {isEdit ? "Save" : "Edit"}
        </button>
        <button
          className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
          onClick={deleteItem}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
