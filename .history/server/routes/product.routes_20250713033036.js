import express from "express";
import productCtrl from "../controllers/product.controller.js";
import authCtrl from "../controllers/auth.controller.js";
import shopCtrl from "../controllers/shop.controller.js";
const router = express.Router();
router
  .route("/api/products/by/:productId")
  .post(authCtrl.requireSignin, productCtrl.isOwner, productCtrl.create)
  .get(productCtrl.listByProduct);
router.route("/api/products/:productId").get(productCtrl.read);
router
  .route("/api/product/image/:productId")
  .get(productCtrl.photo, productCtrl.defaultPhoto);
router.route("/api/product/defaultphoto").get(productCtrl.defaultPhoto);
router
  .route("/api/product/:productshopId/:productId")
  .put(authCtrl.requireSignin, shopCtrl.isOwner, productCtrl.update)
  .delete(authCtrl.requireSignin, shopCtrl.isOwner, productCtrl.remove);
router.param("shopId", shopCtrl.shopByID);
router.param("productId", productCtrl.productByID);
export default router;
