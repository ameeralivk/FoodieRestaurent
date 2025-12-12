import { useState } from "react";
import { Users } from "lucide-react";
import ReusableTable from "../../Elements/Reusable/reusableTable";
import ReusableModal from "../../modals/SuperAdmin/GeneralModal";
import { showErrorToast } from "../../Elements/ErrorToast";
import { ToastContainer } from "react-toastify";
import { showConfirm } from "../../Elements/ConfirmationSwall";
interface Staff {
  _id: string;
  staffName: string;
  email: string;
  tags: string[];
  role: string;
  status: boolean; // true = active, false = inactive
}

const StaffManagementPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [staff, setStaff] = useState<Staff[]>([]);
  const [modalErrors, setModalErrors] = useState<{ [key: string]: string }>({});
  const [modalMode, setModalMode] = useState<"add" | "edit" | "view">("add");
  const [currentRow, setCurrentRow] = useState<any>(null);
  const columns = [
    { header: "Staff Name", accessor: "staffName" },
    { header: "Email", accessor: "email" },
    { header: "skills", accessor: "skills" },
    { header: "role", accessor: "role" },
  ];
  function handleView(row: string) {
    setCurrentRow(row);
    setModalMode("view");
    setModalOpen(true);
  }
  function handleEdit(row: string) {
    setCurrentRow(row);
    setModalMode("edit");
    setModalOpen(true);
  }
  async function updateStaffStatus(staffName: string, value: boolean) {
    console.log(staffName, value);
    const confirmed = await showConfirm(
      "Change this status?",
      `Are you Wand to Change the Status?`,
      "Change",
      "Cancel"
    );
    if (!confirmed) return alert("podo");
    setStaff((prev) =>
      prev.map((item) =>
        item.staffName === staffName ? { ...item, status: value } : item
      )
    );
  }
  function handleDelete(row: string) {
    try {
      const del = async () => {
        const confirmed = await showConfirm(
          "Delete this plan?",
          `Are you sure you want to delete "fdsafjdlsa"?`,
          "Delete",
          "Cancel"
        );

        if (!confirmed) return;
      };
      del();
    } catch (error: any) {
      showErrorToast(error.message);
    }
  }
  function handleSubmit(row: any) {
    console.log(row, "fdskla");
    const newRow = { ...row, status: true };
    setStaff((prev) => [...prev, newRow]);
    setModalOpen(false)
  }
  function handleFieldChange() {}
  console.log(currentRow, "fkldjsaflkdjsaklfjdlksafjadl");
  return (
    <div className="min-h-screen bg-[#0e0f11]  text-gray-200">
      {/* Header */}
      <header className="bg-[#111214] border-b border-gray-800/70 backdrop-blur-md shadow-md sticky top-0 z-20">
        <div className="max-w-9xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            {/* Left */}
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-xl bg-blue-600/20">
                <Users className="w-7 h-7 text-blue-400" />
              </div>

              <div>
                <h1 className="text-2xl font-semibold tracking-wide">
                  Staff Management
                </h1>
                <p className="text-gray-400 text-sm">
                  Manage and organize your team efficiently
                </p>
              </div>
            </div>

            {/* Add Staff Button */}
            <button
              onClick={() => {
                setModalOpen(true);
                setModalMode("add");
              }}
              className="flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg 
                     transition-all duration-200 active:scale-95"
            >
              <Users className="w-5 h-5" />
              <span className="font-medium">Add Staff</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-9xl mx-auto px-6">
        <ToastContainer />
        {staff.length >= 1 ? (
          <div className="bg-[#141518] border border-gray-800/60 rounded-2xl p-6 shadow-xl backdrop-blur-md">
            <ReusableTable
              title="Staff Members"
              columns={columns}
              data={staff}
              loading={loading}
              minWidth="min-w-[100px]"
              actions={[
                { type: "view", onClick: handleView },
                { type: "edit", onClick: handleEdit },
                { type: "delete", onClick: handleDelete },
              ]}
              toggleField={{
                accessor: "status",
                onToggle: (row, value) => {
                  console.log("Toggle clicked", row, value);
                  updateStaffStatus(row.staffName, value);
                },
              }}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center py-24 bg-[#141518] border border-gray-800/60 rounded-2xl shadow-xl">
            <Users className="w-20 h-20 text-gray-600 mb-6" />
            <p className="text-gray-400 text-lg mb-3">
              No staff members found.
            </p>
            <p className="text-gray-500 mb-8">
              Start by adding your first staff member.
            </p>
          </div>
        )}

        {/* Footer spacing */}
        <div className="py-10" />
      </main>

      {/* Add/Edit Modal */}
      {modalOpen && (
        <ReusableModal
          isOpen={modalOpen}
          tagName="skills"
          onClose={() => {
            setModalOpen(false);
            setCurrentRow(null);
            setModalErrors({});
          }}
          onSubmit={handleSubmit}
          onFieldChange={handleFieldChange}
          title={
            modalMode === "add"
              ? "Add Staff"
              : modalMode === "edit"
              ? "Edit Staff"
              : "View Staff"
          }
          submitText={
            modalMode === "add"
              ? "Create Plan"
              : modalMode === "edit"
              ? "Save Changes"
              : ""
          }
          cancelText="Close"
          mode={modalMode}
          fields={[
            {
              name: "staffName",
              label: "Staff Name *",
              type: "text",
              value: currentRow?.staffName || "",
            },
            {
              name: "email",
              label: "Email *",
              type: "text",
              value: currentRow?.email || "",
            },
            {
              name: "skills",
              label: "Skills",
              type: "tags",
              value: currentRow?.tags || [],
            },
            {
              name: "role",
              label: "role",
              type: "select",
              options: ["Cheff", "Staff"],
              value: currentRow?.tags || [],
            },
          ]}
          externalErrors={modalErrors}
        />
      )}
    </div>
  );
};

export default StaffManagementPage;
