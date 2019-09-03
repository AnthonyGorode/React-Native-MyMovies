import React, { Component } from 'react';
import { StyleSheet, View, Button, TextInput, FlatList, Text } from 'react-native';

import FilmItem from './FilmItem';
import { searchMovieByQuery, moviesDiscover } from '../Config/API/apiMovies';

export default class Search extends Component {
    constructor(props){
        super(props);
        this.state = {
            films : []
        }
        this.searchText = ""
    }

    _loadFilms = () => {
        if(this.searchText.length > 0){
            searchMovieByQuery(this.searchText).then((data) => {
                this.setState({
                    films : data.results
                })
            })
        }
    }

    _searchTextInputChanged = (searchText) => {
        this.searchText = searchText
    }

    componentDidMount = () => {
        moviesDiscover().then((data) => {
            this.setState({
                films: data.results
            })
        })
    }

    render(){
        return (
            <View style={styles.container}>
                <TextInput onChangeText={(text) => this._searchTextInputChanged(text) } style={styles.search} placeholder="Titre du film" />
                <Button style={styles.button} title="Rechercher" onPress={ () => this._loadFilms() } />
                <FlatList
                    data={ this.state.films }
                    keyExtractor={ item => item.id.toString() }
                    renderItem={ ({ item }) => <FilmItem film={ item }/> }
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flex: 1
    },
    search:{
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        paddingLeft: 5
    },
    button: {
        height: 50
    }
})