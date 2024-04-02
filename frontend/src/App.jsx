import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import AdminLayout from "./layout/AdminLayout";

import Login from "./paginas/Login/Login";
import ConfirmarCuenta from "./paginas/ConfirmarCuenta";
import OlvidePassword from "./paginas/Login/OlvidePassword";
import Registrar from "./paginas/Login/Registrar";
import NuevoPassword from "./paginas/NuevoPassword";

import AdministrarPacientes from "./paginas/Admin/AdministrarPacientes";
import EditarPerfil from "./paginas/Admin/EditarPerfil";
import CambiarPassword from "./paginas/Admin/CambiarPassword";
import AdminPage from "./paginas/Admin/AdminPage";
import EditarPacientes from "./paginas/Admin/EditarPacientes";

import { AuthProvider } from "./context/AuthProvider";
import { PacientesProvider } from "./context/PacientesProvider";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PacientesProvider>
          <Routes>
            <Route path="/login" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="registrar" element={<Registrar />} />
              <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
              <Route path="olvide-password" element={<OlvidePassword />} />
              <Route
                path="olvide-password/:token"
                element={<NuevoPassword />}
              />
            </Route>

            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminPage />} />
              <Route path="perfil" element={<EditarPerfil />} />
              <Route path="cambiar-contraseña" element={<CambiarPassword />} />
              <Route path="administracion" element={<AdministrarPacientes />} />
              <Route path="editar-paciente/:id" element={<EditarPacientes />} />
            </Route>
          </Routes>
        </PacientesProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
