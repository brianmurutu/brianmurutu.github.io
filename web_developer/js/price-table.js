function check()
{
     var checkbox = document.getElementById("checkbox");
     var text1 = document.getElementsByClassName("text1");
     var text2 = document.getElementsByClassName("text2");
     for (var i = 0; i < text1.length; i++)
     {
     if (checkbox.checked == true)
     {
          text1[i].style.display = "block";
          text2[i].style.display = "none";
     }
     else if (checkbox.checked == false)
     {
          text1[i].style.display = "none";
          text2[i].style.display = "block";
     }
     }

}   
check(); 