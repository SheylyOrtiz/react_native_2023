import React, { Component, useState } from 'react';
import { Text, View, ScrollView, Container} from 'react-native';
import { Card, Icon } from '@rneui/themed';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import { baseUrl } from '../comun/comun';
import { postFavorito } from '../redux/ActionCreators';
import {Alert, Modal, Pressable} from 'react-native';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { Input } from 'react-native-elements';
const mapStateToProps = state => {
    return {
    excursiones: state.excursiones,
    comentarios: state.comentarios,
    favoritos: state.favoritos
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorito: (excursionId) => dispatch(postFavorito(excursionId))
})
   

const estilos = StyleSheet.create({
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    title: {
        color: 'white',
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
    icon: {
        flexDirection: 'row', 
        alingItems: 'center', 
        justifyContent: 'center'
    }
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
                                source={{uri: baseUrl + excursion.imagen}}
                                style={estilos.image}
                            ></Card.Image>
                            <Text style={estilos.title}>{excursion.nombre}</Text>
                            <Text style={{ margin: 20 }}>
                                {excursion.descripcion}
                            </Text>
                        </View>
                        <View style = {estilos.icon}>
                            <Icon             
                                reverse
                                name={ props.favorita ? 'heart' : 'heart-o'}
                                type='font-awesome'
                                color='#f50'
                                onPress={() => props.favorita ? console.log('La excursión ya se encuentra entre las favoritas') : props.onPress()}
                            />
                            <Icon
                                reverse
                                name= 'pencil'
                                type='font-awesome'
                                color='#84b6f4'
                                //onPressModal={() => props.onPressModal()}
                                
                            />
                        </View>
                        
                    </Card>
                )
            } else {
                    return(<View></View>);
                }
}
function RenderModalForm(props) {

  return( 
    <View>
    <Modal>
        <View>
        <Rating
            type='star'
            //ratingImage={WATER_IMAGE}
            ratingColor='#3498db'
            ratingBackgroundColor='#c8c7c8'
            ratingCount={5}
            imageSize={30}
            jumpValue={1}
            startingValue={3}
            onFinishRating={this.ratingCompleted}
            style={{ paddingVertical: 10 }}
        />
        <Input
            placeholder='Autor'
            leftIcon={{ type: 'font-awesome', 
                name: 'user' }}
        />
        <Input
            placeholder='Comentario'
            leftIcon={{ type: 'font-awesome', 
                name: 'comment' }}
        />
        <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text>Hide Modal</Text>
        </Pressable>
        <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => setModalVisible(true)}>
            <Text>Show Modal</Text>
        </Pressable>
        </View>
    </Modal>
    
   </View>

  )
}

class DetalleExcursion extends Component {
        
        marcarFavorito(excursionId) {
            this.props.postFavorito(excursionId);
        }
           
        render(){
            
            const {excursionId} = this.props.route.params;
            return(
                <ScrollView>
                <RenderExcursion
                    excursion={this.props.excursiones.excursiones[+excursionId]}
                    favorita={this.props.favoritos.favoritos.some(el => el === excursionId)}
                    onPress={() => this.marcarFavorito(excursionId)}
                  
                />
                <RenderComentario
                    comentarios={this.props.comentarios.comentarios.filter((comentario) => comentario.excursionId === excursionId)}
                />
                </ScrollView>
            );

        }
}

export default connect (mapStateToProps, mapDispatchToProps)(DetalleExcursion);
