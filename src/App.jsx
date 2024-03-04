import { useState, useEffect } from 'react';
import './App.css'
//importando los modulos de firebase
import {collection,getDocs} from "firebase/firestore";
import {db} from "./firebase/credenciales";

function App() {
  const [datosDeportistas, setDatosDeportistas] = useState([]); // Cambiado a plural

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'deportistas'));
        if (!snapshot.empty) {
          const deportistas = snapshot.docs.map((deportista) => ({
            id: deportista.id,
            data: deportista.data(),
          }));
          setDatosDeportistas(deportistas);
        }
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    obtenerDatos();
  }, []); // El array vacío como segundo argumento asegura que useEffect se ejecute solo una vez al montar el componente


 /* const datosDeportista = collection(db, "deportistas");
  getDocs(datosDeportista)
  .then((resp) => {
    console.log(resp.docs[0].id);
    console.log(resp.docs[0].data());
  })*/

  return (
    <div>
      {datosDeportistas.length > 0 ? (
        datosDeportistas.map((deportista) => (
          <div key={deportista.id}>
            <p>ID: {deportista.id}</p>
            <p>Datos: {JSON.stringify(deportista.data)}</p>
          </div>
        ))
      ) : (
        <p>Cargando datos...</p>
      )}
    </div>
  )
}

export default App
