import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import "../App.css";
import { nanoid } from "nanoid";
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

export default function FormModal(props) {
  const [form, setform] = React.useState({ id: nanoid(3) });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setform({
      ...form,
      [name]: value,
    });
  };

  return (
    <div>
      <Modal
        open={props.openform}
        onClose={props.handleCloseform}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="container">
            <form action="" className="form">
              <div>
                <input
                  onChange={handleChange}
                  required={true}
                  type="text"
                  name="Account_Name"
                  id=""
                  className="forminput"
                  placeholder="Account Name"
                />
                <input
                  onChange={handleChange}
                  required={true}
                  type="text"
                  name="Address"
                  id=""
                  className="forminput"
                  placeholder="Address"
                />
                <input
                  onChange={handleChange}
                  required={true}
                  type="text"
                  name="Agent"
                  id=""
                  className="forminput"
                  placeholder="Agent"
                />
                <input
                  onChange={handleChange}
                  required={true}
                  type="number"
                  name="Amount"
                  id=""
                  className="forminput"
                  placeholder="Amount"
                />
                <input
                  onChange={handleChange}
                  required={true}
                  type="text"
                  name="Billable"
                  id=""
                  className="forminput"
                  placeholder="Billable"
                />
                <input
                  onChange={handleChange}
                  required={true}
                  type="text"
                  name="Case_number"
                  id=""
                  className="forminput"
                  placeholder="Case_number"
                />
                <input
                  onChange={handleChange}
                  required={true}
                  type="text"
                  name="Channel"
                  id=""
                  className="forminput"
                  placeholder="Channel"
                />
                <input
                  onChange={handleChange}
                  required={true}
                  type="text"
                  name="Comments"
                  id=""
                  className="forminput"
                  placeholder="Comments"
                />
                <input
                  onChange={handleChange}
                  required={true}
                  type="text"
                  name="Contact_Name"
                  id=""
                  className="forminput"
                  placeholder="Contact Name"
                />
                <input
                  onChange={handleChange}
                  required={true}
                  type="text"
                  name="Mobile"
                  id=""
                  className="forminput"
                  placeholder="Mobile"
                />
                <input
                  onChange={handleChange}
                  required={true}
                  type="date"
                  name="Opened_Time"
                  id=""
                  className="forminput"
                  placeholder="Opened Time"
                />
                <input
                  onChange={handleChange}
                  required={true}
                  type="text"
                  name="Package"
                  id=""
                  className="forminput"
                  placeholder="Package"
                />
              </div>
              <div>
                <input
                  onChange={handleChange}
                  required={true}
                  type="number"
                  name="Phone"
                  id=""
                  className="forminput"
                  placeholder="Phone"
                />
                <input
                  onChange={handleChange}
                  required={true}
                  type="text"
                  name="Priority"
                  id=""
                  className="forminput"
                  placeholder="Priority"
                />
                <input
                  onChange={handleChange}
                  required={true}
                  type="text"
                  name="Product"
                  id=""
                  className="forminput"
                  placeholder="Product"
                />
                <input
                  onChange={handleChange}
                  required={true}
                  type="text"
                  name="Remarks"
                  id=""
                  className="forminput"
                  placeholder="Remarks"
                />
                <input
                  onChange={handleChange}
                  required={true}
                  type="text"
                  name="Status"
                  id=""
                  className="forminput"
                  placeholder="Status"
                />
                <input
                  onChange={handleChange}
                  required={true}
                  type="text"
                  name="Sub_Status"
                  id=""
                  className="forminput"
                  placeholder="Sub Status"
                />
                <input
                  onChange={handleChange}
                  required={true}
                  type="text"
                  name="Technician"
                  id=""
                  className="forminput"
                  placeholder="Technician"
                />
                <input
                  onChange={handleChange}
                  required={true}
                  type="date"
                  name="Technician_Date_Time"
                  id=""
                  className="forminput"
                  placeholder="Technician Date Time"
                />
                <input
                  onChange={handleChange}
                  required={true}
                  type="text"
                  name="Technician_Status"
                  id=""
                  className="forminput"
                  placeholder="Technician Status"
                />
                <input
                  onChange={handleChange}
                  required={true}
                  type="text"
                  name="Title"
                  id=""
                  className="forminput"
                  placeholder="Title"
                />
              </div>
            </form>
          </div>

          <Button
            sx={{
              textAlign: "center",
              cursor: "pointer",
              color: "white",
              backgroundColor: "rgb(25,118,210)",
            }}
            onClick={(e) => props.getData(e, form)}
          >
            Submit
          </Button>
          <Button
            sx={{
              textAlign: "center",
              cursor: "pointer",
              marginLeft: "10px",
              color: "white",
              backgroundColor: "rgb(25,118,210)",
            }}
            onClick={props.handleCloseForm}
          >
            Cancel
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
