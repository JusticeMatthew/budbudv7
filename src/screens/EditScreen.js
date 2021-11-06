import React, { useState, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FirebaseContext } from '../context/FirebaseContext';
import { UserContext } from '../context/UserContext';

import colors from '../design/colors';

export default function PostScreen({ navigation, route }) {
  const { params } = route;

  const [name, setName] = useState(params.name);
  const [price, setPrice] = useState(params.price);
  const [type, setType] = useState(params.type);
  const [location, setLocation] = useState(params.location);
  const [thc, setThc] = useState(params.thc);
  const [cbd, setCbd] = useState(params.cbd);
  const [notes, setNotes] = useState(params.notes);

  const firebase = useContext(FirebaseContext);
  const [user] = useContext(UserContext);

  const handlePost = async () => {
    if (!name.trim()) {
      alert('Your bud requires at least a name');
      return;
    }

    try {
      await firebase.editBud({
        uid: user.uid,
        docId: params.docId,
        name: name.trim(),
        price: price,
        type: type.trim(),
        location: location.trim(),
        thc: thc,
        cbd: cbd,
        notes: notes,
      });
    } catch (error) {
      alert(error);
    } finally {
      setName('');
      setPrice('');
      setType('');
      setLocation('');
      setThc('');
      setCbd('');
      setNotes('');
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='light' />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name='md-arrow-back' size={24} color={colors.gray} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePost} style={styles.addButton}>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Update</Text>
        </TouchableOpacity>
      </View>
      <ScrollView keyboardShouldPersistTaps='always'>
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Strain Name</Text>
          <TextInput
            autoFocus={true}
            style={styles.input}
            onChangeText={(name) => setName(name)}
            value={name}
          ></TextInput>
          <Text style={styles.inputTitle}>Price</Text>
          <TextInput
            keyboardType='number-pad'
            style={styles.input}
            onChangeText={(price) => setPrice(price)}
            value={price}
          ></TextInput>
          <Text style={styles.inputTitle}>Type of Medicine</Text>
          <TextInput
            style={styles.input}
            onChangeText={(type) => setType(type)}
            value={type}
          ></TextInput>
          <Text style={styles.inputTitle}>Purchase Location</Text>
          <TextInput
            style={styles.input}
            onChangeText={(location) => setLocation(location)}
            value={location}
          ></TextInput>
          <Text style={styles.inputTitle}>THC Level</Text>
          <TextInput
            style={styles.input}
            onChangeText={(thc) => setThc(thc)}
            value={thc}
          ></TextInput>
          <Text style={styles.inputTitle}>CBD Level</Text>
          <TextInput
            style={styles.input}
            onChangeText={(cbd) => setCbd(cbd)}
            value={cbd}
          ></TextInput>
          <Text style={styles.inputTitle}>Notes</Text>
          <TextInput
            style={[styles.input, { height: 108 }]}
            onChangeText={(notes) => setNotes(notes)}
            value={notes}
            multiline={true}
            numberOfLines={4}
          ></TextInput>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blue,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 32,
    paddingVertical: 18,
    marginTop: 64,
    borderBottomWidth: 1,
    borderBottomColor: '#dbd9db',
  },

  inputContainer: {
    marginVertical: 32,
    marginHorizontal: 30,
  },

  addButton: {
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    width: 96,
    height: 32,
    borderRadius: 4,
  },

  inputTitle: {
    color: 'whitesmoke',
    fontSize: 14,
    textTransform: 'uppercase',
    marginTop: 32,
  },

  input: {
    borderBottomColor: '#8a8f93',
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: 'whitesmoke',
  },
});
