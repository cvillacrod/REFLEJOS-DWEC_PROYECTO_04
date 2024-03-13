import React, { useEffect, useState } from 'react';
//importando los modulos de firebase
import { collection, getDocs } from "firebase/firestore";
import { db } from "./../firebase/credentials";
import { useParams } from 'react-router-dom';
import PrimarySearchAppBar from './Toolbar';
export default function Detail() {

  let { sportsmanId, sportsmanName } = useParams();

  console.log('id de deportist cogido de la url', 'deportistas/' + sportsmanId, sportsmanName)

  const [resultadosFiltrados, setResultadosFiltrados] = useState([]);


  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const resultsRef = await getDocs(collection(db, 'resultados'));
        const programRef = await getDocs(collection(db, 'programas'));


        let programas = []; // aqui guardo todos los programas

        if (!programRef.empty) {
          programas = programRef.docs.map((r) => ({
            id: r.id,
            ...r.data(),
          }));
        }


        if (!resultsRef.empty) {
          const resu = resultsRef.docs.map((r) => {
            const data = r.data();
            // aqui saco el nombre del prigrama atraves de su referencia a la tabla programas
            const nombrePrograma = programas.find(el => el.id === data.idprograma.id)?.descripcion;

            return {
              id: r.id,
              nombrePrograma: nombrePrograma,
              ...r.data(),
            }
          });

          const rFiltered = resu.filter(el => el.iddeportista.id == sportsmanId);
          setResultadosFiltrados(rFiltered);
        }
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    obtenerDatos();
  }, []); // El array vacío como segundo argumento asegura que useEffect se ejecute solo una vez al montar el componente


  return <div>
    <PrimarySearchAppBar />

    <h2 className='mt-4 mx-auto'>Deportista: {sportsmanName}</h2>

    <div className="container mx-auto mt-5  flex flex-row flex-wrap " style={{ width: '80%' }}>
      {resultadosFiltrados.length > 0 ? (
        resultadosFiltrados.map((res) => (
          <div key={res.id} className="max-w-sm rounded overflow-hidden shadow-lg mx-2 ">
            <div className="px-6 py-4">
              Programa: {res.nombrePrograma}
              <br />
              -----------------------------------
              <br />
              Fecha: {Date(res.fecha)} <br />
              Distancia dispositivo: {res.distanciaaldispositivo} <br />
              Media tiempo reaccion : {res.mediatiemporeaccion}<br />
              Numero de dispositivos apagados {res.numerodispositivosapagados}<br />
              ...

            </div>
          </div>
        ))
      ) : (
        <p>Cargando datos...</p>
      )}
    </div>
  </div>;
}
