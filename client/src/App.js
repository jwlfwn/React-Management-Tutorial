import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import CustomerAdd from './components/CustomerAdd';
import Customer from './components/Customer'
// import Paper from '@mui/material/Paper';
// import Table from '@mui/material/core/Table';
// import TableHead from '@mui/material/core/TableHead';
// import TableBody from '@mui/material/core/TableBody';
// import TableRow from '@mui/material/core/TableRow';
// import TableCell from '@mui/material/core/TableCell';
// import { withStyles } from '@mui/material/core/styles';
import { withStyles } from '@mui/styles';
import { Paper, Table, TableHead, TableBody, TableRow, TableCell } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';

// const styles = theme => ({
//       root: {
//         width: '100%',
//         // marginTop: theme.spacing.unit * 3,
//         overflowX: "auto"
//       },
//       table: {
//         minWidth: 1080
//       }
//     })

class App extends React.Component{
  
  constructor(props){
    super(props);
    this.state = {
      customers: '',
      completed: 0
    }
  }

  stateRefresh = () => {
    this.setState({
      customers: '',
      completed: 0
    });
    this.callApi()
      .then(res => this.setState({customers: res}))
      .catch(err => console.log(err));
  }

  componentDidMount(){
    this.timer = setInterval(this.progress, 20);
    this.callApi()
      .then(res => this.setState({customers: res}))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({completed: completed >= 100 ? 0 : completed + 1});
  }

  render(){
    
    const { classes } = this.props;
    return (
      <div>
        <Paper className="root">
          <Table className="table">
            <TableHead>
              <TableRow>
                <TableCell>번호</TableCell>
                <TableCell>이미지</TableCell>
                <TableCell>이름</TableCell>
                <TableCell>생년월일</TableCell>
                <TableCell>성별</TableCell>
                <TableCell>직업</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.customers ? this.state.customers.map(c => {return (<Customer key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday}  gender={c.gender} job={c.job} />)
              }) :
              <TableRow>
                <TableCell colSpan="6" align="center">
                  <CircularProgress className="progress" variant="determinate" value={this.state.completed}/>
                </TableCell>
              </TableRow>
              }
            </TableBody>
          </Table>
        </Paper>
        <CustomerAdd stateRefresh={this.stateRefresh}/>
      </div>
    );
  }
}

export default App;
