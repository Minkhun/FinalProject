import React, { Component } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.css';
import httpClient from 'axios'
import {
    Button,ButtonGroup,
    Form,FormGroup,ControlLabel,
    FormControl,
    Checkbox,Radio,Grid,Row,Col,
    Table,Modal
} from 'react-bootstrap';


class App extends Component {
    constructor(){
        super()
    }



    state = {
        name: "",
        address: "",
        cellnum: "",
        best: "",
        toppings: [],
        status: "",
        suggest: "",
        records:[],
        show: false,

        selectedName: "",
        selectedAddress:"",
        selectedCellnum:"",
        selectedBest: "",
        selectedToppings: [],
        selectedStatus: "",
        selectedSuggest:"",
        selectedId:""
    };

    componentDidMount(){

        this.refreshData();
    }



     refreshData=()=>{

         httpClient.get('http://localhost:3004/surveys')
             .then((response)=> {
                 var data =response.data;
                 this.setState({
                     records:data
                 })

             }).catch((error)=> {

             });

     };

    onChange = (fieldName)=> {
        return (event)=> {

            console.log(event.target.value);
            var state = this.state;
            state[fieldName] = event.target.value;
            this.setState(state);
        }
    };

    modalonChange = (fieldName)=> {
        return (event)=> {

            console.log(event.target.value);
            var state = this.state;
            state[fieldName] = event.target.value;
            this.setState(state);
        }
    };


    checkboxChange = (fieldName)=> {
        return (event)=> {
            var targetArray = this.state[fieldName];
            if (targetArray.indexOf(event.target.value) >= 0)
                targetArray.splice(
                    targetArray.indexOf(event.target.value),
                    1
                );
            else
                targetArray.push(event.target.value);

            var state = this.state;
            state[fieldName] = targetArray;
            this.setState(state);
        }
    };


modalcheckboxChange = (fieldName)=> {
        return (event)=> {
            var targetArray = this.state[fieldName];
            if (targetArray.indexOf(event.target.value) >= 0)
                targetArray.splice(
                    targetArray.indexOf(event.target.value),
                    1
                        );
            else
                targetArray.push(event.target.value);

            var state = this.state.selectedToppings;
            state[fieldName] = targetArray;
            this.setState(state.selectedToppings);
        }
    };


    saveSurvey = ()=> {

        var data = {name: this.state.name,
                    address: this.state.address,
                    cellnum: this.state.cellnum,
                    best: this.state.best,
                    toppings: this.state.toppings,
                    status: this.state.status,
                    suggest: this.state.suggest};
        console.log(data);
         delete data.records;

        httpClient.post('http://localhost:3004/surveys',
         data)
            .then((response)=> {
                this.refreshData();
            }).catch((error)=> {

            });
            location.reload();

    };

    deleteItem = (id)=>{

        return ()=>{

            httpClient.delete('http://localhost:3004/surveys/'+ id )
                .then((response)=> {
                    console.log('delete');
                    this.refreshData();
                }).catch((error)=> {

                });

        };
    };

    editItem = (id) =>{
        return ()=> {
            
            httpClient.get('http://localhost:3004/surveys/'+id)
                .then((response)=> {
                    console.log('edit');
                    var data = response.data
                    console.log(response.data);
                    this.setState({
                        name: data.name,
                        address: data.address,
                       
                    })
                }).catch((error)=>{
                    
                });
        };
    };

openModal = (id)=>{

            return ()=>{
                this.setState({
                    show: true
                })

                 httpClient.get('http://localhost:3004/surveys/'+id)
                .then((response)=> {
                    var data = response.data
                    this.setState({
                        selectedName: data.name,
                        selectedAddress: data.address,
                        selectedCellnum: data.cellnum,
                        selectedBest: data.best,
                        selectedToppings: data.toppings,
                        selectedStatus: data.status,
                        selectedSuggest:data.suggest,
                        selectedId: data.id
                    })
                    console.log(this.state.selectedData.name);
                }).catch((error)=>{
                    
                });

            };
        };


        
    saveEdit = (id) =>{


        return () => {
            console.log(data);
            var data = {name: this.state.selectedName,
                    address: this.state.selectedAddress,
                    cellnum: this.state.selectedCellnum,
                    best: this.state.selectedBest,
                    toppings: this.state.selectedToppings,
                    status: this.state.selectdStatus,
                    suggest: this.state.selectedSuggest};
        delete data.records;

            httpClient.patch('http://localhost:3004/surveys/'+id,
            data)
                .then((response)=> {
                    this.refreshData();
                }).catch((error)=> {

                });

            this.setState({
                show: false,
                selectedName: "" ,
                selectedAddress: "" ,
                selectedCellnum: "" ,
                selectedBest: "" ,
                selectedToppings: [] ,
                selectedStatus:"",
                
                selectedSuggest: ""
            });
        }
    };


