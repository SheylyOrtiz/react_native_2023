import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList} from 'react-native';
import { Card } from '@rneui/themed';
import { EXCURSIONES } from '../comun/excursiones';
import { COMENTARIOS } from '../comun/comentarios';
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
function RenderComentario(props) {
    const comentarios = props.comentarios;
    
    return (
        <Card>
            <Card.Title>Comentarios</Card.Title>
            <Card.Divider/>

                {comentarios.map((item, index) => {
                    return(  
                        <View key ={index}>
                            <Text >{item.comentario}</Text>
                            <Text>{item.valoracion} Stars</Text>
                            <Text>--{item.autor}, {item.dia}</Text>
                            <Text></Text>
                        </View> 
                        
                        );
                     })}
        </Card>
    );
}
   
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
                excursiones: EXCURSIONES,
                comentarios: COMENTARIOS,
            };
        }
      
        render(){
            const {excursionId} = this.props.route.params;
            return(
                <ScrollView>
                <RenderExcursion
                    excursion={this.state.excursiones[+excursionId]}
                />
                <RenderComentario
                    comentarios={this.state.comentarios.filter((comentario) => comentario.excursionId === excursionId)}
                />
                </ScrollView>
            );

        }
}

export default DetalleExcursion;
