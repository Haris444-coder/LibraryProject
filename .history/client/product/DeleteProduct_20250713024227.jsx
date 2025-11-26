import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import auth from "../lib/auth-helper.js";
import { remove } from "./api-product.js";

export default function DeleteShop(props) {
  const [open, setOpen] = useState(false);

  const jwt = auth.isAuthenticated();

  const clickButton = () => {
    setOpen(true);
  };

  const deleteProduct = () => {
    remove({ productId: props.product._id }, { t: jwt.token }).then((data) => {
      if (data.error) {
        console.error(data.error);
      } else {
        setOpen(false);
        props.onRemove(props.product);
      }
    });
  };

  const handleRequestClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton aria-label="Delete" onClick={clickButton} color="error">
        <DeleteIcon />
      </IconButton>

      <Dialog open={open} onClose={handleRequestClose}>
        <DialogTitle>Delete {props.product.name}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Confirm to delete your product <strong>{props.product.name}</strong>.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRequestClose} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteProduct} color="error" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

DeleteProduct.propTypes = {
  productshop: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired,
};
