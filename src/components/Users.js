
import axios from "axios";
import { useEffect , useState } from "react";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

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
    // const deleteUser = useCallback(() => {
    //     const delData = axios.delete("http://3.6.93.159:7883/machstatz/delete_existing_user/",users,
    //     {
    //         method : "DELETE",
    //         header :{
    //             'Content-type': 'application/json',
    //             'mode' : 'no-cors',
    //             'Access-Control-Allow-Origin' : 'true',
    //             'Access-Control-Allow-Headers' : 'true'
    //         },
    //         crossorigin : true
    //     })
    //     .then(() => {
    //         console.log("Deleted");
    //         setusers(delData.data);
    //     })
    // })

    useEffect(() => {
        getUserData();
    }, []);

    // useEffect(() => {
    //     deleteUser();
    // }, [deleteUser]);

    return(
        
        <div>
            <Table striped bordered hover variant="dark" className="table">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                        <th>Email</th>
                    </tr>
                </thead>
                {users.map(item => (  
                    <tbody>
                        <tr key={item.email}>
                            <td>{item.fist_name}</td>
                            <td>{item.last_name}</td>
                            <td>{item.username}</td>
                            <td>{item.email}</td> 
                        </tr>
                        <Button variant="danger" onClick = { () =>this.deleteUser(item.email)}>Delete</Button>
                    </tbody>
                ))}
            </Table>
        </div>
    );
            
}

export default Users