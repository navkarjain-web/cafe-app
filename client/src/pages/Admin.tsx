import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Plus, Trash2, LogOut } from "lucide-react";
import { toast } from "sonner";

export default function Admin() {
  const { user, logout, loading } = useAuth();

  const [allowed, setAllowed] = useState(false);
  const [activeTab, setActiveTab] = useState<"menu" | "reservations">("menu");
  const [showAddForm, setShowAddForm] = useState(false);

  const [menuForm, setMenuForm] = useState({
    name: "",
    description: "",
    category: "drinks" as "drinks" | "food" | "specials",
    price: "",
    imageUrl: "",
  });

  useEffect(() => {
    const access = localStorage.getItem("admin_access");

    if (access === "true") {
      setAllowed(true);
    } else {
      window.location.href = "/admin-login";
    }
  }, []);

  const { data: menuItems = [], refetch: refetchMenu } =
    trpc.menu.list.useQuery();

  const { data: reservations = [], refetch: refetchReservations } =
    trpc.reservations.list.useQuery(undefined, {
      enabled: allowed,
    });

  const createMenuMutation = trpc.menu.create.useMutation();
  const deleteMenuMutation = trpc.menu.delete.useMutation();
  const updateReservationMutation =
    trpc.reservations.updateStatus.useMutation();

  if (loading || !allowed) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Access Denied
      </div>
    );
  }

  const handleAddMenuItem = async () => {
    if (!menuForm.name || !menuForm.price) {
      toast.error("Fill required fields");
      return;
    }

    try {
      await createMenuMutation.mutateAsync(menuForm);

      toast.success("Menu item added");

      setMenuForm({
        name: "",
        description: "",
        category: "drinks",
        price: "",
        imageUrl: "",
      });

      setShowAddForm(false);
      refetchMenu();
    } catch {
      toast.error("Failed to add item");
    }
  };

  const handleDeleteMenuItem = async (id: number) => {
    try {
      await deleteMenuMutation.mutateAsync({ id });
      toast.success("Deleted");
      refetchMenu();
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleUpdateReservation = async (
    id: number,
    status: "confirmed" | "cancelled"
  ) => {
    try {
      await updateReservationMutation.mutateAsync({ id, status });
      toast.success("Updated");
      refetchReservations();
    } catch {
      toast.error("Failed");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b py-6">
        <div className="container flex justify-between items-center">
          <div>
            <Link to="/">
              <span className="cursor-pointer flex items-center gap-2 mb-3">
                <ArrowLeft className="w-4 h-4" />
                Back
              </span>
            </Link>

            <h1 className="text-4xl font-bold">Admin Panel</h1>
            <p className="mt-2">Welcome {user.name || "Admin"}</p>
          </div>

          <button
            onClick={async () => {
              localStorage.removeItem("admin_access");
              await logout();
              window.location.href = "/";
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b">
        <div className="container flex gap-5">
          <button
            onClick={() => setActiveTab("menu")}
            className={`py-4 ${activeTab === "menu" ? "font-bold" : "text-gray-500"
              }`}
          >
            Menu
          </button>

          <button
            onClick={() => setActiveTab("reservations")}
            className={`py-4 ${activeTab === "reservations" ? "font-bold" : "text-gray-500"
              }`}
          >
            Reservations
          </button>
        </div>
      </div>

      <div className="container py-10">
        {/* MENU */}
        {activeTab === "menu" && (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Menu Items</h2>

              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="border px-4 py-2 rounded-lg flex gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Item
              </button>
            </div>

            {showAddForm && (
              <div className="border rounded-lg p-6 mb-8 space-y-4">
                <Input
                  placeholder="Name"
                  value={menuForm.name}
                  onChange={(e) =>
                    setMenuForm({ ...menuForm, name: e.target.value })
                  }
                />

                <Textarea
                  placeholder="Description"
                  value={menuForm.description}
                  onChange={(e) =>
                    setMenuForm({
                      ...menuForm,
                      description: e.target.value,
                    })
                  }
                />

                <select
                  value={menuForm.category}
                  onChange={(e) =>
                    setMenuForm({
                      ...menuForm,
                      category: e.target.value as
                        | "drinks"
                        | "food"
                        | "specials",
                    })
                  }
                  className="w-full border px-3 py-2 rounded-md"
                >
                  <option value="drinks">Drinks</option>
                  <option value="food">Food</option>
                  <option value="specials">Specials</option>
                </select>

                <Input
                  placeholder="Price"
                  value={menuForm.price}
                  onChange={(e) =>
                    setMenuForm({ ...menuForm, price: e.target.value })
                  }
                />

                <Input
                  placeholder="Image URL"
                  value={menuForm.imageUrl}
                  onChange={(e) =>
                    setMenuForm({ ...menuForm, imageUrl: e.target.value })
                  }
                />

                <button
                  onClick={handleAddMenuItem}
                  className="border px-4 py-2 rounded-lg w-full"
                >
                  Save Item
                </button>
              </div>
            )}

            <div className="space-y-4">
              {menuItems.map((item: any) => (
                <div
                  key={item.id}
                  className="border rounded-lg p-5 flex justify-between"
                >
                  <div>
                    <h3 className="font-bold text-lg">{item.name}</h3>
                    <p>{item.description}</p>
                    <p className="mt-2">${item.price}</p>
                  </div>

                  <button
                    onClick={() => handleDeleteMenuItem(item.id)}
                    className="text-red-500"
                  >
                    <Trash2 />
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* RESERVATIONS */}
        {activeTab === "reservations" && (
          <>
            <h2 className="text-2xl font-bold mb-6">Reservations</h2>

            <div className="space-y-4">
              {reservations.length === 0 && <p>No reservations found</p>}

              {reservations.map((item: any) => (
                <div key={item.id} className="border rounded-lg p-5">
                  <h3 className="font-bold text-lg">{item.customerName}</h3>
                  <p>{item.customerEmail}</p>
                  <p>{item.customerPhone}</p>
                  <p>
                    {new Date(item.reservationDate).toLocaleDateString()} at{" "}
                    {item.reservationTime}
                  </p>
                  <p>{item.partySize} Guests</p>
                  <p className="mb-4">Status: {item.status}</p>

                  {item.status === "pending" && (
                    <div className="flex gap-3">
                      <button
                        onClick={() =>
                          handleUpdateReservation(item.id, "confirmed")
                        }
                        className="px-4 py-2 bg-green-600 text-white rounded"
                      >
                        Confirm
                      </button>

                      <button
                        onClick={() =>
                          handleUpdateReservation(item.id, "cancelled")
                        }
                        className="px-4 py-2 bg-red-600 text-white rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}