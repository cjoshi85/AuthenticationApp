import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const Spinner = ({ size }) => (
    <View style={styles.spinnerStyle}>
        <ActivityIndicator size={size || 'large'} />
    </View>
    );

const styles = {
    spinnerStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    }
};

export { Spinner };
