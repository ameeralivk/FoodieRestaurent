import type{ TableColumn } from "../../../types/SuperAdmin";
const TableHeader: React.FC<{ columns: TableColumn[] }> = ({ columns }) => {
  return (
    <thead>
      <tr className="border-b border-amber-900/30">
        {columns.map((column, index) => (
          <th
            key={index}
            className={`text-left py-3 px-4 text-sm font-normal text-amber-100/70 ${
              column.className || ""
            }`}
          >
            {column.header}
          </th>
        ))}
      </tr>
    </thead>
  );
};


export default TableHeader