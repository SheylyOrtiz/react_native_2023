import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Card } from '@rneui/themed';
import { EXCURSIONES } from '../comun/excursiones';
import { StyleSheet } from 'react-native';

const estilos = StyleSheet.create({
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    title: {
        color: 'chocolate',
        padding: 10,
        fontSize: 20,
        position: 'absolute',
        left: 0,
        padding: 10,
        fontSize: 30,
        fontWeight: 'bold',
        width: '100%',
        textAlign: 'center',
    },
    card: {
        borderRadius: 10,
        overflow: 'hidden',
    },
    imageContainer: {
        position: 'relative',
    },
});

function RenderExcursion(props) {

    const excursion = props.excursion;
    
            if (excursion != null) {
                return (
                    <Card containerStyle={estilos.card} >
                        <View style={estilos.imageContainer}>
                            <Card.Image
                                source={require('./imagenes/40Años.png')}
                                style={estilos.image}
                            ></Card.Image>
                            <Text style={estilos.title}>{excursion.nombre}</Text>
                            <Text style={{ margin: 20 }}>
                                {excursion.descripcion}
                            </Text>
                        </View>
                    </Card>
                )
            } else {
                    return(<View></View>);
                }
}

class DetalleExcursion extends Component {
        constructor(props) {
            super(props);
            this.state = {
                excursiones: EXCURSIONES
            };
        }
      
        render(){
            const {excursionId} = this.props.route.params;
            return(<RenderExcursion excursion={this.state.excursiones[+excursionId]} />);
        }
}

export default DetalleExcursion;
