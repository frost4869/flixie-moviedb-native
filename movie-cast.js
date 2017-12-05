//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
    RkCard,
    RkText,
    RkStyleSheet
} from 'react-native-ui-kitten';
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';

const image_path = 'https://image.tmdb.org/t/p/w500';

// create a component
class MovieCast extends Component {
    render() {

        const { cast } = this.props;

        return (
            <RkCard style={styles.card} style={styles.image}>
                <Image rkCardImg source={{uri: image_path.concat(cast.profile_path)}}
                    indicator={ProgressBar} />
                <View style={styles.footer} rkCardFooter>
                    <View >
                        <RkText numberOfLines={1} style={styles.name}>{cast.name}</RkText>
                        <RkText numberOfLines={1} style={styles.character}>{cast.character}</RkText>
                    </View>
                </View >
            </RkCard>
        );
    }
}

// define your styles
let styles = RkStyleSheet.create(theme => ({
    card: {
        marginVertical: 8
    },
    footer: {
        backgroundColor: 'rgba(0,0,0,0.4)',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 50
    },
    image:{
        height: 200,
        width: 120,
    },
    name: {
        color: 'rgb(200, 200, 200)',
        fontSize: 13,
        fontWeight: '600'
    },
    character: {
        fontSize: 10,
        color: 'rgb(200, 200, 200)'
    },
}));

//make this component available to the app
export default MovieCast;
