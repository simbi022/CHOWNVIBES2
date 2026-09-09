import { useEffect, useState } from "react";
import { supabase } from "./supabase";
import {
  Package,
  Plus,
  Minus,
  AlertTriangle,
  RefreshCw,
  Trash2,
  X,
} from "lucide-react";

type InventoryItem = {
  id: string;
  item_name: string;
  unit: string;
  opening_stock: number;
  stock_in: number;
  stock_used: number;
  low_stock_level: number;
  created_at: string;
  updated_at: string;
};

export default function Inventory() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const [itemName, setItemName] = useState("");
  const [unit, setUnit] = useState("pieces");
  const [openingStock, setOpeningStock] = useState("");
  const [lowStockLevel, setLowStockLevel] = useState("");

  useEffect(() => {
    loadInventory();
  }, []);

  async function loadInventory() {
    setLoading(true);

    const { data, error } = await supabase
      .from("inventory")
      .select("*")
      .order("item_name", { ascending: true });

    if (error) {
      console.error("Error loading inventory:", error);
      alert("Could not load inventory.");
    } else {
      setItems(data || []);
    }

    setLoading(false);
  }

  function getCurrentStock(item: InventoryItem) {
    return (
      Number(item.opening_stock || 0) +
      Number(item.stock_in || 0) -
      Number(item.stock_used || 0)
    );
  }

  function isLowStock(item: InventoryItem) {
    return getCurrentStock(item) <= Number(item.low_stock_level || 0);
  }

  async function addItem(e: React.FormEvent) {
    e.preventDefault();

    if (!itemName.trim()) {
      alert("Please enter an item name.");
      return;
    }

    setSaving(true);

    const { error } = await supabase.from("inventory").insert({
      item_name: itemName.trim(),
      unit,
      opening_stock: Number(openingStock) || 0,
      stock_in: 0,
      stock_used: 0,
      low_stock_level: Number(lowStockLevel) || 0,
    });

    if (error) {
      console.error("Error adding inventory item:", error);
      alert(`Could not add item: ${error.message}`);
    } else {
      setItemName("");
      setUnit("pieces");
      setOpeningStock("");
      setLowStockLevel("");
      setShowAddForm(false);
      await loadInventory();
    }

    setSaving(false);
  }

  async function addStock(item: InventoryItem) {
    const amount = window.prompt(
      `How many ${item.unit} of ${item.item_name} did you receive?`
    );

    if (amount === null) return;

    const quantity = Number(amount);

    if (!Number.isFinite(quantity) || quantity <= 0) {
      alert("Please enter a valid quantity.");
      return;
    }

    const { error } = await supabase
      .from("inventory")
      .update({
        stock_in: Number(item.stock_in || 0) + quantity,
        updated_at: new Date().toISOString(),
      })
      .eq("id", item.id);

    if (error) {
      console.error(error);
      alert(`Could not add stock: ${error.message}`);
    } else {
      await loadInventory();
    }
  }

  async function removeStock(item: InventoryItem) {
    const amount = window.prompt(
      `How many ${item.unit} of ${item.item_name} were used/sold?`
    );

    if (amount === null) return;

    const quantity = Number(amount);

    if (!Number.isFinite(quantity) || quantity <= 0) {
      alert("Please enter a valid quantity.");
      return;
    }

    const currentStock = getCurrentStock(item);

    if (quantity > currentStock) {
      alert(
        `You only have ${currentStock} ${item.unit} of ${item.item_name} available.`
      );
      return;
    }

    const { error } = await supabase
      .from("inventory")
      .update({
        stock_used: Number(item.stock_used || 0) + quantity,
        updated_at: new Date().toISOString(),
      })
      .eq("id", item.id);

    if (error) {
      console.error(error);
      alert(`Could not deduct stock: ${error.message}`);
    } else {
      await loadInventory();
    }
  }

  async function deleteItem(item: InventoryItem) {
    const confirmed = window.confirm(
      `Delete "${item.item_name}" from inventory?`
    );

    if (!confirmed) return;

    const { error } = await supabase
      .from("inventory")
      .delete()
      .eq("id", item.id);

    if (error) {
      console.error(error);
      alert(`Could not delete item: ${error.message}`);
    } else {
      await loadInventory();
    }
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <Package size={30} />
            <h1 className="text-2xl font-bold">Inventory Control</h1>
          </div>

          <p className="text-sm opacity-70 mt-1">
            Monitor stock levels and record stock movements.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={loadInventory}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border"
          >
            <RefreshCw size={18} />
            Refresh
          </button>

          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black text-white"
          >
            <Plus size={18} />
            Add Item
          </button>
        </div>
      </div>

      {/* Add Item Modal */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 text-black">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-bold">Add Inventory Item</h2>

              <button onClick={() => setShowAddForm(false)}>
                <X size={22} />
              </button>
            </div>

            <form onSubmit={addItem} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Item Name
                </label>

                <input
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  placeholder="e.g. Coke"
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Unit
                </label>

                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2"
                >
                  <option value="pieces">Pieces</option>
                  <option value="bottles">Bottles</option>
                  <option value="cans">Cans</option>
                  <option value="packs">Packs</option>
                  <option value="cartons">Cartons</option>
                  <option value="kg">Kg</option>
                  <option value="litres">Litres</option>
                  <option value="grams">Grams</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Opening Stock
                </label>

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={openingStock}
                  onChange={(e) => setOpeningStock(e.target.value)}
                  placeholder="0"
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Low Stock Alert Level
                </label>

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={lowStockLevel}
                  onChange={(e) => setLowStockLevel(e.target.value)}
                  placeholder="e.g. 10"
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full bg-black text-white rounded-lg py-3 font-medium disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Item"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="text-center py-10 opacity-70">
          Loading inventory...
        </div>
      ) : items.length === 0 ? (
        <div className="border rounded-xl p-10 text-center">
          <Package size={40} className="mx-auto mb-3 opacity-50" />

          <h2 className="font-semibold text-lg">No inventory items yet</h2>

          <p className="text-sm opacity-70 mt-1">
            Add your first stock item to start tracking inventory.
          </p>
        </div>
      ) : (
        <>
          {/* Inventory cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item) => {
              const currentStock = getCurrentStock(item);
              const low = isLowStock(item);

              return (
                <div
                  key={item.id}
                  className={`border rounded-xl p-5 ${
                    low ? "border-red-400" : ""
                  }`}
                >
                  <div className="flex justify-between items-start gap-3">
                    <div>
                      <h2 className="font-bold text-lg">{item.item_name}</h2>

                      <p className="text-sm opacity-60">
                        Unit: {item.unit}
                      </p>
                    </div>

                    {low && (
                      <span className="flex items-center gap-1 text-red-600 text-xs font-semibold">
                        <AlertTriangle size={16} />
                        LOW STOCK
                      </span>
                    )}
                  </div>

                  <div className="mt-5">
                    <p className="text-sm opacity-60">Current Stock</p>

                    <p
                      className={`text-3xl font-bold ${
                        low ? "text-red-600" : ""
                      }`}
                    >
                      {currentStock}{" "}
                      <span className="text-base font-normal">
                        {item.unit}
                      </span>
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-5 text-sm">
                    <div>
                      <p className="opacity-60">Opening</p>
                      <p className="font-semibold">
                        {item.opening_stock}
                      </p>
                    </div>

                    <div>
                      <p className="opacity-60">Stock In</p>
                      <p className="font-semibold">
                        {item.stock_in}
                      </p>
                    </div>

                    <div>
                      <p className="opacity-60">Used/Sold</p>
                      <p className="font-semibold">
                        {item.stock_used}
                      </p>
                    </div>

                    <div>
                      <p className="opacity-60">Alert At</p>
                      <p className="font-semibold">
                        {item.low_stock_level}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-5">
                    <button
                      onClick={() => addStock(item)}
                      className="flex-1 flex items-center justify-center gap-1 border rounded-lg py-2 text-sm"
                    >
                      <Plus size={16} />
                      Stock In
                    </button>

                    <button
                      onClick={() => removeStock(item)}
                      className="flex-1 flex items-center justify-center gap-1 border rounded-lg py-2 text-sm"
                    >
                      <Minus size={16} />
                      Use/Sell
                    </button>

                    <button
                      onClick={() => deleteItem(item)}
                      className="px-3 border rounded-lg py-2 text-red-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}