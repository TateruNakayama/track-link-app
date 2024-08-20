import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import Auth from './components/Auth'
import Account from './components/Account'
import { Session } from '@supabase/supabase-js'
import { View, StyleSheet, Pressable, Text, } from 'react-native'

// import=何を使うかを持ってくることを伝える

export default function App() {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonStyle: {
        backgroundColor: "#2525ff",
        width: 250,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50
    },
    buttonText: {
        color: "white",
        fontWeight: "bold"
    }
});
    // const=宣言CSS


  return (
    <View style={styles.container}>
      {session && session.user ? <Account key={session.user.id} session={session} /> : <Auth />}
      <Pressable
                style={styles.buttonStyle}
                onPress={ () => alert("ボタンが押されました") }
            >
                <Text style={styles.buttonText}>Sign in</Text>
            </Pressable>
    </View>
    // View=出力
  )
}