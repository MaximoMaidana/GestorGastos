import MovimientoItem from "./MovimientoItem";

function ListaMovimientos({movimientos, borrarMovimiento, editarMovimiento}) {

    return (
        <div className="lista-container">
            <h3>Historial de movimientos</h3>
            {
            movimientos.length === 0 
            ? (<p>Todavía no hay registros.</p>) 
            : movimientos.map((item) => (
                <MovimientoItem 
                key={item.id} 
                movimiento={item}
                borrarMovimiento={borrarMovimiento} 
                editarMovimiento={editarMovimiento}/>    
            ))
            }
        </div>
    );

}

export default ListaMovimientos;