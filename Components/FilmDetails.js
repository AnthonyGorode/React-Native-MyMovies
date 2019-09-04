import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

class FilmDetails extends Component {
    render(){
        const film = this.props.navigation.getParam("film");

        const url_img = 'https://image.tmdb.org/t/p/w500' + film.poster_path
        const date = new Date(film.release_date);
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();

        return (
            <>
                <View style={styles.main_container}>
                    <Image
                        style={styles.image}
                        source={{ uri: url_img }}
                    />
                    <View style={styles.content_container}>
                        <View style={styles.header_container}>
                            <Text style={styles.title_text}>{film.title}</Text>
                        </View>
                        <View style={styles.details_container}>
                            <Text style={styles.vote_text}>{film.vote_average}/10</Text>
                            <Text style={styles.vote_text}>Vote : {film.vote_count}</Text>
                            <Text style={styles.vote_text}>({film.popularity})</Text>
                        </View>
                        <View style={styles.date_container}>
                            <Text style={styles.date_text}>Sorti le {`${day}/${month}/${year}`}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.description_container}>
                    <Text style={styles.description_text}>{film.overview}</Text>
                </View>
            </>
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
    details_container: {
        flex: 4,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },  
    description_container: {
        alignItems: 'stretch'
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
        fontStyle: 'italic',
        fontSize: 11,
        color: '#666666'
    },
    description_text: {
        fontWeight: 'bold',
        color: '#666666'
    },
    date_text: {
        textAlign: 'right',
        fontSize: 14
    }
})

export default FilmDetails