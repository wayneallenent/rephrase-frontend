import React, { useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
const tones = [
  { id: 'heartfelt', label: 'Heartfelt', hint: 'Open and sincere' },
  { id: 'warm', label: 'Warm', hint: 'Kind and thoughtful' },
  { id: 'encouraging', label: 'Encouraging', hint: 'Supportive and uplifting' },
  { id: 'confident', label: 'Confident', hint: 'Clear and self-assured' },
  { id: 'apologetic', label: 'Apologetic', hint: 'Accountable and genuine' },
  { id: 'professional', label: 'Professional', hint: 'Polished and respectful' },
  { id: 'direct', label: 'Direct', hint: 'Brief and straightforward' },
] as const;
type Tone = (typeof tones)[number]['id'];
const apiBaseUrl = (process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000').replace(/\/+$/, '');
export default function RephraseScreen() {
  const [text, setText] = useState('');
  const [tone, setTone] = useState<Tone>('heartfelt');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const handleRephrase = async () => {
    const trimmedText = text.trim();
    if (!trimmedText || loading) return;
    setLoading(true); setError(''); setOutput('');
    try {
      const response = await fetch(apiBaseUrl + '/rephrase', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text: trimmedText, tone }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'We could not rewrite that message. Try again.');
      setOutput(data.rephrasedText || 'No rewritten message came back. Try again.');
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Could not reach the Rephrase service. Check your connection and try again.');
    } finally { setLoading(false); }
  };
  return <ScrollView contentContainerStyle={styles.page} keyboardShouldPersistTaps="handled">
    <View style={styles.header}><Text style={styles.eyebrow}>SAY IT THE WAY YOU MEAN IT</Text><Text style={styles.title}>Give your words the right feeling.</Text><Text style={styles.subtitle}>Start with what you want to say. Choose the feeling, and Rephrase will help you say it clearly while keeping your meaning.</Text></View>
    <View style={styles.section}><View style={styles.labelRow}><Text style={styles.label}>Your message</Text><Text style={styles.counter}>{text.length}/3000</Text></View><TextInput accessibilityLabel="Your message to rewrite" style={styles.input} placeholder="Type the message you want to send..." placeholderTextColor="#86909A" multiline maxLength={3000} textAlignVertical="top" value={text} onChangeText={setText} /></View>
    <View style={styles.section}><Text style={styles.label}>How should it feel?</Text><View style={styles.tones}>{tones.map((item) => { const selected = tone === item.id; return <Pressable key={item.id} accessibilityRole="radio" accessibilityState={{ selected }} accessibilityLabel={item.label + ': ' + item.hint} onPress={() => setTone(item.id)} style={[styles.toneCard, selected && styles.toneCardSelected]}><Text style={[styles.toneTitle, selected && styles.toneTitleSelected]}>{item.label}</Text><Text style={styles.toneHint}>{item.hint}</Text></Pressable>; })}</View></View>
    <Pressable accessibilityRole="button" accessibilityLabel="Rewrite my message" disabled={!text.trim() || loading} onPress={handleRephrase} style={({ pressed }) => [styles.button, (!text.trim() || loading) && styles.buttonDisabled, pressed && !loading && styles.buttonPressed]}>{loading ? <ActivityIndicator color="#FFFFFF" /> : null}<Text style={styles.buttonText}>{loading ? 'Finding the right words…' : 'Rephrase my message'}</Text></Pressable>
    {error ? <View accessibilityRole="alert" style={styles.errorBox}><Text style={styles.errorText}>{error}</Text></View> : null}
    {output ? <View style={styles.resultCard}><Text style={styles.resultLabel}>YOUR REPHRASED MESSAGE</Text><Text selectable style={styles.resultText}>{output}</Text><Pressable accessibilityRole="button" accessibilityLabel="Use the rewritten message as my draft" onPress={() => { setText(output); setOutput(''); }} style={styles.editButton}><Text style={styles.editButtonText}>Use as my draft</Text></Pressable></View> : null}
    <Text style={styles.privacyNote}>Your draft is sent to the Rephrase service to create a rewrite.</Text>
  </ScrollView>;
}
const styles = StyleSheet.create({
  page: { flexGrow: 1, backgroundColor: '#F6F4F0', paddingHorizontal: 22, paddingTop: 30, paddingBottom: 40, gap: 24 }, header: { gap: 10 }, eyebrow: { color: '#7A584A', fontSize: 12, fontWeight: '800', letterSpacing: 1.5 }, title: { color: '#202B33', fontSize: 30, fontWeight: '800', lineHeight: 36 }, subtitle: { color: '#56616A', fontSize: 16, lineHeight: 23 }, section: { gap: 10 }, labelRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, label: { color: '#27343D', fontSize: 16, fontWeight: '700' }, counter: { color: '#66737C', fontSize: 13 },
  input: { minHeight: 142, backgroundColor: '#FFFFFF', borderColor: '#D6D8D5', borderWidth: 1, borderRadius: 16, padding: 16, color: '#202B33', fontSize: 16, lineHeight: 23 }, tones: { flexDirection: 'row', flexWrap: 'wrap', gap: 9 }, toneCard: { minWidth: '47%', flexGrow: 1, backgroundColor: '#FFFFFF', borderColor: '#D6D8D5', borderWidth: 1, borderRadius: 13, padding: 12, minHeight: 64, justifyContent: 'center' }, toneCardSelected: { backgroundColor: '#E9F1EF', borderColor: '#286B62', borderWidth: 2 }, toneTitle: { color: '#27343D', fontSize: 15, fontWeight: '700' }, toneTitleSelected: { color: '#174E47' }, toneHint: { color: '#66737C', fontSize: 12, marginTop: 3 }, button: { minHeight: 54, backgroundColor: '#286B62', borderRadius: 15, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 10, paddingHorizontal: 18 }, buttonDisabled: { backgroundColor: '#8B9D99' }, buttonPressed: { opacity: 0.85 }, buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '800' }, errorBox: { backgroundColor: '#FCE8E6', borderRadius: 12, padding: 14 }, errorText: { color: '#8C2E27', fontSize: 14, lineHeight: 20 }, resultCard: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 18, gap: 12, borderWidth: 1, borderColor: '#D6D8D5' }, resultLabel: { color: '#286B62', fontSize: 12, fontWeight: '800', letterSpacing: 1.2 }, resultText: { color: '#202B33', fontSize: 17, lineHeight: 25 }, editButton: { alignSelf: 'flex-start', minHeight: 44, justifyContent: 'center', paddingHorizontal: 10 }, editButtonText: { color: '#205C54', fontSize: 14, fontWeight: '700' }, privacyNote: { color: '#66737C', fontSize: 12, lineHeight: 18, textAlign: 'center' },
});
