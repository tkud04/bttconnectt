ATGSvcs.rules.analytics.launch({'poll-delay': -1, 
  'eeOffered': function(e, data) {  
    var s=new AppMeasurement();
	s.account="btbaemaprod";
    s.linkTrackVars='prop50,eVar19,prop27';
    s.prop50='BTB:H&S:Contact Us:Proactive chat:Offered';
    s.eVar19='BTB:H&S:Contact Us:Proactive chat:Offered';
	var d = (new Date()+'').split(' ');
	var d1 = new Date();
	s.prop27 =[d[3],('0'+(d1.getMonth()+ 1)).slice(-2),d[2]].join('/')+' '+d[4];
    s.linkTrackEvents='None';
    s.tl(data,'o','BTB:H&S:Contact Us:Proactive chat:Offered');
    
  },
  
  'eeAccepted': function(e, data) { 
    var s=new AppMeasurement();
	s.account="btbaemaprod";
    s.linkTrackVars='prop50,eVar19,prop27';
    s.prop50='BTB:H&S:Contact Us:Proactive chat :Accepted';
    s.eVar19='BTB:H&S:Contact Us:Proactive chat :Accepted';
	var d = (new Date()+'').split(' ');
	var d1 = new Date();
	s.prop27 =[d[3],('0'+(d1.getMonth()+ 1)).slice(-2),d[2]].join('/')+' '+d[4];
    s.linkTrackEvents='None';
    s.tl(data,'o','BTB:H&S:Contact Us:Proactive chat:Accepted');
    
  },
  
'eeTransactionCompleted': function(e, data) {  

	//var s=new AppMeasurement('btbaemdev,btigreenfielddev');
    s.linkTrackVars='prop50,eVar19,prop27';
    s.prop50='BTB:H&S:Contact Us:Proactive chat :Opportunity:'+document.location.href;
    s.eVar19='BTB:H&S:Contact Us:Proactive chat :Opportunity:'+document.location.href;
	var d = (new Date()+'').split(' ');
	var d1 = new Date();
	s.prop27 =[d[3],('0'+(d1.getMonth()+ 1)).slice(-2),d[2]].join('/')+' '+d[4];
    s.linkTrackEvents='None';
    s.tl(data,'o','BTB:H&S:Contact Us:Proactive chat :Opportunity:'+document.location.href);
    
  },
  
'eeSuppressed': function(e, data) {  
    var s=new AppMeasurement();
	s.account="btbaemaprod";
    s.linkTrackVars='prop50,eVar19,prop27';
    s.prop50='BTB:H&S:Contact Us:Proactive chat popup:Suppressed';
    s.eVar19='BTB:H&S:Contact Us:Proactive chat popup:Suppressed';
	var d = (new Date()+'').split(' ');
	var d1 = new Date();
	s.prop27 =[d[3],('0'+(d1.getMonth()+ 1)).slice(-2),d[2]].join('/')+' '+d[4];
    s.linkTrackEvents='None';
    s.tl(data,'o','BTB:H&S:Contact Us:Proactive chat popup:Suppressed');
    
  }
});
