/***** TII Global Browser Sniffing Variables *****/

var tii_isopera = typeof window.opera != 'undefined';

var tii_isie = typeof document.all != 'undefined'

   	&& !tii_isopera && navigator.vendor != 'KDE';

var tii_issafari = navigator.vendor == 'Apple Computer, Inc.';