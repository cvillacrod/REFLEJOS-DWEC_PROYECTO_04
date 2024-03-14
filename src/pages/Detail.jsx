import React, { useEffect, useState } from 'react';
//importando los modulos de firebase
import { doc, getDoc } from "firebase/firestore";
import { db } from "./../firebase/credentials";
import { useParams } from 'react-router-dom';
import PrimarySearchAppBar from './Toolbar';
import { hydrate } from './helper';

export default function Detail() {

  let { sportsmanId } = useParams();
  const [resultados, setResultados] = useState([]);
  const [deportista, setDeportista] = useState();

  const getDocFromReference = async (ref) => {
    const snapshot = await getDoc(ref);
    return snapshot.data();
  }

  const getDocument = async (uid, coleccion, isHydrated = false, referencesToHydrate = []) => {
    const ref = doc(db, coleccion, uid);
    const result = await getDocFromReference(ref)

    if (isHydrated) {
      hydrate(result, referencesToHydrate)
      return result;
    } else {
      const snapshot = await getDoc(ref);
      return snapshot.data()
    }
  }


  useEffect(() => {
    if (deportista) {
      const promises = deportista.resultados.map(async (el) => {
        const id = el.split('/')[1];
        return await getDocument(id, 'resultados', false)

        // sin hidratar
        //const resRef = doc(db, 'resultados', id);
        //return await getDocFromReference(resRef);
      });
      Promise.all(promises).then((resultados) => {
        // aqui hidratamos los resultados con los datos de idprograma y tipoejercicio
        resultados.map(el => hydrate(el, ['idprograma', 'tipoejercicio']));
        console.log(333, resultados)
        setResultados(resultados)
      });
    }
  }, [deportista]);


  useEffect(() => {
    if (resultados.length) {
      console.log('use effect resultados', resultados)
    }
  }, [resultados])


  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const res = await getDocument(sportsmanId, 'deportistas');
        setDeportista(res);

      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    obtenerDatos();
  }, []); // El array vacío como segundo argumento asegura que useEffect se ejecute solo una vez al montar el componente


  return <div>
    <PrimarySearchAppBar />

    <h2 className='mt-4 mx-auto'>Deportista: {deportista?.nombre} {deportista?.apellido1} {deportista?.apellido2}</h2>

    <div className="container mx-auto mt-5  flex flex-row flex-wrap " style={{ width: '80%' }}>
      {resultados.length > 0 ? (
        resultados.map((res, i) => (
          <div key={i} className="max-w-sm rounded overflow-hidden shadow-lg mx-2 ">
            <div className="px-6 py-4">
              Programa: {res.idprograma.descripcion}++
              <br />
              -----------------------------------
              <br />
              Fecha: {Date(res?.fecha)} <br />
              Distancia dispositivo: {res?.distanciaaldispositivo} <br />
              Media tiempo reaccion : {res?.mediatiemporeaccion}<br />
              Numero de dispositivos apagados {res?.numerodispositivosapagados}<br />
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
