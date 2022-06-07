import { Route, BrowserRouter as Router, Routes, Link } from 'react-router-dom';
import ListUsers from './pages/ListUsers';
import Login from './pages/Login';
import RegisterUser from './pages/RegisterUser';

function App() {
	return (
		<div className="bg-[#0a192f] h-screen">
			<Router>
				<nav className="bg-[#112240]/30 flex w-full items-center fixed h-[72px] font-thin justify-end space-x-6 mr-3 text-white">
					<Link to="/" className="hover:text-[#64ffda] transition-all">
						Iniciar Sesion
					</Link>
					<Link
						to="/crear-empleado"
						className="hover:text-[#64ffda] transition-all">
						Crear Empleado
					</Link>
					<Link
						to="/listado-empleados"
						className="hover:text-[#64ffda] transition-all pr-6">
						Listado de Empleados
					</Link>
				</nav>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/crear-empleado" element={<RegisterUser />} />
					<Route path="/listado-empleados" element={<ListUsers />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
