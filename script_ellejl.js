var div = document.getElementById('main');
var display = 0;

function hideShow()
{
    if(display == 1)
    {
        div.style.display = 'block';
        display = 0;
    }
    else
    {
        div.style.display = 'none';
        display = 1;
    }
}

window.onscroll = function () {
    scrollFunction();
  };
  
  function scrollFunction() {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      document.getElementById("topsnavi").style.background = "#000000";
    } else {
      document.getElementById("topsnavi").style.background = "none";
    }
  }