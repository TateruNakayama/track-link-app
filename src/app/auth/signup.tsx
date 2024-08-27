import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Dimensions, Image } from 'react-native'
import { Link, router } from 'expo-router'
import { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../config'

import mainlogo from '../../../assets/mainlogo.png'
import Button from '../../components/Button'

const handlePress = (email: string, password: string): void => {
    // 会員登録処理
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log(userCredential.user.uid)
            router.replace('/memo/list')
        })
        .catch((error) => {
            const { code, message } = error
            console.log(code, message)
            Alert.alert(message)
        })
}

const SignUp = (): JSX.Element => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    return (
        <View style={styles.container}>
            <View style={styles.inner}>
                <Image source={mainlogo} style={styles.logo} />
                <Text style={styles.title}>Track Link</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={(text) => { setEmail(text) }}
                    autoCapitalize='none'
                    keyboardType='email-address'
                    placeholder='Email Address'
                    textContentType='emailAddress'
                />
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={(text) => { setPassword(text) }}
                    autoCapitalize='none'
                    secureTextEntry
                    placeholder='Password'
                    textContentType='password'
                />
                <Button onPress={() => { handlePress(email, password) }} label='Submit' />
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Already registered?</Text>
                    <Link href='/auth/login' asChild>
                        <TouchableOpacity>
                            <Text style={styles.footerLink}>Log In</Text>
                        </TouchableOpacity>
                    </Link>
                </View>
            </View>
        </View>
    )
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2C2C2C'
    },
    logo: {
        width: width * 0.4,
        height: width * 0.4,
        marginTop: 80,
        marginBottom: 24,
        alignSelf: 'center'
    },
    inner: {
        paddingVertical: 24,
        paddingHorizontal: 27
    },
    title: {
        fontSize: 28,
        lineHeight: 32,
        fontWeight: 'bold',
        marginBottom: 24,
        color: '#F86456',
        textAlign: 'center'
    },
    input: {
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#DDDDDD',
        height: 48,
        padding: 8,
        fontSize: 16,
        marginBottom: 16,
        borderRadius: 10
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    footerText: {
        fontSize: 14,
        lineHeight: 24,
        marginRight: 8,
        color: '#ffffff',

    },
    footerLink: {
        fontSize: 14,
        lineHeight: 24,
        color: '#467FD3'
    }
})

export default SignUp