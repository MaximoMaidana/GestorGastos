import { LISTA_CATEGORIAS } from "./constantes";
function MovimientoItem({movimiento, borrarMovimiento, editarMovimiento}) {

    const { id, descripcion, monto, tipo, categoria, fecha } = movimiento;
    const esGasto = tipo === "gasto";
    const iconSource = LISTA_CATEGORIAS.find(item => item.nombre === categoria)?.icono;


    const manejarEliminar = (e) => {
        borrarMovimiento(id);
    }
    const manejarEditar = (e) => {
        editarMovimiento(movimiento);
    }
    
    return (
        <div className={`item-container ${esGasto ? 'gasto' : 'ingreso'}`}>
            <span>
                <img
                src = {iconSource}
                className="icono"
                alt={categoria} />

            </span>
            <span className="descripcion">{descripcion}</span>
            <span className="monto">
                {esGasto ? '-' : '+'} ${monto}
            </span>
            <span>{fecha}</span>
            <span>
                <button onClick={manejarEditar}>Editar</button>
                <button onClick={manejarEliminar}>Borrar</button>
            </span>
        </div>
    );

}

export default MovimientoItem;