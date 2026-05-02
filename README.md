# n-hanced
mods for the browser game n-gon

this will have all the same things (for the most part) as n-gon enhanced
i am creating a new repo for it to clean things up, and switch to loading mods in the native n-gon tab instead of n-hanced having its own client

bookmarklet for sniper:
``javascript:var r=new XMLHttpRequest();r.open("GET",'https://raw.githubusercontent.com/tbxyd/n-hanced/main/sniper.js',true);r.onloadend=function(oEvent){new Function(r.responseText)();};r.send();``

bookmarklet for matter displacement field:
``javascript:var r=new XMLHttpRequest();r.open("GET",'https://raw.githubusercontent.com/tbxyd/n-hanced/main/matterdisplacement.js',true);r.onloadend=function(oEvent){new Function(r.responseText)();};r.send();``
