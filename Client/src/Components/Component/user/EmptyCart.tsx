

const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <img
        src="/empty-cart.png"
        alt="Empty cart"
        className="w-40 mb-6"
      />
      <h2 className="text-2xl font-semibold text-gray-700">
        Your cart is empty 🛒
      </h2>
      <p className="text-gray-500 mt-2">
        Add some delicious items to get started
      </p>
    </div>
  );
};

export default EmptyCart;
