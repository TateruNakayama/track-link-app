import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, Dimensions} from 'react-native'
import { Link, router } from 'expo-router'
import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../config'

import logo from '../../../assets/logo.png'
import Button from '../../components/Button'

const handlePress = (email: string, password: string): void => {
    // ログイン処理
    signInWithEmailAndPassword(auth, email, password)
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

const Login = (): JSX.Element => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    return (
        <View style={styles.container}>
            <View style={styles.inner}>
            <Image source={logo} style={styles.logo} />
                <Text style={styles.title}>Log In</Text>
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
                <Button onPress={() => { handlePress(email, password) }} label='ログイン' style={{ alignSelf: 'center' }} />
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Not registered?</Text>
                    <Link href='/auth/signup' asChild>
                        <TouchableOpacity>
                            <Text style={styles.footerLink}>Sign up here!</Text>
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
        width: width * 0.7,
        height: width * 0.7,
        marginTop: 80,
        marginBottom: 24,
        alignSelf: 'center'
    },
    image: {
        flex: 1,
        width: '100%',
        backgroundColor: '#0553'
    },
    inner: {
        paddingVertical: 24,
        paddingHorizontal: 27
    },
    title: {
        fontSize: 24,
        lineHeight: 32,
        fontWeight: 'bold',
        marginBottom: 24,
        textAlign: 'center',
        color: '#F86456'
    },
    input: {
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#DDDDDD',
        height: 48,
        padding: 8,
        fontSize: 16,
        marginBottom: 16
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    footerText: {
        fontSize: 14,
        lineHeight: 24,
        marginRight: 8,
        color: '#ffffff'
    },
    footerLink: {
        fontSize: 14,
        lineHeight: 24,
        color: '#467FD3'
    }
})


export default Login