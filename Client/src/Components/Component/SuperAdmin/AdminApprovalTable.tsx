import React from "react";
import RestaurantRow from "../../Elements/SuperAdmin/AdminTableRow";
import TableHeader from "../../Elements/SuperAdmin/TableHeader";
import type{ TableColumn } from "../../../types/SuperAdmin";
import { useState } from "react";
import RestaurantApprovalModal from "../../modals/SuperAdmin/RestaurentApprovalModal";
const Table: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = "",
}) => {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full border-collapse">{children}</table>
    </div>
  );
};

const TableBody: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <tbody>{children}</tbody>;
};


export default function TableExample() {
     const [modalOpen, setModalOpen] = useState(false);
      const [selectedRestaurant, setSelectedRestaurant] = useState<any>(null);
  const columns: TableColumn[] = [
    { header: "Restaurant Name" },
    { header: "Owner" },
    { header: "Location" },
    { header: "Subscription Plan" },
    { header: "Status" },
    { header: "Action" },
  ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-950 via-stone-900 to-neutral-950 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-semibold text-amber-100 mb-6">
          Restaurant Management
        </h1>
        <RestaurantApprovalModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onApprove={() => console.log("Approved!")}
        data={selectedRestaurant}
        />
        <div className="bg-black/30 backdrop-blur-sm rounded-lg border border-amber-900/30 p-6">
          <Table>
            <TableHeader columns={columns} />
            <TableBody>
              <RestaurantRow
                name="KFC"
                owner="John Doe"
                location="New York"
                plan="Premium"
                status="pending"
                isBlocked={false}
                onView={() => {
                  setSelectedRestaurant({
                    restaurantName: "KFC",
                    owner: "John Doe",
                    location: "New York",
                    contact: "9876543210",
                    planName: "Premium",
                    status: "Pending",
                    nextDueDate: "20 Nov 2025",
                    amount: "$60",
                    restaurantImage: "https://picsum.photos/seed/kfc/300",
                    verificationDocument: "https://picsum.photos/seed/doc/600",
                  });
                  setModalOpen(true);
                }}
              />
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
