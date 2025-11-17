

export interface TableColumn {
  header: string;
  className?: string;
}


export interface RestaurantApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApprove: () => void;
    data: {
    restaurantName: string;
    location: string;
    owner: string;
    contact: string;
    planName: string;
    status: string;
    nextDueDate: string;
    amount: string;
    restaurantImage: string;
    verificationDocument: string;
  };
}