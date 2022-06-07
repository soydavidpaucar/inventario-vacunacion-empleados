import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { Edit, Trash2 } from 'react-feather';
import styled from 'styled-components';
import tw from 'twin.macro';

const TableHeading = styled.th`
	${tw`text-xl text-[#ccd6f6] border-b-[#64ffda] border-b pb-2`}
`;

const TableData = styled.td`
	${tw`text-base text-[#a8b2d1] pt-5`}
`;

const ListUsers = () => {
	const [empleados, setEmpleados] = useState([]);

	useEffect(() => {
		axios
			.get('http://localhost:4000/personal')
			.then((data) => {
				setEmpleados(data.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<div className="w-2/3 mx-auto pt-[150px]">
			<h1 className="text-center text-4xl text-white">Listado de Empleados</h1>

			<table className="table-auto w-full mt-8 text-center">
				<thead>
					<tr>
						<TableHeading>Nombres</TableHeading>
						<TableHeading>Apellidos</TableHeading>
						<TableHeading>Cédula</TableHeading>
						<TableHeading>Correo</TableHeading>
						<TableHeading>Acciones</TableHeading>
					</tr>
				</thead>
				<tbody>
					{empleados.map((empleado) => {
						return (
							<tr key={empleado._id}>
								<TableData>{empleado.nombres}</TableData>
								<TableData>{empleado.apellidos}</TableData>
								<TableData>{empleado.cedula}</TableData>
								<TableData>{empleado.correo}</TableData>
								<TableData>
									<div className="flex justify-evenly">
										<a className="cursor-pointer">
											<Edit className="hover:text-yellow-300 transition-colors" />
										</a>
										<button type="button" className="cursor-pointer">
											<Trash2 className="hover:text-red-500 transition-colors" />
										</button>
									</div>
								</TableData>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default ListUsers;
