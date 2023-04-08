import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';

const Welcome = () => {
  const [name, setName] = useState();

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:4000/user/${id}`)
      .then(({ data }) => setName(data.nombre))
      .catch((error) => console.log(error))
  }, [id]);

  return (
    <div>
      <h3>{name ? `Welcome ${name}` : 'No tienes acceso'}</h3>
      <h2>{name ? `Puedes hacer lo que quieras` : 'Estas bajo vigilancia'}</h2>
      <div>
        <button onClick={() => navigate('/login')}>LogOut</button>
        <button>Register</button>
      </div>
    </div>
  )
}

export default Welcome