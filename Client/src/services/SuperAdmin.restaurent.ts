import { apiRequest } from "../api/apiRequest";

export const changeRestaurantStatus = async (
  restaurantId: string,
  status: boolean
): Promise<{ success: boolean; message: string }> => {
  let temp = "";
  if (status) {
    temp = "block";
  } else {
    temp = "unblock";
  }
  console.log(restaurantId, temp, "ready");
  return apiRequest("PATCH", `/superadmin/restaurant/${restaurantId}/${temp}`);
};
