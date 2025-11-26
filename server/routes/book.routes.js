import express from "express";
import authCtrl from "../controllers/auth.controller.js";
import * as bookCtrl from "../controllers/book.controller.js";

const router = express.Router();

router
  .route("/api/books")
  .get(authCtrl.requireSignin, bookCtrl.list)
  .post(authCtrl.requireSignin, bookCtrl.create);

router
  .route("/api/books/:bookId")
  .get(authCtrl.requireSignin, bookCtrl.read)
  .put(authCtrl.requireSignin, bookCtrl.update)
  .delete(authCtrl.requireSignin, bookCtrl.remove);

router
  .route("/api/books/photo/:bookId")
  .get(bookCtrl.photo);

router
  .route("/api/books/checkout/:bookId")
  .put(authCtrl.requireSignin, bookCtrl.checkout);

router
  .route("/api/books/return/:bookId")
  .put(authCtrl.requireSignin, bookCtrl.returnBook);

router.param("bookId", bookCtrl.bookByID);

export default router;
