//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import MovieCard from './MovieCard.js'

// create a component
class MovieList extends Component {

    render() {
        console.log('render list')
        const {movies} = this.props;

        return (
            <FlatList
                data={movies}
                keyExtractor={(movie) => movie.id}
                renderItem={(movie) => <MovieCard movie={movie.item}/>}>
            </FlatList>
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
export default MovieList;
