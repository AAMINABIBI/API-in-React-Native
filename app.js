import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
//get method is used to get daat from API.
//must run json server first about API usinfg command  "json-server --watch db.json"
//API daat is stored in db.json
//POstman is used to test API wether data is coming ot not
//fetch is used to get data from JSOn API
//after fetching it is important to convert it to json
//post is used to send data to API
//after using metod post it is important to stringify it.

  



//getting data from form and sending that to API
//**************** */
const saveDAta =async()=>{
  const ageNumber = parseInt(age, 10);
  //console.warn(name,age,email);
  const url="http://10.0.2.2:3000/users";
  let result=await fetch(url,{
    method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, age: ageNumber, email }),
  })

}
  const [name,setname]=useState("")
  const [age,setAge]=useState(0)
  const [email,setEmail]=useState("")

  return (
    <View>
     
      <Text>Post API with input fields</Text>
      <TextInput style={styles.input} 
      value={name}
      onChangeText={(text)=>setname(text)} 
      placeholder='Enter name'></TextInput>

 
<TextInput style={styles.input} 
      value={email}
      onChangeText={(text)=>setEmail(text)} 
      placeholder='Enter Email'></TextInput>

<TextInput style={styles.input} 
      value={age}
      onChangeText={(text)=>setAge(text)} 
      placeholder='Enter Age'></TextInput>

    <Button title='Save Data' onPress={saveDAta}></Button>
  
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input:{
    borderColor:'skyblue',
    borderWidth:1,
    margin:20
  }
});


//******************************************** */
