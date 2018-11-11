/* Attaching event handlers to elements */
var clickToggle = true; 
tii_addEventHandlerOnElementLoad ('bubbleLink', 'mouseover', function (event){displayBubble(event);}, false);
tii_addEventHandlerOnElementLoad ('bubbleLink', 'mouseout', function (event){hideBubble(event);}, false);
tii_addEventHandlerOnElementLoad ('bubbleLink', 'keypress' , function (event){displayBubble(event);}, false); 
tii_addEventHandlerOnElementLoad ('bubbleLink', 'blur', function (event){hideBubble(event);}, false);

/* Thought Bubble for The Ag */
function displayBubble(event){
	
	bubLink = document.getElementById('bubbleLink');
	bub = document.getElementById('bubble');
	var bubPos = new Array(2);
	bubPos = findPos(bubLink);

	/*  Check for IE */
	if (tii_isie) 
	{
		bub.style.left = (parseInt(bubPos[0]) - 162).toString() + 'px';
		bub.style.top = (parseInt(bubPos[1]) +  25).toString() + 'px';	
	}
	else
	{
		bub.style.left = (parseInt(bubPos[0]) - 176).toString() + 'px';
		bub.style.top = (parseInt(bubPos[1]) +  26).toString() + 'px';	
	}
	
	/* Display the bubble */
	bub.style.display = 'block';
	clickToggle = false;
}

/* Hides the bubble */
function hideBubble(event){
/*	alert ('test');*/
	var bub = document.getElementById('bubble');	
	bub.style.display = 'none';
	clickToggle = true;
}

/* Finds the position of an element on the page */
function findPos(obj) {
	var curleft = curtop = 0;
	if (obj.offsetParent) {
		curleft = obj.offsetLeft
		curtop = obj.offsetTop
		while (obj = obj.offsetParent) {
			curleft += obj.offsetLeft
			curtop += obj.offsetTop
		}
	}
	return [curleft,curtop];
}

/* Begin TimeStamp function */
function renderTimestamp(year,month,day,hour,minutes,seconds) 
{
    var aYear = new String(year);
    var aMonth = new String(month);
    var aDay = new String(day);
    var aHour = new String(hour); 
    var aMinutes = new String(minutes);
    var aSeconds = new String(seconds); 
    articleUTC = Date.UTC(aYear, aMonth, aDay, aHour, aMinutes, aSeconds);

    /* this is EST timezone offset of 5 hours = 300 minutes
    all Time articles are published in EST */
    articleTZOffsetMS = 300 * 60 * 1000 ; 
    articleCorrectedMS = articleUTC + articleTZOffsetMS;

    localDate = new Date();
    localYear = localDate.getFullYear();
    localMonth = localDate.getMonth(); 
    localDay = localDate.getDate(); 
    localHour = localDate.getHours();
    localMinutes = localDate.getMinutes();
    localSeconds = localDate.getSeconds();
    localTZOffset = localDate.getTimezoneOffset();
    //localTZOffsetMS = localTZOffset * 1000* 60; 
    localTZOffsetMS = 300 * 1000* 60;    localUTC = Date.UTC(localYear, localMonth, localDay, localHour, localMinutes, localSeconds); 

    localCorrectedMS = localUTC + localTZOffsetMS;

    // calculate how many minutes between article utc and user utc 
    minuteDifferential = (localCorrectedMS - articleCorrectedMS)/(1000 * 60);
    ageInMinutes = Math.round(minuteDifferential);
 
 if (ageInMinutes < 0) { ageInMinutes = 0;} 

    if ( ageInMinutes < 15 ) {
        document.write("<span>UPDATED:</span> "+ ageInMinutes +" minutes ago"); 
    } else {
        if (hour >= 12) {
            if (hour != 12) {aHour = aHour - 12;} 
            ampm = "PM";
        } else {
            ampm = "AM";
        }
        if (aMinutes < 10) {aMinutes = "0" + aMinutes} 
        document.write("<span>UPDATED:</span> "+ aHour+":" + aMinutes + ampm + " ET"); 
    }
}
/* End TimeStamp function */
/* Begin Main story module */
var currPic=0;
var timer1, timer2;
var paused = true;
var opacity = 100;
var msDivs = new Array(5);
var msButtons = new Array(5); 
var msWrap;
var button;
var position;
var currPosition;

function initPageComponents() {
 /*  Used to load all components on the page */
 msDivs[0] = document.getElementById('mainStory1');
 msDivs[1] = document.getElementById('mainStory2');
 msDivs[2] = document.getElementById('mainStory3');
 msDivs[3] = document.getElementById('mainStory4');
 msDivs[4] = document.getElementById('mainStory5');
 msButtons[0] = document.getElementById('a1'); 
 msButtons[1] = document.getElementById('a2');
 msButtons[2] = document.getElementById('a3');
 msButtons[3] = document.getElementById('a4');
 msButtons[4] = document.getElementById('a5'); 
 msWrap = document.getElementById('mainStoryWrap');
 initPausePlayEvents();
 var breakingNews = document.getElementById('breakingNewsImg'); 
 if (breakingNews == null)
 {
  paused = false; 
  timer1=setTimeout('timedStory()',7000);
 }
   doImageSwap();
}

