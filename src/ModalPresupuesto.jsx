import { useState } from "react";

function ModalPresupuesto({limiteActual, registrarLimite, cerrarModal}) {

    const [limite, setLimite] = useState(limiteActual ?? "");

    const cambiarLimite = (e) => {
        setLimite(e.target.value);
    }
    const manejarEnvio = (e) => {
        e.preventDefault();
        const limiteNumerico = parseFloat(limite);
        if (isNaN(limiteNumerico) || limiteNumerico < 0) {
            alert("Ingrese un valor válido y no negativo");
            return;
        }
        registrarLimite(limiteNumerico);
    }
    return (
        <div className="backdrop" onClick={cerrarModal}>
            <div className="contenido-modal" onClick={(e) => e.stopPropagation()}>
                <h3>Limite de Gasto</h3>
                <form onSubmit={manejarEnvio}>
                    <input type="number"
                    value={limite}
                    onChange={cambiarLimite}
                    placeholder="Ej: 250000"/>
                    <div className="acciones-modal">
                    <button type="button" onClick={cerrarModal}>Cancelar</button>
                    <button type="submit">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModalPresupuesto;