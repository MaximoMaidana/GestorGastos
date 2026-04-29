import { LISTA_CATEGORIAS } from "./constantes";
function MovimientoItem({movimiento, borrarMovimiento, editarMovimiento}) {

    const { id, descripcion, monto, tipo, categoria, fecha } = movimiento;
    const esGasto = tipo === "gasto";
    const iconSource = LISTA_CATEGORIAS.find(item => item.nombre === categoria)?.icono;
    const partesFecha = fecha.split('-');
    const fechaFormateada = partesFecha.length === 3 
        ? `${partesFecha[2]}/${partesFecha[1]}/${partesFecha[0]}` 
        : fecha;
    
    const manejarEliminar = (e) => {
        borrarMovimiento(id);
    }
    const manejarEditar = (e) => {
        editarMovimiento(movimiento);
    }
    
    return (
        <div className={`item-container ${esGasto ? 'gasto' : 'ingreso'}`}>
            <span>
                <p className="icono">{iconSource}</p>
            </span>
            <span className="descripcion">{descripcion}</span>
            <span className="monto">
                {esGasto ? '-' : '+'} ${monto}
            </span>
            <span>{fechaFormateada}</span>
            <span>
                <button onClick={manejarEditar}>Editar</button>
                <button onClick={manejarEliminar}>Borrar</button>
            </span>
        </div>
    );

}

export default MovimientoItem;