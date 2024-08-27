import { Text, TouchableOpacity, StyleSheet, type ViewStyle } from 'react-native'

interface Props {
    label: string
    style?: ViewStyle
    onPress?: () => void
    
}

const Button = (props: Props): JSX.Element => {
    const { label, onPress, style } = props
    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
            <Text style={styles.buttonLabel}>{label}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#F86456',
        borderRadius: 10,
        alignSelf: 'flex-start',
        marginBottom: 24,
        width: '100%'
    },
    buttonLabel: {
        fontSize: 16,
        lineHeight: 32,
        color: '#ffffff',
        paddingVertical: 8,
        paddingHorizontal: 24,
        textAlign: 'center',
        fontWeight: 'bold'
    }
})

export default Button