import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const Loadable = (props) => {
    return (
        <View style={props.styles}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    )
}

export default Loadable;