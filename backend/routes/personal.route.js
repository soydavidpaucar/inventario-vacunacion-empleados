let express = require('express'),
	router = express.Router();

// Student Model
let personalSchema = require('../models/Personal');

// CREATE Student
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

// READ Students
router.get('/', (req, res, next) => {
	personalSchema.find((error, data) => {
		if (error) {
			return next(error);
		} else {
			res.json(data);
		}
	});
});

// UPDATE student
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

	// Update Student Data
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

// Delete Student
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
