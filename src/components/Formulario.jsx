import React, { useState } from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import { TextInput, Button } from "react-native-paper";
import shortid from "react-id-generator";

export function Formulario({ alumnos, setAlumnos, guardarAlumnosStorage }) {
    //Variables a utilizar
    const [carnet, setCarnet] = useState('')
    const [nombres, setNombres] = useState('')
    const [apellidos, setApellidos] = useState('')
    const [nota1, setNota1] = useState(0)
    const [nota2, setNota2] = useState(0)
    const [nota3, setNota3] = useState(0)
    const [promedio, setPromedio] = useState(0)

    const registrarAlumnos = () => {
        
        if (carnet === '' || nombres === '' || apellidos === '' || nota1 === '' || nota2 === '' || nota3 === '') {
            mostrarMensaje()
            return
        }
        //Calculando el Promedio
        var calculoPromedio = (nota1 + nota2 + nota3) / 3
        var total = calculoPromedio.toFixed(2)
        setPromedio(total)

        //Creando Objeto Alumno
        const alumno = { carnet, nombres, apellidos, nota1, nota2, nota3, promedio }
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
            <View>
                <Button style={{ marginTop: 25 }} mode='contained' onPress={() => { registrarAlumnos() }}>Calcular</Button>
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
    }
})