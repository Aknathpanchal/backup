import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import "../App.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "85%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal(props) {
  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="container">
            <div>
              <p>Case Number</p>
              <p>Status</p>
              <p>Case Type</p>
              <p>Title</p>
              <p>Product</p>
              <p>Billable</p>
              <p>Channel</p>
              <p>Opened Time</p>
              <p>Package</p>
              <p>Remarks</p>
              <p>Sub Status</p>
              <p>Technician</p>
            </div>
            <div>
              <p>{props.info.Case_number}</p>
              <p>{props.info.Status}</p>
              <p>{props.info.Priority}</p>
              <p>{props.info.Title}</p>
              <p>{props.info.Product}</p>
              <p>{props.info.Billable ? "✅" : "❌"}</p>
              <p>{props.info.Channel}</p>
              <p>{props.info.Opened_Time}</p>
              <p>{props.info.Package ? "✅" : "❌"}</p>
              <p>{props.info.Remarks}</p>
              <p>{props.info.Sub_Status}</p>
              <p>{props.info.Technician}</p>
            </div>
            <div>
              <p>Case Number</p>
              <p>Status</p>
              <p>Case Type</p>
              <p>Title</p>
              <p>Product</p>
              <p>Billable</p>
              <p>Channel</p>
              <p>Opened Time</p>
              <p>Package</p>
              <p>Remarks</p>
              <p>Sub Status</p>
              <p>Technician</p>
            </div>
            <div>
              <p>{props.info.Case_number}</p>
              <p>{props.info.Status}</p>
              <p>{props.info.Priority}</p>
              <p>{props.info.Title}</p>
              <p>{props.info.Product}</p>
              <p>{props.info.Billable ? "✅" : "❌"}</p>
              <p>{props.info.Channel}</p>
              <p>{props.info.Opened_Time}</p>
              <p>{props.info.Package ? "✅" : "❌"}</p>
              <p>{props.info.Remarks}</p>
              <p>{props.info.Sub_Status}</p>
              <p>{props.info.Technician}</p>
            </div>
          </div>

          <Button
            sx={{
              textAlign: "center",
              cursor: "pointer",
              color: "white",
              backgroundColor: "rgb(25,118,210)",
            }}
            onClick={props.handleClose}
          >
            Cancel
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
