import { Route, Routes } from "react-router-dom";
import UserLandingPage from "../Pages/user/auth/LandingPage";
import UserLogin from "../Pages/user/auth/userLogin";
import UserSignUpPage from "../Pages/user/auth/registerPage";
import ForgotPassword from "../Pages/user/auth/forgetPasswordPage";
import UserPrivateRoute from "./user/userPrivateRoute";
import UserPublicRoute from "./user/userPublicRoute";
import PageNotFound from "../Pages/auth/PageNotFound";
import UserRestaurantPage from "../Pages/user/UserMenuPage";
import ItemDetailPage from "../Pages/user/ItemDetailsPage";
import CartPage from "../Pages/user/cartPage";
import UserProfile from "../Pages/user/profilePage";
import CheckoutPage from "../Pages/user/checkoutPage";
import UserOrderSuccessPage from "../Pages/user/orderSuccessPage";
const UserRoutes = () => {
  return (
    <Routes>
      <Route element={<UserPublicRoute />}>
        <Route path="/login" element={<UserLogin />} />
        <Route path="/register" element={<UserSignUpPage />} />
        <Route path="/forgetPassword" element={<ForgotPassword />} />
      </Route>
      <Route
        path="/"
        element={
          <UserPrivateRoute>
            <UserLandingPage />
          </UserPrivateRoute>
        }
      />
      <Route path="/*" element={<PageNotFound />} />
      <Route
        path="/restaurant/:restaurantId"
        element={<UserRestaurantPage />}
      />
      <Route path="/:restaurantId/items/:itemId" element={<ItemDetailPage />} />
      <Route path="/:restaurantId/cart" element={<CartPage />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/payment-success" element={<UserOrderSuccessPage />} />
    </Routes>
  );
};

export default UserRoutes;
