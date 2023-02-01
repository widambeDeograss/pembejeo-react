import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Divider, Typography, Box } from '@mui/material';
import { useFarmerOdersMutation } from '../redux/features/oderSlce';
import { selectCurrentToken } from "../redux/features/authSlice";
import { selectCurrentUser } from "../redux/features/authSlice";
import { useSelector } from 'react-redux';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';


export default function FamersDashboard() {
  const [oders, setOders] = React.useState([]);
  const [station_data, setData] = React.useState()
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);
  const [open, setOpen] = React.useState(false);
  // console.log(station);
   console.log(oders);
  React.useEffect(() => {

    async function getoders() {
      await fetch(`http://192.168.1.79:8000/my_order/${user.id}`, {
        method: 'GET',
        headers: {
          "content-type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      }
      ).then((res) => res.json())
        .then((data) => {
          setOders(data.orders)
          // console.log(data)
        })
    }
    getoders()

  }, [])
  return (
    <Box>
      <Typography sx={{ paddingBottom: "10px" }}>FamersDashboard</Typography>
      <Divider />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
            <TableCell></TableCell>
              <TableCell>station name</TableCell>
              <TableCell>oder key</TableCell>
              {/* <TableCell align="right">supplier Phone</TableCell> */}
              <TableCell >oder Coast</TableCell>
              <TableCell >oder status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {oders?.map((oder) => (
            <TableRow key={oder.order_key}>
               <TableCell>
                <IconButton
                  aria-label="expand row"
                  size="small"
                  onClick={() => setOpen(!open)}
                >
                  {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
              </TableCell>
              <TableCell component="th" scope="row">
                {oder.station_name}
              </TableCell>
              <TableCell>{oder.order_key}</TableCell>
              <TableCell>{oder.station_code}</TableCell>
              <TableCell align="right">{oder.state}</TableCell>
              <br/>
              <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <Box sx={{ margin: 1 }}>
                    <Typography variant="h6" gutterBottom component="div">
                      oder details
                    </Typography>
                    <Table size="small" aria-label="purchases">
                      <TableHead>
                        <TableRow>
                          <TableCell>fertilizer</TableCell>
                          <TableCell>idadi ya mifuko</TableCell>
                          <TableCell>Total price ($)</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {oder.order_items?.map((item) => (
                          <TableRow key={item.fertilizer}>
                            <TableCell>{item.fertilizer}</TableCell>
                            <TableCell component="th" scope="row">
                              {item.quantity}
                            </TableCell>
                            <TableCell>{item.buying_price}</TableCell>
      
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Box>
                </Collapse>
              </TableCell>
            </TableRow>

          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box >
  );
}

// <React.Fragment>
//   <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
//     <TableCell>
//       <IconButton
//         aria-label="expand row"
//         size="small"
//         onClick={() => setOpen(!open)}
//       >
//         {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
//       </IconButton>
//     </TableCell>
//     <TableCell component="th" scope="row">
//       {row.name}
//     </TableCell>
//     <TableCell align="right">{row.calories}</TableCell>
//     <TableCell align="right">{row.fat}</TableCell>
//     <TableCell align="right">{row.carbs}</TableCell>
//     <TableCell align="right">{row.protein}</TableCell>
//   </TableRow>
//   <TableRow>
//     <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
//       <Collapse in={open} timeout="auto" unmountOnExit>
//         <Box sx={{ margin: 1 }}>
//           <Typography variant="h6" gutterBottom component="div">
//             History
//           </Typography>
//           <Table size="small" aria-label="purchases">
//             <TableHead>
//               <TableRow>
//                 <TableCell>Date</TableCell>
//                 <TableCell>Customer</TableCell>
//                 <TableCell align="right">Amount</TableCell>
//                 <TableCell align="right">Total price ($)</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {row.history.map((historyRow) => (
//                 <TableRow key={historyRow.date}>
//                   <TableCell component="th" scope="row">
//                     {historyRow.date}
//                   </TableCell>
//                   <TableCell>{historyRow.customerId}</TableCell>
//                   <TableCell align="right">{historyRow.amount}</TableCell>
//                   <TableCell align="right">
//                     {Math.round(historyRow.amount * row.price * 100) / 100}
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </Box>
//       </Collapse>
//     </TableCell>
//   </TableRow>
// </React.Fragment>