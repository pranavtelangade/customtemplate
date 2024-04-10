Array.prototype.unique = function(){
  var unique = [];
  for (let i = 0; i < this.length; i++) {
    if(!unique.includes(this[i])){
      unique.push(this[i]);
    }   
  }
  return unique;
}

document.getElementById("submittemplate").addEventListener("click", function (e) {
  e.preventDefault();
    string = document.getElementById("template").value;
    document.getElementById("names").innerHTML = ``;
    keywords = extract(string);
    keywords.unique().forEach(function (element) {
      document.getElementById("names").innerHTML += `
      <label for="${element}">${element}:</label>
      <input type="text" id="${element}"  placeholder = "${element}">`;
    });
    document.getElementById("names").innerHTML += `<input type="button" id="submitnames" value="Execute">`;
    document.getElementById("submitnames").addEventListener("click", function (e) {
      const newWords = [];
      for (let i = 0; i < keywords.length; i++) {
        newWords[i] = document.getElementById(keywords[i]).value;
      }
      document.getElementById("finaltext").style = `align-self: flex-start; padding: 30px; margin-left: 50px;`
      document.getElementById("finaltext").innerHTML = `<p>Your new text:</p>` + `<p class="final" id="outputtext">`+replace(string, keywords,newWords)+`</p> <input type="button" value="Copy Text" id="copytext">`;
      document.getElementById("copytext").addEventListener('click',function(){
        navigator.clipboard.writeText(document.getElementById("outputtext").innerText);
        document.getElementById("copytext").value = `Text Copied!!`;
        setTimeout(() => {
          document.getElementById("copytext").value = `Copy Text`;
        },2000);
      });
    });
  });

function replace(str, arr1, arr2) {
  arr1.forEach((element, ind) => {
    str = str.replace('{{'+element+'}}', '{{'+arr2[ind]+'}}');
  });
  return str.replace(/\n/g, "<br>").split(/[{{}}]/).join("");
}

function extract(str) {
  return str.match(/{{(.*?)}}/g).map((str) => str.slice(2, -2));
}
