import React from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";

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

interface ReusableTableProps {
  title: string;
  columns: Column[];
  data: any[];
  actions?: Action[]; // optional actions
  minWidth?: string; // optional min width like "min-w-[800px]"
}

const ReusableTable: React.FC<ReusableTableProps> = ({
  columns,
  data,
  actions,
  minWidth = "min-w-[1100px]", // default min width
}) => {
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
              </tr>
            </thead>

            <tbody>
              {data.map((row: any) => (
                <tr
                  key={row.id}
                  className="border-b border-gray-700 hover:bg-gray-800 transition"
                >
                  {columns.map((col, idx) => (
                    <td key={idx} className="py-4 px-6 text-gray-300">
                      {col.render
                        ? col.render(row[col.accessor], row)
                        : row[col.accessor]}
                    </td>
                  ))}

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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReusableTable;
