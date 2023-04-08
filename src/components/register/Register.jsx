import React, { useState } from 'react';
import { useNavigate } from 'react-router';
/* import styles from '../styles.module.scss'; */
import './Register.css'
import axios from 'axios';

const Register = () => {

  const [inputs, setInputs] = useState({
    correo: '',
    nombre: '',
    contraseña: ''
  });
  const [mensaje, setMensaje] = useState();
  const [loading, setLoading] = useState(false);

  const { correo, nombre, contraseña } = inputs;

  const onChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (nombre !== '' && correo !== '' && contraseña !== '') {
      const usuario = {
        nombre,
        correo,
        contraseña
      }

      setLoading(true)
      await axios.post('http://localhost:4000/register', usuario)
        .then(({ data }) => {
          setMensaje(data.message);
          //una ves guardado se limpian los inputs
          setInputs({
            correo: '',
            nombre: '',
            contraseña: '',
          });

          setTimeout(() => {
            //se elimina el mensaje
            setMensaje('');
            //se redirecciona a otra ruta
            navigate('/login');
          }, 3000);
        })
        .catch((error) => {
          console.error(error);
          setMensaje()
        })

      setLoading(false);
    }
  }

  const navigate = useNavigate()

  return (
    <>
      <div className='container-form'>
        <h3>Sing Up</h3>
        <h2>Welcome to register!</h2>
        <form action="" onSubmit={(e) => onSubmit(e)}>
          <div className='inputContainer'>
            <label htmlFor="nombre">Nombre</label>
            <div className='left'>
              <input value={nombre} onChange={(e) => onChange(e)} type="text" name="nombre" id="nombre" placeholder='Nombre' autoComplete='off' />
              <label htmlFor="nombre"><i class="fa-regular fa-user"></i></label>
            </div>
          </div>
          {/* Correo */}
          <div className='inputContainer'>
            <label htmlFor="correo">Correo</label>
            <div className='left'>
              <input value={correo} onChange={(e) => onChange(e)} type="email" name="correo" id="correo" placeholder='Correo' autoComplete='off' />
              <label htmlFor="correo"><i class="fa-regular fa-envelope"></i></label>
            </div>
          </div>
          {/* Contraseña */}
          <div className='inputContainer'>
            <label htmlFor="contraseña">Contraseña</label>
            <div className='left'>
              <input value={contraseña} onChange={(e) => onChange(e)} type="password" name="contraseña" id="contraseña" placeholder='Contraseña' autoComplete='off' />
              <label htmlFor="contraseña"><i class="fa-solid fa-key"></i></label>
            </div>
          </div>

          <button type='submit'>
            {loading ? "cargando..." : "Register"}
          </button>
          <p>Ya tinenes una cuenta?
            <b onClick={() => navigate('./login')}> Iniciar Sesion</b>
          </p>
        </form>
      </div>
      {mensaje && <div className='toast'>{mensaje}</div>}
    </>
  )
}

export default Register