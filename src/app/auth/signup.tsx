import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Dimensions, Image, ScrollView, KeyboardAvoidingView } from 'react-native'
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
    const isDisabled = !email || !password
    return (
<KeyboardAvoidingView
        style={styles.container}
        behavior={'padding'}
         >
            <ScrollView contentContainerStyle={styles.inner} keyboardShouldPersistTaps='handled'>
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
                    <Button
                    onPress={() => { handlePress(email, password) }}
                    label='登録'
                    style={isDisabled ? styles.disabledButton : styles.enabledButton}
                    disabled={isDisabled}
                    />
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>登録がお済みの方は</Text>
                        <Link href='/auth/login' asChild>
                            <TouchableOpacity>
                                <Text style={styles.footerLink}>ログイン</Text>
                            </TouchableOpacity>
                            </Link>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2C2C2C'
    },
    inner: {
        paddingVertical: 24,
        paddingHorizontal: 27,
        flexGrow: 1,
        justifyContent: 'center'
    },
    logo: {
        width: width * 0.4,
        height: width * 0.4,
        marginTop: 122,
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
        fontSize: 28,
        lineHeight: 32,
        fontWeight: 'bold',
        marginBottom: 110,
        color: '#F86456',
        textAlign: 'center',
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
    enabledButton: {
        backgroundColor: '#F86456',
    },
    disabledButton: {
        backgroundColor: '#A9A9A9',
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

export default SignUp