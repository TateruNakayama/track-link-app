import { Stack } from 'expo-router'

const Layout = (): JSX.Element => {
    return <Stack screenOptions={{
        headerBackTitle: 'Back',
        headerShown: false
    }} />
}

export default Layout