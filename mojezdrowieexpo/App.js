/*
  App.js - Moje Zdrowie (Full MVP offline)
  - React Native (Expo)
  - Single-file, all-in-one for quick start
*/

import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, FlatList, TextInput, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const STORAGE_KEY = 'moje_zdrowie_data_v3';
const PIN_KEY = 'moje_zdrowie_pin_v1';

// ---------- Initial data ----------
const initialHealthData = {
  user: { name: 'Użytkownik', birthdate: '1985-01-01', gender: 'M' },
  vaccinations: [
    { id: "dtp", name: "Błonica, Tężec, Krztusiec (DTP)", frequency_years: 10, category: "rutynowe", last_done: null, next_due: null },
    { id: "polio", name: "Polio (IPV)", frequency_years: null, category: "rutynowe", last_done: null, next_due: null },
    { id: "mmr", name: "Odra, Świnka, Różyczka (MMR)", frequency_years: null, category: "rutynowe", last_done: null, next_due: null },
    { id: "hepatitis_b", name: "Wirusowe zapalenie wątroby typu B (HBV)", frequency_years: null, category: "rutynowe", last_done: null, next_due: null },
    { id: "hepatitis_a", name: "Wirusowe zapalenie wątroby typu A (HAV)", frequency_years: null, category: "zalecane", last_done: null, next_due: null },
    { id: "influenza", name: "Grypa (Influenza)", frequency_years: 1, category: "sezonowe", last_done: null, next_due: null },
    { id: "covid", name: "COVID-19", frequency_years: 1, category: "rutynowe", last_done: null, next_due: null },
    { id: "hpv", name: "Wirus brodawczaka ludzkiego (HPV)", frequency_years: null, category: "zalecane", last_done: null, next_due: null },
    { id: "pneumococci", name: "Pneumokoki", frequency_years: null, category: "zalecane", last_done: null, next_due: null },
    { id: "herpes_zoster", name: "Półpasiec (Herpes zoster)", frequency_years: null, category: "zalecane", last_done: null, next_due: null },
    { id: "meningococci", name: "Meningokoki", frequency_years: null, category: "zalecane", last_done: null, next_due: null },
    { id: "tbc", name: "Gruźlica (BCG)", frequency_years: null, category: "rutynowe", last_done: null, next_due: null },
    { id: "rotavirus", name: "Rotawirusy", frequency_years: null, category: "rutynowe", last_done: null, next_due: null },
    { id: "varicella", name: "Ospa wietrzna (Varicella)", frequency_years: null, category: "rutynowe", last_done: null, next_due: null }
  ],
  tests: [
  { id: "morfologia", name: "Morfologia krwi", frequency_years: 1, category: "rutynowe", last_done: null, next_due: null },
  { id: "glukoza", name: "Glukoza na czczo", frequency_years: 1, category: "rutynowe", last_done: null, next_due: null },
  { id: "lipidogram", name: "Lipidogram (cholesterol, TG)", frequency_years: 1, category: "rutynowe", last_done: null, next_due: null },
  { id: "tsh", name: "TSH", frequency_years: 1, category: "rutynowe", last_done: null, next_due: null },
  { id: "kreatynina", name: "Kreatynina / eGFR", frequency_years: 1, category: "rutynowe", last_done: null, next_due: null },
  { id: "mocz", name: "Badanie ogólne moczu", frequency_years: 1, category: "rutynowe", last_done: null, next_due: null },
  { id: "bilirubina", name: "Bilirubina, AST, ALT", frequency_years: 1, category: "rutynowe", last_done: null, next_due: null },
  { id: "witamina_d", name: "Witamina D", frequency_years: 2, category: "zalecane", last_done: null, next_due: null },
  { id: "wapn", name: "Wapń i magnez", frequency_years: 2, category: "zalecane", last_done: null, next_due: null },
  { id: "hbA1c", name: "HbA1c", frequency_years: 1, category: "rutynowe", last_done: null, next_due: null },
  { id: "cancer_men", name: "PSA (mężczyźni)", frequency_years: 1, category: "rutynowe", last_done: null, next_due: null },
  { id: "cancer_women", name: "Cytologia / USG piersi (kobiety)", frequency_years: 1, category: "rutynowe", last_done: null, next_due: null },
  { id: "ekg", name: "EKG spoczynkowe", frequency_years: 1, category: "zalecane", last_done: null, next_due: null },
  { id: "cisnienie", name: "Pomiar ciśnienia krwi", frequency_years: 1, category: "rutynowe", last_done: null, next_due: null },
  { id: "mocznik", name: "Mocznik", frequency_years: 1, category: "rutynowe", last_done: null, next_due: null },
  { id: "kwas_moczowy", name: "Kwas moczowy", frequency_years: 1, category: "zalecane", last_done: null, next_due: null },
  { id: "witamina_b12", name: "Witamina B12", frequency_years: 2, category: "zalecane", last_done: null, next_due: null },
  { id: "ferrytyna", name: "Ferrytyna / żelazo", frequency_years: 1, category: "zalecane", last_done: null, next_due: null },
  { id: "magnet_resonans", name: "USG jamy brzusznej", frequency_years: 3, category: "zalecane", last_done: null, next_due: null },
  { id: "densytometria", name: "Densytometria kości", frequency_years: 2, category: "zalecane", last_done: null, next_due: null },
  { id: "krzepliwosc", name: "APTT / INR", frequency_years: 1, category: "zalecane", last_done: null, next_due: null }
  ]
};

