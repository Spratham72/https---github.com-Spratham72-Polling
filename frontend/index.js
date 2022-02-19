var flag=true;
var data;
function fecthData(page){
    checkDisable(page);
    window.history.pushState("","",`/frontend/?page=${page}`);
    console.log(window.history.pa)
    console.log(page)
    flag=false;
    document.getElementById("currentPage").textContent="page" + page;
    fetch(`http://localhost:1234/cities/?page=${page}`).then(res=>res.json()).then(res=>{data=res.City;display(res.City)});
}
if(flag){
    fecthData(1);
    checkDisable(1);
}
function fetchPrevious(){
    var curr= document.getElementById("currentPage").innerHTML; 
    fecthData(Number(curr[curr.length-1])-1);  
}
function fetchNext(){
    var curr= document.getElementById("currentPage").innerHTML;
    
    fecthData(Number(curr[curr.length-1])+1);
    
}
function checkDisable(curr){
    if(curr>=5){
        console.log(curr)
        document.getElementById("next").disabled=true;
        document.getElementById("next").style.cursor="not-allowed";
        document.getElementById("prev").disabled=false;
        document.getElementById("prev").style.cursor="pointer";
    }
    else if(curr<=1){
        console.log(curr)
        document.getElementById("next").disabled=false;
        document.getElementById("next").style.cursor="pointer"
        document.getElementById("prev").disabled=true;
        document.getElementById("prev").style.cursor="not-allowed";
    }
    else{
        document.getElementById("next").disabled=false;
        document.getElementById("next").style.cursor="pointer";
        document.getElementById("prev").disabled=false;
        document.getElementById("prev").style.cursor="pointer";
    }
}
function display(data){
    var parent1=document.getElementById('data1');
    parent1.innerHTML=null;
    console.log(data)
    if(data.length===0){
        var center=document.createElement("center");
        var div=document.createElement('div');
        div.textContent="Found 0 result";
        div.style.color="red";
        center.appendChild(div)
        parent1.appendChild(center);

    }
    data.forEach(element => {
        var tr=document.createElement("tr");
        var td1=document.createElement("td");
        var td2=document.createElement("td");
        var td3=document.createElement("td");
        var td4=document.createElement("td");
        var td5=document.createElement("td");
        td1.textContent=element.name;
        td1.style.cursor="pointer";
        td1.onclick=()=>{
            showDetail(element);
        }
        td2.textContent=element.district;
        td3.textContent=element.population;
        td4.textContent=element.polling;
        td5.textContent=element.type;
        tr.append(td1,td2,td3,td4,td5);
        parent1.append(tr)
    });
}
function filterData(){
    const selection=document.getElementById("select");
    window.history.pushState("","",`/frontend/?filter=${selection.value}`);
    fetch(`http://localhost:1234/cities/filter/${selection.value}`).then(res=>res.json()).then(res=>{data=res.data,display(res.data)});
}
var asc=true;
function sortData(event){
    
   if(event=="population"){
       if(asc){
           window.history.pushState("","","frontend/?sort=population")
           asc=!asc;
        data=data.sort((a,b)=>{return a.population-b.population});
       }else{
        asc=!asc;
        data=data.sort((a,b)=>{return b.population-a.population});
       }
   
    display(data);
   }
   if(event=="polling"){
    window.history.pushState("","","frontend/?sort=polling")
    if(asc){
        asc=!asc;
     data=data.sort((a,b)=>{return a.polling-b.polling});
    }else{
     asc=!asc;
     data=data.sort((a,b)=>{return b.polling-a.polling});
    }

 display(data);
}
}
function search(){
    var text=document.getElementById("inputSearch").value;
    console.log(text)
    fetch(`http://localhost:1234/cities/search/${text}`).then(res=>res.json()).then(res=>{display(res.val)});
}
function showDetail(data){
    var parent1=document.getElementById("parent1");
    parent1.innerHTML=null;
    fetch("http://localhost:1234/booth").then(res=>res.json()).then(res=>{displayDetail(res.Booth,data)})
    
    

}
function displayDetail(data,data1){
   
    var ar=data.filter(el=>{return el.name===data1.name});
    console.log(ar)
    var table=`<table id="data">
    <tr>
        <th>City/Town/Village <div style="cursor: pointer;"></div> </th>
        <th>District<div style="cursor: pointer;"></div> </th>
        <th>Name of Polling Booths</th>
    </tr>
    <tbody id="data1">

    </tbody>
   
</table>`
var button=document.createElement("button");
button.textContent="Access Data"
var td1=document.createElement("td");
var td2=document.createElement("td");
var td3=document.createElement("td");
ar[0].stations.forEach(el=>{
    var ul=document.createElement("ul");
    ul.textContent=el;
    td3.append(ul);
})
td1.textContent=data1.name;
td2.textContent=data1.district;
button.onclick=()=>{
    if(!localStorage.getItem("user")){
        window.location.href='login.html';
    }else{
        var role=JSON.parse(localStorage.getItem("user"));
        console.log(role,data1.name)
        if(role.role===data1.name){ 
            var button=document.createElement("button");
                button.textContent="Edit Content";
                td3.append(button);
        }else{
            var div=document.createElement("div");
            div.textContent="You Cannot access this!";
            div.style.color="red";
            parent1.append(div);
        }
    }
}

// if(===data1.name){
//     
// }else{
//     window.location.href='login.html';
// }
parent1.append(button)
parent1.insertAdjacentHTML("afterbegin",table)

var body=document.getElementById("data1");
body.append(td1,td2,td3)
}