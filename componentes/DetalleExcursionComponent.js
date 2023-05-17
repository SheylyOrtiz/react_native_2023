import React, { Component, } from 'react';
import { Text, View, ScrollView, Container} from 'react-native';
import { Card, Icon } from '@rneui/themed';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import { baseUrl } from '../comun/comun';
import { postFavorito } from '../redux/ActionCreators';
import { postComentario } from '../redux/ActionCreators';
import {Alert, Modal, Pressable} from 'react-native';
import { Rating } from 'react-native-ratings';
import { Input } from 'react-native-elements';
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
    },
    vista: {
        paddingTop: 100,
        paddingLeft: 30, 
        paddingRight: 30,
    }, 
    botonModal: {
        alignSelf: 'center',
        backgroundColor: '#272727',
        padding: '2%',
        marginBottom: '5%',
        borderRadius: '20%',
        maxWidth: '45%',
        
        

    },
    textoBotonModal: {
        textAlign: 'center',
        color: 'white'
    }
});
const mapStateToProps = state => {
    return {
    excursiones: state.excursiones,
    comentarios: state.comentarios,
    favoritos: state.favoritos,
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorito: (excursionId) => dispatch(postFavorito(excursionId)),
    postComentario: (comentario) => dispatch(postComentario(comentario)),
})
   
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
function RenderModalForm(props) {

    return( 
      <Modal 
      visible = {props.visible}
      >
          <View style={estilos.vista}>
            <Rating
                showRating
                type='star'
                ratingColor='#3498db'
                ratingBackgroundColor='#c8c7c8'
                ratingCount={5}
                imageSize={30}
                jumpValue={1}
                startingValue={3}
                onFinishRating={(rating) => props.onClickInput({valoracion: rating})}
                style={{ paddingVertical: 10 }}
            />
            <Input
                placeholder='Autor'
                leftIcon={{ type: 'font-awesome', 
                    name: 'user' }}
                //onChangeText={value => this.setState({ comment: value })}
                onChangeText={author => props.onClickInput({ autor: author })}
            />
            <Input
                
                placeholder='Comentario'
                leftIcon={{ type: 'font-awesome', 
                    name: 'comment' }}
                onChangeText={comment => props.onClickInput({ comentario: comment })}
            /> 
            <Pressable 
                    style={estilos.botonModal}
                    onPress={() => props.onClickEnviar()}>
                    <Text style={estilos.textoBotonModal}>ENVIAR</Text>
            </Pressable>
            <Pressable
                style={estilos.botonModal}
                //style={[styles.button, styles.buttonOpen]}
                onPress={() => props.onClickCancelar()}>
                <Text style={estilos.textoBotonModal}>CANCELAR</Text>
            </Pressable>
          </View>
      </Modal>
  
    )
  }
function RenderExcursion(props) {
    // const { visible, setModalVisible } = props;
    // const handlePress = () => {
    //     setModalVisible(!visible);
    // };
    const excursion = props.excursion;
     

            if (excursion != null) {
                return (
                    <Card containerStyle={estilos.card} >
                        <View style={estilos.imageContainer}>
                            <Card.Image
                                source={{uri: excursion.imagen}}
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
                                onPress={() => props.onPressComentario()}
                                
                            />
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
        showModal: false,
        valoracion: 3,
        autor: '',
        comentario: '',

    }};
    marcarFavorito(excursionId) {
        this.props.postFavorito(excursionId);
    }
    toggleModal() {
        this.setState({showModal : !this.state.showModal});
    } 
    resetForm() {
        this.setState({
            showModal: false,
            valoracion: 3,
            autor: '',
            comentario: '',
            dia: '',
            }
        );
    }
    setCommentAut = (commentAut) => {
        //console.log(this.state)
        const {comentario, autor, valoracion} = commentAut;
        if (comentario) this.setState({comentario: comentario});
        if (autor) this.setState({autor: autor});
        if (valoracion) this.setState({valoracion: valoracion}); 

    }
    //generamos el comentario aquí con todos los parametros para solo
    //enviar un unico parámetro a postComentario()
    generateComentario (excursionId) {
        this.props.postComentario({
            excursionId : excursionId,
            valoracion: this.state.valoracion,
            autor: this.state.autor,
            comentario: this.state.comentario,
            dia : (new Date()).toISOString()
        });
        this.resetForm();
    }
    
    render(){
        const {showModal} = this.state;
        const {excursionId} = this.props.route.params;
        return(
            <ScrollView>
            <RenderModalForm
                visible = {showModal}
                onClickEnviar = {() => {
                    this.generateComentario(excursionId);
                    this.toggleModal();
                }}
                onClickCancelar = {() => {
                    this.toggleModal();
                    this.resetForm()
                }} 
                onClickInput = {this.setCommentAut}
            />
            <RenderExcursion
                excursion={this.props.excursiones.excursiones[+excursionId]}
                favorita={this.props.favoritos.favoritos.some(el => el === excursionId)}
                onPress={() => this.marcarFavorito(excursionId)}
                onPressComentario = {() =>this.toggleModal()}
                 
            />
            <RenderComentario
                comentarios={this.props.comentarios.comentarios.filter((comentario) => comentario.excursionId === excursionId)}
            />
            </ScrollView>
        );

    }
}

export default connect (mapStateToProps, mapDispatchToProps)(DetalleExcursion);
