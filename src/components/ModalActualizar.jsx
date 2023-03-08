import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'

const ModalActualizar = (datos) => {


    const [id, setId] = useState('');
    const [url, setUrl] = useState('');
    const [descripcion, setDescripcion] = useState('');

    useEffect(()=>{
        setId(datos.data.id);
        setUrl(datos.data.url);
        setDescripcion(datos.data.descripcion);
    },[datos]);

    const URL = `http://localhost:3000/perfil/user/${id}`;

    const actualizarPubli = async()=>{
        try {
            Swal.fire({
                title: '¿Estas seguro/a?',
                text: "Quieres actualizar tu publicación!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, Actualizar Publicación!'
              }).then(async(result) => {
                if (result.isConfirmed) {
                    const respuesta = await axios.put(URL, { descripcion: descripcion });
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
    
    return (
        <>
        <div className="modal fade" id="staticBackdropActu" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="staticBackdropLabel">Actualizar Publicación</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <form>
                        <div className='w-1000 h-50'>
                            <img src={url} style={{height: '300px', width: '100%'}}/>
                        </div>
                        <div className="form-group">
                            <label for="inputDescripcion">Descripción</label>
                            <input type="text" className="form-control" id="inputDescripcion" placeholder="Ingrese una descripción" value={descripcion} onChange={(e)=> setDescripcion(e.target.value)}></input>
                        </div>
                        <button type="button" className="btn btn-primary btn-block mb-3 mt-3 d-flex mx-auto" onClick={()=>actualizarPubli()}>Actualizar</button>
                    </form>
                </div>
                </div>
            </div>
            </div>
        </>
    );
}

export default ModalActualizar;
