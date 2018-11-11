var speed=10
					  row2.innerHTML=row1.innerHTML
					  function Sliding(){
					  if(row2.offsetWidth-row.scrollLeft<=0)
					  row.scrollLeft-=row1.offsetWidth
					  else{
					  row.scrollLeft++
					  }
					  }
					  var jlimove=setInterval(Sliding,speed)
					  row.onmouseover=function() {clearInterval(jlimove)}
					  row.onmouseout=function() {jlimove=setInterval(Sliding,speed)}
