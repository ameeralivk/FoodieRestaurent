interface HeaderProps {
  onButtonClick?:() => void;
}
const header: React.FC<HeaderProps> = ({ onButtonClick }) => {
  return (
    <div className="flex justify-between items-start mb-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Loyalty Points
        </h1>
        <p className="text-gray-600">
          Manage your loyalty points for exclusive rewards and discounts.
        </p>
      </div>
      <button
        onClick={onButtonClick}
        className="bg-lime-400 hover:bg-lime-500 text-gray-900 font-semibold px-6 py-2 rounded-lg transition-colors"
      >
        Withdrawal
      </button>
    </div>
  );
};

export default header;
