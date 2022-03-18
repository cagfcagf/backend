import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar.js'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {

  const [data, setData] = useState([])
  const [newname, setNewname] = useState([])
  const [newstock, setNewstock] = useState([])

  useEffect(() => {
    const getData = async () => {
      const response = await fetch('http://192.168.0.21:8080/api/productos', { method: 'GET' })
      const data = await response.json()
      setData(data)
    }

    getData()
  }

  )

  const NameChange = (e) => {
    setNewname(e.target.value)
  }

  const StockChange = (e) => {
    setNewstock(e.target.value)
  }

  const EnvioForm = async (e) => {
    await axios({
      method: 'post',
      url: 'http://192.168.0.21:8080/api/productos/',
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      data: {
        name: newname, stock: newstock
      }

    })
  }

  return (
    <>
        <section>
          <input type="text" name="name" onChange={NameChange} />
          <input type="number" name="stock" onChange={StockChange} />
          <input type="button" value="Enviar" onClick={EnvioForm} />
        </section>

       <div>
         {data?.map(({name, stock})=> {
           return <li>{name}:{stock}</li>
         })

         }
       </div>

      
    </>
  )
}

export default App;
