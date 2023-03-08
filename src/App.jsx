import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LadingPage from './layouts/LadingPage';
import PerfilPage from './layouts/PerfilPage';
import MiPerfil from './layouts/MiPerfil';
import Error from './layouts/Error';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LadingPage></LadingPage>}></Route>
        <Route path='/perfil' element={<PerfilPage></PerfilPage>}></Route>
        <Route path={'/perfil/usuario'} element={<MiPerfil></MiPerfil>}></Route>
        <Route path='/404' element={<Error></Error>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
