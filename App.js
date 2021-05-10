import React, {useState, useEffect, useRef} from 'react';
import asyncStorage from '@react-native-community/async-storage'
import {SafeAreaView, View, Text, StyleSheet, TouchableOpacity, TextInput, Img} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';


export default function appView(){
 
    const[quantidade, setQuantidade]= useState(0);
    const[input, setInput] =useState('');
    const quantidadeInput = useRef(null);

    useEffect(() =>{
      async function getStorage(){
        const quantidadeStorage = await AsyncStorage.getItem('quantidades');
        if(quantidadeStorage !== null){
          setQuantidade(quantidadeStorage);
        }
      }
      
      getStorage();

    }, [])

    useEffect(() => {
      async function saveStorage(){
        await AsyncStorage.setItem('quantidades', quantidade)
      }
      saveStorage();
    }, [quantidade])


    function alteraQuantidade(){
      setQuantidade(input);
      setInput('');
    }

    function realizarPedido(){
      quantidadeInput.current.focus();
    }
  
    return(
    <SafeAreaView style={styles.container}>
      <View style={styles.bckg}> 
        <Text style={styles.texto}>Iphone 5</Text>
        <Text style={{marginBottom: 20}}>Quantidade: {quantidade}</Text>

        <View style={{flexDirection:'row'}}>

          <TextInput style={styles.inpt} value={input} onChangeText={(numero) => setInput(numero)}  ></TextInput>
          <TouchableOpacity style={styles.btn} onPress={alteraQuantidade}>
            <Text style={styles.btnText}>+</Text>
          </TouchableOpacity>

        </View>
      </View>
      <TouchableOpacity style={styles.btn1} onPress={realizarPedido}>
            <Text >Finalizar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn2} >
            <Text ref={quantidadeInput} style={styles.btnText}>Realizar Pedido</Text>
      </TouchableOpacity>
    </SafeAreaView>
    
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems:'center',
    justifyContent: 'center',
    borderRadius:2,
    borderColor: 'green',
  },

  bckg:{
    
    padding: 50, 
    borderWidth:4, 
    borderColor:'black',
    borderRadius: 10
  },

  texto:{
    fontSize:30,
  },

  btn:{
    borderRadius: 50,
    backgroundColor: 'green',
    alignItems: 'center',
    fontSize: 20
  },

  btn1:{
    paddingRight: 50,
    paddingLeft: 50,
    justifyContent: 'center',
    margin: 10,
    borderWidth: 2,
    borderColor: 'black',
    alignItems: 'center',
    fontSize: 20
  },
  btn2:{
    paddingRight: 50,
    paddingLeft: 50,
    justifyContent: 'center',
    margin: 10,
    borderWidth: 2,
    borderRadius: 50,
    backgroundColor: 'green',
    alignItems: 'center',
    fontSize: 20,
    color: '#FFF'
  },

  btnText:{
    color: '#FFF',
    margin: 10,
    fontSize: 20
  },

  inpt:{
    width: 60, 
    marginRight: 20,
    borderWidth: 2,
    borderRadius:5,
    borderColor: 'black',
    textAlign:'center',
    justifyContent: 'center',
    fontSize: 20
  }
})