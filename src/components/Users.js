import React from "react";
import axios from "axios";
import { useEffect , useState } from "react";


// const StyledTableCell = withStyles((theme) => ({
//     head: {
//       backgroundColor: theme.palette.common.black,
//       color: theme.palette.common.white,
//     },
//     body: {
//       fontSize: 14,
//     },
// }))(TableCell);
  
// const StyledTableRow = withStyles((theme) => ({
//     root: {
//       '&:nth-of-type(odd)': {
//         backgroundColor: theme.palette.action.hover,
//       },
//     },
// }))(TableRow);

// const useStyles = makeStyles({
//   table: {
//     minWidth: 400,
//   },
// });

const Users = () => {
    const [users , setusers] = useState([]);
    //const classes = useStyles();

    const getUserData = async() =>{
        try{
        const data = await axios.get(
            "http://3.6.93.159:7883/machstatz/get_all_users"
        );
        console.log(data.data);
        setusers(data.data);
        }
        catch (e) {
            console.log(e);
        }
    };

    const deleteUser = async(key) =>{
      try{
        const delData = await axios.delete("http://3.6.93.159:7883/machstatz/delete_existing_user",key,
        {
            method : "DELETE",
            header :{
                'Content-type': 'application/json',
                'mode' : 'no-cors',
                'Access-Control-Allow-Origin' : 'true',
                'Access-Control-Allow-Headers' : 'true'
            },
            crossorigin : true
        });
        console.log("Deleted");
        setusers(delData.data);
      }  
      catch(e){
        console.log(e);
      }

    };

    useEffect(() => {
        getUserData();
        deleteUser();
    }, []);

    return(
        
        <div className = "users">
            {/* <ul>
                
                    <li key = {item.email}>
                        First Name : {item.first_name} | Last Name : {item.last_name} | Email : {item.email}
                    </li>
                    )
                )
                }
            </ul> */}
            {/* <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="right">First Name</StyledTableCell>
                            <StyledTableCell align="right">Last Name</StyledTableCell>
                            <StyledTableCell align="right">Username</StyledTableCell>
                            <StyledTableCell align="right">Email</StyledTableCell>
                            <StyledTableCell align="right"> </StyledTableCell>
                            <StyledTableCell align="right"> </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                            {users.map(item => (
                            <StyledTableRow key={item.email}>
                                <StyledTableCell align="right">{item.fist_name}</StyledTableCell>
                                <StyledTableCell align="right">{item.last_name}</StyledTableCell>
                                <StyledTableCell align="right">{item.username}</StyledTableCell>
                                <StyledTableCell align="right">{item.email}</StyledTableCell>
                                <Button variant="outlined" color="secondary" onClick = { () =>this.deleteUser(item.email)}>DELETE</Button>
                            </StyledTableRow>
                            
                        ))}
                    </TableBody>
                </Table>
            </TableContainer> */}
            
            {users.map(item =>(
            <Modal.Dialog>
                <Modal.Header closeButton key = {item.email}>
                    <Modal.Title>{item.username}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>First name : {item.fist_name}</p>
                    <p>Last name : {item.last_name}</p>
                    <p>Email : {item.email}</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick = { () =>this.deleteUser(key=item.email)} >Delete</Button>
                </Modal.Footer>
            </Modal.Dialog>
            ))}
        </div>

    
         
    
    
    )

}

export default Users