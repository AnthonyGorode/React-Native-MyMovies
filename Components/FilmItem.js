import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default class FilmItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { film, displayDetailsFilm } = this.props

        const url_img = 'https://image.tmdb.org/t/p/w500'+ film.poster_path
        const date = new Date(film.release_date);
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();
        return (
            <TouchableOpacity 
                style={styles.main_container}
                onPress={ () => displayDetailsFilm(film) }
            >
                <Image
                    style={styles.image}
                    source={{ uri: url_img }}
                />
                <View style={styles.content_container}>
                    <View style={styles.header_container}>
                        <Text style={styles.title_text}>{ film.title }</Text>
                        <Text style={styles.vote_text}>{ film.vote_average }/10</Text>
                    </View>
                    <View style={styles.description_container}>
                        <Text style={styles.description_text} numberOfLines={6}>{film.overview }</Text>
                    </View>
                    <View style={styles.date_container}>
                        <Text style={styles.date_text}>Sorti le {`${day}/${month}/${year}`}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flexDirection: 'row',
        height: 190
    },
    image: {
        width: 120,
        height: 180,
        margin: 5
    },
    content_container: {
        flex: 1,
        margin: 5
    },
    header_container: {
        flex: 3,
        flexDirection: 'row'
    },
    description_container: {
        flex: 7
    },
    date_container: {
        flex: 1
    },
    title_text: {
        flex: 1,
        fontSize: 20,
        flexWrap: 'wrap',
        fontWeight: 'bold',
        paddingRight: 5
    },
    vote_text: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#666666'
    },
    description_text: {
        fontStyle: 'italic',
        color: '#666666'
    },
    date_text: {
        textAlign: 'right',
        fontSize: 14
    }
})