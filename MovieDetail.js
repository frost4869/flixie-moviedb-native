//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const image_path = 'https://image.tmdb.org/t/p/w500';

// create a component
class MovieDetail extends Component {
    render() {
        const movie = this.props.navigation.state.params;
        const navigate = this.props.navigation.navigate;

        return (
            <View>
                <Image source={{ uri: image_path.concat(movie.poster_path) }} style={styles.image} />
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{movie.title}</Text>
                    <Text style={styles.overview}>{movie.overview}</Text>
                    <Text style={styles.overview}>{movie.vote_average}</Text>
                </View>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    textContainer: {
        backgroundColor: 'rgba(0,0,0,0.4)',
        position: 'absolute',
        bottom: 0
    },
    title: {
        color: 'rgb(200, 200, 200)',
        fontSize: 18,
        fontWeight: '600'
    },
    overview: {
        color: 'rgb(200, 200, 200)'
    },
    image: {
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'nowrap',
        width: 400,
        height: 600,
    }
});

//make this component available to the app
export default MovieDetail;
