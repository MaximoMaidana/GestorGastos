import { LISTA_CATEGORIAS } from "./constantes";

function Filtros({ categoriaSeleccionada, cambiarCategoria, ordenSeleccionado, alternarOrden, ordenDireccion, alternarDireccion }) {
  return (
    <div className="contenedor-filtros">

      <div className="grupo-filtro">
        <label>Categoría:</label>
        <select 
          value={categoriaSeleccionada} 
          onChange={(e) => cambiarCategoria(e.target.value)}
        >
          <option value="Todas">Todas</option>

          {LISTA_CATEGORIAS.map((cat) => (
            <option key={cat.id} value={cat.nombre}>
              {cat.nombre}
            </option>
          ))}
        </select>
      </div>

      {/* Botón Toggle para Ordenar */}
      <div className="grupo-filtro">
        <button 
          type="button" 
          onClick={alternarOrden}
          className="btn-toggle-orden"
        >
          Ordenar por: <strong>{ordenSeleccionado === 'fecha' ? 'Fecha' : 'Monto'}</strong>
        </button>
        <button 
          type="button" 
          onClick={alternarDireccion} 
          className="btn-direccion"
          title={ordenDireccion === 'desc' ? 'Descendente' : 'Ascendente'}
        >
          {ordenDireccion === 'desc' ? '▼' : '▲'}
        </button>
      </div>
    </div>
  );
}

export default Filtros;