//import liraries
import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import {Card, CardItem, Left, Body, Text, Icon} from 'native-base'

const image_path = 'https://image.tmdb.org/t/p/w500';
// create a component
class MovieCard extends Component {
    render() {
        const { movie } = this.props;
        return (
            <Card>
                <CardItem>
                    <Left>
                        <Body>
                            <Text style={{fontWeight: 'bold'}}>{movie.title}</Text>
                            <Text note>{movie.release_date.split('-')[0]}</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem cardBody>
                    <Image source={{ uri: image_path.concat(movie.poster_path)}} resizeMethod='scale' resizeMode='cover' style={{height: 300, width: null, flex: 1}}/>
                </CardItem>
                <CardItem>
                    <Left>
                        <Icon name="star"/>
                        <Text>{movie.vote_average}</Text>
                    </Left>
                </CardItem>
            </Card>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default MovieCard;
