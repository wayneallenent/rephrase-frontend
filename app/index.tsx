import { Link } from 'expo-router';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
export default function HomeScreen() {
  return <SafeAreaView style={styles.container}><View style={styles.card}>
    <Text style={styles.logo}>rephrase</Text>
    <Text style={styles.title}>Say what you mean, the way you mean it.</Text>
    <Text style={styles.subtitle}>Write your message, choose its feeling, and get a clearer version that keeps your meaning.</Text>
    <Link href="/rephrase" asChild><TouchableOpacity style={styles.button}><Text style={styles.buttonText}>Start Rephrasing</Text></TouchableOpacity></Link>
  </View></SafeAreaView>;
}
const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: '#F6F4F0', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24 }, card: { width: '100%', backgroundColor: '#FFFFFF', borderRadius: 20, padding: 24, gap: 16 }, logo: { fontSize: 20, fontWeight: '700', color: '#286B62', textTransform: 'uppercase', letterSpacing: 3 }, title: { fontSize: 24, fontWeight: '700', color: '#202B33' }, subtitle: { fontSize: 14, color: '#56616A' }, button: { marginTop: 16, backgroundColor: '#286B62', paddingVertical: 14, borderRadius: 999, alignItems: 'center' }, buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' } });
