// import React from "react";
// import { Eye, Pencil, Trash2 } from "lucide-react";
// import LoadingRow from "../SuperAdmin/LoadingRow";
// interface Column {
//   header: string;
//   accessor: string;
//   render?: (value: any, row: any) => React.ReactNode;
// }

// type ActionType = "view" | "edit" | "delete";

// interface Action {
//   type: ActionType;
//   onClick: (row: any) => void;
// }

// interface ReusableTableProps {
//   title: string;
//   columns: Column[];
//   data: any[];
//   actions?: Action[]; // optional actions
//   loading: boolean;
//   minWidth?: string; // optional min width like "min-w-[800px]"
// }

// const ReusableTable: React.FC<ReusableTableProps> = ({
//   columns,
//   data,
//   actions,
//   loading,
//   minWidth = "min-w-[1100px]", // default min width
// }) => {
//   const colSpan = columns.length + (actions ? 1 : 0);
//   return (
//     <div>
//       <div className={`max-w-7xl mx-auto ${minWidth}`}>
//         <div className="bg-gray-900 rounded-lg shadow-xl border border-gray-700 overflow-x-auto">
//           <table className="w-full">
//             <thead>
//               <tr className="border-b border-gray-700">
//                 {columns.map((col, index) => (
//                   <th
//                     key={index}
//                     className="py-4 px-6 text-left text-gray-300 font-semibold"
//                   >
//                     {col.header}
//                   </th>
//                 ))}
//                 {actions && (
//                   <th className="py-4 px-6 text-left text-gray-300 font-semibold">
//                     Actions
//                   </th>
//                 )}
//               </tr>
//             </thead>

//             <tbody>
//               {loading ? (
//                 <>
//                   <LoadingRow colSpan={colSpan} />
//                 </>
//               ) : data.length === 0 ? (
//                 // ⚠️ No data after loading is done
//                 <tr>
//                   <td
//                     colSpan={colSpan}
//                     className="text-center py-6 text-gray-400"
//                   >
//                     No plans found.
//                   </td>
//                 </tr>
//               ) : (
//                 data.map((row: any) => (
//                   <tr
//                     key={row._id || row.id}
//                     className="border-b border-gray-700 hover:bg-gray-800 transition"
//                   >
//                     {columns.map((col, idx) => (
//                       <td key={idx} className="py-4 px-6 text-gray-300">
//                         {col.render
//                           ? col.render(row[col.accessor], row)
//                           : row[col.accessor]}
//                       </td>
//                     ))}
//                     {actions && (
//                       <td className="py-4 px-6 flex gap-3">
//                         {actions.map((action, idx) => {
//                           let color = "";
//                           let icon: React.ReactNode = null;

//                           switch (action.type) {
//                             case "view":
//                               color = "text-blue-400 hover:text-blue-300";
//                               icon = <Eye size={18} />;
//                               break;
//                             case "edit":
//                               color = "text-amber-400 hover:text-amber-300";
//                               icon = <Pencil size={18} />;
//                               break;
//                             case "delete":
//                               color = "text-red-400 hover:text-red-300";
//                               icon = <Trash2 size={18} />;
//                               break;
//                           }

//                           return (
//                             <button
//                               key={idx}
//                               onClick={() => action.onClick(row)}
//                               className={color}
//                             >
//                               {icon}
//                             </button>
//                           );
//                         })}
//                       </td>
//                     )}
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReusableTable;

// import React from "react";
// import { Eye, Pencil, Trash2 } from "lucide-react";
// import LoadingRow from "../SuperAdmin/LoadingRow";

// interface Column {
//   header: string;
//   accessor: string;
//   render?: (value: any, row: any) => React.ReactNode;
// }

// type ActionType = "view" | "edit" | "delete";

// interface Action {
//   type: ActionType;
//   onClick: (row: any) => void;
// }

// interface ReusableTableProps {
//   title: string;
//   columns: Column[];
//   data: any[];
//   actions?: Action[];
//   loading: boolean;
//   minWidth?: string;
// }

// const ReusableTable: React.FC<ReusableTableProps> = ({
//   columns,
//   data,
//   actions,
//   loading,
//   minWidth = "min-w-[1100px]",
// }) => {
//   const colSpan = columns.length + (actions ? 1 : 0);

//   const renderValue = (value: any, col: Column, row: any) => {
//     // 1. Custom render function
//     if (col.render) return col.render(value, row);

//     // 2. Array → Show comma separated
//     if (Array.isArray(value)) return value.join(", ");

//     // 3. Object → fallback JSON
//     if (typeof value === "object" && value !== null)
//       return JSON.stringify(value);

//     // 4. Primitive values
//     return value;
//   };

//   return (
//     <div>
//       <div className={`max-w-7xl mx-auto ${minWidth}`}>
//         <div className="bg-gray-900 rounded-lg shadow-xl border border-gray-700 overflow-x-auto">
//           <table className="w-full">
//             <thead>
//               <tr className="border-b border-gray-700">
//                 {columns.map((col, index) => (
//                   <th
//                     key={index}
//                     className="py-4 px-6 text-left text-gray-300 font-semibold"
//                   >
//                     {col.header}
//                   </th>
//                 ))}
//                 {actions && (
//                   <th className="py-4 px-6 text-left text-gray-300 font-semibold">
//                     Actions
//                   </th>
//                 )}
//               </tr>
//             </thead>

