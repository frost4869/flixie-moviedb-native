//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import MovieCard from './MovieCard.js'

// create a component
class MovieList extends Component {

    render() {

        const screenProps = this.props.screenProps;
        const { movies, handleRefresh, loading, handleLoadmore, isRefreshing } = screenProps;

        const navigate = this.props.navigation.navigate;

        return (
            <FlatList
                data={movies}
                keyExtractor={(movie) => movie.id}
                renderItem={(movie) => <MovieCard movie={movie.item} loadDetail={() => {
                    navigate("MovieDetail", movie.item)
                }} />}
                onRefresh={handleRefresh}
                refreshing={isRefreshing}
                onEndReached={handleLoadmore}
                onEndReachedThreshold={0.05}
                ListFooterComponent={() => {
                    if (loading) {
                        return <ActivityIndicator size="large" />
                    } else {
                        return null
                    }
                }
                }>
            </FlatList>
        );
    }
}

//make this component available to the app
export default MovieList;
