var screen1=document.getElementById('screen1');

var screen2=document.getElementById('screen2');

var screen3=document.getElementById('screen3');

var screen4=document.getElementById('screen4');

var screen5=document.getElementById('screen5');

var screen5=document.getElementById('screen6');

var cT=1;

var mC=0;

function IntV()

{

	if(mC==0)

	{

		if(cT==1)

		{

			cs1(screen1,1);

			cs1(screen2,0);

			cs1(screen3,0);
			
			cs1(screen4,0);
					
			cs1(screen5,0);
			
			cs1(screen6,0);
			
			
			setTimeout('IntV()',5000);

		}

		else if (cT==2)
		{

			cs1(screen1,0);

			cs1(screen2,1);

			cs1(screen3,0);
			
			cs1(screen4,0);
			
			cs1(screen5,0);
			
			cs1(screen6,0);
			

			setTimeout('IntV()',5000);

		}
		
		else if (cT==3)
		{

			cs1(screen1,0);

			cs1(screen2,0);

			cs1(screen3,1);
			
			cs1(screen4,0);
			
			cs1(screen5,0);
			
			cs1(screen6,0);

			setTimeout('IntV()',5000);
		
		}
		

		else if (cT==4)
		{

			cs1(screen1,0);

			cs1(screen2,0);

			cs1(screen3,0);
			
			cs1(screen4,1);
			
			cs1(screen5,0);
			
			cs1(screen6,0);
			
			setTimeout('IntV()',5000);
		
		}
		
		else if (cT==5)
		{

			cs1(screen1,0);

			cs1(screen2,0);

			cs1(screen3,0);
			
			cs1(screen4,0);
			
			cs1(screen5,1);
			
			cs1(screen6,0);
			
			setTimeout('IntV()',5000);
		
		}
		
		else
		{

			cs1(screen1,0);

			cs1(screen2,0);

			cs1(screen3,0);
			
			cs1(screen4,0);
			
			cs1(screen5,0);
			
			cs1(screen6,1);
			
			
			setTimeout('IntV()',5000);
		
		}


		cT++;
		
		if(cT == 7)
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

function isMotion(v){

mC=v;

}