//             <tbody>
//               {loading ? (
//                 <LoadingRow colSpan={colSpan} />
//               ) : data.length === 0 ? (
//                 <tr>
//                   <td
//                     colSpan={colSpan}
//                     className="text-center py-6 text-gray-400"
//                   >
//                     No plans found.
//                   </td>
//                 </tr>
//               ) : (
//                 data.map((row: any) => (
//                   <tr
//                     key={row._id || row.id}
//                     className="border-b border-gray-700 hover:bg-gray-800 transition"
//                   >
//                     {columns.map((col, idx) => (
//                       <td key={idx} className="py-4 px-6 text-gray-300">
//                         {renderValue(row[col.accessor], col, row)}
//                       </td>
//                     ))}

//                     {actions && (
//                       <td className="py-4 px-6 flex gap-3">
//                         {actions.map((action, idx) => {
//                           let color = "";
//                           let icon: React.ReactNode = null;

//                           switch (action.type) {
//                             case "view":
//                               color = "text-blue-400 hover:text-blue-300";
//                               icon = <Eye size={18} />;
//                               break;
//                             case "edit":
//                               color = "text-amber-400 hover:text-amber-300";
//                               icon = <Pencil size={18} />;
//                               break;
//                             case "delete":
//                               color = "text-red-400 hover:text-red-300";
//                               icon = <Trash2 size={18} />;
//                               break;
//                           }

//                           return (
//                             <button
//                               key={idx}
//                               onClick={() => action.onClick(row)}
//                               className={color}
//                             >
//                               {icon}
//                             </button>
//                           );
//                         })}
//                       </td>
//                     )}
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReusableTable;

import React from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import LoadingRow from "../SuperAdmin/LoadingRow";

interface Column {
  header: string;
  accessor: string;
  render?: (value: any, row: any) => React.ReactNode;
}

type ActionType = "view" | "edit" | "delete";

interface Action {
  type: ActionType;
  onClick: (row: any) => void;
}

interface ToggleField {
  accessor: string;
  invert?: boolean;
  onToggle: (row: any, newValue: boolean) => void;
}

interface ReusableTableProps {
  title?: string;
  columns: Column[];
  data: any[];
  actions?: Action[];
  toggleField?: ToggleField; // ⬅ OPTIONAL TOGGLE FIELD
  loading: boolean;
  minWidth?: string;
}

const ReusableTable: React.FC<ReusableTableProps> = ({
  columns,
  data,
  actions,
  toggleField,
  loading,
  minWidth = "min-w-[1100px]",
}) => {
  const colSpan = columns.length + (actions ? 1 : 0) + (toggleField ? 1 : 0); // ⬅ update column count

  const renderValue = (value: any, col: Column, row: any) => {
    if (col.render) return col.render(value, row);
    if (Array.isArray(value)) return value.join(", ");
    if (typeof value === "object" && value !== null)
      return JSON.stringify(value);
    return value;
  };

  return (
    <div>
      <div className={`max-w-7xl mx-auto ${minWidth}`}>
        <div className="bg-gray-900 rounded-lg shadow-xl border border-gray-700 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                {columns.map((col, index) => (
                  <th
                    key={index}
                    className="py-4 px-6 text-left text-gray-300 font-semibold"
                  >
                    {col.header}
                  </th>
                ))}
                {actions && (
                  <th className="py-4 px-6 text-left text-gray-300 font-semibold">
                    Actions
                  </th>
                )}
                {toggleField && (
                  <th className="py-4 px-6 text-left text-gray-300 font-semibold">
                    Toggle
                  </th>
                )}
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <LoadingRow colSpan={colSpan} />
              ) : data.length === 0 ? (
                <tr>
                  <td
                    colSpan={colSpan}
                    className="text-center py-6 text-gray-400"
                  >
                    No data found.
                  </td>
                </tr>
              ) : (
                data.map((row: any) => (
                  <tr
                    key={row._id || row.id}
                    className="border-b border-gray-700 hover:bg-gray-800 transition"
                  >
                    {columns.map((col, idx) => (
                      <td key={idx} className="py-4 px-6 text-gray-300">
                        {renderValue(row[col.accessor], col, row)}
                      </td>
                    ))}

                    {/* ---- ACTION BUTTONS (view/edit/delete) ---- */}
                    {actions && (
                      <td className="py-4 px-6 flex gap-3">
                        {actions.map((action, idx) => {
                          let color = "";
                          let icon: React.ReactNode = null;

                          switch (action.type) {
                            case "view":
                              color = "text-blue-400 hover:text-blue-300";
                              icon = <Eye size={18} />;
                              break;
                            case "edit":
                              color = "text-amber-400 hover:text-amber-300";
                              icon = <Pencil size={18} />;
                              break;
                            case "delete":
                              color = "text-red-400 hover:text-red-300";
                              icon = <Trash2 size={18} />;
                              break;
                          }

                          return (
                            <button
                              key={idx}
                              onClick={() => action.onClick(row)}
                              className={color}
                            >
                              {icon}
                            </button>
                          );
                        })}
                      </td>
                    )}
                    {/* ---- TOGGLE COLUMN ---- */}
                    {toggleField && (
                      <td className="py-4 px-6">
                        {(() => {
                          const rawValue = Boolean(row[toggleField.accessor]); // actual DB value
                          const checked = toggleField.invert
                            ? !rawValue
                            : rawValue;

                          return (
                            <label className="inline-flex items-center cursor-pointer relative">
                              <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={checked}
                                onChange={() => {
                                  const nextValue = toggleField.invert
                                    ? rawValue // if inverted → send original
                                    : !rawValue; // normal toggle

                                  toggleField.onToggle(row, nextValue);
                                }}
                              />
                              <div className="w-11 h-6 bg-gray-600 rounded-full peer-checked:bg-green-500 transition"></div>
                              <div className="w-5 h-5 bg-white rounded-full absolute left-1 top-0.5 peer-checked:translate-x-5 transition"></div>
                            </label>
                          );
                        })()}
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReusableTable;
