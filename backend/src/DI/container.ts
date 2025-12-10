import { Container } from "inversify";
import { TYPES } from "../DI/types";

import { PaymentRepository } from "../Repositories/payment/implimentation/implimentation";
import { PaymentController } from "../Controller/paymentController/Implimentation/paymentController";
import { PaymentService } from "../services/paymentService/Implimentation/paymentService";
import { PlanController } from "../Controller/planController/Implimentation/planController";
import { AdminPlanService } from "../services/planService/Implimentation/adminPlanService";
import { AdminPlanRepository } from "../Repositories/planRepositories/implimentation/adminPlanRepositories";
import { AdminAuthRepository } from "../Repositories/Admin/implimentation/adminRepositories";
import { SuperAdminService } from "../services/superAdmin/implementation/superAdminService";
import { SuperAdminController } from "../Controller/superAdmin/implementation/superAdminController";
import { AdminAuthController } from "../Controller/admin/implementation/adminAuthController";
import { UserAuthController } from "../Controller/user/auth/implimentation/userAuthController";
import { UserAuthService } from "../services/user/auth/implimentation/userAuthService";
import { UserAuthRepository } from "../Repositories/user/auth/implimentation/userRepository";
import { AdminAuthService } from "../services/admin/implementation/adminAuthService";
import { SubscriptionRepo } from "../Repositories/Subscription/Implimentation/SubscriptionRepo";
import { SubcriptionServer } from "../services/subscription/implimentation/subscriptionService";

const container = new Container();
//payment
container.bind(TYPES.PaymentController).to(PaymentController);
container.bind(TYPES.PaymentRepository).to(PaymentRepository);
container.bind(TYPES.PaymentService).to(PaymentService);
//plan
container.bind(TYPES.AdminPlanControler).to(PlanController);
container.bind(TYPES.AdminPlanService).to(AdminPlanService);
container.bind(TYPES.AdminPlanRepository).to(AdminPlanRepository);
//superadminAuth
container.bind(TYPES.AdminAuthRepository).to(AdminAuthRepository);
container.bind(TYPES.SuperAdminService).to(SuperAdminService);
container.bind(TYPES.SuperAdminController).to(SuperAdminController);
//userAuth
container.bind(TYPES.UserAuthController).to(UserAuthController);
container.bind(TYPES.UserAuthService).to(UserAuthService);
container.bind(TYPES.UserAuthRepository).to(UserAuthRepository);

//adminAuth
container.bind(TYPES.AdminAuthController).to(AdminAuthController);
container.bind(TYPES.AdminAuthService).to(AdminAuthService);

//subscription
container.bind(TYPES.SubcriptionRepo).to(SubscriptionRepo);
container.bind(TYPES.SubcriptionService).to(SubcriptionServer);
export { container };
