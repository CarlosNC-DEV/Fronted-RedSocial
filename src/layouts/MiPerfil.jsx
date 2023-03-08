import React, { useContext, useEffect, useState } from 'react';
import ModalActualizar from '../components/ModalActualizar';
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'
import NavbarUsuarios from '../components/NavbarUsuarios';
import { UsuariosContext } from '../contexts/usuarios';
import axios from 'axios';

const MiPerfil = () => {

    const { idP, usuario, correo, validacionSesion } = useContext(UsuariosContext);

    const URL = `http://localhost:3000/perfil/user`;
    
    const [ publicacion, setPublicacion] = useState([]);

    const [id, setId] = useState('');
    const [url, setUrl] = useState('');
    const [descripcion, setDescripcion] = useState('');

    useEffect(()=>{
        misPublicaciones();
        validacionSesion();
    },[idP]);

    const misPublicaciones = async ()=>{
        try {
            const respuesta = await axios.get(`${URL}/${idP}`);
            setPublicacion(respuesta.data);
        } catch (error) {
            
        }
    }
    
    const eliminarPublicacion = async(idImg)=>{
        try {
            Swal.fire({
                title: '¿Estas seguro/a?',
                text: "Si eliminas tu publicación no abra vuelta atras!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, Eliminar Publicación!'
              }).then(async(result) => {
                if (result.isConfirmed) {
                    const respuesta = await axios.delete(`${URL}/${idImg}`);
                    Swal.fire({
                        icon: 'success',
                        title: `${respuesta.data}`,
                        showConfirmButton: false,
                        timer: 1500}).then(()=>{
                            window.location.href = '/perfil/usuario'
                    });
                }
              })
        } catch (error) {
            if(error.respuesta.status === 400)
            Swal.fire({
                icon: 'error',
                title: `${error.respuesta.data}`,
                showConfirmButton: false,
                timer: 1500}).then(()=>{
                    window.location.href = '/perfil/usuario'
            });
        }
    }

    const openModal = async(id, url, descripcion)=>{
        setId(id);
        setUrl(url);
        setDescripcion(descripcion);
    };

    return (
        <div>
            <NavbarUsuarios></NavbarUsuarios>
            <h1>{usuario}</h1>
            <p>{correo}</p>
            <div className='contenedor'>
            {publicacion.map((publicacion)=>(
                <div key={publicacion._id} className="card">
                <div className='bg-secondary'>
                    <button className='btn btn-warning m-2' data-bs-toggle="modal" data-bs-target="#staticBackdropActu" onClick={()=> openModal(publicacion._id, publicacion.urlImgPubllicacion, publicacion.descripcion)}>Actualizar publicación</button>
                    <button className='btn btn-danger m-2' onClick={()=> eliminarPublicacion(publicacion._id)}>Eliminar publicación</button>
                </div>
                <img src={publicacion.urlImgPubllicacion} className="card-img-top img-publicacion" alt={publicacion.nombreusuario}></img>
                <div className="card-body">
                    <h5 className="card-title">{publicacion.nombreusuario}</h5>
                    <p className="card-text">{publicacion.descripcion}</p>
                </div>
                </div>
            ))}
            </div>
            <ModalActualizar data={{id: id, url: url, descripcion:descripcion}}></ModalActualizar>
        </div>
    );
}

export default MiPerfil;
