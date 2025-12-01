// import React from "react";
// import RestaurantRow from "../../Elements/SuperAdmin/AdminTableRow";
// import TableHeader from "../../Elements/SuperAdmin/TableHeader";
// import type{ TableColumn } from "../../../types/SuperAdmin";
// import { useState } from "react";
// import RestaurantApprovalModal from "../../modals/SuperAdmin/RestaurentApprovalModal";
// const Table: React.FC<{ children: React.ReactNode; className?: string }> = ({
//   children,
//   className = "",
// }) => {
//   return (
//     <div className={`overflow-x-auto ${className}`}>
//       <table className="w-full border-collapse">{children}</table>
//     </div>
//   );
// };

// const TableBody: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   return <tbody>{children}</tbody>;
// };

// export default function TableExample() {
//      const [modalOpen, setModalOpen] = useState(false);
//       const [selectedRestaurant, setSelectedRestaurant] = useState<any>(null);
//   const columns: TableColumn[] = [
//     { header: "Restaurant Name" },
//     { header: "Owner" },
//     { header: "Location" },
//     { header: "Subscription Plan" },
//     { header: "Status" },
//     { header: "Action" },
//   ];
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-amber-950 via-stone-900 to-neutral-950 p-8">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-2xl font-semibold text-amber-100 mb-6">
//           Restaurant Management
//         </h1>
//         <RestaurantApprovalModal
//         isOpen={modalOpen}
//         onClose={() => setModalOpen(false)}
//         onApprove={() => console.log("Approved!")}
//         data={selectedRestaurant}
//         />
//         <div className="bg-black/30 backdrop-blur-sm rounded-lg border border-amber-900/30 p-6">
//           <Table>
//             <TableHeader columns={columns} />
//             <TableBody>
//               <RestaurantRow
//                 name="KFC"
//                 owner="John Doe"
//                 location="New York"
//                 plan="Premium"
//                 status="pending"
//                 isBlocked={false}
//                 onView={() => {
//                   setSelectedRestaurant({
//                     restaurantName: "KFC",
//                     owner: "John Doe",
//                     location: "New York",
//                     contact: "9876543210",
//                     planName: "Premium",
//                     status: "Pending",
//                     nextDueDate: "20 Nov 2025",
//                     amount: "$60",
//                     restaurantImage: "https://picsum.photos/seed/kfc/300",
//                     verificationDocument: "https://picsum.photos/seed/doc/600",
//                   });
//                   setModalOpen(true);
//                 }}
//               />
//             </TableBody>
//           </Table>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import RestaurantRow from "../../Elements/SuperAdmin/AdminTableRow";
import TableHeader from "../../Elements/SuperAdmin/TableHeader";
import type { TableColumn } from "../../../types/SuperAdmin";
import RestaurantApprovalModal from "../../modals/SuperAdmin/RestaurentApprovalModal";
import { getAllRestaurent } from "../../../services/superAdmin";
import LoadingRow from "../../Elements/SuperAdmin/LoadingRow";

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
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<any>(null);
  const [modalLoading, setModalLoading] = useState(false);
  const columns: TableColumn[] = [
    { header: "Restaurant Name" },
    { header: "Owner" },
    { header: "Location" },
    { header: "Subscription Plan" },
    { header: "Status" },
    { header: "Action" },
  ];

  const fetchRestaurants = async () => {
    setLoading(true);
    try {
      const response = await getAllRestaurent();
      if (response && response.success) {
        // Minimum delay to show loading spinner
        await new Promise((res) => setTimeout(res, 500)); // 0.5s delay
        setRestaurants(response.data);
      }
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);
  console.log(restaurants, "hi restuar");
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-950 via-stone-900 to-neutral-950 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-semibold text-amber-100 mb-6">
          Restaurant Management
        </h1>

        {/* Modal */}
        <RestaurantApprovalModal
          isOpen={modalOpen}
          onClose={async () => {
            setLoading(true);
            setModalLoading(false);
            setModalOpen(false);
            setTimeout(async () => {
              await fetchRestaurants();
              setLoading(false);
            }, 0);
          }}
          onApprove={() => console.log("Approved!")}
          data={selectedRestaurant}
          loading={modalLoading}
        />

        {/* Table */}
        <div className="bg-black/30 backdrop-blur-sm rounded-lg border border-amber-900/30 p-6">
          <Table>
            <TableHeader columns={columns} />
            <TableBody>
              {loading ? (
                <LoadingRow colSpan={columns.length} />
              ) : restaurants.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="text-center p-4 text-amber-200"
                  >
                    No restaurants found
                  </td>
                </tr>
              ) : (
                restaurants.map((rest) => (
                  <RestaurantRow
                    key={rest._id}
                    name={rest.restaurantName}
                    owner={rest.ownerName}
                    location={rest.placeName}
                    plan={rest.planName || "Free"}
                    status={rest.status}
                    isBlocked={rest.isBlocked}
                    onView={() => {
                      setModalOpen(true);
                      setModalLoading(true);

                      // simulate delay for loading indicator
                      setTimeout(() => {
                        setSelectedRestaurant({
                          _id: rest._id,
                          restaurantName: rest.restaurantName,
                          owner: rest.ownerName,
                          location: rest.placeName,
                          contact: rest.contactNumber,
                          planName: rest.planName || "Free",
                          status: rest.status,
                          nextDueDate: rest.nextDueDate || "N/A",
                          amount: rest.amount || "N/A",
                          restaurantImage: rest.restaurantPhoto
                            ? rest.restaurantPhoto
                            : undefined,
                          verificationDocument: rest.proofDocument
                            ? rest.proofDocument
                            : undefined,
                          reason: rest.reason,
                          rejectedAt: rest.rejectedAt,
                        });
                        setModalLoading(false);
                      }, 500); // 0.5s delay to show spinner
                    }}
                  />
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