    render() {

        var rows  = this.state.records.map((item,i)=>{

            return (
                <tr key={i}>
                     <td className="text-center"><Button bsSize="xsmall"  bsStyle="warning" onClick={this.openModal(item.id)}>Edit</Button>
                     <br/>
                     <br/>
                     <Button bsSize="xsmall" bsStyle="danger" onClick={this.deleteItem(item.id)}>Delete</Button>
                     
                        
                     </td>
                     <td>{item.id}</td>
                     <td>{item.name}</td>
                     <td>{item.address}</td>
                     <td>{item.cellnum}</td>
                     <td>{item.best}</td>
                     <td>{item.toppings.map((topping, mi)=>{
                        return <div key={mi}>
                        {topping}
                        </div>
                     })}</td>
                     <td>{item.status}</td>
                     <td>{item.suggest}</td>
                     
                </tr>
          
          
          
            );
        });

let close = () => this.setState({ show: false })

        return (
            <div className="container">
            <h1> {this.state.suway} </h1>
                <div className="page-header">
                   
                    <div className="myAppHeader">
                    PABEBE'S PIZZA HAUZ</div>
                </div>
                
                <div className="jumbotron">
                <Grid>
                        <Row>
                            <Col md={5}>
                                <Form>
                                    <FormGroup>
                                        <ControlLabel>Name</ControlLabel>
                                        <FormControl
                                            type="text"
                                            placeholder="Customer's Name"
                                            value={this.state.name}
                                            onChange={this.onChange('name')}
                                            />
                                        
                                    </FormGroup>
                                    
                                    <FormGroup>
                                        <ControlLabel>Address</ControlLabel>
                                        <FormControl
                                            type="text"
                                            placeholder="Customer's Address"
                                            value={this.state.address}
                                            onChange={this.onChange('address')}
                                            />
                                    </FormGroup>
                                    
                                    <FormGroup>
                                        <ControlLabel>Mobile #</ControlLabel>
                                        <FormControl
                                            type="text"
                                            placeholder="Customer's Mobile #"
                                            value={this.state.cellnum}
                                            onChange={this.onChange('cellnum')}
                                            />
                                    </FormGroup>

                                    <FormGroup>
                                        <ControlLabel>Best Seller</ControlLabel>
                                        <FormControl componentClass="select"
                                                     value={this.state.best}
                                                     onChange={this.onChange('best')}
                                            >
                                            <option value="Pizza Castellana">Pizza Castellana</option>
                                            <option value="Manager's Choice">Manager's Choice</option>
                                            <option value="Augus Steakhouse Pizza">Augus Steakhouse Pizza</option>
                                             <option value="Pabebe's Special">Pabebe's Special</option>
                                              <option value="Hi-Protein Supreme">Hi-Protein Supreme</option>
                                               <option value="Belly Buster">Belly Buster</option>
                                        </FormControl>
                                        
                                    </FormGroup>
                                    <FormGroup>
                                        <ControlLabel>Select Toppings</ControlLabel>
                                     <Table><tr><th><Checkbox value="Ham"
                                                  checked={this.state.toppings.indexOf('Ham')>=0 ? true:false}
                                                  onChange={this.checkboxChange('toppings')}>
                                            Ham
                                        </Checkbox>
                                       <Checkbox value="Grilled Chicken"
                                                  checked={this.state.toppings.indexOf('Grilled Chicken')>=0 ? true:false}
                                                  onChange={this.checkboxChange('toppings')}>
                                            Grilled Chicken
                                        </Checkbox>
                                       <Checkbox value="Pepperoni"
                                                  checked={this.state.toppings.indexOf('Pepperoni')>=0 ? true:false}
                                                  onChange={this.checkboxChange('toppings')}>
                                            Pepperoni
                                        </Checkbox>
                                        </th>
                                       <th> <Checkbox value="Italian Sausage"
                                                  checked={this.state.toppings.indexOf('Italian Sausage')>=0 ? true:false}
                                                  onChange={this.checkboxChange('toppings')}>
                                            Italian Sausage
                                        </Checkbox>
                                       <Checkbox value="Black Olives"
                                                  checked={this.state.toppings.indexOf('Black Olives')>=0 ? true:false}
                                                  onChange={this.checkboxChange('toppings')}>
                                            Black Olives
                                        </Checkbox>
                                       <Checkbox value="White Onions"
                                                  checked={this.state.toppings.indexOf('White Onions')>=0 ? true:false}
                                                  onChange={this.checkboxChange('toppings')}>
                                            White Onions
                                        </Checkbox></th>
                                       <th> <Checkbox value="Green Olives"
                                                  checked={this.state.toppings.indexOf('Green Olives')>=0 ? true:false}
                                                  onChange={this.checkboxChange('toppings')}>
                                            Green Olives
                                        </Checkbox>
                                        <Checkbox value="Mushrooms"
                                                  checked={this.state.toppings.indexOf('Mushrooms')>=0 ? true:false}
                                                  onChange={this.checkboxChange('toppings')}>
                                           Mushrooms
                                        </Checkbox>
                                       <Checkbox value="Pineapple"
                                                  checked={this.state.toppings.indexOf('Pineapple')>=0 ? true:false}
                                                  onChange={this.checkboxChange('toppings')}>
                                            Pineapple
                                        </Checkbox></th></tr></Table>
                                       
                                    </FormGroup>
                                    <FormGroup>
                                        <ControlLabel>Status </ControlLabel>
                         <Table><tr><th>     <Radio name="status" value="pick-up"
                                               onChange={this.onChange('status')}>Pick-Up</Radio></th>
                                       <th> <Radio name="status" value="deliver"
                                               onChange={this.onChange('status')}>Deliver</Radio></th></tr></Table>
                                    </FormGroup>
                                    <FormGroup>
                                            <ControlLabel>Suggestion</ControlLabel>
                                        <textarea
                                            type="textarea"
                                            placeholder="Share your thoughts!"
                                            value={this.state.suggest}
                                            onChange={this.onChange('suggest')}
                                            cols="60"
                                            rows="4"
                                                />
                                    </FormGroup>
                                    <ButtonGroup vertical block>
                                        <Button bsStyle="primary" bsSize="large" onClick={this.saveSurvey} block>Submit</Button>

                                    </ButtonGroup>

                                </Form>
                            </Col>
                           
                             <div className="myTitle">
                          Customer Info </div>
                            <Col md={4}>
                          
                                <Table condensed striped bordered hover>
                                
                                    <thead>
                                    <tr>
                                        <th>Action</th>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Address</th>
                                        <th>Mobile</th>
                                        <th>Best Seller</th>
                                        <th>Toppings</th>
                                        <th>Status</th>
                                        <th>Suggestions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {rows}
                                    </tbody>
                                </Table>
                                    </Col>
                                
 
                  
                
                                
                                <div className="modal-container" style={{height: 200}}>
                    <Modal
                    show={this.state.show}
                    onHide={close}
                    container={this}
                    aria-labelledby="contained-modal-title"
                    >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">Pabebe's Pizza Hauz</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                   
                    <Form>
                
                             <FormGroup>
                                        <ControlLabel>Name</ControlLabel>
                                        <FormControl
                                            type="text"
                                            placeholder="Customer's Name"
                                            value={this.state.selectedName}
                                            onChange={this.modalonChange('selectedName')}
                                            />
                                        
                                    </FormGroup>
                                    
                                    <FormGroup>
                                        <ControlLabel>Address</ControlLabel>
                                        <FormControl
                                            type="text"
                                            placeholder="Customer's Address"
                                            value={this.state.selectedAddress}
                                            onChange={this.modalonChange('selectedAddress')}
                                            />
                                    </FormGroup>
                                    
                                    <FormGroup>
                                        <ControlLabel>Mobile #</ControlLabel>
                                        <FormControl
                                            type="text"
                                            placeholder="Customer's Mobile #"
                                            value={this.state.selectedCellnum}
                                            onChange={this.modalonChange('selectedCellnum')}
                                            />
                                    </FormGroup>

                                    <FormGroup>
                                        <ControlLabel>Best Seller</ControlLabel>
                                        <FormControl componentClass="select"
                                                     value={this.state.selectedBest}
                                                     onChange={this.modalonChange('selectedBest')}
                                            >
                                            <option value="Pizza Castellana">Pizza Castellana</option>
                                            <option value="Manager's Choice">Manager's Choice</option>
                                            <option value="Augus Steakhouse Pizza">Augus Steakhouse Pizza</option>
                                             <option value="Pabebe's Special">Pabebe's Special</option>
                                              <option value="Hi-Protein Supreme">Hi-Protein Supreme</option>
                                               <option value="Belly Buster">Belly Buster</option>
                                        </FormControl>
                                        
                                    </FormGroup>
                                    <FormGroup>
                                        <ControlLabel>Select Toppings</ControlLabel>
                                     <Table><tr><th><Checkbox value="Ham"
                                                  checked={this.state.selectedToppings.indexOf('Ham')>=0 ? true:false}
                                                  onChange={this.modalcheckboxChange('selectedToppings')}>
                                            Ham
                                        </Checkbox>
                                       <Checkbox value="Grilled Chicken"
                                                  checked={this.state.selectedToppings.indexOf('Grilled Chicken')>=0 ? true:false}
                                                  onChange={this.modalcheckboxChange('selectedToppings')}>
                                            Grilled Chicken
                                        </Checkbox>
                                       <Checkbox value="Pepperoni"
                                                  checked={this.state.selectedToppings.indexOf('Pepperoni')>=0 ? true:false}
                                                  onChange={this.modalcheckboxChange('selectedToppings')}>
                                            Pepperoni
                                        </Checkbox>
                                        </th>
                                       <th> <Checkbox value="Italian Sausage"
                                                  checked={this.state.selectedToppings.indexOf('Italian Sausage')>=0 ? true:false}
                                                  onChange={this.modalcheckboxChange('selectedToppings')}>
                                            Italian Sausage
                                        </Checkbox>
                                       <Checkbox value="Black Olives"
                                                  checked={this.state.selectedToppings.indexOf('Black Olives')>=0 ? true:false}
                                                  onChange={this.modalcheckboxChange('selectedToppings')}>
                                            Black Olives
                                        </Checkbox>
                                       <Checkbox value="White Onions"
                                                  checked={this.state.selectedToppings.indexOf('White Onions')>=0 ? true:false}
                                                  onChange={this.modalcheckboxChange('selectedToppings')}>
                                            White Onions
                                        </Checkbox></th>
                                       <th> <Checkbox value="Green Olives"
                                                  checked={this.state.selectedToppings.indexOf('Green Olives')>=0 ? true:false}
                                                  onChange={this.modalcheckboxChange('selectedToppings')}>
                                            Green Olives
                                        </Checkbox>
                                        <Checkbox value="Mushrooms"
                                                  checked={this.state.selectedToppings.indexOf('Mushrooms')>=0 ? true:false}
                                                  onChange={this.modalcheckboxChange('selectedToppings')}>
                                           Mushrooms
                                        </Checkbox>
                                       <Checkbox value="Pineapple"
                                                  checked={this.state.selectedToppings.indexOf('Pineapple')>=0 ? true:false}
                                                  onChange={this.modalcheckboxChange('selectedToppings')}>
                                            Pineapple
                                        </Checkbox></th></tr></Table>
                                       
                                    </FormGroup>
                                    <FormGroup>
                                        <ControlLabel>Status </ControlLabel>
                         <Table><tr><th>     <Radio name="status" value="pick-up"
                                               onChange={this.modalonChange('selectedStatus')}>Pick-Up</Radio></th>
                                       <th> <Radio name="status" value="deliver"
                                               onChange={this.modalonChange('selectedStatus')}>Deliver</Radio></th></tr></Table>
                                    </FormGroup>
                                    <FormGroup>
                                            <ControlLabel>Suggestion</ControlLabel>
                                        <textarea
                                            type="textarea"
                                            placeholder="Share your thoughts!"
                                            value={this.state.selectedSuggest}
                                            onChange={this.modalonChange('selectedSuggest')}
                                            cols="60"
                                            rows="4"
                                                />
                                    </FormGroup>
                                    <ButtonGroup vertical block>
                                        <Button bsStyle="primary" bsSize="large" onClick={this.saveEdit(this.state.selectedId)} block>Submit</Button>

                                    </ButtonGroup>

                                </Form>
                                </Modal.Body>
                        </Modal>
                 

</div>                
  </Row>
                    </Grid>
                      
                </div>            
            </div>
        );
    }
}

export default App;
