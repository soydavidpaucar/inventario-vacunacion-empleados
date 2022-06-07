let express = require('express'),
	router = express.Router();

// Personal Model
let personalSchema = require('../models/Personal');

// CREATE Personal
router.post('/crear-empleado', (req, res, next) => {
	personalSchema.create(req.body, (error, data) => {
		if (error) {
			return next(error);
		} else {
			console.log(data);
			res.json(data);
		}
	});
});

// READ Personal
router.get('/', (req, res, next) => {
	personalSchema.find((error, data) => {
		if (error) {
			return next(error);
		} else {
			res.json(data);
		}
	});
});

// UPDATE Personal
router
	.route('/actualizar-empleado/:id')
	// Get Single Student
	.get((req, res, next) => {
		personalSchema.findById(req.params.id, (error, data) => {
			if (error) {
				return next(error);
			} else {
				res.json(data);
			}
		});
	})

	// Update Personal Data
	.put((req, res, next) => {
		personalSchema.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body
			},
			(error, data) => {
				if (error) {
					return next(error);
				} else {
					res.json(data);
					console.log('Empleado actualizado correctamente!');
				}
			}
		);
	});

// Delete Personal
router.delete('/eliminar-empleado/:id', (req, res, next) => {
	personalSchema.findByIdAndRemove(req.params.id, (error, data) => {
		if (error) {
			return next(error);
		} else {
			res.status(200).json({
				msg: data
			});
		}
	});
});

module.exports = router;
