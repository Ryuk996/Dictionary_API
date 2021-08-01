function searchtab() {
    const wordcontainer = document.createElement("div");
    wordcontainer.className = "search-word-container";
         wordcontainer.innerHTML =   `<h1 class = "header">ENGLISH DICTIONARY</h1>
         <div class="bar">
         <input class='search_item' onclick="resetWord()" placeholder='enter_word'/>
            <button class="search" onclick="getwords()"> Search </button>
            </div>
            `;
            document.body.append(wordcontainer);  
  }
  
  async function getwords() {
    const word = document.querySelector(".search_item").value;
    try{
   
      fetch(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${word}`,
      {
        method:"GET"
    })                                                              //fetches the data from the server
    .then(data => data.json())                                      //converts data into the json file
    .then(users => loadUsers(users)) 
    }
   catch{
     alert("enter valid item? unauthorized")
   }
    
    }
    function loadUsers(users){
        const userList=document.createElement('div')
        userList.className="user-list" 
      users.forEach((user) => {
      console.log(user);
      const userContainer=document.createElement('div');        //Creating a Container div  //$=> concatenating strings
      userContainer.className='user-container'
      userContainer.innerHTML=`
     
      <div class="content">
      <div class= "card">
      <div class="word">WORD</div>
      <div class="text1" >${user.word}</div>
      <div class="word">Phonetics </div>
      <div class="text1">${user.phonetics[0].text}</div>
      </div>
      <audio src="${user.phonetics[0].audio}" type="audio/mpeg" controls class="audio"> Audio</audio>
      </div>`                     
      userList.append(userContainer);                           // conatainer is appended to the userList
      
    });
    {
      let user=users[0];
      const data1=user.meanings;
      data1.forEach((data1)=>{
        console.log(data1);
        const dataContainer=document.createElement('div');
        dataContainer.className='data-container'
        dataContainer.innerHTML=`
        <div class="card">
        <div class="word">Part Of speech </div>
        <div class="text1" >${data1.partOfSpeech}</div>
        <div class="word">Definition</div>
        <div class="text1" >${data1.definitions[0].definition}</div>
        <div class="word">Example</div>
        <div class="text1" >${data1.definitions[0].example}</div>
        </div>
        `
        userList.append(dataContainer); 
      });
    }
    document.body.append(userList);
    }
  function resetWord(){
    document.querySelector(".search_item").value="";
    document.querySelector('.user-list').remove();
    then(users => loadUsers(users)) 
  }