import express from "express"
import { AiController } from "../../Controller/aiController/implementation/aiController";
import { container } from "../../DI/container";
import { TYPES } from "../../DI/types";

const aiController = container.get<AiController>(
  TYPES.aiController
);


const Router = express.Router()


Router.route("/ai").post(aiController.sendResponse)



export default Router