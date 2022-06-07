import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

const SignInSchema = Yup.object().shape({
	username: Yup.string()
		.required('El usuario es requerido')
		.matches(
			/^[a-zA-ZñÑ0-9\s]+$/,
			'El usuario no debe tener símbolos especiales'
		),
	password: Yup.string().required('La contraseña es requerida')
});

const Login = () => {
	return (
		<div className="h-screen flex items-center justify-center">
			<div className="text-left px-20 py-10 rounded-2xl shadow-lg bg-[#112240]/30 max-w-[378.65px]">
				<h1 className="text-[#ccd6f6] text-[30px] font-bold mb-10">
					Inicio de Sesión
				</h1>
				<Formik
					initialValues={{ username: '', password: '' }}
					onSubmit={(values) => {
						console.log('values', values);
					}}
					validationSchema={SignInSchema}>
					{({ errors, touched }) => (
						<Form className="flex flex-col">
							<label
								htmlFor="username"
								className="text-white text-lg font-normal mb-2">
								Usuario
							</label>
							<Field
								id="username"
								name="username"
								className="bg-transparent outline-none text-[#8892b0] font-thin border rounded-lg py-2 border-transparent transition-all"
								placeholder="Nombre de usuario..."
							/>
							{errors.username && touched.username && (
								<div className="border-red-500 mb-5 text-red-500 text-sm">
									{errors.username}
								</div>
							)}
							<label
								htmlFor="password"
								className="text-white text-lg font-normal mb-2 mt-5">
								Contraseña
							</label>
							<Field
								type="password"
								id="password"
								name="password"
								className="bg-transparent outline-none text-[#8892b0] font-thin border rounded-lg py-2 border-transparent transition-all"
								placeholder="Contraseña..."
							/>
							{errors.password && touched.password && (
								<div className="mb-5 text-red-500 text-sm">
									{errors.password}
								</div>
							)}
							<button
								type="submit"
								className="text-[#64ffda] text-base font-normal border p-2 border-[#64ffda] mt-5 rounded-md outline-none hover:bg-[#64ffda1a] transition-all">
								Ingresar
							</button>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};

export default Login;
