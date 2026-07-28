
document.getElementById("addBtn").onclick = function(){  
  let display = document.getElementById("taskInput").value.trim();  
  let Null = document.getElementById("Null");  
  if(display === ""){  
    document.querySelector(".container").classList.add("shake");  
    Null.innerHTML = "Task can't be empty";  
    setTimeout(function(){  
      document.querySelector(".container").classList.remove("shake");  
    },300);  
  }  
  
  else{  
    Null.innerHTML = "";  
    let Newtask = document.createElement("li");  
    Newtask.className = "Newtask";  
    let Span = document.createElement("span");  
    Span.innerHTML = display;  
    let Wrapper = document.createElement("div");  
    Wrapper.className = "Wrapper";  
    let btn1 = document.createElement("button");  
    btn1.innerHTML = "DONE";  
    btn1.className = "done";  
    let btn2 = document.createElement("button");  
    btn2.innerHTML = "EDIT";  
    btn2.className = "edit";  
    let btn3 = document.createElement("button");  
    btn3.innerHTML = "DEL";  
    btn3.className = "delete";  
    btn1.onclick = function(){  
      let completed = Number(document.getElementById("completed").innerHTML);  
      completed = completed + 1;  
      document.getElementById("completed").innerHTML = completed;  
      let pending = Number(document.getElementById("pending").innerHTML);  
      pending = pending - 1;  
      document.getElementById("pending").innerHTML = pending;  
      document.getElementById("total").innerHTML = completed + pending;  
      let Undo = document.createElement("button");  
      Undo.innerHTML = "UNDO";  
      Undo.className = "Undo";  
      let del = document.createElement("button");  
      del.innerHTML = "DEL";  
      del.className = "delete";  
      Wrapper.innerHTML = "";  
      Wrapper.appendChild(Undo);  
      Wrapper.appendChild(del);  
      Undo.onclick = function(){  
        Wrapper.innerHTML = "";  
        Wrapper.appendChild(btn1);  
        Wrapper.appendChild(btn2);  
        Wrapper.appendChild(btn3);  
        let completed = Number(document.getElementById("completed").innerHTML);  
        completed = completed - 1;  
        document.getElementById("completed").innerHTML = completed;  
        let pending = Number(document.getElementById("pending").innerHTML);  
        pending = pending + 1;  
        document.getElementById("pending").innerHTML = pending;  
        document.getElementById("total").innerHTML = completed + pending;  
      }  
      del.onclick = function(){  
        let taskList = document.getElementById("taskList");  
        Newtask.remove();  
        let pending = Number(document.getElementById("pending").innerHTML);  
        document.getElementById("pending").innerHTML = pending;  
        let completed = Number(document.getElementById("completed").innerHTML);  
        completed = completed - 1;  
        document.getElementById("completed").innerHTML = completed  
        document.getElementById("total").innerHTML = pending + completed;  
        if(taskList.children.length === 0){  
          document.getElementById("Emptymessage").style.display = "block";  
        }  
      }  
    }  
    btn2.onclick = function(){  
      document.getElementById("taskInput").value = Span.innerHTML;  
      Newtask.remove();  
      let pending = Number(document.getElementById("pending").innerHTML);  
      pending = pending - 1;  
      document.getElementById("pending").innerHTML = pending;  
      let completed = Number(document.getElementById("completed").innerHTML);  
      document.getElementById("total").innerHTML = pending + completed;  
      if(document.getElementById("taskList").children.length === 0){  
        document.getElementById("Emptymessage").style.display = "block";  
      }  
    }  
    btn3.onclick = function(){  
      Newtask.remove();  
      let pending = Number(document.getElementById("pending").innerHTML);  
      pending = pending - 1;  
      document.getElementById("pending").innerHTML = pending;  
      let completed = Number(document.getElementById("completed").innerHTML);  
      document.getElementById("total").innerHTML = pending + completed;  
      if(document.getElementById("taskList").children.length === 0){  
        document.getElementById("Emptymessage").style.display = "block";  
      }  
    } 
    Newtask.appendChild(Span);  
    Newtask.appendChild(Wrapper);  
    Wrapper.appendChild(btn1);  
    Wrapper.appendChild(btn2);  
    Wrapper.appendChild(btn3);  
    document.getElementById("Emptymessage").style.display = "none";  
    document.getElementById("taskList").appendChild(Newtask);  
    document.getElementById("taskInput").value = "";  
    let pending = Number(document.getElementById("pending").innerHTML);  
    pending = pending + 1;  
    document.getElementById("pending").innerHTML = pending;  
    let completed = Number(document.getElementById("completed").innerHTML);  
    document.getElementById("total").innerHTML = pending + completed;  
  }  
}