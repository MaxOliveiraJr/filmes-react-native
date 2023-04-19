/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';

import {
  SafeAreaView,
  Text,
  View,
  Button,
  FlatList,
  Image,
  StyleSheet,
} from 'react-native';

function App() {
  const [movies, setMovies] = useState();

  const handleLoadButton = async () => {
    const req = await fetch('https://api.b7web.com.br/cinema/');
    const json = await req.json();

    if (json) {
      setMovies(json);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Button title="Carregar Filmes" onPress={handleLoadButton}></Button>
      <Text style={styles.totalMoviesText}>
        Total de Filmes: {movies?.length}
      </Text>
      <FlatList
        style={styles.list}
        data={movies}
        renderItem={({ item }) => (
          <View style={styles.movieItem}>
            <Image
              source={{ uri: item.avatar }}
              style={styles.movieImage}
            />
            <Text style={styles.movieTitle}>{item.titulo}</Text>
          </View>
        )}
        keyExtractor={item => item.titulo}></FlatList>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#333' 
  },
  totalMoviesText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  list: {
    flex: 1,
  },
  movieItem: {
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  movieImage: {
   
    height: 400,
    width:300,
    resizeMode:'cover'
  },
  movieTitle: {
    color: '#fff',
    fontSize: 24,
    textAlign: 'center',
    marginTop: 5,
  },
});

export default App;
