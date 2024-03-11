import React from 'react';
import { useState, useEffect } from 'react';

//importando los modulos de firebase
import { collection, getDocs } from "firebase/firestore";
import { db } from "./../firebase/credentials";

export default function Home() {

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
          console.log(deportistas)
        }
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    obtenerDatos();
  }, []); // El array vacío como segundo argumento asegura que useEffect se ejecute solo una vez al montar el componente



  //<p>Datos: {JSON.stringify(deportista.data)}</p>
  return (
    <>
      <div>
        {datosDeportistas.length > 0 ? (
          datosDeportistas.map((deportista) => (
            <div key={deportista.id} className="max-w-sm rounded overflow-hidden shadow-lg">
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{deportista.data.nombre} {deportista.data.apellido1} {deportista.data.apellido2}</div>
                <p className="text-gray-700 text-base">
                  ID: {deportista.id}
                </p>
              </div>

            </div>
          ))
        ) : (
          <p>Cargando datos...</p>
        )}
      </div>
    </>
  );
}
