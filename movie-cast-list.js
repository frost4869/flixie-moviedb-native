//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import MovieCast from './movie-cast';

// create a component
class MovieCastList extends Component {

    render() {

        const { casts, loading } = this.props;

        let Content = () => {
            if (!loading) {
                if (casts.length == 0) {
                    return null
                } else {
                    return (
                        <FlatList
                            horizontal
                            data={casts}
                            keyExtractor={(cast) => cast.id}
                            renderItem={(cast) => <MovieCast cast={cast.item} />}
                            ListFooterComponent={() => {
                                if (loading) {
                                    return <ActivityIndicator size="large" />
                                } else {
                                    return null
                                }
                            }}>
                        </FlatList>
                    )
                }
            }
            else {
                return <ActivityIndicator size="large" />
            }
        }

        return (
            <Content/>
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
export default MovieCastList;