// ---------- Utils ----------
function addYearsToDateString(dateString, years) {
  if (!dateString) return null;
  const d = new Date(dateString);
  d.setFullYear(d.getFullYear() + years);
  return d.toISOString().split('T')[0];
}

function todayDateString() {
  return new Date().toISOString().split('T')[0];
}

async function loadLocalData() {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : null;
}

async function saveLocalData(obj) {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
}

function markItemDone(item) {
  const today = todayDateString();
  return {
    ...item,
    last_done: today,
    next_due: item.frequency_years ? addYearsToDateString(today, item.frequency_years) : null
  };
}

// ---------- Screens ----------
function SimpleHeader({ title }) {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
}

function DashboardScreen({ navigation }) {
  const [data, setData] = useState(null);

  const load = useCallback(async () => {
    const d = await loadLocalData();
    if (!d) return;
    setData(d);
  }, []);

  useEffect(() => { load(); }, []);

  if (!data) return <SafeAreaView style={styles.container}><Text>Ładowanie...</Text></SafeAreaView>;

  const upcoming = [...data.tests, ...data.vaccinations]
    .filter(i => i.next_due)
    .sort((a, b) => new Date(a.next_due) - new Date(b.next_due))
    .slice(0, 3);

  return (
    <SafeAreaView style={styles.container}>
      <SimpleHeader title={`Witaj, ${data.user.name}`} />

      <Text style={styles.sectionTitle}>Najbliższe terminy</Text>
      {upcoming.length === 0 ? <Text>Brak zaplanowanych terminów.</Text> :
        upcoming.map(it => (
          <Text key={it.id} style={styles.item}>{it.name} — {it.next_due}</Text>
        ))
      }

      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('List', { mode: 'tests' })}>
        <Text style={styles.btnText}>Badania</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('List', { mode: 'vaccinations' })}>
        <Text style={styles.btnText}>Szczepienia</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Profile')}>
        <Text style={styles.btnText}>Profil</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Calendar')}>
        <Text style={styles.btnText}>Kalendarz</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

