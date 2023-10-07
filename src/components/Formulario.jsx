import React, { useState, useEffect } from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import { TextInput, Button } from "react-native-paper";
import shortid from "react-id-generator";
import colors from '../utils/colors';

export function Formulario({ alumnos, setAlumnos, guardarAlumnosStorage }) {
    //Variables a utilizar
    const [carnet, setCarnet] = useState('')
    const [nombres, setNombres] = useState('')
    const [apellidos, setApellidos] = useState('')
    const [nota1, setNota1] = useState(0)
    const [nota2, setNota2] = useState(0)
    const [nota3, setNota3] = useState(0)
    const [promedio, setPromedio] = useState(0)
    const [aprobado, setAprobado] = useState('Reprobado')

    useEffect(() => {
        calcularPromedio()
    }, [nota1, nota2, nota3])
    

    const calcularPromedio = () => {
        //Calculando el Promedio
        const totalPromedio = (parseFloat(nota1) + parseFloat(nota2) + parseFloat(nota3)) / 3
        if (totalPromedio > 6 ) {
            setAprobado('Aprobado')
        }
        setPromedio(totalPromedio.toFixed(2))
    }

    const registrarAlumnos = () => {
        if (carnet === '' || nombres === '' || apellidos === '' || nota1 === '' || nota2 === '' || nota3 === '') {
            mostrarMensaje()
            return
        }
        calcularPromedio();

        console.log(nota1);
        console.log(nota2);
        console.log(nota3);
        console.log(promedio);

        //Creando Objeto Alumno
        const alumno = { carnet, nombres, apellidos, nota1, nota2, nota3, promedio, aprobado }
        alumno.id = shortid();

        //Agregando al state
        const alumnoNuevo = [...alumnos, alumno];
        setAlumnos(alumnoNuevo);

        //Pasar los alumnos capturados al storage
        guardarAlumnosStorage(JSON.stringify(alumnoNuevo))

        //Reseteando el formulario
        setCarnet('')
        setNombres('')
        setApellidos('')
        setNota1(0)
        setNota2(0)
        setNota3(0)

        //Reseteando el promedio
        setPromedio(0)

    }

    const mostrarMensaje = () => {
        Alert.alert(
            'Error',
            'Todos los campos son abligatorios',
            [{
                text: 'Ok'
            }]
        )
    }

    return (
        <View style={styles.contenedorText}>
            <View style={styles.contenedorInputs}>
                <TextInput style={styles.textInput} mode='outlined' placeholder='Carnet' onChangeText={(value) => setCarnet(value)} />
                <TextInput style={styles.textInput} mode='outlined' placeholder='Nombres' onChangeText={(value) => setNombres(value)} />
            </View>
            <View style={styles.contenedorInputs}>
                <TextInput style={styles.textInput} mode='outlined' placeholder='Apellidos' onChangeText={(value) => setApellidos(value)} />
            </View>
            <View style={styles.contenedorInputs}>
                <TextInput style={styles.textInput} mode='outlined' placeholder='Nota 1' onChangeText={(value) => setNota1(value)} />
                <TextInput style={styles.textInput} mode='outlined' placeholder='Nota 2' onChangeText={(value) => setNota2(value)} />
                <TextInput style={styles.textInput} mode='outlined' placeholder='Nota 3' onChangeText={(value) => setNota3(value)} />
            </View>
            <View style={styles.contenedorBoton}>
                <Button style={styles.boton} mode='contained' onPress={() => { registrarAlumnos() }}>Calcular</Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    contenedorText: {
        width: '100%',
        padding: 5,
    },
    contenedorInputs: {
        flexDirection: 'row',
        marginTop: 5,
    },
    textInput: {
        flex: 2,
        height: 45,
        marginHorizontal: 3
    },
    contenedorBoton: {
        alignItems: 'center'
    },
    boton: {
        marginTop: 20,
        width: '75%',
        height: 45,
        textAlign: 'center',
        backgroundColor: colors.COLOR_SECUNDARIO
    }
})