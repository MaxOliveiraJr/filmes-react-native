/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';

import {Text, View, Button, FlatList, Image} from 'react-native';

function App(): JSX.Element {
  const [movies, setMovies] = useState();

  const handleLoadButton = async () => {
    const req = await fetch('https://api.b7web.com.br/cinema/');
    const json = await req.json();

    if (json) {
      setMovies(json);
    }
  };
  return (
    <View style={{width: '100%'}}>
      <Button title="Carregar Filmes" onPress={handleLoadButton}></Button>
      <FlatList
        data={movies}
        renderItem={({item}) => (
          <View style={{marginVertical: 20}}>
            <Image
              source={{uri: item.avatar}}
              style={{width: '100%', height: 400}}
            />
            <Text>{item.titulo}</Text>
          </View>
        )}
        keyExtractor={item => item.titulo}></FlatList>
    </View>
  );
}

export default App;
