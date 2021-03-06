//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import { RkStyleSheet } from 'react-native-ui-kitten';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import { Badge, H3 } from 'native-base';
import MovieReviewsList from './movie-reviews-list';
import MovieCastList from './movie-cast-list';

const image_path = 'https://image.tmdb.org/t/p/w780';
const api_key = '09e4cc13c99312bf18cad8339e83bc82';
const lang = 'en-US';

// create a component
class MovieDetail extends Component {

    constructor(props) {
        super(props);

        this.movie = this.props.navigation.state.params.movie;
        this.type = this.props.navigation.state.params.type;

        this.state = {
            movie: {},
            casts: [],
            loading: true,
            loading_cast: true
        }
    }

    async fetchDetails(type, id) {
        const details_api = `https://api.themoviedb.org/3/${type}/${id}?api_key=${api_key}&language=${lang}`;
        let data = await fetch(details_api);
        let result = await data.json();

        return result;
    }

    async fetchCasts(){
        const cast_api = `https://api.themoviedb.org/3/${this.type}/${this.movie.id}/credits?api_key=${api_key}`;
        let data = await fetch(cast_api);
        let result = await data.json();

        return result.cast;
    }

    async componentWillMount() {
        await this.fetchDetails(this.type, this.movie.id).then((details) => {
            this.setState({
                movie: details,
                loading: false
            })
        })
        await this.fetchCasts().then((casts) => {
            this.setState({
                casts,
                loading_cast: false
            })
        })
    }

    render() {
        let movieObj = {
            title: this.type === 'movie' ? this.movie.title : this.movie.name,
            rate: this.movie.vote_average,
            overview: this.movie.overview,
            date: this.type === 'movie' ? this.movie.release_date : this.movie.first_air_date,
            backdrop_path: this.movie.backdrop_path,
        }

        let Content = (props) => {
            if (!this.state.loading) {
                return (
                    <View>

                        {/* Movie info here */}
                        <View style={styles.border}>
                            <View style={[styles.info]}>
                                <Text>
                                    <FontAwesome >
                                        {Icons.calendar + '   '}
                                    </FontAwesome>
                                    {movieObj.date}
                                </Text>
                                <Text>
                                    <FontAwesome >
                                        {Icons.tags + '   '}
                                    </FontAwesome>
                                    {this.state.movie.genres.map((genre) => genre.name + "  ")}
                                </Text>
                                <Text>
                                    <FontAwesome >
                                        {Icons.thumbsOUp + '   '}
                                    </FontAwesome>
                                    {movieObj.rate}
                                </Text>
                            </View>
                        </View>

                        {/* Overview here */}
                        <View style={[styles.headerView]}>
                            <H3 style={[styles.headerText]}>Overview</H3>
                        </View>
                        <View style={styles.border}>
                            <View style={styles.info}>
                                <Text style={styles.tagline}>
                                    {this.type === 'movie' ? this.state.movie.tagline : ''}
                                </Text>
                                <Text>{movieObj.overview}</Text>
                            </View>
                        </View>

                        {/* Casts here */}
                        <Cast/>

                        {/* Reviews here if has any */}
                        <Reviews />
                    </View>
                )
            } else {
                return <ActivityIndicator size="large" />;
            }
        }

        let Cast = () => {
            return (
                    <View>
                        <View style={[styles.headerView]}>
                            <H3 style={[styles.headerText]}>Casts</H3>
                        </View>
                        <View style={styles.border}>
                            <View style={styles.info}>
                                <MovieCastList casts={this.state.casts} loading={this.state.loading_cast}/>
                            </View>
                        </View>
                    </View>
                )
        }

        let Reviews = () => {
            if (this.type === 'movie') {
                return (
                    <View>
                        <View style={[styles.headerView]}>
                            <H3 style={[styles.headerText]}>Reviews</H3>
                        </View>
                        <View style={styles.border}>
                            <View style={styles.info}>
                                <MovieReviewsList movieId={this.movie.id} />
                            </View>
                        </View>
                    </View>
                )
            } else {
                return null
            }
        }

        return (
            <ScrollView>
                <View style={[styles.header, styles.border]}>
                    <Image source={{ uri: image_path.concat(movieObj.backdrop_path) }}
                        resizeMode="contain" resizeMethod='scale'
                        style={styles.image} />
                    <View style={styles.title_background}>
                        <Text style={styles.title}>{movieObj.title}</Text>
                    </View>
                </View>
                <Content />

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
    },
    info: {
        margin: 16,
    },
    tagline: {
        fontSize: 18,
        fontWeight: 'bold',
        fontStyle: 'italic'
    },
    headerView: {
        backgroundColor: '#c9c9c9'
    },
    headerText: {
        marginLeft: 10,
        marginTop: 5,
        marginBottom: 5
    }
}));

//make this component available to the app
export default MovieDetail;
