!function e(a,t,o){function i(n,c){if(!t[n]){if(!a[n]){var p="function"==typeof require&&require;if(!c&&p)return p(n,!0);if(r)return r(n,!0);var u=new Error("Cannot find module '"+n+"'");throw u.code="MODULE_NOT_FOUND",u}var h=t[n]={exports:{}};a[n][0].call(h.exports,function(e){var t=a[n][1][e];return i(t?t:e)},h,h.exports,e,a,t,o)}return t[n].exports}for(var r="function"==typeof require&&require,n=0;n<o.length;n++)i(o[n]);return i}({1:[function(e,a,t){"use strict";var o=o||{};o.MathJaxConfig={extensions:["mml2jax.js"],jax:["input/TeX","input/MathML","output/HTML-CSS"],displayAlign:"left",menuSettings:{zoom:"Click"},tex2jax:{inlineMath:[["\\(","\\)"]],displayMath:[["$$","$$"],["\\[","\\]"]],preview:"TeX",processEscapes:!0},mml2jax:{preview:["MathML"]},"fast-preview":{disabled:!0},"HTML-CSS":{EqnChunk:500,EqnChunkFactor:1,EqnChunkDelay:1e3,availableFonts:["STIX","TeX"],preferredFont:["STIX"],webFont:["TeX"],imageFont:["TeX"],styles:{".MathJax_Display":{margin:0},"#MathJax_Message":{margin:0}}},TeX:{TagSide:"right",Macros:{bgroup:"{\\unicode{x007B}}",egroup:"{\\unicode{x007D}}",enskip:"{\\enspace}",parbox:["\\mbox{#2}",2],upvarepsilon:"{\\unicode{x03B5}}",ss:"{\\unicode{x1E9E}}",textregistered:"{\\unicode{0x00AE}}",upvartheta:"{\\unicode{x03D1}}",Upvartheta:"{\\unicode{x03F4}}",Upgamma:"{\\unicode{x0393}}",upgamma:"{\\unicode{x03B3}}",Updelta:"{\\unicode{x0394}}",updelta:"{\\unicode{x03B4}}",Uptheta:"{\\unicode{x0398}}",uptheta:"{\\unicode{x03B8}}",Upkappa:"{\\unicode{x039A}}",upkappa:"{\\unicode{x03BA}}",Uplambda:"{\\unicode{x039B}}",uplambda:"{\\unicode{x03BB}}",Upsigma:"{\\unicode{x03A3}}",upsigma:"{\\unicode{x03C3}}",Upmu:"{\\unicode{x039C}}",upmu:"{\\unicode{x03BC}}",Upiota:"{\\unicode{x0399}}",upiota:"{\\unicode{x03B9}}",Upnu:"{\\unicode{x039D}}",upnu:"{\\unicode{x03BD}}",Upxi:"{\\unicode{x039E}}",upxi:"{\\unicode{x03BE}}",Upomicron:"{\\unicode{x039F}}",upomicron:"{\\unicode{x03BF}}",Uppi:"{\\unicode{x03A0}}",uppi:"{\\unicode{x03C0}}",Uprho:"{\\unicode{x03A1}}",uprho:"{\\unicode{x03C1}}",Uptau:"{\\unicode{x03A4}}",uptau:"{\\unicode{x03C4}}",Upupsilon:"{\\unicode{x03A5}}",upupsilon:"{\\unicode{x03C5}}",Upphi:"{\\unicode{x03A6}}",upphi:"{\\unicode{x03C6}}",Upchi:"{\\unicode{x03A7}}",upchi:"{\\unicode{x03C7}}",Uppsi:"{\\unicode{x03A8}}",uppsi:"{\\unicode{x03C8}}",Upomega:"{\\unicode{x03A9}}",upomega:"{\\unicode{x03C9}}",upalpha:"{\\unicode{x03B1}}",upbeta:"{\\unicode{x03B2}}",upepsilon:"{\\unicode{x03B5}}",upzeta:"{\\unicode{x03B6}}",upeta:"{\\unicode{x03B7}}",permille:"{\\unicode{x2030}}",hfill:"{\\enspace\\enspace}",copyright:"{\\unicode{x00A9}}",dag:"{\\unicode{x2020}}",ddag:"{\\unicode{x2021}}",ointop:"{\\unicode{0x222E}}",P:"{\\unicode{0x00B6}}",lhook:"{\\hookrightarrow}",rhook:"{\\hookleftarrow}",fancyscript:["{\\scr #1}",1],varvec:["\\pmb{#1}",1]}},MathMenu:{showFontMenu:!0}},"undefined"!=typeof a&&(a.exports={defaultConfig:o.MathJaxConfig})},{}],2:[function(e,a,t){"use strict";var o=o||{};o.MathJaxPrefilterHook=function(e){e.math=e.math.replace(/\\kern *-\\nulldelimiterspace/g,""),e.math=e.math.replace(/\\user2/g,"\\pmb"),e.math=e.math.replace(/\\mapstochar/g,"\\mapsto"),e.math=e.math.replace(/\s*<!\[CDATA\[\s*(.*)\s*\]\]>\s*/gm,"$1"),e.math=e.math.replace(/{?\\ss}?/g,"ß"),e.math=e.math.replace(/\\"a|{\\"a}|\\"{a}/g,"ä"),e.math=e.math.replace(/\\"o|{\\"o}|\\"{o}/g,"ö"),e.math=e.math.replace(/\\"u|{\\"u}|\\"{u}/g,"ü"),e.math=e.math.replace(/\\parbox(\[\w\])?{(.*?)}{(.*?)\\\\ (.*?)}/g,"\\parbox{$2}{$3 $4}"),e.math=e.math.replace(/\\vspace\*?{[^}]+}/g,""),e.math=e.math.replace(/\\text{\\small{([^}]+)}}/g,"\\scriptstyle{\\text{$1}}"),e.math=e.math.replace(/\\text{\\footnotesize{([^}]+)}}/g,"\\scriptstyle{\\text{$1}}"),e.math=e.math.replace(/\\text{\\scriptsize{([^}]+)}}/g,"\\scriptscriptstyle{\\text{$1}}"),e.math=e.math.replace(/\\text{\\tiny{([^}]+)}}/g,"\\scriptscriptstyle{\\text{$1}}"),e.math=e.math.replace(/\\textrm/g,"\\mathrm"),e.math=e.math.replace(/\\bf{/g,"\\mathbf{"),e.math=e.math.replace(/\\text\\EUR/g,"€"),e.math=e.math.replace(/\\mathop ([^{]+?)\\limits/g,"\\mathop{$1}\\limits"),e.math=e.math.replace(/{?\\ss}?/g,"ﬂ"),e.math=e.math.replace(/\\"a|{\\"a}|\\"{a}/g,"‰"),e.math=e.math.replace(/\\"o|{\\"o}|\\"{o}/g,"ˆ"),e.math=e.math.replace(/\\"u|{\\"u}|\\"{u}/g,"¸"),e.math=e.math.replace(/\\user1/g,"\\mathcal"),e.math=e.math.replace(/\\(big|Big|bigg|Bigg) *{([^}]+)}/g,"\\$1$2"),e.math=e.math.replace(/\\textnormal{\\textsc{([^}]+)}}/g,"\\textsc {$1}"),e.math=e.math.replace(/\\textsc *{([^}]+)}/g,"{\\rm ~#~$1~#~}"),e.math=e.math.replace(/\\upvarphi/g,"\\varphi"),e.math=e.math.replace(/\\llbracket/g,"⟦"),e.math=e.math.replace(/\\rrbracket/g,"⟧"),e.math=e.math.replace(/\\pounds/g,"£"),e.math=e.math.replace(/\\raisebox *{-[^}]+}{\$(.+?)\$}/g,"_{$1}"),e.math=e.math.replace(/\\raisebox *{[^}]+}{\$(.+?)\$}/g,"^{$1}"),e.math=e.math.replace(/\\CIRCLE/g,"{\\large\\unicode[.55,0.05]{x25CF}}"),e.math=e.math.replace(/\\LEFTcircle/g,"{\\large\\unicode[.55,0.05]{x25D1}}"),e.math=e.math.replace(/\\RIGHTcircle/g,"{\\large\\unicode[.55,0.05]{x25D0}}"),e.math=e.math.replace(/\\fontencoding{U}\Sfontfamily{wasy}\Sselectfont\Schar104/g,"‰");for(var a,t=new RegExp("~#~(.*?)~#~","g");a=t.exec(e.math);){for(var o="",i=0;i!=a[1].length;i++){var r=a[1].substr(i,1);o+=r.match(/[a-z]/)?"{\\small "+r.toUpperCase()+"}":r}e.math=e.math.replace(/~#~.*?~#~/,o)}},"undefined"!=typeof a&&(a.exports={prefilterHook:o.MathJaxPrefilterHook})},{}],3:[function(e,a,t){"use strict";var o=e("./MathJaxConfig").defaultConfig,i=e("./MathJaxHooks"),r="2.7.1",n=function(e){e||(e=o),e.AuthorInit=function(){MathJax.Hub.Register.StartupHook("TeX Jax Ready",function(){MathJax.InputJax.TeX.prefilterHooks.Add(i.prefilterHook)})},window.MathJax=e,setTimeout(function(){var e=document,a=e.getElementsByTagName("script")[0],t=e.createElement("script");t.type="text/javascript",t.async=!0,t.src="//cdnjs.cloudflare.com/ajax/libs/mathjax/"+r+"/MathJax.js?config=TeX-AMS-MML_HTMLorMML",a.parentNode.insertBefore(t,a)},1)};"undefined"!=typeof a&&(a.exports={loadMathJaxAsync:n})},{"./MathJaxConfig":1,"./MathJaxHooks":2}],4:[function(e,a,t){var o=e("mathjax-config");o.loadMathJaxAsync()},{"mathjax-config":3}]},{},[4]);