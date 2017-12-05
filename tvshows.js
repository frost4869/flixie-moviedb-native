//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, LayoutAnimation, UIManager } from 'react-native';
import MovieList from './MovieList'

const api_key = '09e4cc13c99312bf18cad8339e83bc82';
const lang = 'en-US';

// create a component
class TvShows extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tvshows: [],
            loading: true,
            page: 1,
            isRefreshing: false,
            hasMore: true
        }

        this.handleRefresh = this.handleRefresh.bind(this)
        this.handleLoadmore = this.handleLoadmore.bind(this)

    }

    async fecthTvShows(page) {
        const tvshow_uri = `https://api.themoviedb.org/3/discover/tv?api_key=${api_key}&language=${lang}&page=${page}`;
        let data = await fetch(tvshow_uri);
        let result = await data.json();

        if (result.total_pages == page) {
            this.setState({
                hasMore: false
            })
        }

        return result.results;
    }

    async handleLoadmore() {
        if (this.state.hasMore) {
            const page = this.state.page + 1;
            this.setState({
                loading: true
            })
            await this.fecthTvShows(page).then((tvshows) => {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);

                this.setState({
                    tvshows: this.state.tvshows.concat(tvshows),
                    page,
                    loading: false
                })
            })
        }
    }

    async handleRefresh() {
        const page = 1;
        this.setState({
            tvshows: [],
            isRefreshing: true
        })
        await this.fecthTvShows(page).then((tvshows) => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);

            this.setState({
                tvshows,
                page,
                isRefreshing: false
            })
        })
    }

    async componentWillMount() {
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        await this.fecthTvShows(this.state.page).then((tvshows) => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);

            this.setState({
                tvshows,
                loading: false
            })
        })
    }

    render() {
        return (
            <MovieList movies={this.state.tvshows}
                handleRefresh={this.handleRefresh}
                loading={this.state.loading}
                handleLoadmore={this.handleLoadmore}
                isRefreshing={this.state.isRefreshing}
                navigate={this.props.navigation.navigate}
                type='tv' 
                hasMore={this.state.hasMore}/>
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
export default TvShows;
