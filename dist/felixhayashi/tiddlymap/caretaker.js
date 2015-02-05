/*\

title: $:/plugins/felixhayashi/tiddlymap/caretaker.js
type: application/javascript
module-type: startup

This module is responsible for registering a global namespace under $tw
and loading (and refreshing) the configuration.

Since changes in configuration tiddlers are instantly acknowledged,
the user does not need to refresh its browser (in theory :)).

Like a caretaker in real life, nobody can communicate with him. He does
all his work in the background without being ever seen. What I want to
say here is: do not require the caretaker!

@preserve

\*/
(function(){"use strict";exports.name="tiddlymap-setup";exports.platforms=["browser"];exports.after=["startup"];exports.before=["rootwidget"];exports.synchronous=true;var t=require("$:/plugins/felixhayashi/tiddlymap/utils.js").utils;var e=require("$:/plugins/felixhayashi/tiddlymap/adapter.js").Adapter;var i=function(e){var i=e;if(!i.path)i.path=t.getEmptyMap();i.path.pluginRoot="$:/plugins/felixhayashi/tiddlymap";i.path.edges="$:/plugins/felixhayashi/tiddlymap/graph/edges";i.path.views="$:/plugins/felixhayashi/tiddlymap/graph/views";i.path.options="$:/plugins/felixhayashi/tiddlymap/config";i.path.tempRoot="$:/temp/felixhayashi/tiddlymap";i.path.localHolders="$:/temp/felixhayashi/tiddlymap/holders";i.path.dialogs="$:/plugins/felixhayashi/tiddlymap/dialog";if(!i.ref)i.ref=t.getEmptyMap();i.ref.dialogStandardFooter="$:/plugins/felixhayashi/tiddlymap/dialog/standardFooter";i.ref.defaultGraphViewHolder="$:/plugins/felixhayashi/tiddlymap/misc/defaultViewHolder";i.ref.graphBar="$:/plugins/felixhayashi/tiddlymap/misc/advancedEditorBar";i.ref.sysConf="$:/plugins/felixhayashi/tiddlymap/config/sys";i.ref.visConf="$:/plugins/felixhayashi/tiddlymap/config/vis";i.ref.welcomeFlag="$:/plugins/felixhayashi/tiddlymap/flag/welcome";if(!i.config)i.config=t.getEmptyMap();i.config.sys=$tw.wiki.getTiddlerData(i.ref.sysConf,{});var a=t.unflatten($tw.wiki.getTiddlerData(i.ref.sysConf+"/user",{}));i.config.sys=$tw.utils.extendDeepCopy(i.config.sys,a);i.config.vis=$tw.wiki.getTiddlerData(i.ref.visConf,{});var a=t.unflatten($tw.wiki.getTiddlerData(i.ref.visConf+"/user",{}));i.config.vis=$tw.utils.extendDeepCopy(i.config.vis,a);if(!i.field)i.field=t.getEmptyMap();$tw.utils.extend(i.field,i.config.sys.field);if(!i.misc)i.misc=t.getEmptyMap();i.misc.unknownEdgeLabel="__noname__";i.misc.cssPrefix="tmap-";if(!i.filter)i.filter=t.getEmptyMap();i.filter.allSharedEdges="[prefix["+i.path.edges+"]]";i.filter.allSharedEdgesByLabel="[prefix["+i.path.edges+"]removeprefix["+i.path.edges+"/]]";i.filter.allViews="[all[tiddlers+shadows]has["+i.field.viewMarker+"]]";i.filter.allViewsByLabel="[all[tiddlers+shadows]has["+i.field.viewMarker+"]removeprefix["+i.path.views+"/]]"};var a=function(e){var i=e;var a=function(){};if($tw.tiddlymap.opt.config.sys.debug==="true"&&console){i.logger=function(){if(arguments.length<2)return;var t=Array.prototype.slice.call(arguments);var e=t.shift(t);var i=console.hasOwnProperty(e)?e:"debug";console[i].apply(console,t)}}else{i.logger=a}i.notify=$tw.tiddlymap.opt.config.sys.notifications==="true"?t.notify:a;return i};var d=function(){var t=function(){var t=[];t.push("prefix["+$tw.tiddlymap.opt.path.options+"]");t.push("!has[draft.of]");return"["+t.join("")+"]"}.call(this);$tw.tiddlymap.logger("log","Caretaker's filter: \""+t+'"');return $tw.wiki.compileFilter(t)};var r=function(){for(var t=$tw.tiddlymap.registry.length-1;t>=0;t--){var e=$tw.tiddlymap.registry[t];if(!document.body.contains(e.getContainer())){$tw.tiddlymap.logger("warn","A graph has been removed.");e.destruct();$tw.tiddlymap.registry.splice(t,1)}}};exports.startup=function(){$tw.tiddlymap=t.getEmptyMap();$tw.tiddlymap.registry=[];window.setInterval(r,1e3);$tw.tiddlymap.opt=t.getEmptyMap();i($tw.tiddlymap.opt);a($tw.tiddlymap,$tw.tiddlymap.opt);$tw.tiddlymap.adapter=new e;$tw.tiddlymap.logger("warn","TiddlyMap's caretaker was started");$tw.tiddlymap.logger("log","Registered namespace and options");$tw.tiddlymap.edgeChanges=[];var l=d();$tw.rootWidget.addEventListener("tm-create-edge",function(t){var e={from:$tw.tiddlymap.adapter.createNode(t.paramObject.from).id,to:$tw.tiddlymap.adapter.createNode(t.paramObject.to).id,label:t.paramObject.label};$tw.tiddlymap.adapter.insertEdge(e);$tw.tiddlymap.notify("Edge inserted")});$tw.wiki.addEventListener("change",function(e){$tw.tiddlymap.logger("warn","These tiddlers changed:",e);var d=t.getMatches(l,Object.keys(e));if(!d.length)return;$tw.tiddlymap.logger("warn","Global options will be rebuild");i($tw.tiddlymap.opt);a($tw.tiddlymap)})}})();