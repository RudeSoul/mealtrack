import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import InventoryTable from "../components/inventory/InventoryTable";
import InventoryForm from "../components/inventory/InventoryForm";
import Card from "../components/common/Card";
import { InventoryItem } from "../types/inventory.types";

const Inventory = () => {
  const {
    inventoryItems,
    addInventoryItem,
    updateInventoryItem,
    deleteInventoryItem,
  } = useAppContext();
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | undefined>(
    undefined
  );
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [orderingItem, setOrderingItem] = useState<InventoryItem | undefined>(
    undefined
  );

  const handleAddItem = () => {
    setEditingItem(undefined);
    setShowForm(true);
    setShowOrderForm(false);
  };

  const handleEditItem = (id: string) => {
    const item = inventoryItems.find((i) => i.id === id);
    if (item) {
      setEditingItem(item);
      setShowForm(true);
      setShowOrderForm(false);
    }
  };

  const handleDeleteItem = (id: string) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      deleteInventoryItem(id);
    }
  };

  const handleOrderItem = (id: string) => {
    const item = inventoryItems.find((i) => i.id === id);
    if (item) {
      setOrderingItem(item);
      setShowOrderForm(true);
      setShowForm(false);
    }
  };

  const handleSaveItem = (item: InventoryItem) => {
    if (editingItem) {
      updateInventoryItem(item);
    } else {
      addInventoryItem(item);
    }
    setShowForm(false);
  };

  const handlePlaceOrder = () => {
    if (orderingItem) {
      const updatedItem = {
        ...orderingItem,
        quantity: orderingItem.quantity + 20,
      };
      updateInventoryItem(updatedItem);
      setShowOrderForm(false);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setShowOrderForm(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Inventory Management</h1>

      {showForm ? (
        <Card
          title={editingItem ? "Edit Inventory Item" : "Add Inventory Item"}
        >
          <InventoryForm
            item={editingItem}
            onSave={handleSaveItem}
            onCancel={handleCancel}
          />
        </Card>
      ) : showOrderForm && orderingItem ? (
        <Card title={`Order ${orderingItem.name}`}>
          <div className="space-y-4">
            <p>
              Current stock:{" "}
              <span className="font-medium">
                {orderingItem.quantity} {orderingItem.unit}
              </span>
            </p>
            <p>
              Minimum stock level:{" "}
              <span className="font-medium">
                {orderingItem.minimumStock} {orderingItem.unit}
              </span>
            </p>
            <p>
              Suggested order quantity:{" "}
              <span className="font-medium">20 {orderingItem.unit}</span>
            </p>
            <p>
              Estimated cost:{" "}
              <span className="font-medium">
                ${(20 * orderingItem.cost).toFixed(2)}
              </span>
            </p>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handlePlaceOrder}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
              >
                Place Order
              </button>
            </div>
          </div>
        </Card>
      ) : (
        <InventoryTable
          items={inventoryItems}
          onEdit={handleEditItem}
          onDelete={handleDeleteItem}
          onOrder={handleOrderItem}
          onAdd={handleAddItem}
        />
      )}
    </div>
  );
};

export default Inventory;
