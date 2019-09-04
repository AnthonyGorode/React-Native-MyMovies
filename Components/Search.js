import React, { Component } from 'react';
import { StyleSheet,View, Button, TextInput, FlatList, ActivityIndicator } from 'react-native';

import FilmItem from './FilmItem';
import { searchMovieByQuery, moviesDiscover } from '../Config/API/apiMovies';
import Loadable from './utils/Loadable';

export default class Search extends Component {
    constructor(props){
        super(props);

        this.searchText = "";
        this.page = 0;
        this.totalPages = 0;

        this.state = {
            films : [],
            isLoading: true
        }

    }

    _searchFilms = () => {
        this.page = 0;
        this.totalPages = 0;

        this.setState({
            films : []
        }, () => {
            
            this._loadFilms();
        })
    }

    _loadFilms = () => {
        if(this.searchText.length > 0){
            this.setState({
                isLoading: true
            })
            searchMovieByQuery(this.searchText,this.page + 1).then((data) => {
                this.page = data.page;
                this.totalPages = data.total_pages;

                let filmsState = [...this.state.films]
                let filmsApi = [...data.results]

                lastFilm = filmsState.pop()
                firstFilm = filmsApi.shift()
                
                if( lastFilm !== undefined && lastFilm.id === firstFilm.id){
                    data.results.shift()
                }
                this.setState({
                    films : [...this.state.films, ...data.results],
                    isLoading: false
                })
                console.log("Page : " + this.page + " TotalPages : " + this.totalPages + " Nombre de films : " + this.state.films.length);
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
                <TextInput 
                    onSubmitEditing={ () => this._searchFilms() } 
                    onChangeText={(text) => this._searchTextInputChanged(text) } 
                    style={styles.search} 
                    placeholder="Titre du film" 
                />
                <Button 
                    style={styles.button} 
                    title="Rechercher" 
                    onPress={ () => this._searchFilms() } 
                />

                <FlatList
                    data={ this.state.films }
                    keyExtractor={item => item.id.toString() }
                    renderItem={ ({ item }) => <FilmItem film={ item }/> }
                    
                    onEndReachedThreshold={ 0.5 }
                    onEndReached={ () => { 
                        if(this.page < this.totalPages){
                            this._loadFilms();
                        }
                     }
                    }
                />
                    
                <Loadable 
                    styles={styles.loadable} 
                    isLoading={ this.state.isLoading } 
                />
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
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center"
    }
})