import React, { useState } from "react";
import { InventoryItem } from "../../types/inventory.types";
import Button from "../common/Button";

interface InventoryTableProps {
  items: InventoryItem[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onOrder: (id: string) => void;
  onAdd: () => void;
}

const InventoryTable = ({
  items,
  onEdit,
  onDelete,
  onOrder,
  onAdd,
}: InventoryTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof InventoryItem>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    "all",
    ...Array.from(new Set(items.map((item) => item.category))),
  ];

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortDirection === "asc" ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const handleSort = (field: keyof InventoryItem) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const isLowStock = (item: InventoryItem) => {
    return item.quantity < item.minimumStock;
  };

  const isExpiringSoon = (item: InventoryItem) => {
    const expirationDate = new Date(item.expirationDate);
    const today = new Date();
    const diffTime = expirationDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && diffDays > 0;
  };

  const isExpired = (item: InventoryItem) => {
    const expirationDate = new Date(item.expirationDate);
    const today = new Date();
    return expirationDate < today;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-3">
        <h2 className="text-xl font-semibold">Inventory Management</h2>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search items..."
              className="px-3 py-2 border rounded-lg w-full sm:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="absolute right-3 top-2.5 text-gray-400">🔍</span>
          </div>

          <select
            className="px-3 py-2 border rounded-lg"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === "all" ? "All Categories" : category}
              </option>
            ))}
          </select>

          <Button onClick={onAdd}>Add Item</Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th
                className="p-3 text-left border-b cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("name")}
              >
                Name{" "}
                {sortField === "name" && (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th
                className="p-3 text-left border-b cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("category")}
              >
                Category{" "}
                {sortField === "category" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th
                className="p-3 text-left border-b cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("quantity")}
              >
                Quantity{" "}
                {sortField === "quantity" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th
                className="p-3 text-left border-b cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("expirationDate")}
              >
                Expiration{" "}
                {sortField === "expirationDate" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th
                className="p-3 text-left border-b cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("location")}
              >
                Location{" "}
                {sortField === "location" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th className="p-3 text-left border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedItems.length > 0 ? (
              sortedItems.map((item) => (
                <tr
                  key={item.id}
                  className={`
                    border-b hover:bg-gray-50
                    ${isExpired(item) ? "bg-red-50" : ""}
                    ${
                      !isExpired(item) && isExpiringSoon(item)
                        ? "bg-yellow-50"
                        : ""
                    }
                    ${
                      !isExpired(item) &&
                      !isExpiringSoon(item) &&
                      isLowStock(item)
                        ? "bg-orange-50"
                        : ""
                    }
                  `}
                >
                  <td className="p-3">{item.name}</td>
                  <td className="p-3">{item.category}</td>
                  <td className="p-3">
                    <span
                      className={
                        isLowStock(item) ? "text-red-600 font-medium" : ""
                      }
                    >
                      {item.quantity} {item.unit}
                    </span>
                    {isLowStock(item) && (
                      <span className="ml-2 bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                        Low Stock
                      </span>
                    )}
                  </td>
                  <td className="p-3">
                    <span
                      className={`
                        ${isExpired(item) ? "text-red-600 font-medium" : ""}
                        ${
                          !isExpired(item) && isExpiringSoon(item)
                            ? "text-yellow-600 font-medium"
                            : ""
                        }
                      `}
                    >
                      {new Date(item.expirationDate).toLocaleDateString()}
                    </span>
                    {isExpired(item) && (
                      <span className="ml-2 bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                        Expired
                      </span>
                    )}
                    {!isExpired(item) && isExpiringSoon(item) && (
                      <span className="ml-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                        Expiring Soon
                      </span>
                    )}
                  </td>
                  <td className="p-3">{item.location}</td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => onEdit(item.id)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete(item.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                      {isLowStock(item) && (
                        <button
                          onClick={() => onOrder(item.id)}
                          className="text-green-600 hover:text-green-800"
                        >
                          Order
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-3 text-center text-gray-500">
                  No inventory items found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-red-50 p-3 rounded-lg">
          <h4 className="font-medium">Expired Items</h4>
          <p className="text-2xl font-bold text-red-600">
            {items.filter((item) => isExpired(item)).length}
          </p>
        </div>
        <div className="bg-yellow-50 p-3 rounded-lg">
          <h4 className="font-medium">Expiring Soon</h4>
          <p className="text-2xl font-bold text-yellow-600">
            {
              items.filter((item) => !isExpired(item) && isExpiringSoon(item))
                .length
            }
          </p>
        </div>
        <div className="bg-orange-50 p-3 rounded-lg">
          <h4 className="font-medium">Low Stock Items</h4>
          <p className="text-2xl font-bold text-orange-600">
            {items.filter((item) => isLowStock(item)).length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InventoryTable;
