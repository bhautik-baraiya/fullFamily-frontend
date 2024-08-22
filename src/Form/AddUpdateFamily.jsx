import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Form from "./ListOfFamily";
import axios from "axios";
import { dataContext } from "../Context/Context";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useDispatch, useSelector } from "react-redux";
import { setOpen } from "../Redux/updateReducer";

const schema = yup
  .object({
    name: yup.string().required(),
    age: yup.number().positive().integer().required(),
    contact: yup.number().positive().integer().required(),
    relation: yup.string().required(),

  })
  .required()

export default function AddUpdateFamily(props) {
  const { handleClose, open } = props;
  const isEdit = useSelector((state) => state.Update.isEdit);
  const objFamily = useSelector((state) => state.Update.objFamily);
  const ListOfFamily = useSelector((family) => family.Update.ListOfFamily);

  console.log(isEdit)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: isEdit && objFamily
  })

  const [data, setData] = useState([]);

  const onSubmitData = async (data) => {

    if (isEdit === true) {
      await axios.post(`http://localhost:5000/api/editfamily/${objFamily._id}`, data);
    } else {
      await axios.post("http://localhost:5000/api/addfamily", data);
      await axios.get("http://localhost:5000/api/getfamily");
    }
    handleClose();
  }


  const getUser = async () => {
    const responseget = await axios.get(
      "http://localhost:5000/api/getfamily"
    );
    setData(responseget?.data.data);
    console.log(objFamily);
    console.log("Edit :- ", isEdit);
  };

  useEffect(() => {
    getUser();
  }, []);


  return (
    <>
      <div>
        <React.Fragment>
          <Dialog
            className="bg-Primary"
            open={open}
            onClose={handleClose}
          >
            <DialogTitle>Family Form Data input</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Enter your Family details and proper relation
              </DialogContentText>
              <form onSubmit={handleSubmit(onSubmitData)}>
                <TextField
                  {...register("name")}
                  label="Name"
                  type="text"
                  fullWidth
                  error={errors.name ? true : false}
                  helperText={errors.name ? errors.name.message : ""}
                  variant="standard"
                />

                <TextField
                  {...register("age")}
                  label="Age"
                  type="number"
                  error={errors.age ? true : false}
                  helperText={errors.age ? errors.age.message : ""}
                  fullWidth
                  variant="standard"
                />

                <TextField
                  {...register("contact")}
                  label="Contactno"
                  fullWidth
                  type="number"
                  error={errors.contact ? true : false}
                  helperText={errors.contact ? errors.contact.message : ""}
                  variant="standard"
                />

                <TextField
                  {...register("relation")}
                  label="Relation"
                  type="text"
                  error={errors.relation ? true : false}
                  helperText={errors.relation ? errors.relation.message : ""}
                  fullWidth
                  variant="standard"
                />
                <DialogActions>
                  <Button
                    onClick={handleClose}
                  >Cancel</Button>
                  <Button type="submit">
                    Submit
                  </Button>
                </DialogActions>
              </form>
            </DialogContent>
          </Dialog>
        </React.Fragment>
      </div>
    </ >
  )
}