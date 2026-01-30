import { useEffect, useState, useRef } from "react";
import Item from "./Item";

export default function ItemsList() {
  const [item, setItem] = useState([]);

  const itemName = useRef(null);
  const itemCategory = useRef(null);
  const itemPrice = useRef(null);

  const refreshItemList = async () => {
    const updatedResult = await fetch("http://localhost:3000/api/item");
    const updatedData = await updatedResult.json();
    setItem(updatedData);
  };

  const resetItemInputs = () => {
    itemName.current.value = "";
    itemCategory.current.value = "";
    itemPrice.current.value = "";
  };

  const addItem = async () => {
    if (
      !itemName.current.value ||
      !itemCategory.current.value ||
      !itemPrice.current.value
    ) {
      return alert("Cannot Add");
    }
    const tmpItem = {
      name: itemName.current.value,
      category: itemCategory.current.value,
      price: itemPrice.current.value,
    };
    const result = await fetch("http://localhost:3000/api/item", {
      method: "POST",
      body: JSON.stringify(tmpItem),
    });
    await result.json();
    resetItemInputs();
    await refreshItemList();
  };

  async function deleteItem(item_id) {
    const result = await fetch(`http://localhost:3000/api/item/${item_id}`, {
      method: "DELETE",
    });
    const data = await result.json();
    console.log(data);
    await refreshItemList();
  }

  async function editItem(item_id, tmpItem) {
    const result = await fetch(`http://localhost:3000/api/item/${item_id}`, {
      method: "PATCH",
      body: JSON.stringify(tmpItem),
    });
    const data = await result.json();
    console.log(data);
    await refreshItemList();
  }

  useEffect(() => {
    async function fetchData() {
      const result = await fetch("http://localhost:3000/api/item");
      const data = await result.json();
      setItem(data);
    }
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Add Item Form */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Item Name
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="Enter item name"
                type="text"
                ref={itemName}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="Enter category"
                type="text"
                ref={itemCategory}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Price (THB)
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="Enter price"
                type="number"
                ref={itemPrice}
              />
            </div>
          </div>

          <button
            className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold px-8 py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            onClick={addItem}
          >
            Add Item
          </button>
        </div>

        {/* Items Grid */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            Items List
            <span className="text-lg font-normal text-gray-500">
              ({item.length} {item.length === 1 ? "item" : "items"})
            </span>
          </h2>
        </div>

        {item.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No items yet
            </h3>
            <p className="text-gray-500">Add your first item to get started!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {item.map((i) => (
              <Item
                key={i._id}
                item={i}
                onDelete={deleteItem}
                onEdit={editItem}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
