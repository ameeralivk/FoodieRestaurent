

export interface TableFormData {
  tableNo: number | string;
  seatingCapacity: number | string;
  description?: string[] | string;
}

export interface ValidationErrors {
  [key: string]: string;
}

export const TableValidation = (data: TableFormData): ValidationErrors => {
  const errors: ValidationErrors = {};


  if (data.tableNo === "" || data.tableNo === null || data.tableNo === undefined) {
    errors.tableNo = "Table number is required";
  } else if (Number(data.tableNo) <= 0) {
    errors.tableNo = "Table number must be greater than 0";
  }


  if (
    data.seatingCapacity === "" ||
    data.seatingCapacity === null ||
    data.seatingCapacity === undefined
  ) {
    errors.seatingCapacity = "Seating capacity is required";
  } else if (Number(data.seatingCapacity) <= 0) {
    errors.seatingCapacity = "Seating capacity must be greater than 0";
  }

  if (Array.isArray(data.description)) {
    if (data.description.length > 10) {
      errors.description = "Maximum 10 tags allowed";
    }
  }

  return errors;
};
