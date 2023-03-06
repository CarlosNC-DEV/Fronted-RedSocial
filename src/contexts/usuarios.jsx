import React, { createContext, useState } from 'react';
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'
import axios from 'axios';

export const UsuariosContext = createContext();

export const UsuariosContextProvider = (props) => {

    const [id, setId] = useState("");
    const [usuario, setUsuario] = useState("");
    const [correo, setCorreo] = useState("");

    const URL = "http://localhost:3000/profile"

    const validacionSesion = async()=>{
        const JWT = localStorage.getItem("JWT");
        if (!JWT) {
            Swal.fire({
              icon: 'info',
              title: 'Sesión cerrada',
              text: 'Tu sesión ha sido cerrada exitosamente',
              showConfirmButton: false,
              timer: 2000
            }).then(() => {
              window.location.href = '/';
            });
        }
        try {
          const response = await axios.get(URL, {
            headers: {
              Authorization: `Bearer ${JWT}`,
            },
          });
          setId(response.data._id)
          setUsuario(response.data.usuario);
          setCorreo(response.data.correo);
        } catch (error) {
          if(error.response.status === 401){
            // Muestra la alerta de éxito
            Swal.fire({
                icon: 'error',
                title: '¡Ups!',
                text: 'Necesitas Iniciar sesión!',
                showConfirmButton: false,
                timer: 1500}).then(()=>{
                    window.location.href = '/404'
            });
          }
        }
    };

    const cerrarSesion = () => {
        Swal.fire({
            title: '¿Estas seguro/a?',
            text: "Si cierras la sesión tendras de que logearte nuevamente!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, cerrar sesión!'
          }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem("JWT"); 
                Swal.fire({
                    icon: 'success',
                    title: '!Sesión cerrada!',
                    text: '!Vuelve pronto!',
                    showConfirmButton: false,
                    timer: 1500}).then(()=>{
                        window.location.href = '/'
                });
            }
          })
      };   

    return (
        <UsuariosContext.Provider value={{ id, usuario, correo, validacionSesion, cerrarSesion}}>
            {props.children}
        </UsuariosContext.Provider>
    );
}
