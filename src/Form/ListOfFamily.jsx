import * as React from "react";
// import { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import ModeIcon from "@mui/icons-material/Mode";
import { Button, IconButton } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { dataContext } from "../Context/Context";
import { LstFamily, setIsEdit, setObjFamily, setOpen } from "../Redux/updateReducer";
import AddUpdateFamily from "./AddUpdateFamily";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));


export default function ListOfFamily() {
  const data = useContext(dataContext);
  const dispatch = useDispatch()
  const lstfamily = useSelector((family) => family.Update.ListOfFamily);
  const objFamily = useSelector((state) => state.Update.objFamily);


  const open = useSelector((state) => state.Update.isOpen);

  const handleClose = () => {
    dispatch(setOpen(!open))
    dispatch(setIsEdit(false));
  };


  const deleteUser = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.post(`http://localhost:5000/api/delfamily/${id}`);
        await axios.get("http://localhost:5000/api/getfamily");
        // if (responseget.status === 200) {
        //   props.setData(responseget?.data.data);
        // }
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  };


  const getUser = async () => {
    const responseget = await axios.get(
      "http://localhost:5000/api/getfamily"
    );
    dispatch(LstFamily(responseget.data.data));
  };

  useEffect(() => {
    getUser();
  }, [lstfamily]);

  return (
    <>
      <h1 style={{ "text-align": "center" }}>Family Form</h1>
      <div style={{
        display: "flex",
        justifyContent: "end",
        marginRight: "30px"
      }}>

        <Button variant="contained"
          onClick={() => {
            dispatch(setOpen(true));
          }}
        >
          Add Family
        </Button>
      </div>
      <div style={{
        margin: "30px"
      }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="right">Age</StyledTableCell>
                <StyledTableCell align="right">Contact</StyledTableCell>
                <StyledTableCell align="right">Relation</StyledTableCell>
                <StyledTableCell align="right">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lstfamily && lstfamily?.map((row) => {
                return (
                  <StyledTableRow key={row._id}>
                    <StyledTableCell component="th" scope="row">
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.age}</StyledTableCell>
                    <StyledTableCell align="right">{row.contact}</StyledTableCell>
                    <StyledTableCell align="right">
                      {row.relation}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <IconButton onClick={() => { deleteUser(row._id) }}>
                        <DeleteIcon />
                      </IconButton>
                      <IconButton onClick={() => {
                        dispatch(setOpen(true));
                        dispatch(setIsEdit(true));
                        dispatch(setObjFamily(row));
                        // editData(row._id);
                      }}>
                        <ModeIcon />
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {
        open && <AddUpdateFamily open={open} handleClose={handleClose} />
      }
    </>
  )
}