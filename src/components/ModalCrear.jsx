import axios from 'axios';
import React, { useState, useContext } from 'react';
import Swal from 'sweetalert2';
import { UsuariosContext } from '../contexts/usuarios';
import './SesionUsuario.css';

const ModalCrear = () => {

    const { id } = useContext(UsuariosContext);

    let URL = `http://localhost:3000/perfil/${id}/publicaciones`;

    const [imagen, setImagen] = useState();
    const [descripcion, setDescripcion] = useState("");

    const crearPublicacion = async()=>{
        try {
            const formData = new FormData()
            formData.append('imgPublicacion', imagen);
            formData.append('descripcion', descripcion);

            // Agrega una alerta de espera
            const loading = Swal.fire({
                title: 'Subiendo Publicacion',
                text: 'Espere un momento por favor...',
                allowOutsideClick: false,
                showConfirmButton: false,
                didOpen: () => {
                Swal.showLoading();
                },
            });

            await axios.post(URL, formData);

            // Cierra la alerta de espera
            loading.close();

            // Agrega una notificación de éxito
            Swal.fire({
            icon: 'success',
            title: 'Imagen subida correctamente',
            showConfirmButton: false,
            timer: 1500}).then(()=>{
                window.location.href = '/perfil'
            });
        } catch (error) {
            console.log(error);

            // Agrega una notificación de error
            Swal.fire({
              icon: 'error',
              title: 'Error al subir la imagen',
              text: 'Por favor, intenta de nuevo',
            });
        }
    }

    return (
        <>
        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">Crear Nueva Publicacion</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <form>
                    <div className="form-group mb-3">
                        <div className="custom-input-file col-md-6 col-sm-6 col-xs-6">
                        <input type="file" id="fichero-tarifas" className="input-file" name='imgPublicacion' onChange={(e)=> setImagen(e.target.files[0])}></input>Subir Imagen...
                        </div>
                    </div>

                    <div className="form-group">
                        <label for="inputDescripcion">Descripción</label>
                        <input type="text" className="form-control" id="inputDescripcion" placeholder="Ingrese una descripción" value={descripcion} onChange={(e)=> setDescripcion(e.target.value)}></input>
                    </div>
                    <button type="button" className="btn btn-primary btn-block mb-3 mt-3 d-flex mx-auto" onClick={()=> crearPublicacion()}>Crear</button>
                </form>
            </div>
            </div>
        </div>
        </div>
        </>
    );
}

export default ModalCrear;
