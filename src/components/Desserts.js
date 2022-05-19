import React from 'react'

const Desserts = ({ desserts, handleDeleteDessert }) => {
    return (
      <div className="container">
        <div className="py-4">
          <table className="table border shadow table-striped">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Dessert Name</th>
                <th scope="col">Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {desserts && desserts.map((dessert, index) => (
                <tr key={dessert.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{dessert.dessertName}</td>
                  <td>{dessert.amount}</td>
                  <td>
                    <button
                    className="btn btn-danger"
                      onClick={() => handleDeleteDessert(dessert.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
}


export default Desserts