import axios from 'axios';
import { useFormik } from 'formik';
import { useState } from 'react';

import styled from 'styled-components';
import tw from 'twin.macro';
import * as Yup from 'yup';

const FormLabel = styled.label`
	${tw`text-white text-lg font-normal mt-5`}
`;

const FormInput = styled.input`
	${tw`bg-transparent outline-none text-[#8892b0] font-thin border rounded-lg my-1 border-transparent transition-all`}
`;

const FormSubmitButton = styled.button`
	${tw`text-[#64ffda] text-lg font-normal border p-2 border-[#64ffda] mt-5 rounded-md outline-none hover:bg-[#64ffda1a] transition-all`}
`;

/* A validation schema for the form. */
const SignInSchema = Yup.object().shape({
	cedula: Yup.string()
		.typeError('La cédula debe ser un número')
		.required('La cédula es requerida')
		.matches('^[0-9]{10}$', 'La cédula debe tener 10 dígitos'),
	nombres: Yup.string()
		.required('Los nombres son requeridos')
		.matches(
			/^[a-zA-ZñÑ\s]+$/,
			'Los nombres deben tener solo caracteres alfabéticos'
		),
	apellidos: Yup.string()
		.required('Los apellidos son requeridos')
		.matches(
			/^[a-zA-ZñÑ\s]+$/,
			'Los apellidos deben tener solo caracteres alfabéticos'
		),
	correo: Yup.string()
		.required('El email es requerido')
		.email('El correo debe ser válido')
});

const RegisterUser = () => {
	const formik = useFormik({
		initialValues: {
			cedula: '',
			nombres: '',
			apellidos: '',
			correo: ''
		},
		onSubmit: (values) => {
			axios
				.post('http://localhost:4000/personal/crear-empleado', {
					...values,
					username: usuario,
					password: password
				})
				.then((response) => {
					if (response.status === 200) {
						alert('Empleado registrado exitosamente');
					} else {
						Promise.reject();
					}
				})
				.catch((error) => {
					console.log(error);
				});
		},
		validationSchema: SignInSchema
	});

	/**
	 * It generates a username and password based on the first name and last name of the user
	 */
	const generateUsernameAndPassword = () => {
		const firstName = formik.values.nombres.split(' ')[0];
		const secondName = formik.values.apellidos.split(' ')[0];
		const randomNumber = Math.floor(Math.random() * 1000);

		const generatedUsername = `${firstName}${secondName}${randomNumber}`;
		setUsuario(generatedUsername.toLowerCase());

		let chars =
			'0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		let passwordLength = 12;
		let password = '';
		for (let i = 0; i < passwordLength; i++) {
			let randomNumber = Math.floor(Math.random() * chars.length);
			password += chars.substring(randomNumber, randomNumber + 1);
		}

		setPassword(password);
	};

	const [usuario, setUsuario] = useState('');
	const [password, setPassword] = useState('');

	return (
		<div className="h-screen flex items-center justify-center">
			<div className="text-center px-20 py-10 rounded-2xl shadow-lg bg-[#112240]/30">
				<h1 className="text-[#ccd6f6] text-[30px] font-bold mb-5">
					Registrar Empleado
				</h1>
				<form
					className="flex flex-col text-left"
					onSubmit={formik.handleSubmit}>
					<FormLabel htmlFor="cedula">Cédula</FormLabel>
					<FormInput
						id="cedula"
						name="cedula"
						placeholder="Cédula del empleado..."
						onChange={formik.handleChange}
					/>
					{formik.errors.cedula && formik.touched.cedula && (
						<div className="border-red-500 mb-5 text-red-500 text-sm">
							{formik.errors.cedula}
						</div>
					)}
					<FormLabel htmlFor="nombres">Nombres del Empleado</FormLabel>
					<FormInput
						id="nombres"
						name="nombres"
						placeholder="Nombres del empleado..."
						onChange={formik.handleChange}
					/>
					{formik.errors.nombres && formik.touched.nombres && (
						<div className="mb-5 text-red-500 text-sm">
							{formik.errors.nombres}
						</div>
					)}

					<FormLabel htmlFor="apellidos">Apellidos del Empleado</FormLabel>
					<FormInput
						id="apellidos"
						name="apellidos"
						placeholder="Nombres del empleado..."
						onChange={formik.handleChange}
					/>
					{formik.errors.apellidos && formik.touched.apellidos && (
						<div className="mb-5 text-red-500 text-sm">
							{formik.errors.apellidos}
						</div>
					)}

					<FormLabel htmlFor="correo">Correo del Empleado</FormLabel>
					<FormInput
						id="correo"
						name="correo"
						placeholder="Correo del empleado..."
						onChange={formik.handleChange}
					/>
					{formik.errors.correo && formik.touched.correo && (
						<div className="mb-5 text-red-500 text-sm">
							{formik.errors.correo}
						</div>
					)}

					<button
						type="button"
						onClick={generateUsernameAndPassword}
						className="p-1 mt-5 text-[#64ffda] mb-1">
						Generar Accesos
					</button>

					<div className="flex items-center text-white text-sm">
						<label htmlFor="usuario" className="mr-1">
							Usuario:
						</label>
						<FormInput id="usuario" name="usuario" readOnly value={usuario} />
					</div>
					<div className="flex items-center text-white text-sm">
						<label htmlFor="password" className="mr-1">
							Contraseña:
						</label>
						<FormInput
							id="password"
							name="password"
							readOnly
							value={password}
						/>
					</div>
					<FormSubmitButton type="submit">Guardar Empleado</FormSubmitButton>
				</form>
			</div>
		</div>
	);
};

export default RegisterUser;
