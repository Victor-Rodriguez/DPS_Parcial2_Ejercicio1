import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, FlatList } from 'react-native';
import { Button } from "react-native-paper";
import { Text } from "react-native-paper";
import { Formulario } from './src/components/Formulario';
import { Resultado } from './src/components/Resultado';
import colors from './src/utils/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [alumnos, setAlumnos] = useState([])


  useEffect(() => {
    const obtenerDataStorage = async () => {
      try {
        const alumnosStorage = await AsyncStorage.getItem('alumnos')
        if (alumnosStorage) {
          setAlumnos(JSON.parse(alumnosStorage))
        }
      } catch (error) {
        console.log(error);
      }
    }
    obtenerDataStorage()
  }, [])

  //Almacena a los alumnos en storage
  const guardarAlumnosStorage = async (alumnosJSON) => {
    try {
      await AsyncStorage.setItem('alumnos', alumnosJSON)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <StatusBar style="auto" />
      <View style={styles.background} />
      <Text variant='headlineLarge' style={styles.titulo}>Notas Estudiantes</Text>
      <Formulario
        alumnos={alumnos}
        setAlumnos={setAlumnos}
        guardarAlumnosStorage={guardarAlumnosStorage}
      />

      <FlatList
        data={alumnos}
        renderItem={({ item }) => <Resultado item={item} />}
        keyExtractor={alumno => alumno.id}
      />
    </>
  );
}

const styles = StyleSheet.create({
  encabezado: {
    height: 240,
  },
  background: {
    backgroundColor: colors.COLOR_PRIMARIO,
    height: 270,
    width: '100%',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    position: 'absolute',
    zIndex: -1
  },
  titulo: {
    fontWeight: 'bold',
    color: '#FCE09B',
    marginTop: 25,
    textAlign: 'center'
  }
});
