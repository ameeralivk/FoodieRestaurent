const LoadingRow: React.FC<{ colSpan: number }> = ({ colSpan }) => {
  return (
    <tr>
      <td colSpan={colSpan} className="text-center p-6">
        <div className="flex justify-center items-center space-x-2">
          <span className="w-3 h-3 bg-amber-500 rounded-full animate-bounce"></span>
          <span className="w-3 h-3 bg-amber-500 rounded-full animate-bounce delay-150"></span>
          <span className="w-3 h-3 bg-amber-500 rounded-full animate-bounce delay-300"></span>
        </div>
      </td>
    </tr>
  );
};
export default LoadingRow