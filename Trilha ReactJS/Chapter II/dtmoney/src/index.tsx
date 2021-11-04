import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { createServer, Model } from 'miragejs'

createServer({

  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Freelancer',
          type: 'deposit',
          category: 'Dev',
          amount: 3000,
          createdAt: new Date('2021-11-01 08:33:00')
        },
        {
          id: 2,
          title: 'Peças PC',
          type: 'withdraw',
          category: 'Investimento',
          amount: 6000,
          createdAt: new Date('2021-11-02 08:34:00')
        },
        {
          id: 3,
          title: 'Salario',
          type: 'deposit',
          category: 'Salario',
          amount: 5000,
          createdAt: new Date('2021-11-03 08:35:00')
        },                
      ]
    })
  }
  ,

  routes() {
    this.namespace = 'api'

    this.get('/transactions', () => {
      return this.schema.all('transaction')
    })

    this.post('/transactions', (schema, request) => {

        const data = JSON.parse(request.requestBody)
        return schema.create('transaction', data)
     })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


