import React from 'react'
import { StyleSheet, ScrollView, View } from 'react-native'
import { Text, Card, DataTable} from "react-native-paper";
import colors from '../utils/colors';

export function Resultado({ item }) {
    return (
        <Card style={styles.container}>
            <Card.Content>
                <DataTable.Row><Text styles={styles.label} >Registro #</Text></DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell> <Text style={styles.label}>Carnet:</Text></DataTable.Cell>
                    <DataTable.Cell><Text style={styles.texto}>{item.carnet}</Text></DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell><Text style={styles.label}>Nombre:</Text></DataTable.Cell>
                    <DataTable.Cell><Text style={styles.texto}>{item.nombres} {item.apellidos}</Text></DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell><Text style={styles.label}>Nota 1:</Text></DataTable.Cell>
                    <DataTable.Cell><Text style={styles.texto}>{item.nota1}</Text></DataTable.Cell>
                    <DataTable.Cell><Text style={styles.label}>Nota 2:</Text></DataTable.Cell>
                    <DataTable.Cell><Text style={styles.texto}>{item.nota2}</Text></DataTable.Cell>
                    <DataTable.Cell><Text style={styles.label}>Nota 3:</Text></DataTable.Cell>
                    <DataTable.Cell><Text style={styles.texto}>{item.nota3}</Text></DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell><Text style={styles.label}>Promedio:</Text></DataTable.Cell>
                    <DataTable.Cell><Text style={styles.texto}>{item.promedio}</Text></DataTable.Cell>
                </DataTable.Row>
            </Card.Content>
        </Card>
    )
}

const styles = StyleSheet.create({
    container: {

        marginVertical: 25,
        backgroundColor: '#FAF3F0',
    },
    cita: {
        backgroundColor: '#FFF',
        borderBottomColor: '#e1e1e1',
        borderStyle: 'solid',
        borderBottomWidth: 1,
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    label: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 20
    },
    texto: {
        fontSize: 18,
        width: 'auto'
    },
    btnEliminar: {
        padding: 10,
        backgroundColor: 'red',
        marginVertical: 10
    },
    textoEliminar: {
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center'
    }
})