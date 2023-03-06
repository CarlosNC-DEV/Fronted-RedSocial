import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'
import './SesionUsuario.css';

const SesionUsuario = () => {

    const URL = "http://localhost:3000/login"
    const URL_NEW = "http://localhost:3000/register"

    const [usuario, setUsuario] = useState("");
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");

    const loginAuch = async()=>{
        try {
            const respuesta = await axios.post(URL, { correo: correo, password: password })
            // Si la respuesta del servidor es un token válido
            if (respuesta.status === 200 && respuesta.data) {
                localStorage.setItem("JWT", respuesta.data);

                // Muestra la alerta de éxito
                Swal.fire({
                    icon: 'success',
                    title: 'Inicio de sesión exitoso',
                    text: '¡Bienvenido!',
                    showConfirmButton: false,
                    timer: 1500}).then(()=>{
                        window.location.href = '/perfil'
                });
            }
        } catch (error) {
            if (error.response.status === 400) {

                Swal.fire({
                    title: 'Error',
                    text: error.response.data,
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
            } else {
                console.log(error);
            }
        }
    }

    const registrarUsuario = async()=>{
        try {
            const respuesta = await axios.post(URL_NEW, {usuario: usuario, correo: correo, password:password});
            
            if(respuesta.status === 200 && respuesta.data){
                // Muestra la alerta de éxito
                Swal.fire({
                    icon: 'success',
                    title: 'Registro Exitoso',
                    text: '¡Bienvenido!',
                    showConfirmButton: false,
                    timer: 1500}).then(()=>{
                        window.location.href = '/perfil'
                });
            }
        } catch (error) {
            if (error.response.status === 400) {

                Swal.fire({
                    title: 'Error',
                    text: error.response.data,
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
            } else {
                console.log(error);
            }
        }
    }

    return (
        <>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Login</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                
                <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
                    <li className="nav-item" role="presentation">
                        <a className="nav-link active" id="tab-login" data-bs-toggle="pill" href="#pills-login" role="tab" aria-controls="pills-login" aria-selected="true">Login</a>
                    </li>
                    <li className="nav-item" role="presentation">
                        <a className="nav-link" id="tab-register" data-bs-toggle="pill" href="#pills-register" role="tab" aria-controls="pills-register" aria-selected="false">Register</a>
                    </li>
                </ul>

                <div className="tab-content">
                <div className="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login">
                    <form>

                    <div className="form-floating mb-3">
                        <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" value={correo} onChange={(e)=> setCorreo(e.target.value)}></input>
                        <label for="floatingInput">Correo Electronico</label>
                    </div>

                    <div className="form-floating">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)}></input>
                        <label for="floatingPassword">Password</label>
                    </div>

                    <button type='button' className="btn btn-primary mb-4 mt-3 d-flex mx-auto" onClick={()=> loginAuch()}>Iniciar sesion</button>

                    </form>
                </div>
                <div className="tab-pane fade" id="pills-register" role="tabpanel" aria-labelledby="tab-register">
                    <form autoComplete='off'>

                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com" value={usuario} onChange={(e)=> setUsuario(e.target.value)}></input>
                        <label for="floatingInput">Usuarios</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" value={correo} onChange={(e)=> setCorreo(e.target.value)}></input>
                        <label for="floatingInput">Correo Electronico</label>
                    </div>
                    
                    <div className="form-floating">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)}></input>
                        <label for="floatingPassword">Password</label>
                    </div>

                    <button type="button" className="btn btn-primary btn-block mb-3 mt-3 d-flex mx-auto" onClick={()=> registrarUsuario()}>Registrate</button>
                    </form>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>

        </>
    );
}

export default SesionUsuario;
