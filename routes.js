//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation'
import { Icon } from 'native-base'
import MovieList from './MovieList'
import DiscoverMovie from './discover'
import MovieDetail from './MovieDetail'

export const MovieTabs = TabNavigator({
    NowPlaying: {
        screen: MovieList,
        navigationOptions: {
            tabBarLabel: 'movies',
        }
    },
    Discover: {
        screen: DiscoverMovie,
        navigationOptions: {
            tabBarLabel: 'Tv Shows',
        }
    }
}, {
        tabBarOptions: {
            style: {
                backgroundColor: '#395c93',
            },
        }
    })

export const StackRoute = StackNavigator({
    MovieList: {
        screen: MovieTabs,
        navigationOptions: ({ navigation }) =>
            ({
                title: "Flixie",
                headerLeft: <Icon name='menu' style={{ marginLeft: 15, color: '#ffffff' }} onPress={() => { navigation.navigate('DrawerOpen') }} />,
                headerStyle: {
                    backgroundColor: '#395c93'
                },
                headerTintColor: '#ffffff'

            })
    },
    MovieDetail: {
        screen: MovieDetail,
        navigationOptions: ({ navigation }) =>
            ({
                title: `${navigation.state.params.title}`
            })
    }
})

export const Drawer = DrawerNavigator({
    Home: {
        screen: StackRoute,
        path: '/'
    },
    Discover: {
        screen: DiscoverMovie,
        path: '/discover'
    }
}, {
        initialRouteName: 'Home',
        drawerPosition: 'left'
    })