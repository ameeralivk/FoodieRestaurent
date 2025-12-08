import { useEffect, useState } from "react";
import SuperAdminNavbar from "../../Components/Component/SuperAdmin/SuperAdminNavbar";
import SuperAdminSidebar from "../../Components/Component/SuperAdmin/SuperAdminSideBar";
import SubscriptionModal from "../../Components/modals/SuperAdmin/GeneralModal";
import ReusableTable from "../../Components/Elements/Reusable/reusableTable";
import type { SubscriptionPlan } from "../../types/SuperAdmin";
import Pagination from "../../Components/Elements/Reusable/Pagination";
import { createPlan, deletePlan } from "../../services/planService";
import { showErrorToast } from "../../Components/Elements/ErrorToast";
import { getPaymentBySession } from "../../services/planService";
import { showSuccessToast } from "../../Components/Elements/SuccessToast";
import { ToastContainer } from "react-toastify";
import { PlanAddingValidation } from "../../Validation/planAddingvalidation";
import type { ISubscriptionPlan } from "../../services/planService";
import { showConfirm } from "../../Components/Elements/ConfirmationSwall";
import PaymentSuccessModal from "../../Components/Component/Admin/PaymentSuccessmodal";
import { getAllPlan, editPlan } from "../../services/planService";
export default function SubscriptionPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState<any>(null);
  const [openModal, setOpenModal] =  useState(false)
  const [modalMode, setModalMode] = useState<"add" | "edit" | "view">("add");
  const [currentPage, setCurrentPage] = useState(1);
  const [modalErrors, setModalErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<SubscriptionPlan | any>({});
  const [plan, setPlans] = useState<ISubscriptionPlan[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const fetchPlans = async (page = 1) => {
    try {
      setLoading(true);
      const response = await getAllPlan(page, 10);
      console.log(response, "ameer resonse");
      await new Promise((res) => setTimeout(res, 300));
      setPlans(response.data.data);
      setTotalPages(response.pagination.totalPages);
    } catch (error) {
      console.error("Error loading plans:", error);
    } finally {
      setLoading(false);
    }
  };


  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    fetchPlans(currentPage);
  }, [currentPage]);
  const columns = [
    { header: "Plan Name", accessor: "planName" },
    { header: "Price", accessor: "price" },
    { header: "Duration", accessor: "duration" },
    { header: "Features", accessor: "features" },
    { header: "No Of Staff", accessor: "noOfStaff" },
  ];

  const handleSubmit = async (data: SubscriptionPlan) => {
    try {
      const errors = PlanAddingValidation(data);
      if (Object.keys(errors).length) {
        setModalErrors(errors);
        return;
      } else {
        if (modalMode == "add") {
          const confirmed = await showConfirm(
            "Add this plan?",
            `Are you sure you want to Add "${data.planName}"?`,
            "Add",
            "Cancel"
          );

          if (!confirmed) return;
          const create = async () => {
            const res = await createPlan(data);
            if (res.success) {
              setModalOpen(false);
              setModalErrors({});
              showSuccessToast(res.message);
              fetchPlans();
            } else {
              showErrorToast(res.message);
            }
          };
          create();
        } else if (modalMode == "edit") {
          try {
            const edit = async () => {
              const id = currentRow._id;
              const confirmed = await showConfirm(
                "Edit this plan?",
                `Are you sure you want to Add "${data.planName}"?`,
                "Edit",
                "Cancel"
              );

              if (!confirmed) return;
              const res = await editPlan(id, data);
              if (res.success) {
                setModalOpen(false);
                setModalErrors({});
                showSuccessToast(res.message);
                fetchPlans();
                setCurrentRow(null);
              } else {
                showErrorToast(res.message);
              }
            };
            edit();
          } catch (error: any) {
            showErrorToast(error.message);
          }
        }
      }
    } catch (error: any) {
      showErrorToast(error.message);
    }
  };
  const handleFieldChange = (name: string, value: any) => {
    const updatedForm = { ...formData, [name]: value };

    setFormData(updatedForm);

    const errors = PlanAddingValidation(updatedForm);
    setModalErrors(errors);
  };

  const handleView = (row: any) => {
    setCurrentRow(row);
    setModalMode("view");
    setModalOpen(true);
  };
  const handleEdit = (row: any) => {
    setCurrentRow(row);
    setFormData(row);
    setModalMode("edit");
    setModalOpen(true);
  };
  const handleDelete = (row: any) => {
    try {
      const del = async () => {
        const confirmed = await showConfirm(
          "Delete this plan?",
          `Are you sure you want to delete "${row.planName}"?`,
          "Delete",
          "Cancel"
        );

        if (!confirmed) return;
        const res = await deletePlan(row._id);
        if (res.success) {
          setModalOpen(false);
          setModalErrors({});
          showSuccessToast(res.message);
          fetchPlans();
        } else {
          showErrorToast(res.message);
        }
      };
      del();
    } catch (error: any) {
      showErrorToast(error.message);
    }
  };
  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      {/* NAVBAR FIXED */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <SuperAdminNavbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      </div>

      {/* SIDEBAR FIXED */}
      <div className="fixed top-14 left-0 h-[calc(100vh-64px)] w-64 bg-gray-900 border-r border-gray-700 z-40">
        <SuperAdminSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
      </div>
      <ToastContainer />
      {/* PAGE CONTENT */}
      <div className="ml-64 pt-20 p-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-white">
              Subscription Plans
            </h1>
            <button
              onClick={() => {
                setModalOpen(true), setModalMode("add");
              }}
              className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              New Plan
            </button>
          </div>
          <ReusableTable
            title="Subscription Plans"
            columns={columns}
            data={plan}
            loading={loading}
            actions={[
              { type: "view", onClick: handleView },
              { type: "edit", onClick: handleEdit },
              { type: "delete", onClick: handleDelete },
            ]}
          />
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
      {/* MODAL (Transparent Background) */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center 
          bg-black/40 backdrop-blur-sm"
        >
          <SubscriptionModal
            isOpen={modalOpen}
            onClose={() => {
              setModalOpen(false);
              setCurrentRow(null);
              setModalErrors({});
            }}
            onSubmit={handleSubmit}
            onFieldChange={handleFieldChange}
            title={
              modalMode === "add"
                ? "Add Subscription Plan"
                : modalMode === "edit"
                ? "Edit Subscription Plan"
                : "View Subscription Plan"
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
                name: "planName",
                label: "Plan Name *",
                type: "text",
                value: currentRow?.planName || "",
              },
              {
                name: "price",
                label: "Price *",
                type: "number",
                value: currentRow?.price || "",
              },
              {
                name: "duration",
                label: "Duration",
                type: "duration",
                options: ["1 Month", "6 Month", "1 Year"],
                value: currentRow?.duration,
              },
              {
                name: "noOfStaff",
                label: "No of staff *",
                type: "number",
                value: currentRow?.noOfDishes || "",
              },
              {
                name: "noOfDishes",
                label: "No of Dish *",
                type: "number",
                value: currentRow?.noOfStaff || "",
              },
              {
                name: "features",
                label: "Features *",
                type: "features",
                value: currentRow?.features
                  ? currentRow.features.map((f: string) => f.trim()) // array of strings
                  : [],
              },
            ]}
            externalErrors={modalErrors}
          />
        </div>
      )}
    </div>
  );
}
