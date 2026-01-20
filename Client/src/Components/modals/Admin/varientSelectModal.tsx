import { useState } from "react";

interface VariantValue {
  _id: string;
  option: string;
  price: number;
}

interface Variant {
  category: string;
  values: VariantValue[];
}

interface VariantSelectModalProps {
  open: boolean;
  itemName: string;
  basePrice: number;
  variant: Variant;
  onClose: () => void;
  onConfirm: (data: {
    variantOption: VariantValue | null;
    finalPrice: number;
  }) => void;
}

export default function VariantSelectModal({
  open,
  itemName,
  basePrice,
  variant,
  onClose,
  onConfirm,
}: VariantSelectModalProps) {
  const [selected, setSelected] = useState<VariantValue | null>(null);

  if (!open) return null;

  const finalPrice = selected
    ? basePrice + selected.price
    : basePrice;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center">
      <div className="bg-white w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl p-5">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">{itemName}</h2>
          <button onClick={onClose} className="text-xl">✕</button>
        </div>

        {/* NORMAL OPTION */}
        <div
          onClick={() => setSelected(null)}
          className={`flex justify-between items-center border rounded-xl px-4 py-3 cursor-pointer mb-3
            ${selected === null ? "border-orange-500 bg-orange-50" : "border-gray-200"}
          `}
        >
          <span className="font-medium">Normal</span>
          <span className="text-sm text-gray-600">
            ₹{basePrice}
          </span>
        </div>

        {/* VARIANT CATEGORY */}
        <p className="text-sm text-gray-500 mb-2">
          Choose {variant.category}
        </p>

        {/* VARIANT OPTIONS */}
        <div className="space-y-3">
          {variant.values.map((v) => {
            const isActive = selected?._id === v._id;
            return (
              <div
                key={v._id}
                onClick={() => setSelected(v)}
                className={`flex justify-between items-center border rounded-xl px-4 py-3 cursor-pointer
                  ${isActive ? "border-orange-500 bg-orange-50" : "border-gray-200"}
                `}
              >
                <span className="font-medium">{v.option}</span>
                <span className="text-sm text-gray-600">
                  + ₹{v.price}
                </span>
              </div>
            );
          })}
        </div>

        {/* FOOTER */}
        <div className="mt-5 flex justify-between items-center">
          <div>
            <p className="text-xs text-gray-500">Total Price</p>
            <p className="text-lg font-bold">₹{finalPrice}</p>
          </div>

          <button
            onClick={() =>
              onConfirm({
                variantOption: selected,
                finalPrice,
              })
            }
            className="px-5 py-2 rounded-xl text-white font-medium bg-orange-500"
          >
            Add Item
          </button>
        </div>
      </div>
    </div>
  );
}
