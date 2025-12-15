import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import SearchBar from "../../Elements/Reusable/reusableSearchBar";
import { useState } from "react";
import Pagination from "../../Elements/Reusable/Pagination";
import ReusableModal from "../../modals/SuperAdmin/GeneralModal";
import ReusableTable from "../../Elements/Reusable/reusableTable";
const TableComponent = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(3);
  const [modalErrors, setModalErrors] = useState<{ [key: string]: string }>({});
  const [currentRow, setCurrentRow] = useState<any>(null);
  const [modalMode, setModalMode] = useState<"add" | "edit" | "view">("add");
  const [table, setTable] = useState([
    {
      tableNo: 2,
      seatingCapacity: 6,
      isAvailable: false,
      description: ["fdslafjd", "fdlsajdjkl"],
      qrcodeUrl: "https://foodie.com/r/692ea36738a54f8d01ed6747?table=6930f1a82c9b1e12a8c55e21",
    },
    {
      tableNo: 4,
      seatingCapacity: 4,
      isAvailable: true,
      description: ["ameer", "ali"],
      qrcodeUrl: "https://foodie.com/r/692ea36738a54f8d01ed6747?table=6930f1a82c9b1e12a8c55e21",
    },
  ]);
  const columns = [
    { header: "TableNo", accessor: "tableNo" },
    { header: "Seating Capacity", accessor: "seatingCapacity" },
    {
      header: "Status",
      accessor: "isAvailable",
      render: (isAvailable: boolean) => {
        const label = isAvailable ? "NotAvailable" : "Available";
        const classes = isAvailable
          ? "bg-red-500/20 text-red-400"
          : "bg-green-500/20 text-green-400";

        return (
          <span className={`px-2 py-1 rounded text-xs font-medium ${classes}`}>
            {label}
          </span>
        );
      },
    },
  ];

  const updateTableStatus = (row: any, value: any) => {
    console.log(row, value);
    setTable((prev: any[]) =>
      prev.map((table) =>
        table.tableNo === row.tableNo
          ? { ...table, isAvailable: !table.isAvailable }
          : table
      )
    );
  };

  const handleView = (row: any) => {
    setCurrentRow(row);
    setModalOpen(true);
    setModalMode("view")
  };

  const handleDelete = (row:any) => {
   
  };

  const handlePageChange = () => {};

  const handleEdit = (row:any) => {
     setCurrentRow(row);
    setModalOpen(true);
    setModalMode("edit")
  };

  const handleSubmit = () => {};

  const handleFieldChange = () => {};
  return (
    <div className="">
      <header className="bg-[#111214] border-b border-gray-800/70 backdrop-blur-md shadow-md sticky top-0 z-20">
        <div className="max-w-9xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            {/* Left */}
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-xl bg-blue-600/20">
                <TableRestaurantIcon className="w-7 h-7 text-blue-400" />
              </div>

              <div>
                <h1 className="text-2xl font-semibold tracking-wide">
                  Table Management
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
              <TableRestaurantIcon className="w-5 h-5" />
              <span className="font-medium">Add Staff</span>
            </button>
          </div>
        </div>
      </header>
      <div className="ml-4">
        <div className="flex justify-between items-center mb-4 mt-6 ml-8">
          <SearchBar
            placeholder="Search staff by name or email..."
            onSearch={(query) => {
              // setSearchQuery(query);
              // setCurrentPage(1);
            }}
          />
        </div>
        {table.length >= 1 ? (
          <div className="bg-[#141518] border border-gray-800/60 rounded-2xl p-6 shadow-xl backdrop-blur-md">
            <ReusableTable
              title="Staff Members"
              columns={columns}
              data={table}
              loading={loading}
              minWidth="min-w-[100px]"
              qrField={{ enabled: true, urlAccessor: "qrcodeUrl" }}
              actions={[
                { type: "view", onClick: handleView },
                { type: "edit", onClick: handleEdit },
                { type: "delete", onClick: handleDelete },
              ]}
              toggleField={{
                accessor: "isAvailable",
                invert: true,
                onToggle: (row, value) => {
                  updateTableStatus(row, !value);
                },
              }}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center py-24 bg-[#141518] border border-gray-800/60 rounded-2xl shadow-xl">
            <TableRestaurantIcon className="w-20 h-20 text-gray-600 mb-6" />
            <p className="text-gray-400 text-lg mb-3">
              No staff members found.
            </p>
            <p className="text-gray-500 mb-8">
              Start by adding your first staff member.
            </p>
          </div>
        )}
      </div>
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
          loading={loading}
          title={
            modalMode === "add"
              ? "Add Table"
              : modalMode === "edit"
              ? "Edit Table"
              : "View Table"
          }
          submitText={
            modalMode === "add"
              ? "Create Table"
              : modalMode === "edit"
              ? "Save Changes"
              : ""
          }
          cancelText="Close"
          mode={modalMode}
          fields={[
            {
              name: "tableNo",
              label: "Table No *",
              type: "number",
              value: currentRow?.tableNo || "",
            },
            {
              name: "seatingCapacity",
              label: "Seating Capacity *",
              type: "number",
              value: currentRow?.seatingCapacity || "",
            },

            {
              name: "description",
              label: "Description",
              type: "tags",
              value: currentRow?.description || [],
            },
          ]}
          externalErrors={modalErrors}
        />
      )}
    </div>
  );
};

export default TableComponent;
