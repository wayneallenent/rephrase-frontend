import { Link } from 'expo-router';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.logo}>rephrase</Text>
        <Text style={styles.title}>Turn rough ideas into clean, powerful text.</Text>
        <Text style={styles.subtitle}>
          Paste anything – texts, emails, posts – and we’ll rewrite it so it sounds sharp,
          confident, and like YOU.
        </Text>

        <Link href="/rephrase" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Start Rephrasing</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050816',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  card: {
    width: '100%',
    backgroundColor: '#111827',
    borderRadius: 20,
    padding: 24,
    gap: 16,
  },
  logo: {
    fontSize: 20,
    fontWeight: '700',
    color: '#38bdf8',
    textTransform: 'uppercase',
    letterSpacing: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#f9fafb',
  },
  subtitle: {
    fontSize: 14,
    color: '#9ca3af',
  },
  button: {
    marginTop: 16,
    backgroundColor: '#38bdf8',
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: 'center',
  },
  buttonText: {
    color: '#020617',
    fontSize: 16,
    fontWeight: '700',
  },
});
