const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let personalSchema = new Schema(
	{
		cedula: {
			type: Number
		},
		nombres: {
			type: String
		},
		apellidos: {
			type: String
		},
		correo: {
			type: String
		},
		username: {
			type: String
		},
		password: {
			type: String
		},
		es_admin: {
			type: Boolean
		},
		esta_vacunado: {
			type: Boolean
		},
		fecha_nacimiento: {
			type: Date
		},
		direccion_domicilio: {
			type: String
		},
		telefono_movil: {
			type: Number
		},
		tipo_vacuna: {
			type: String
		},
		fecha_vacunacion: {
			type: Date
		},
		numero_dosis: {
			type: Number
		}
	},
	{
		collection: 'personal'
	}
);

module.exports = mongoose.model('Personal', personalSchema);
