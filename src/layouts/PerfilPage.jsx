import React, { useContext, useEffect, useState } from 'react';
import './styles.css'
import axios from 'axios';
import NavbarUsuarios from '../components/NavbarUsuarios';
import ModalCrear from '../components/ModalCrear';
import { UsuariosContext } from '../contexts/usuarios';

const PerfilPage = () => {

    const URL = "http://localhost:3000/perfil/publicaciones";

    const [publicaciones, setPublicaciones] = useState([]);
    
    const { validacionSesion } = useContext(UsuariosContext);

    useEffect(()=>{
        validacionSesion();
        verPublicaciones();
    },[]);

    const verPublicaciones = async()=>{
        const respuesta = await axios.get(URL);
        setPublicaciones(respuesta.data);
    }

    return (
        <div>
            <NavbarUsuarios></NavbarUsuarios>
            
            <div className='container-fluid mt-2 text-end'>
                <button className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#staticBackdrop">Crear Publicacion</button>
            </div>

            <div className='contenedor'>
            {publicaciones.map((publicacion)=>(
                <div key={publicacion._id} className="card">
                <img src={publicacion.urlImgPubllicacion} className="card-img-top img-publicacion" alt={publicacion.nombreusuario}></img>
                <div className="card-body">
                    <h5 className="card-title">{publicacion.nombreusuario}</h5>
                    <p className="card-text">{publicacion.descripcion}</p>
                    <a href="#" className="btn btn-primary">Comentar</a>
                </div>
                </div>
            ))}
            </div>
            <ModalCrear></ModalCrear>
        </div>
    );
}

export default PerfilPage;
