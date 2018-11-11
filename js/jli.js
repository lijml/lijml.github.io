var sc1=document.getElementById('sc1');

var sc2=document.getElementById('sc2');

var sL=1;

var iS=0;

function setTime()

{

	if(iS==0)

	{

		if(sL%2==1)

		{

			cs1(sc1,1);

			cs1(sc2,0);

			setTimeout('setTime()',5000);

		}

		else{

			cs1(sc1,0);

			cs1(sc2,1);

			setTimeout('setTime()',5000);

		}

		sL++;

	}

	else 

		{

 setTimeout('setTime()',5000);

 		 }

}

function cs1(a,b)

{if(a==null)return;

 a.filters.revealTrans.apply();

 if(b==1) a.style.visibility='visible';

 else a.style.visibility='hidden';

 a.filters.revealTrans.play();}

function isScroll(v){

iS=v;

}
