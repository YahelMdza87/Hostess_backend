SELECT bcarr.Id_carrito, bcarr.Productos_Id_producto, prod.Nombre, prod.Precio_producto, prod.imagen, bcarr.Cantidad, bcarr.Comentarios from productos prod
INNER JOIN buffcarrito bcarr ON bcarr.Productos_Id_producto = prod.Id_producto;