function ListScreen({ route }) {
  const { mode } = route.params;
  const [data, setData] = useState([]);

  const load = useCallback(async () => {
    const saved = await loadLocalData();
    if (!saved) return;
    setData(mode === 'tests' ? saved.tests : saved.vaccinations);
  }, [mode]);

  useEffect(() => { load(); }, []);

  const onMarkDone = async (item) => {
    Alert.alert('Potwierdź', `Oznaczyć "${item.name}" jako wykonane dzisiaj?`, [
      { text: 'Anuluj', style: 'cancel' },
      { text: 'Tak', onPress: async () => {
        const d = await loadLocalData();
        if (!d) return;
        if (mode === 'tests') d.tests = d.tests.map(t => t.id === item.id ? markItemDone(t) : t);
        else d.vaccinations = d.vaccinations.map(v => v.id === item.id ? markItemDone(v) : v);
        await saveLocalData(d);
        setData(mode === 'tests' ? d.tests : d.vaccinations);
        Alert.alert('Zapisano');
      }}
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <SimpleHeader title={mode==='tests'?'Badania':'Szczepienia'} />
      <FlatList
        data={data.sort((a,b)=> (a.next_due||'')>(b.next_due||'')?1:-1)}
        keyExtractor={i=>i.id.toString()}
        renderItem={({item})=>(
          <View style={styles.row}>
            <View>
              <Text style={styles.item}>{item.name}</Text>
              <Text style={styles.sub}>Ostatnie: {item.last_done||'—'}</Text>
              <Text style={styles.sub}>Następne: {item.next_due||'—'}</Text>
            </View>
            <TouchableOpacity style={styles.smallBtn} onPress={()=>onMarkDone(item)}>
              <Text style={styles.btnText}>Wykonane</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

function CalendarScreen() {
  const [data,setData] = useState(null);

  const load = useCallback(async()=>{
    const d = await loadLocalData();
    if (!d) return;
    setData(d);
  },[]);

  useEffect(()=>{ load(); },[]);

  if(!data) return <SafeAreaView style={styles.container}><Text>Ładowanie...</Text></SafeAreaView>;

  const items = [...data.tests,...data.vaccinations].filter(i=>i.next_due);
  const grouped = items.reduce((acc,it)=>{
    if(!acc[it.next_due]) acc[it.next_due]=[];
    acc[it.next_due].push(it);
    return acc;
  },{});

  const dates = Object.keys(grouped).sort();

  return (
    <SafeAreaView style={styles.container}>
      <SimpleHeader title="Kalendarz"/>
      {dates.map(d=>(
        <View key={d} style={styles.calendarDay}>
          <Text style={styles.calendarDate}>{d}</Text>
          {grouped[d].map(it=><Text key={it.id} style={styles.calendarItem}>• {it.name}</Text>)}
        </View>
      ))}
    </SafeAreaView>
  );
}

function ProfileScreen() {
  const [data,setData] = useState(null);
  const [pin,setPin] = useState('');
  const [hasPin,setHasPin] = useState(false);

  const load = useCallback(async()=>{
    const d = await loadLocalData();
    setData(d||initialHealthData);
    const p = await AsyncStorage.getItem(PIN_KEY);
    setHasPin(!!p);
  },[]);

  useEffect(()=>{ load(); },[]);

  const savePin = async ()=>{
    if(pin.length<4){ Alert.alert('PIN musi mieć co najmniej 4 cyfry'); return; }
    await AsyncStorage.setItem(PIN_KEY,pin);
    Alert.alert('PIN zapisany');
    setHasPin(true);
    setPin('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <SimpleHeader title="Profil"/>
      <Text>Imię: {data?.user?.name}</Text>
      <Text>Data urodzenia: {data?.user?.birthdate}</Text>
      <Text>Płeć: {data?.user?.gender}</Text>

      {!hasPin && <>
        <TextInput value={pin} onChangeText={setPin} placeholder="Wpisz PIN" keyboardType="number-pad" style={styles.input}/>
        <TouchableOpacity style={styles.btn} onPress={savePin}><Text style={styles.btnText}>Zapisz PIN</Text></TouchableOpacity>
      </>}
    </SafeAreaView>
  );
}

// ---------- App + Navigation ----------
const Stack = createNativeStackNavigator();

export default function App(){
  const [initialized,setInitialized]=useState(false);

  useEffect(()=>{
    (async()=>{
      const existing=await loadLocalData();
      if(!existing){
        const today=todayDateString();
        const init=JSON.parse(JSON.stringify(initialHealthData));
        init.tests=init.tests.map(t=>({...t,last_done:null,next_due:t.frequency_years?today:null}));
        init.vaccinations=init.vaccinations.map(v=>({...v,last_done:null,next_due:v.frequency_years?today:null}));
        await saveLocalData(init);
      }
      setInitialized(true);
    })();
  },[]);

  if(!initialized) return <SafeAreaView style={styles.container}><Text>Przygotowywanie aplikacji...</Text></SafeAreaView>;

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Dashboard">
        <Stack.Screen name="Dashboard" component={DashboardScreen}/>
        <Stack.Screen name="List" component={ListScreen}/>
        <Stack.Screen name="Calendar" component={CalendarScreen}/>
        <Stack.Screen name="Profile" component={ProfileScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// ---------- Styles ----------
const styles = StyleSheet.create({
  container:{flex:1,backgroundColor:'#fff',padding:16},
  header:{padding:12,backgroundColor:'#0066CC'},
  headerText:{color:'#fff',fontWeight:'600',fontSize:18},
  sectionTitle:{fontSize:16,fontWeight:'600',marginVertical:8},
  item:{fontSize:16,marginVertical:2},
  sub:{fontSize:14,color:'#555'},
  row:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',padding:10,backgroundColor:'#F5F5F5',marginVertical:4,borderRadius:6},
  btn:{backgroundColor:'#28A745',padding:12,borderRadius:8,marginVertical:6,alignItems:'center'},
  smallBtn:{backgroundColor:'#0a84ff',paddingHorizontal:12,paddingVertical:6,borderRadius:6},
  btnText:{color:'#fff',fontWeight:'600'},
  calendarDay:{paddingVertical:8,borderBottomWidth:1,borderBottomColor:'#EEE'},
  calendarDate:{fontWeight:'700'},
  calendarItem:{marginLeft:8,color:'#333'},
  input:{borderWidth:1,borderColor:'#DDD',padding:8,borderRadius:6,marginTop:8}
});
