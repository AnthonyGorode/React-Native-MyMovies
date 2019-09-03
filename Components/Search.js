import React, { Component } from 'react';
import { StyleSheet,View, Button, TextInput, FlatList, ActivityIndicator } from 'react-native';

import FilmItem from './FilmItem';
import { searchMovieByQuery, moviesDiscover } from '../Config/API/apiMovies';
import Loadable from './utils/Loadable';

export default class Search extends Component {
    constructor(props){
        super(props);
        this.state = {
            films : [],
            isLoading: true
        }
        this.searchText = ""
    }

    _loadFilms = () => {
        this.setState({
            isLoading: true
        })
        if(this.searchText.length > 0){
            searchMovieByQuery(this.searchText).then((data) => {
                this.setState({
                    films : data.results,
                    isLoading: false
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
                films: data.results,
                isLoading: false
            })
        })
    }

    render(){
        
        return (
            <View style={styles.container}>
                <TextInput onSubmitEditing={ () => this._loadFilms() } onChangeText={(text) => this._searchTextInputChanged(text) } style={styles.search} placeholder="Titre du film" />
                <Button style={styles.button} title="Rechercher" onPress={ () => this._loadFilms() } />
                
                {this.state.isLoading ? (
                    <Loadable styles={ styles.loadable } />
                ) : (
                    <FlatList
                        data={ this.state.films }
                        keyExtractor={ item => item.id.toString() }
                        renderItem={ ({ item }) => <FilmItem film={ item }/> }
                    />
                )}
            </View>
        )
        
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 24,
        flex: 1
    },
    search:{
        margin: 5,
        height: 50,
        borderWidth: 0.2,
        borderColor: "grey",
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.60,

        elevation: 1,
        paddingLeft: 5
    },
    button: {
        height: 50
    },
    loadable: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})