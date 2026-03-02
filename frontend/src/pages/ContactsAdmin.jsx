import { useEffect, useState } from "react";
import { FiMail, FiUser, FiCalendar, FiCheck, FiX } from "react-icons/fi";
import ApiClient from "../common/axios";
import AdminLayout from "../pages/admin/AdminLayout";
import clsx from "clsx";

export default function ContactsAdmin() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      const res = await ApiClient({ url: "/contacts", method: "GET" });
      setContacts(res.data.data);
    } catch (error) {
      console.error("Failed to load contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await ApiClient({
        url: `/contacts/${id}/status`,
        method: "PATCH",
        data: { status }
      });
      loadContacts();
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">Loading...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold">Contact Messages</h1>

        <div className="grid md:grid-cols-3 gap-6">
          {/* List */}
          <div className="md:col-span-1 border border-white/10 bg-zinc-900 rounded-xl overflow-hidden">
            <div className="p-3 border-b border-white/10">
              <h2 className="font-medium">Messages ({contacts.length})</h2>
            </div>
            <div className="divide-y divide-white/10 max-h-[600px] overflow-y-auto">
              {contacts.map((contact) => (
                <button
                  key={contact._id}
                  onClick={() => setSelectedContact(contact)}
                  className={clsx(
                    "w-full p-3 text-left hover:bg-zinc-800 transition",
                    selectedContact?._id === contact._id && "bg-zinc-800"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className={clsx(
                      "w-2 h-2 mt-2 rounded-full flex-shrink-0",
                      contact.status === "new" ? "bg-blue-500" :
                      contact.status === "read" ? "bg-green-500" : "bg-gray-500"
                    )} />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{contact.name}</p>
                      <p className="text-xs opacity-70 truncate">{contact.subject}</p>
                      <p className="text-xs opacity-50 mt-1">
                        {new Date(contact.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Detail */}
          <div className="md:col-span-2 border border-white/10 bg-zinc-900 rounded-xl p-6">
            {selectedContact ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">{selectedContact.subject}</h2>
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateStatus(selectedContact._id, "read")}
                      className="p-2 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/20"
                    >
                      <FiCheck />
                    </button>
                    <button
                      onClick={() => updateStatus(selectedContact._id, "archived")}
                      className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"
                    >
                      <FiX />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm opacity-70">
                  <span className="flex items-center gap-1">
                    <FiUser /> {selectedContact.name}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiMail /> {selectedContact.email}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiCalendar /> {new Date(selectedContact.createdAt).toLocaleString()}
                  </span>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <p className="whitespace-pre-wrap">{selectedContact.message}</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 opacity-70">
                Select a message to view
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}