function initPausePlayEvents() {
 /* add Event Handlers for the Photo Module */
 if (!document.getElementById || !document.getElementsByTagName) {
  return true;
 }
 /* checks for Javascript operability  */ 

 /*  get all the links in the photo module  */
 var topStories = document.getElementById('topStories');
 var links = topStories.getElementsByTagName('a');

 for (i=0;i < links.length; i++) {
  if (links.item(i).id.substring(0,1) == 'a'){  
   //filter the links for those that have a class name beginnig with 'a'
   //add the doNumber event handler for the number links
   links.item(i).href='javascript:{}';
   tii_addEventHandler (links [i], 'click', function (event)
   {
    doNumber (event);
   }, false);
  }
 }
 
 var playLink = document.getElementById('playLink');
  
 //add the doButton event handler for the play pause button 
 tii_addEventHandler ( playLink , 'click', function (event)
 {
  doButton (event);
 }, false);
}

/* helper function to deal specifically with images and the cross-browser differences in opacity handling */
function fader(opac) {
 if (msWrap.style.MozOpacity!=null) {  
  /* Mozilla's pre-CSS3 proprietary rule */ 
  msWrap.style.MozOpacity = (opac/100) - .001;
 } else if (msWrap.style.opac!=null) {
  /* CSS3 compatible */
  msWrap.style.opacity = (opac/100) - .001;
 } else if (msWrap.style.filter!=null) {
  /* IE's proprietary filter */ 
 if (opac==100){
  msWrap.style.filter = "none;";
 } else {
  msWrap.style.filter = "alpha(opacity="+opac+");";
      }
 }
}

function change(num, step) {
 /*fadeOut*/
 if (step == 1) {
  opacity -= 10;
  if (opacity > 0) {
   fader(opacity);
   timer2=setTimeout('change(' + num + ', 1)',50);
  }
  else { 
   change(num, 2);
  }
 }
 /*change picture*/
 else if (step == 2) {
  currPic = num;
  msDivs[0].style.display = (num == 0 ? "block" : "none"); 
  msDivs[1].style.display = (num == 1 ? "block" : "none"); 
  msDivs[2].style.display = (num == 2 ? "block" : "none");
  msDivs[3].style.display = (num == 3 ? "block" : "none");
  msDivs[4].style.display = (num == 4 ? "block" : "none"); 
  msButtons[0].className = (num == 0 ? "on" : "off");
  msButtons[1].className = (num == 1 ? "on" : "off");
  msButtons[2].className = (num == 2 ? "on" : "off"); 
  msButtons[3].className = (num == 3 ? "on" : "off");
  msButtons[4].className = (num == 4 ? "on" : "off");
  change(num, 3);
 }
 /*fadeIn*/
 else if (step == 3) { 
  opacity += 10;
  if (opacity <= 100) {
   fader(opacity);
   timer2=setTimeout('change(' + num + ', 3)',50);
  }
 }
}

/* change picture, wait 5 seconds, repeat */
function timedStory() {
 if (currPic<4){
 currPic++;
 change(currPic, 1);
 timer1=setTimeout('timedStory()',7000);
 }else{
	 currPic=0;
	clearTimeout(timer1);
	change(currPic,1);
	paused = true;
	doImageSwap();
 }
}

/* executed when the play pause button is selected */
function doButton(event) {
 paused = !paused;
 doImageSwap();
 if (paused) {
  /* stop the image loop */
  clearTimeout(timer1);
 }
 else { 
  /* restart the image loop */
  timedStory();
 }
}  


/*executed when a number link is selected */
function doNumber (event) {
 var eventSource = typeof event.target != 'undefined' ? event.target : window.event.srcElement;
 /*  get the number portion of the class name of the event source */ 
 currPic = eventSource.id.substring(1,2) - 1;
 paused = true;
 doImageSwap();
 clearTimeout(timer1);
 clearTimeout(timer2);
 change(currPic, 1);

} 

/* swap the play pause button image */
function doImageSwap() {
		 var button = document.getElementById('playLink'); 
		 if (!tii_isie){
		  var imageFile = paused ? "http://img.timeinc.net/time/i/btn_play.gif" : "http://img.timeinc.net/time/i/btn_pause.gif";
		  button.style.background= "url("+imageFile+") 0px 0px no-repeat"; 	
		 }else{
		  /*  Use an image sprite to deplete the image flickering in IE */
		  button.style.backgroundImage= "url(http://img.timeinc.net/time/i/btn_playpause.gif)";
		  position = paused ? "-16 px" : "0 px";  /* change the image source */
		  try {
			  document.execCommand('BackgroundImageCache', false, true);
			} catch(e) {}
				
			  /* if paused and play is not displayed */
			  if (paused == true && currPosition != "-16 px"){
				  button.style.backgroundPositionY=position;
			  }
			  /* if playing and paused is not displayed */
			  if (paused != true && currPosition != "0 px"){
				  button.style.backgroundPositionY=position;			  
			 }  
		 currPosition = position;
		 }
}  
/* End Main story module */
