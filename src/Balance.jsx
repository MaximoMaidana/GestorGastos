
function Balance({movimientos, limitePresupuesto, definirPresupuesto}) {


    let ingresos = 0;
    let gastos = 0;
    let esExceso = false;
    movimientos.forEach((mov) => {
        if (mov.tipo === "gasto") {
            gastos += mov.monto;
        } else if (mov.tipo === "ingreso") {
            ingresos += mov.monto;
        }
    });
    const balance = ingresos - gastos;
    if (limitePresupuesto) {
        if (gastos > limitePresupuesto) {
            esExceso = true;
        }
    }
    return (
        <div>
            <div>
                <h3>Balance total:</h3>
                <p>{balance}</p>
            </div>
            <div>
                <h3>Entradas:</h3>
                <p>{ingresos}</p>
            </div>
            <div className={esExceso ? 'limite-excedido' : ''}>
                <h3>Salidas:</h3>
                <p>{gastos}</p>
                <button onClick={definirPresupuesto}>Definir Presupuesto</button>
            </div>
        </div>
    );
}
export default Balance;