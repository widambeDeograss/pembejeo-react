import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Divider, Typography,Box, Button } from '@mui/material';
import { selectCurrentToken } from "../redux/features/authSlice";
import { selectCurrentStation } from "../redux/features/authSlice";
import { useSelector } from 'react-redux';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';


export default function SuppliersDashbord() {
  const [station_data, setData] = React.useState()
  const station = useSelector(selectCurrentStation);
  const token = useSelector(selectCurrentToken);
  const [open, setOpen] = React.useState(false);
  console.log(station);

 
  React.useEffect( () => {
    async function getDocuments(){
       await fetch(`http://192.168.1.79:8000/station_order/${station.id}`,{
                method:'GET',
                headers:{"content-type":"application/json",
                    "Authorization": `Bearer ${token}`}
            }
        ).then((res) => res.json())
            .then((data) => {
              setData(data.orders)
                console.log(data)
            })
    }
    getDocuments()

    }, []
);

const handleChangeStatus = async (oder_id) => {
  await fetch(`http://192.168.1.79:8000/change_status`,{
    method:'POST',
    headers:{"content-type":"application/json",
        "Authorization": `Bearer ${token}`},
    body:JSON.stringify({
      "order_id":oder_id
    })
}
).then((res) => res.json())
.then((data) => {
    console.log(data)
})

}
  return (
    <Box>
      <Typography sx={{paddingBottom:"10px"}}>Suppliers Dashbord</Typography>
      <Divider/>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
            <TableCell></TableCell>
              <TableCell>station name</TableCell>
              <TableCell>oder key</TableCell>
              <TableCell>oder status</TableCell>

              <TableCell >Change oder status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {station_data?.map((oder) => (
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
                {station.name}
              </TableCell>
              <TableCell>{oder.order_key}</TableCell>
              {/* <TableCell>{oder.station_code}</TableCell> */}
              <TableCell >{oder.state}</TableCell>
              <TableCell >
                <Button sx={{backgroundColor:"green", color:"white"}}
                onClick={() => {
                  handleChangeStatus(oder.order_key)
                }}
                > <strong>Change oder state</strong> </Button>
              </TableCell>
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
    </Box>
  );
}
