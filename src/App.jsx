import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Balance from './Balance.jsx'
import Formulario from './Formulario.jsx'
import ListaMovimientos from './ListaMovimientos.jsx'
import ModalPresupuesto from './ModalPresupuesto.jsx'
import Filtros from './Filtros.jsx'


function App() {
  //Inicializar movimientos y limite con localStorage
  const [movimientos, setMovimientos] = useState(() => {
    const movimientosGuardados = localStorage.getItem('movimientos_app');
    return movimientosGuardados ? JSON.parse(movimientosGuardados) : [];
  });
  const [limitePresupuesto, setLimitePresupuesto] = useState(() => {
    const limiteGuardado = localStorage.getItem('limite_app');
    return limiteGuardado ? JSON.parse(limiteGuardado) : null;
  });
  const [movimientoAEditar, setMovimientoAEditar] = useState(null);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todas');
  const [ordenSeleccionado, setOrdenSeleccionado] = useState('fecha');
  const [modalPresupuestoVisible, setModalPresupuestoVisible] = useState(false);
  const [ordenDireccion, setOrdenDireccion] = useState('desc'); // 'desc' o 'asc'

  // Guardar movimientos cada vez que cambien
  useEffect(() => {
    localStorage.setItem('movimientos_app', JSON.stringify(movimientos));
  }, [movimientos]);
  // Guardar el limite cada vez que cambie
  useEffect(() => {
    localStorage.setItem('limite_app', JSON.stringify(limitePresupuesto));
  }, [limitePresupuesto]);

  const movimientosFiltrados = [...movimientos]
  .filter(mov => categoriaSeleccionada === 'Todas' || mov.categoria === categoriaSeleccionada)
  .sort((a, b) => {
    let resultado = 0;
    
    if (ordenSeleccionado === "monto") {
      resultado = parseFloat(b.monto) - parseFloat(a.monto);
    } else {
      resultado = new Date(b.fecha).getTime() - new Date(a.fecha).getTime();
    }

    // Invierte resultado si es ascendente
    return ordenDireccion === 'asc' ? resultado * -1 : resultado;
})


  const agregarMovimiento = (nuevoMov) => {
    const idAEncontrar = nuevoMov.id;
    const encontrado = movimientos.find(mov => mov.id === idAEncontrar);
    if (encontrado) {
      const nuevoMovimientos = movimientos.map((mov) => {
        if (mov.id === idAEncontrar) {
          return nuevoMov;
        }
        return mov;
      })
      setMovimientos(nuevoMovimientos);
      setMovimientoAEditar(null);
    } else {
      setMovimientos(prevMovimientos => [...prevMovimientos, nuevoMov]);
    }
  };

  const borrarMovimiento = (id) => {
    const nuevoMovimientos = movimientos.filter(mov => mov.id !== id)
    setMovimientos(nuevoMovimientos);
  }

  const prepararEdicion = (movimiento) => {
    setMovimientoAEditar(movimiento);
  }
  const cancelarEdicion = () => {
    setMovimientoAEditar(null);
  }

  const cambiarCategoria = (cat) => {
    setCategoriaSeleccionada(cat);
  }
  const alternarOrden = () => {
    setOrdenSeleccionado(prev => (prev === 'fecha' ? 'monto' : 'fecha'));
  }
  const alternarDireccion = () => {
  setOrdenDireccion(prev => prev === 'desc' ? 'asc' : 'desc');
  }
  const alternarModalPresupuesto = () => {
    setModalPresupuestoVisible(!modalPresupuestoVisible);
  }
  const cambiarLimite = (nuevoLimite) => {
    setLimitePresupuesto(nuevoLimite);
    alternarModalPresupuesto();
  }

  
  return (
    <div>
    <header>Gestor de Gastos</header>
    <main>
      <section>
        <Balance movimientos={movimientos} limitePresupuesto={limitePresupuesto} definirPresupuesto={alternarModalPresupuesto}/>
      </section>

      <section>
        <Formulario agregarMovimiento={agregarMovimiento} movimientoAEditar={movimientoAEditar} cancelarEdicion={cancelarEdicion}/>
      </section>

      <section>
        <Filtros categoriaSeleccionada={categoriaSeleccionada} cambiarCategoria={cambiarCategoria} ordenSeleccionado={ordenSeleccionado} alternarOrden={alternarOrden} alternarDireccion={alternarDireccion} ordenDireccion={ordenDireccion}/>
        <ListaMovimientos movimientos={movimientosFiltrados} borrarMovimiento={borrarMovimiento} editarMovimiento={prepararEdicion}/>
      </section>
    </main>
    <footer></footer>
    {modalPresupuestoVisible && <ModalPresupuesto limiteActual={limitePresupuesto} registrarLimite={cambiarLimite} cerrarModal={alternarModalPresupuesto} />}
    </div>
  )
}

export default App
