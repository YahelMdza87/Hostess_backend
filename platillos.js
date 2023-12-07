const express = require('express')
const router = express.Router() 
const Platillo = require('./platillo');


  router.get('/', async (req, res) => {
      try {
        const platillos = await Platillo.find();
        res.json(platillos);
      } catch (error) {
        console.error('Error al obtener platillos:', error);
        res.status(500).send('Error interno del servidor');
      }
    });

  router.get('/:id', async (req, res) => {
    const idPlatillo = req.params.id;
    try {
      const platillo = await Platillo.findById(idPlatillo);
      res.json(platillo);
    } catch (error) {
      console.error('Error al obtener platillos:', error);
      res.status(500).send('Error interno del servidor');
    }
  });


  router.post('/', async (req, res) => {
    const nuevoPlatillo = req.body;
  
    try {
      const platilloCreado = await Platillo.create(nuevoPlatillo);
      res.json({ mensaje: 'Platillo creado exitosamente', platillo: platilloCreado });
    } catch (error) {
      console.error('Error al insertar el platillo:', error);
      res.status(500).send('Error interno del servidor');
    }
  });


router.patch('/:id', async (req, res) => {
  const idPlatillo = req.params.id;
  const datosActualizados = req.body;

  try {
    const platilloActualizado = await Platillo.findByIdAndUpdate(idPlatillo, datosActualizados, { new: true });
    res.json({ mensaje: 'Platillo actualizado exitosamente', platillo: platilloActualizado });
  } catch (error) {
    console.error('Error al actualizar el platillo:', error);
    res.status(500).send('Error interno del servidor');
  }
});

router.delete('/:id', async (req, res) => {
  const idPlatillo = req.params.id;

  try {
      const platilloEliminado = await Platillo.findByIdAndDelete(idPlatillo);
      if (!platilloEliminado) {
          res.status(404).json({ mensaje: 'Platillo no encontrado'});
          return;
      }

      res.json({ mensaje: 'Platillo eliminado exitosamente', platillo: platilloEliminado });
  } catch (error) {
      console.error('Error al eliminar platillo:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});




module.exports = router;