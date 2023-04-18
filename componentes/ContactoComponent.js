import React, { Component } from 'react';
import { Text, ScrollView, View } from 'react-native';
import { Card } from '@rneui/themed';

function RenderItem() {
        return(
            <Card>
                <Card.Title>Información de contacto</Card.Title>
                <Card.Divider/>
                <Card.Image source={require('./imagenes/40Años.png')}></Card.Image>
                <Text style={{margin: 20}}>
                    Kaixo Mendizale!


                    Si quieres participar en las salidas de montaña que organizamos o 
                    quieres hacerte soci@ de Gaztaroa, puedes contactar con nosotros a 
                    través de diferentes medios. Puedes llamarnos por teléfono los jueves 
                    de las semanas que hay salida (de 20:00 a 21:00). También puedes 
                    ponerte en contacto con nosotros escribiendo un correo electrónico, o 
                    utilizando la aplicación de esta página web. Y además puedes 
                    seguirnos en Facebook.
                    
                    Para lo que quieras, estamos a tu disposición!
                    Tel: +34 948 277151
                    Email: gaztaroa@gaztaroa.com
                </Text>
            </Card>
        );
   
}

class Contacto extends Component {

    render() {
        
        return(
            <ScrollView>
                <RenderItem />
            </ScrollView>
        );
    }
}

export default Contacto;
