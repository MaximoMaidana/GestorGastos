import { useState, useEffect } from 'react'
import { LISTA_CATEGORIAS } from './constantes.js'

function Formulario({ agregarMovimiento, movimientoAEditar, cancelarEdicion }) {
    const [movimiento, setMovimiento] = useState({
        descripcion: "",
        monto: "",
        tipo: "gasto",
        categoria: "Comida", 
        fecha: "",
    });

    useEffect(() => {
        if (movimientoAEditar) {
            setMovimiento(movimientoAEditar);
        }
    }, [movimientoAEditar]);

    const manejarCambio = (e) => {
        const { name, value } = e.target;
        setMovimiento({
            ...movimiento,
            [name]: value
        });
    }
    const manejarCancelar = () => {
        setMovimiento({
            descripcion: "", 
            monto: "", 
            tipo: "gasto", 
            categoria: "Comida", 
            fecha: "", 
            id: null,
        });
        cancelarEdicion();
    }
    const alternarTipo = () => {
        setMovimiento({
            ...movimiento,
            tipo: movimiento.tipo === "gasto" ? "ingreso" : "gasto",
        });
    };

    const manejarSubmit = (e) => {
        e.preventDefault();
        
        const montoNumerico = parseFloat(movimiento.monto);
        if (isNaN(montoNumerico) || montoNumerico <= 0) {
            alert("Por favor, ingresa un monto válido.");
            return;
        }

        if (!movimiento.descripcion || !movimiento.fecha) {
            alert("Por favor, complete todos los campos.");
            return;
        }
        
        const movimientoParaGuardar = movimiento.id 
        ? movimiento 
        : { ...movimiento, id: Date.now() };

        agregarMovimiento({ ...movimientoParaGuardar, monto: montoNumerico });

        // Reset form
        setMovimiento({
            descripcion: "",
            monto: "",
            tipo: "gasto",
            categoria: "Comida",
            fecha: "",
            id: null,
        });
    }

    return (
        <form onSubmit={manejarSubmit}>
            <div>
                <label>Descripción:</label>
                <input
                    type="text"
                    name="descripcion"
                    value={movimiento.descripcion}
                    onChange={manejarCambio}
                    placeholder="Ej: Almuerzo"
                    required
                />
            </div>

            <div>
                <label>Monto:</label>
                <input
                    type="number"
                    name="monto"
                    value={movimiento.monto}
                    onChange={manejarCambio}
                    placeholder="0.00"
                    required
                />
            </div>

            <div>
                <label>Fecha:</label>
                <input 
                    type="date" 
                    name="fecha" 
                    value={movimiento.fecha} 
                    onChange={manejarCambio} 
                    required 
                />
            </div>

            <div>
                <label>Tipo:</label>
                <button type="button" onClick={alternarTipo} className={`toggle-btn ${movimiento.tipo}`}>
                    {movimiento.tipo.toUpperCase()}
                </button>
            </div>

            <div>
                <label>Categoría:</label>
                <select 
                    name="categoria" 
                    value={movimiento.categoria} 
                    onChange={manejarCambio}
                >
                    {LISTA_CATEGORIAS.map((cat) => (
                        <option key={cat.id} value={cat.nombre}>{cat.nombre}</option>
                    ))}
                </select>
            </div>
            <div className="acciones-formulario">
                <button type="submit">
                    {movimiento.id ? "Actualizar Movimiento" : "Guardar Movimiento"}
                </button>
                
                {/* Solo cancela si es una edición */}
                {movimiento.id && (
                    <button type="button" onClick={manejarCancelar}>
                        Cancelar Edición
                    </button>
                )}
            </div>
        </form>
    );
}
export default Formulario;