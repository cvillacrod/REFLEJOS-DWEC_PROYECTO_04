import React from 'react';
import { useState, useEffect } from 'react';

//importando los modulos de firebase
import { collection, getDocs } from "firebase/firestore";
import { db } from "./../firebase/credentials";
// material
import SearchIcon from '@mui/icons-material/Search';
import PrimarySearchAppBar from './Toolbar';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  marginTop: theme.spacing(2),
  width: '200px',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: '200px',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '200px',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function Home() {

  const [datosDeportistas, setDatosDeportistas] = useState([]); // Cambiado a plural
  const [deportistasFiltrados, setDeportistasFiltrados] = useState([]);


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
          setDeportistasFiltrados(deportistas); // genero copia de deportistas
        }
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    obtenerDatos();
  }, []); // El array vacío como segundo argumento asegura que useEffect se ejecute solo una vez al montar el componente


  const onSubmit = (event) => {
    const filtro = event.target.value;
    if (!filtro) { // si el filtro llega vacio meto todos los deportistas
      setDeportistasFiltrados(datosDeportistas);
    } else { // si llega algo en el filtro lo aplico
      let deportistasFil = [...datosDeportistas];
      deportistasFil = deportistasFiltrados.filter(dep => {
        const nombreCompleto = `${dep.data.nombre} ${dep.data.apellido1} ${dep.data.apellido2} `
        return nombreCompleto.toLowerCase().includes(filtro)
      });
      setDeportistasFiltrados(deportistasFil);
    }
  }

  return (
    <>
      <PrimarySearchAppBar />

      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          onChange={onSubmit}
          placeholder="Busca deportista.."
          inputProps={{ 'aria-label': 'search' }}
        />
      </Search>

      <div className="container mx-auto mt-5">
        <div>
          {deportistasFiltrados.length > 0 ? (
            deportistasFiltrados.map((deportista) => (
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
      </div>
    </>
  );
}
