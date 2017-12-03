//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import { RkText, RkStyleSheet } from 'react-native-ui-kitten';
import FontAwesome, { Icons } from 'react-native-fontawesome';

const image_path = 'https://image.tmdb.org/t/p/w780';

// create a component
class MovieDetail extends Component {
    render() {
        const { movie, type } = this.props.navigation.state.params;
        let movieObj = {
            title: type === 'movie' ? movie.title : movie.name,
            rate: movie.vote_average,
            overview: movie.overview,
            date: type === 'movie' ? movie.release_date.split('-')[0] : movie.first_air_date.split('-')[0],
            backdrop_path: movie.backdrop_path
        }
        return (
            <ScrollView>
                <View style={[styles.header, styles.border]}>
                    <Image source={{ uri: image_path.concat(movieObj.backdrop_path) }}
                        resizeMode="contain" resizeMethod='scale'
                        style={styles.image} />
                    <View style={styles.title_background}>
                        <Text style={styles.title}>{movieObj.title}</Text>
                        <Text style={styles.rate}>
                            <FontAwesome>{Icons.star}</FontAwesome>
                            {movieObj.rate}
                        </Text>
                    </View>
                </View>
                <View style={styles.border}>
                    <Text>{movieObj.overview}</Text>
                </View>

            </ScrollView>

        );
    }
}

// define your styles
const screenWidth = Dimensions.get('window').width;
const styles = RkStyleSheet.create(theme => ({
    header: {
        alignItems: 'center',
    },
    border: {
        borderBottomWidth: 1,
        borderColor: theme.colors.border.base
    },
    image: {
        width: screenWidth * 1.3,
        height: 300
    },
    title_background: {
        backgroundColor: 'rgba(0,0,0,0.35)',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
        justifyContent: 'flex-end'
    },
    title: {
        fontSize: 45,
        fontWeight: 'bold',
        color: '#ffffff',
        marginLeft: 15
    },
    rate: {
        color: '#ffffff'
    }
}));

//make this component available to the app
export default MovieDetail;
