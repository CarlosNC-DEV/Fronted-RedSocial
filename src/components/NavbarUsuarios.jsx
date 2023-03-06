import React, {useContext} from 'react';
import { UsuariosContext } from '../contexts/usuarios';

const NavbarUsuarios = () => {

    const { cerrarSesion } = useContext(UsuariosContext);

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">RedSocial</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#" data-bs-toggle="modal" data-bs-target="#exampleModal">Tops</a>
                    </li>
                    <li className="nav-item dropdown ">
                    <a className="nav-link active dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Mi perfil
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end">
                        <li><a className="dropdown-item" href="#">Ver mi perfil</a></li>
                        <li><a className="dropdown-item" href="#" onClick={()=> cerrarSesion()}>Cerrar Sesion</a></li>
                    </ul>
                    </li>
                </ul>
                </div>
            </div>
            </nav>
        </>
    );
}

export default NavbarUsuarios;
