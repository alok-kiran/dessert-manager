import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import Desserts from './components/Desserts'
import './App.css'
import { Button, Form } from 'react-bootstrap'
import { Pie } from 'react-chartjs-2'
import { Chart, Tooltip, Title, ArcElement, Legend } from 'chart.js'
import { v4 as uuidv4 } from 'uuid';
var randomColor = require('randomcolor');
Chart.register(Tooltip, Title, ArcElement, Legend)

const DessertForm = ({ addEntryToDessertList }) => {
  const [values, setValues] = useState({
    dessertName: '',
    amount: "",
  })

  const [errors, setErrors] = useState({})

  const reset = () => {
    setValues({
      dessertName: '',
      amount: "",
    })
  }


  const validate = (values) =>{
    const { dessertName, amount } = values
    let errors = {};
    let isValid = true;

    if (dessertName === "") {
      isValid = false;
      errors["dessertName"] = "Please enter dessertName.";
    }

    if (amount === "" || amount <= 0) {
      isValid = false;
      errors["amount"] = "Please enter a valid amount";
    }

    setErrors(errors)
    return isValid;
}

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(values)
    const valid = validate(values)
    if(!valid){
      return false
    }else{
      addEntryToDessertList({ ...values, color: randomColor(), id: uuidv4() })
      reset();
    }
  }

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  return (
    <div style={{ width: '50%' }} className="container">
      <div className="container">
      <h3 className="PortalHeader">Dessert Management Portal</h3>
      </div>
      <Form>
        <Form.Group>
          <Form.Label className="Fields">Dessert Name</Form.Label>
          <Form.Control
            name='dessertName'
            type='text'
            required
            onChange={handleChange}
            value={values.dessertName} />
        </Form.Group>
        <div className="text-danger">{errors.dessertName}</div>
        <br />
        <Form.Group>
          <Form.Label className="Fields">Amount</Form.Label>
          <Form.Control
            name='amount'
            type='number'
            required
            min={1}
            onChange={handleChange}
            value={values.amount} />
        </Form.Group>
        <div className="text-danger">{errors.amount}</div>
        <br />
        <Button variant="primary" onClick={handleSubmit}>Add Dessert</Button>
      </Form>
    </div>
  )
}


const App = () => {
  const [desserts, setDesserts] = useState([]);
  const data = {
    labels: desserts.map(i => i.dessertName),
    datasets: [
      {
        label: 'Desserts and their amount',
        data: desserts.map(i => i.amount),
        backgroundColor: desserts.map(i => i.color),
        borderWidth: 2,
      },
    ],
  };

  const addEntryToDessertList = (d) => {
    setDesserts([...desserts, d])
  }

  const handleDeleteDessert = (id) => {
    setDesserts(desserts.filter(d => d.id !== id))
  }

  return (
    <div className="App">
      <DessertForm addEntryToDessertList={addEntryToDessertList} />
      {desserts && desserts.length > 0 && <Desserts desserts={desserts} handleDeleteDessert={handleDeleteDessert} />}
      <br />
      <br />
      {desserts && desserts.length > 0 && <div className="container Piechart">
        <Pie data={data} />
      </div>}
    </div>
  );
}

export default App;
