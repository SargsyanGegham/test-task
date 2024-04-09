import React, {useState} from 'react';
import {TextInput, View, StyleSheet, Image} from 'react-native';
import {useAppDispatch} from '../../store';
import SearchIcon from '../../assets/search-plaeholder.png'; // Assuming this is the correct path to your search icon
import {setSearchQuery} from '../../store/slices/home.slice';

const RealtimeSearchInput = () => {
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQueryState] = useState('');

  let debounceTimeout: NodeJS.Timeout | null = null; // Store the timeout ID

  const handleChangeText = (text: string) => {
    setSearchQueryState(text); // Update the local state immediately

    // Clear the previous timeout if it exists
    if (debounceTimeout !== null) {
      clearTimeout(debounceTimeout);
    }

    // Set a new timeout to dispatch the search query after 300ms
    debounceTimeout = setTimeout(() => {
      dispatch(setSearchQuery(text)); // Dispatch the search query after the debounce delay
    }, 300);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Image source={SearchIcon} style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder="Search"
          onChangeText={handleChangeText}
          value={searchQuery}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 10,
    backgroundColor: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative', // Make the container relative for absolute positioning
    width: '100%',
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    paddingLeft: 30, // Adjust the left padding to accommodate the icon
  },
  searchIcon: {
    position: 'absolute',
    left: 10,
    zIndex: 1,
    width: 24,
    height: 24,
  },
});

export default RealtimeSearchInput;
