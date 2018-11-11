/***** TII Global Functions *****/
/* Gets the total offset position of the element, assuming none of its ancestors have a float of left or right.
   Direction is 'x' for horizontal, and 'y' for vertical */
function tii_getTotalOffsetPosition (element, direction)
{
  var pos = direction == 'x' ? element.offsetLeft : element.offsetTop;
  var tmp = element.offsetParent;
  while (tmp != null)
  {
    pos += direction == 'x' ? tmp.offsetLeft : tmp.offsetTop;
    tmp = tmp.offsetParent;
  }
  return pos;
}

/* Stops the default action for the event, such as jumping to an anchor when clicking on a hyperlink */
function tii_stopDefaultAction (event)
{
	event.returnValue = false;
	if (typeof event.preventDefault != 'undefined')
	{
		event.preventDefault ();
	}
}

/* Create a new element node with attributes */
function tii_dom_createElement (nodeName, attributes)
{
	var isopera = typeof window.opera != 'undefined';
	var isie = typeof document.all != 'undefined'
   		&& !isopera && navigator.vendor != 'KDE';
		
	var newElement;
	try
	{
		newElement = document.createElement (nodeName);
	}
	catch (error)
	{
		return null;
	}
	
	var attributesLength = attributes.length;
	for (var i = 0; i < attributesLength; i++)
	{
		var attribute = attributes [i] [0];
		var value = attributes [i] [1];
		newElement.setAttribute (attribute, value);
		switch (attribute)
		{
			case 'id':
				newElement.id = value;
				break;
			case 'class':
				if (isie)
				{
					newElement.setAttribute ('className', value);
				}
				newElement.className = value;
				break;
			case 'style':
				newElement.style.cssText = newElement.style.cssText + ' ' + value;
				break;
			case 'for':
				if (isie)
				{
					newElement.setAttribute ('htmlFor', value);
				}
				newElement.htmlFor = value;
		}
	}
	
	return newElement;
}

/* Removes all the unwanted whitespace text nodes from inside the tree
   (including tabs, spaces, and line breaks between list items) */
function tii_dom_removeWhitespaceTextNodes (node)
{
  for (var x = 0; x < node.childNodes.length; x++)
  {
    var child = node.childNodes [x];
    if (child.nodeType == 3 && !/\S/.test (child.nodeValue))
    {
      node.removeChild (node.childNodes [x]);
      x--;
    }
    if (child.nodeType == 1)
    {
      tii_dom_removeWhitespaceTextNodes (child);
    }
  }
}

/***** ^^^ TII Global Functions Placed in >TII>Shared>JavaScript>TII LIB - JavaScript Event Listeners ^^^ *****/
/* Adds a function for the window load event */
function tii_callFunctionOnWindowLoad (functionToCall)
{
  if (typeof window.addEventListener != 'undefined')
  {
    window.addEventListener ('load', functionToCall, false);
  }
  else if (typeof document.addEventListener != 'undefined')
  {
    document.addEventListener ('load', functionToCall, false);
  }
  else if (typeof window.attachEvent != 'undefined')
  {
    window.attachEvent ('onload', functionToCall);
  }
  else
  {
    var oldFunctionToCall = window.onload;
    if (typeof window.onload != 'function')
    {
      window.onload = functionToCall;
    }
    else
    {
      window.onload = function ()
      {
        oldFunctionToCall ();
        functionToCall ();
      };
    }
  }
}

/* Calls functionToCall as soon as the targetElement is loaded, even if the document hasn't completely loaded yet. 
   Place the parameter list for functionToCall in order after tii_callFunctionOnElementLoad (targetId, functionToCall),
   e.g., tii_callFunctionOnElementLoad (targetId, functionToCall, parameter1, parameter 2, parameter 3, ...) */  
function tii_callFunctionOnElementLoad (targetId, functionToCall)
{
	var myArguments = arguments;
	tii_callFunctionOnWindowLoad (function ()
		{
			window.loaded = true;
		});
	var targetElement = document.getElementById (targetId);
	if (targetElement == null && !window.loaded)
	{
		var pollingInterval = setInterval (function ()
			{
				if (window.loaded)
				{
					clearInterval (pollingInterval);
				}
				targetElement = document.getElementById (targetId);
				if (targetElement != null)
				{
					clearInterval (pollingInterval);
					var argumentsTemp = new Array ();
					var argumentsTempLength = myArguments.length - 2;
					for (var i = 0; i < argumentsTempLength; i++)
					{
						argumentsTemp [i] = myArguments [i + 2];
					}		
					functionToCall.apply (this, argumentsTemp);
				}
			}, 10);
	}
}

/* Attaches an event handling function to the targetElement as soon as the targetElement is loaded
   (even if the document hasn't completely loaded yet). */  
function tii_addEventHandlerOnElementLoad (targetId, eventType, functionToCall, bubbleEventUpDOMTree)
{
	tii_callFunctionOnWindowLoad (function ()
		{
			window.loaded = true;
		});
	var targetElement = document.getElementById (targetId);
	if (targetElement == null && !window.loaded)
	{
		var pollingInterval = setInterval (function ()
			{
				if (window.loaded)
				{
					clearInterval (pollingInterval);
				}
				targetElement = document.getElementById (targetId);
				if (targetElement != null)
				{
					clearInterval (pollingInterval);
					tii_addEventHandler (targetElement, eventType, functionToCall, bubbleEventUpDOMTree);
				}
			}, 10);
	}
}

/* Attaches an event handling function to the targetElement. 
   Examples of eventType values are 'mouseover' and 'keyup', as opposed to 'onmouseover' and 'onkeyup'. 
   bubbleEventUpDOMTree is a boolean variable specifying whether the event should activate the event listeners
   of all the ancestors of the element (up to the window object) */
function tii_addEventHandler (targetElement, eventType, functionToCall, bubbleEventUpDOMTree)
{
  if (!targetElement)
  {
	  window.status = 'Warning: Tried to attach event to null object';
	  return false;
  }
  if (typeof targetElement.addEventListener != 'undefined')
  {
    targetElement.addEventListener (eventType, functionToCall, bubbleEventUpDOMTree);
  }
  else if (typeof targetElement.attachEvent != 'undefined')
  {
    targetElement.attachEvent ('on' + eventType, functionToCall);
  }
  else
  {
    eventType = 'on' + eventType;
    if (typeof targetElement [eventType] == 'function')
    {
      var oldListener = targetElement [eventType];
      targetElement [eventType] = function ()
      {
        oldListener ();
        return functionToCall ();
      }
    }
    else
    {
      targetElement [eventType] = functionToCall;
    }
  }

  return true;
}

/* Removes an event handling function from the targetElement. 
   Examples of eventType values are 'mouseover' and 'keyup', as opposed to 'onmouseover' and 'onkeyup'. 
   bubbleEventUpDOMTree is a boolean variable specifying whether the event should activate the event listeners
   of all the ancestors of the element (up to the window object)
   ***NOTE: This function does not support removing anonymous functions; a reference to the added function is needed */
function tii_removeEventHandler (targetElement, eventType, functionToRemove, bubbleEventUpDOMTree)
{
  if (typeof targetElement.removeEventListener != "undefined")
  {
    targetElement.removeEventListener (eventType, functionToRemove, bubbleEventUpDOMTree);
  }
  else if (typeof targetElement.detachEvent != "undefined")
  {
    targetElement.detachEvent ("on" + eventType, functionToRemove);
  }
  else
  {
    targetElement ["on" + eventType] = null;
  }
  
  return true;
}