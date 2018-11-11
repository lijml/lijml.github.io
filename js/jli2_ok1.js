var sc1=document.getElementById('sc1');

var sc2=document.getElementById('sc2');

var cT=1;

var mC=0;

function IntV()

{

	if(mC==0)

	{

		if(cT==1)

		{

			cs1(sc1,1);

			cs1(sc2,0);

			setTimeout('IntV()',5000);

		}

		else{

			cs1(sc1,0);

			cs1(sc2,1);

			setTimeout('IntV()',5000);

		}

		cT++;
		
		if(cT == 3)
		  cT = 1;

	}

	else 

		{

 setTimeout('IntV()',5000);

 		 }

}

function cs1(a,b)

{if(a==null)return;

 a.filters.revealTrans.apply();

 if(b==1) a.style.visibility='visible';

 else a.style.visibility='hidden';

 a.filters.revealTrans.play();}

function isScroll(v){

mC=v;

}
