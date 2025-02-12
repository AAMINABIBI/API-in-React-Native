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





















  import { StatusBar } from 'expo-status-bar';
import { use, useEffect, useState } from 'react';
import { Button, Modal, StyleSheet, Text, TextInput, View } from 'react-native';


//********************************* 
// 
// Get Data from API ANd make a list
//simply fetch data from api and use nap function to access that data and render ir on UI
// 
// 
// Delete Function
// fetch the data from url and remember to fetch it with id,use method delete it will automaticallt delete te data.
// 
// 
//
// 
// update
// open a modal,pass the data to that modal
// create a form on modal
// populate the data on modal
// update data using PUT method
// 
// 
// 
//  */
export default function App() {
  let [ShowModal,setShowModal]=useState(false);
  const [selectedUser,setSelectedUser]=useState(undefined)
const [data,setData]=useState([]);


const getAPIDAta=async ()=>{
const url="http://10.0.2.2:3000/users"
let result=await fetch(url)
result=await result.json();
if(result)
{
  setData(result)
}
}


const deleteDat=async (id)=>{
  const url="http://10.0.2.2:3000/users"
  let result = await fetch(`${url}/${id}`, {
    method: 'DELETE', // Correct method name
  });
result=await result.json();
if(result){
  console.warn("user deleted")
  getAPIDAta();
}
}

const UPdatuser=(data)=>{
setShowModal(true);
setSelectedUser(data)
}
useEffect(()=>{
getAPIDAta()
},[])

return (
<View style={styles.container}>
{
  data.length?
  data.map((item)=><View style={styles.dataWrapper}>
<View style={{flex:1}}><Text>{item.name}</Text></View>
<View style={{flex:1}}><Text>{item.age}</Text></View>
<View style={{flex:1}}><Text>{item.email}</Text></View>
<View ><Button title='delete' onPress={()=>deleteDat(item.id)}></Button></View>
<View ><Button title='Update' onPress={()=>UPdatuser(item)}></Button></View>

  </View>):null
}


<Modal visible={ShowModal} transparent={true}>
<UserModal setShowModal={setShowModal} 
selectedUser={selectedUser}
getAPIDAta={getAPIDAta}></UserModal>
</Modal>
</View>
  );
}

const UserModal=(props)=>{
  const [name,setName]=useState(undefined)
const [age,setAge]=useState(undefined)
const [email,setEmail]=useState(undefined)

useEffect(()=>{
if(props.selectedUser){
  setName(props.selectedUser.name)
  setEmail(props.selectedUser.email)
  setAge(props.selectedUser.age.toString())

}
},[props.selectedUser])

const updateUser=async()=>{
  const id=props.selectedUser.id;
  const url="http://10.0.2.2:3000/users";
  let result = await fetch(`${url}/${id}`,{
  method:'PUT',
  headers:{
    "Content-Type":"application/json"
  },
  body: JSON.stringify({ name, age, email })});
result=result.JSON();
if(result)
{
  console.warn(result)
  props.getAPIDAta();
  props.setShowModal(false)
}
}
  return <View style={styles.centerView}>
    <View style={styles.ModalView}>
<TextInput style={styles.input} value={name} onChangeText={(text)=>{setName(text)}} ></TextInput>
<TextInput style={styles.input}value={age} onChangeText={(text)=>{setAge(text)}}></TextInput>
<TextInput style={styles.input} value={email} onChangeText={(text)=>{setEmail(text)}}></TextInput>
<View style={{marginBlock:10}}>
  <Button title='save' onPress={updateUser}></Button>
  </View>

      <Button title='close' onPress={()=>{props.setShowModal(false)}}></Button>
    </View>
  </View>

}
const styles = StyleSheet.create({
container:{
  flex:1,
  paddingTop:40
},
dataWrapper:{
  felx:1,
  flexDirection:"row",
  justifyContent:"space-around",
  backgroundColor:'orange',
  margin:5,
  //padding:5
},
centerView:{
  flex:1,
  justifyContent:'center',
  alignItems:'center'
},
ModalView:{
backgroundColor:'#fff',
padding:40,
borderRadius:10,
alignItems:'center',
shadowColor:'#000',
elevation:5
},
input:{
  borderWidth:1,
  borderColor:"Blue",
  width:200,
  marginBottom:14

}
});


//******************************************** */
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
