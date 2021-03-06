(function(){
	
	angular.module('webapp').controller('homeCtrl',['$scope', '$location','$http','_','Index','service','$modal',function($scope,$location,$http,_,Index,service,$modal){
				
		$scope.cantoIndex = []; // this array to hold the sloka index objects. 
		$scope.completeSlokas = [];
		
		$scope.chapters =[];
		$scope.slokas = [];
		$scope.showSearchBar = false;
		$scope.canto =1;
		$scope.canto1 =[];
		$scope.htmlname = "";
		
		$scope.sloka = true;
		$scope.summary=false;
		$scope.allSlokas = true;
		$scope.searchBar = true;
		$scope.showModal = false;
		
		$scope.active ="";
		
		
		$scope.slokaInfo =[];
		
		//$scope.summaryFileName = "html/SV-1/summary.html";
			$scope.home = function(){
			//console.log("navigating to home page ");	
			$location.path("/home/slokas");
			console.log($scope.showSummary);
			
		}
			$scope.load = function(sno,sloka){
				var num = parseInt(sloka.slokaNo);
				$scope.active = num;
				console.log($scope.active);
				var file ="" , canto ="";
				if(sloka.sloka != "Summary"){
					$scope.summary=false;
					$scope.sloka = true;
						$scope.showInterface = true;
						$scope.searchBar = false;
					$scope.showSummary = false; //hiding summary division to show sloka information 
					var cls="."+sno+"."+num;
				_.each($scope.chapters, function(s){
					if(parseInt(s.slokaNo) == num){
						$scope.slokas = [];
						var format = ["I","II","III","IV","V","VI"];
						$scope.slokas.push(s);
						$scope.showSearchBar = true;
						 file = "SV-".concat(num);
						 canto = "SV-".concat(format[sno-1]);
						$scope.htmlname = "html/"+canto+"/"+file+"/"+file+".html";
					}
				});
				
				}else{
					$scope.summary = true;
					$scope.sloka = false;
					//$scope.show = false;
					$scope.summaryFileName = "html/SV-"+sno+"/summary.html";
					// $("."+sno+".0").addClass("active");
				//	$scope.showSearchBar = false;
				//	$scope.slokas = $scope.chapters;
				}
				
				
				//console.log($scope.slokas.length);
			}
		
		$scope.init = function(){
			
			service.getSlokaIndex().success(function(data){
				$scope.cantoIndex = data[0];
			});
			
			service.getAllSlokas().success(function(data){

				$scope.completeSlokas = data;
				console.log(data);
				$scope.slokas = $scope.completeSlokas[0].canto1;
				$scope.chapters = angular.copy($scope.slokas);
				console.log(angular.toJson($scope.completeSlokas.canto2));
			});
						
		}
		$scope.init();
		
		
		/*$scope.loadCantos = function(){
			console.log("inside of loadCantos method ..");
			console.log(angular.toJson($scope.cantoIndex));
			
			if(!Index.isCalled){
				$http.get('json/completeIndex.json').success(function(data){
					Index.cantos = data[0];
					$scope.canto1 = Index.cantos;
					Index.isCalled = true;
				}).error(function(){
					console.log('error');
				});
			}else{
				$scope.canto1 = Index.cantos;
			}
			console.log("Index.isCalled value "+ Index.isCalled);
			console.log($scope.canto1);
		}*/
		
		$scope.showAllSlokas = function(chapter){
			$("ul").find(".in").removeClass("in");
			$scope.sloka = true;
			$scope.showInterface = false;
			//$location.path("home/slokas");
			$scope.searchBar = true;
			$scope.loadData(chapter);
			console.log('inside of all slokas');
			$scope.summary = false;
		}
		
		$scope.showPopUp = function(num,sloka){
			var format = ["I","II","III","IV","V","VI"];
			 var file = "SV-".concat(num);
			var canto = "SV-".concat(format[$scope.canto-1]);
			filename = "html/"+canto+"/"+file+"/"+file+".html";
			$scope.fileName = filename;
			$scope.slokaText= sloka;
			filename = "html/translate.html";
			console.log('filename : '+ filename);
			console.log('filename '+ $scope.fileName);
			console.log($scope.canto);
			 //$scope.showModal = !$scope.showModal;
			 $modal.open({
				 templateUrl:filename,
				/*template:'<div class="model"><div class="modal-header">Translation</div>'
					+'<div class="modal-body">'
					+'<div ng-include="\'fileName\'"></div>'
					+'</div></div>',*/
				size:'lg',
				controller:'modelController',
				resolve:{
					fileName:function(){
						return $scope.fileName;
					},
					sloka: function(){
						return $scope.slokaText;
					}
				}
				
			});
			 console.log('filename : '+ filename);
			 $('.modal-body').load(filename);
			 console.log('filename : '+ filename);
		}
		
		$scope.loadData = function(no){
			console.log(no);
			$scope.canto = no;
			if(no ==1){
				$scope.slokas = $scope.completeSlokas[0].canto1;
			}
			else if(no ==2){
				$scope.slokas = $scope.completeSlokas[1].canto2;
			}else if(no == 3){
				$scope.slokas = $scope.completeSlokas[2].canto3;
			}else if(no == 4){
				$scope.slokas = $scope.completeSlokas[3].canto4;
			}else if(no == 5){
				$scope.slokas = $scope.completeSlokas[4].canto5;
			}else if(no == 6){
				$scope.slokas = $scope.completeSlokas[5].canto6;
			}
			//$scope.slokas = $scope.completeSlokas.canto1;
			$scope.chapters = angular.copy($scope.slokas);
		}
		
		//$scope.loadCantos();
			
	}]).controller('modelController',['$modalInstance','fileName','$scope','sloka','$log',function($modalInstance,fileName,$scope,sloka,$log){
	
		$scope.fileName = fileName;
		$scope.slokaText = sloka;
		$log.info($scope.fileName);
	 	$log.info($scope.slokaText);	
		$scope.close = function(){
			$modalInstance.dismiss();
		}
		
	}]).controller('summaryCtrl',['$scope','$log',function($scope,$log){
		
		$log.info('inside of summaryCtrl ');
		$scope.current = "sloka1";
/*		$scope.$watch(current,function(){
			$log.info($scope.current);
		});
*/		
		$scope.active = function(val){
			$scope.current = val;
			$log.info($scope.current);
		}
		
		
		
		$scope.cantos = [{
			"canto2": [{
				"title": "Sanskrit",
				"desc": "कार्यद्वये समुपस्थिते सति भगवान् श्रीकृष्णः बृहस्पति-शुक्राचार्यतुल्याभ्यां गुरुवर्याभ्यां राजनीतिशास्त्रज्ञाभ्यां बलराम-उद्धवाभ्यां समं मन्त्रोचितं प्रदेशं राजप्रासादसभाकक्षं प्राविशत् । तत्र भगवान् श्रीकृष्णः स्वाभिप्रायम् इत्थं प्रत्यपादयत् -“भगवन्! अस्माकं सम्मुखं कार्ययुगलं समुपस्थितम् - (१) धर्मराजयुधिष्ठिरस्य यज्ञे गमनम् (२) चेदिराजं शिशुपालं प्रति विजयाभियानञ्च । उदीयमानः शत्रुः न समुपेक्षणीयः । सः समस्तं विश्वं पीडयति इति मम मतम् । विषयेऽस्मिन् भवतोः किमभिमतम् ?” इति । श्रीकृष्णवचनमाकर्ण्य शत्रोः शिशुपालस्य अपकारं च स्मृत्वा बलरामस्य ओष्ठौ क्रोधेन स्फुरितौ । अक्षिणी घूर्णनं प्रापतुः। दीर्घैः उष्णैश्च निःश्वासैः उपकण्ठं विराजमाना वनमाला म्लाना समजायत । क्रोधेनारक्तेऽङ्गे स्वेदलवाः प्रादुरभवन् । अथ \"न सः चेदिराजः शिशुपालः कदापि समुपेक्षणीयः । तं प्रति विजयाभियानमेव वरम्\" इति बलरामः व्यग्रतया स्वाभिप्रायमित्थं प्राकटयत् । तत्पश्चात् उद्धवः अनुद्धतस्वभावः सविनयं स्वाभिमतमित्थं जगाद- \"भगवन्! भवतोऽभिमतस्य क्रियान्वयनाय बलरामेण निवेदिते सति मम वक्तव्यं पिष्टपेषणमात्रम् अस्ति । तथापि गुरुगौरवेण, सविनयम् अहमपि किञ्चित् वक्तुकामः। जनैः धैर्यं समवलम्ब्य युक्तिपूर्वकं षाड्गुण्यप्रयोगो विधेयः, न तु त्वरया इति षाड्गुण्यादेरपि उपादेयता । पञ्चाङ्गप्रधानो मन्त्रोऽपि अवसरं प्रतीक्ष्य क्रियान्वयनीयः । अतः चेदिराजः शिशुपालः 'अशक्त' इति मत्वा न कदापि अवहेलनीयः । मन्त्रशक्तिपूर्विका हि उत्साहशक्तिवल्लरी कोशदण्डजां प्रभुशक्तिं फलति ।  भवता निर्णीतः मखविघ्नः मा भवतु । अतः प्रथमं राजसूययज्ञे सम्मेलनाय प्रथमं प्रयतितव्यम् । ततश्च चैद्यं प्रति विजयाभियानमिति मे प्रतिभाति\" इति । भगवता श्रीकृष्णेन उद्धवमन्त्रणामेवाऽङ्गीकृत्य सभा विसर्जिता ।"
			}, {
				"title": "Hindi",
				"desc": " इस सर्ग में श्रीकृष्ण भगवान् का बलरामजी तथा उद्धवजी के साथ मन्त्रणा करना प्रतिपाद्य अंश है । नारदजी के लौटने के उपरान्त धर्मराज युधिष्ठिर से राजसूय यज्ञ में सम्मिलित होकर सहायता करने के लिए निमन्त्रित श्रीकृष्ण भगवान् की मित्रकार्य-सम्पादनार्थ युधिष्ठिर के यज्ञ में सम्मिलित होने हस्तिनापुर जाना चाहिये या देवकार्यसम्पादनार्थ शिशुपाल के साथ युद्ध करने चेदिदेश आना चाहिये ? इस विषय में संशयालु होकर मन्त्रणा करने के लिये मन्त्री एवं चाचा उद्धवजी तथा अग्रज बलरामजी के साथ मन्त्रणागृह में पहुँचे और 'हम लोगों के बिना भी युधिष्ठिर लोकविजयी भीम, अर्जुन आदि भाइयों के साथ यज्ञ कर सकते हैं, अत एव जगत्पीडितकर्ता शत्रु की उपेक्षा करना उचित प्रतीत नहीं होता' इस प्रकार अपना अभिमत व्यक्त करते हुए उन लोगों से भी अपनी-अपनी सम्मति देने की प्रार्थना की । यह सुनते ही अग्रज बलरामे के ओठ क्रोध से फुरफुराने लगें । उनकी नशीली आँखें क्रोध से आरक्त हो उठीं । गले की वनमाला ठण्डी आहों से मुरझा गयी । क्रोध से सारा शरीर लाल हो गया और उस पर पसीने की बूँदें चमकने लगीं । संक्षिप्त रूप से बलराम का अभिमत इस प्रकार है - उन्होंने अनेकविध युक्ति तथा दृष्टान्तों के द्वारा श्रीकृष्ण भगवान् के वचन का समर्थन करते हुए शीघ्रातिशीघ्र शिशुपाल के प्रति अभियान करने के लिए अपनी सम्मति दी । तत्पश्चात श्रीकृष्ण के दृष्टि द्वारा संकेत करने पर बृहस्पति के शिष्य, सचिव उद्धवजी ने तर्कपूर्ण विविध युक्तियुक्त वचनों से बलरामजी के प्रत्येक वचन का खण्डन कर धर्मराज युधिष्ठिर के यहाँ यज्ञ में सम्मिलित होने के लिए कहा था । राजनीति-निपुण पितृव्य एवं मन्त्री उद्धवजी के वचन के अनुसार ही कार्य करने का निर्णय कर श्रीकृष्ण सभा विसर्जित कर कार्यान्तर साधन में लग गये । "
			}, {
				"title": "English",
				"desc": "The colophon at the end of this canto mentions that the title of the canto is 'Mantravarṇanam', with which it is evident that the theme of this canto is 'Counsel'. Hence, the theme is a blend of philosophy and polity endowed with poetic excellence of the poet Māgha. Śrī Kṛṣṇa holds a council with his brother Balarāma and uncle Uddhava and discusses whether hostilities should be immediately commenced or should he first attend Rãjasūya sacrifice which was soon to be performed by Yudhiṣṭhira and which had been appointed by himself. Balarāma, the impetuous fiery here, is for immediate attack of Śiśupāla, setting forth, in support of his opinion, various considerations of policy. Uddhava, the sage counsellor, however holds that time is not yet ripe for punishing the insolent king of Cedī , that an opportunity for attack would be given by Śiśupāla himself and that therefore Kṛṣṇa, should give up, for the present, the thought of levying war on his inveterate foe. The opinion of Uddhava prevails."
			}
			],
			"canto1": [{
				"title": "Sanskrit",
				"desc": "एकदा द्वारकापुर्यां रुक्मिणीरूपया श्रिया समेतः वसुदेवरूपिणः कश्यपस्य वेश्मनि कृष्णरूपेण तिष्ठन् हरिः देवर्षिं नारदम् आकाशमार्गात् अवतरन्तं अपश्यत् । अम्बरे विद्योतमानः सः प्रथमं तेजःपुञ्ज इव, ततः शरीरी इति, ततः पुरुषविशेष इति ततश्च नारद इति प्रतीयते स्म । तत्र आकाशचारिणः देवा देवर्षिमनुसरन्ति स्म, तान् निवर्त्य ततोऽवतीर्णश्च सः वासुदेवस्य प्रासादे पदयुगलं स्थापयामास ।उपवेशनात् पूर्वमेव सिंहासनात् उत्थितः श्रीकृष्णः देवर्षिं नारदम् अर्घ्यादिविधिना सम्पूजयित्वा स्वहस्तदत्ते आसने उपावेशयत् । ततः श्रीकृष्णः नारदाय तदीयागमनहेतुं पप्रच्छ । नारदश्च सविनयम् इत्थं न्यवेदयत् श्रीकृष्णम् - “भगवन्! योगिनामपि त्वमेव साक्षात्करणीयः इत्यतः गौरवास्पदं प्रयोजनं किमस्ति ? दुष्कृतां विनाशाय यदि भवान् नावतरेः, ततः योगिभिरपि अनिरूपिस्त्वं मादृशां साक्षात्कारविषयः कथं स्याः? देवेन्द्रेण प्रहितं सन्देशं श्रावयितुं भवत्सकाशमागमनं हि मम कृते सौभाग्यविषयः।अधुना कंसादिवधात् भवतो या स्तुतिर्विधीयते, सा तिरस्क्रियैव । यतः पूर्वं तु हिरण्याक्षप्रभृतिदैत्यानां भवता संहारो विहितः, तेषां समक्षं तु कंसादिमहीभृतः मृगायन्ते खलु । भवता पूर्वं नृसिंहावतारं गृहीत्वा यस्य हिरण्यकशिपोः वधो विहितः, यं रावणं भवान् रामावतारे अवधीत्, स एव शैलूष इव शिशुपालरूपेण अवतीर्य त्रिभुवनमुत्पीडयति । तस्यात्याचारैः पुरन्दरोऽपि चिन्ताक्रान्तः अस्ति । भवान् एव अस्य शिशुपालस्य संहारं कर्तुं प्रभवति नान्यः इत्ययं तस्यैव सन्देशः । अतो भवता तद्वधं विधाय देवराजेन साकं त्रिभुवनजनः दुःखभरैः मोचितव्यः, सुखभरैश्च संयोजयितव्यः\" इति ।श्रीकृष्णः देवराजस्य सन्देश 'ओम्' इति स्वीचकार । देवर्षिश्च नभसि समुत्पतितः । तदा भृकुटिच्छलेन श्रीकृष्णस्य वदने शत्रुविनाशसूचकः धूमकेतुः स्थानं चकार । "
			}, {
				"title": "Hindi",
				"desc": "इस सर्ग में नारदजीका द्वारकापुरी में आकर श्रीकृष्ण भगवान् से शिशुपालवध करने का इन्द्र सन्देश देते हैं । जब जगदाधार श्रीकृष्ण भगवान् द्वारकापुरी में लोकशासन कर रहे थे, तब, एकबार नारदजी आकाशमार्ग से उनके यहाँ आये, उन्हें देखकर श्रीकृष्ण भगवान् ने यथोचित अतिथिसत्कार कर उनकी प्रशंसा करते हुए आनेका कारण पूछा । उत्तर में नारदजीने श्रीकृष्ण भगवान् के दर्शन को ही प्रधान कारण बतलाते हुए इन्द्र के सन्देशरूप में शिशुपाल को मारने के लिए कहा तथा उसकी परमावश्यकता प्रदर्शनार्थ शिशुपाल के पूर्वजन्म में 'हिरण्यपकशिपु' तथा 'रावण' होकर देवपीडन आदि उनके औद्धत्यपूर्ण कार्यों को विस्तार के साथ कहा और यह भी कहा कि उन्हें भी नरसिंह तथा दशरथनन्दन राम होकर आपने ही मारा तथा पुनः शिशुपाल के औद्धत्यपूर्ण कार्यों को कहते हुए 'उसे भी आप ही मार सकते हैं' ऐसा कहा । नारदजीद्वारा कथित इन्द्रसन्देश को सुनकर श्रीकृष्ण भगवान् ने क्रोध से भृकृटि चढ़ा ली और शिशुपाल को मारने की स्वीकृति प्राप्त कर नारदजी आकाश को लौट गये ।"
			}, {
				"title": "English ",
				"desc": "When Śrī Kṛṣṇa was ruling the world at Dwārakā, sage Nārada descended from heaven to his abode. Having received hospitality as a guest and having been questioned the purpose of his arrival by Śrī Kṛṣṇa, he praised the lord and then replied thus. He conveyed him the command of lord Indra, and incited him to war with his cousin but mortal enemy, Śiśupāla, king of Cedī. At this juncture, the sage reminds him of previous births of Śiśupāla such as 'Hiraṇyakaśipu', 'Rāvaṇa' and others, the way they tormented the world and also the way how lord Śrī Kṛṣṇa took initiative to slay them. Having heard the command of Lord Indra through sage Nārada, the lord had uttered an assent and anger took abode in the guise of the curve of his eye-brows on his face that resembled the sky overcast with the comet. Nārada, too ascends back to the sky."
			}],
			"canto3": [{
				"title": "Sanskrit",
				"desc": "उद्धवमन्त्रणामङ्गीकृत्य चैद्यं प्रति विजययात्राया निश्चयं परित्यज्य भगवान् श्रीकृष्णः राजसूययज्ञे सम्मिलितुं धर्मराजराजधानीम् इन्द्रप्रस्थाभिधानां प्रतस्थे | तदा भगवता राजतमातपत्रं धृतम् | भगवन्तमुभयतः चामरयुगलं व्यराजत | मौलौ विराजमानं मुकुटं विविधरत्नखचितगोवर्धनाचलमिव शुशुभे | उभयोः कर्णयोः मरकतमणिखचितं काञ्चनकुण्डलद्वयं शुशुभे | हस्तयोः केयूरे अदीपताम् | वलयप्रोतपद्मरागमणिकिरणसङ्क्रान्ताः स्वभावत आरक्ताश्च नखाग्राः भगवतो नृसिंहस्य हिरण्यकशिपुवक्षोविदारणलीलां स्मारयामासुः | मुक्तालतया वक्षो व्यराजत | वक्षसि धृते कौस्तुभमणौ प्रतिबिम्बितं समस्तं विश्वं साक्षाच्चकार लोकः | भगवता उपकण्ठं धृता मुक्तामाला पादाङ्गुष्ठं चुचुम्ब | एवं प्रस्थानात् पूर्वमलङ्कृतस्य भगवतो लक्ष्मीः अखिललोककान्ता व्यराजत, वक्षसि विराजमाना तु लक्ष्मीः अन्यैवासीत् अनन्यकान्ता | भगवन्तं श्रीकृष्णं प्रस्थातुकामं प्रसाधितवपुषयुवतयो महिष्यः परिवेष्टयन्ति स्म | ततो भगवता सुदर्शनं चक्रं, कौमोदकी गदा, नन्दकः खड्गः, शार्ङ्गधनुश्च करेषु दध्रिरे | अथ पाञ्चजन्यः शङ्खो ननाद | पुष्यरथं चाधिरुरोह भगवान् | तस्योपरि गरुडध्वजः व्यराजत | प्रयाणसमये जायमाने पटहनादे नादान्तराणि व्यलीयन्त | अथ सा पुष्यरथयात्रा प्रारभत, सैन्यानि च चन्द्रवंशीयं श्रीकृष्णचन्द्रमनुसरन्ति स्म | अग्रे गजसेना ययौ, ततश्च रथसेना | अश्वसेनया च सुवर्णधूलिः खुरैराहता | जनौघः प्रतिरथ्यं तां यात्रां द्रष्टुकामः एकत्रितः | भगवान् द्वारावत्याः सौन्दर्यं निरीक्षमाणः शनैः गमनं नाविन्दत | द्वारावती काञ्चनवनप्रवेष्टिता मध्येसमुद्रं व्यराजत, या समस्तपृथिव्याः ननु प्रतिकृतिरासीत् | यस्याः तटेषु रत्नावलयः प्रसृताः | वणिक्पथे च रत्नपूगाः विक्रयाय विकीर्णाः | यस्याः प्राकारः गगनचुम्बी आसीत्, यत्रत्या तरुण्यः अप्सरसामनुकृतिं विदध्युः | यस्यां जनैः द्वयेऽपि विनीतमार्गाः नामुच्यन्त | अमरावतीं च यामाह्वास्त | त्रिलोकीतिलको भगवान् यस्याः तिलको बभूव | एवं क्रमेण नगरीं निरीक्षमाणः भगवान् शनैः शनैः नगरात् निष्क्रमणं चकार, ततश्च सैन्यानि | एवं तटं प्राप्य समुद्रस्य पारेजलं श्रीकृष्णः वनावलीः अपश्यत् | भगवन्तं श्रीकृष्णमागतं वीक्ष्य समुद्रः तं प्रत्युज्जगामेव | चमूचरैः कच्छभुवां प्रदेशाः आसेदिरे, तैश्च समुद्रात् आतिथ्यसत्कारो लेभे | अथ द्वारावतीपुर्या निष्क्रान्तः श्रीकृष्णबलस्य सागरस्य च महदन्तरं समभवत् |"
			}, {
				"title": "Hindi",
				"desc": " <p class='text-center'> (द्वारापुरीसे श्रीकृष्ण भगवान् के प्रस्थान का तथा द्वारकापुरी और समुद्रका वर्णन )</p> <p> युद्ध का विचार स्थगित होने से सौम्यमूर्ति श्रीकृष्ण भगवान् अनेकविध बहुमूल्य श्वेतच्छत्र, चामर, मुकुट, कुण्डल, केयूर, कङ्कण, मुक्ताहार, कौस्तुभमणि, मेखला, करधनी आदि भूषण तथा तप्तसुवर्णवत् चमकते हुए पीतम्बर को धारण कर साथ में कौमोदकी गदा, नन्दक खड्ग, शार्ङ्ग धनुष, पाञ्चजन्य शङ्ख को ग्रहण कर सर्वत्र अप्रतिहतगति रथ पर सवार हुए जिस पर गरुडचिह्नाङ्कित पताका फहरा रही थी, और उनके पीछे बड़ी-बड़ी पताकाओं को फहराती हुई अपरिमित चतुरङ्गिणी सेना चल रही थी । उनको देखने के लिए नागरिकों की भीड़ आगे निकलने वाली गलियों के रास्ते पहले पहुँच जाती थी । श्रीकृष्ण भगवान् की राजधानी सुवर्णमयी द्वारकापुरी समुद्र को मध्य में विदीर्ण कर ऊपर निकली हुई वडवानल की ज्वाला-सी शोभती थी । उसके बाजारों में दुकानों पर बहुमूल्य रत्नों के ढेर लगे थे । उसकी अट्टालिकाएँ, परकोटे बहुत ही ऊँचे तथा अत्यन्त चिकने थे और उनपर बनाये गये चित्र सजीव-से प्रतीत होते थे । अप्सराओं के समान सुन्दरी बहँकी रमणियाँ मानरहित होकर सदा कामोत्कण्ठिता रहती थीं । ऐसी स्वर्गोपम द्वारकापुरी को देखते हुए श्रीकृष्ण भगवान् जब उससे बाहर निकले तब समुद्र को देखा । उसमे बहुत-सी नदियाँ आकर मिल रही थीं, उससे निकलते हुए फेन तथा चञ्चल तरङ्ग एवं गम्भीर ध्वनि उसके मृगी का रोगी होने का भ्रम उत्पन्न करते थे । उस पारकी श्यामल वनावलि बहुत सुहानी लगती थी । तट पर मोती बिखर रहे थे और शीतल मन्द सुगन्ध वायु से सैनिकों का श्रम दूर हो जाता था । ऐसे समुद्र के तट पर पड़ाव डालकर सैनिकों ने लवङ्ग के फूलों का कर्णभूषण पहना और छककर नारियल का पानी पिया । </p>"
			}, {
				"title": "English ",
				"desc": "(Departure from Dwāraka and depiction of Dwāraka and Ocean) Śrī Kṛṣṇa, in the present canto departs for Indraprastha, the capital of Yudhiṣṭhira. The greater part of this canto consist only of long descriptions. When the decision of battle is stopped, Śrī Kṛṣṇa adorned himself with various gems and having dressed up in yellow clothes, took all his five weapons namely, (i) the holy disc – Sudarśana (ii) Mace – Kaumodakī (iii) Sword – Nandaka, (iv) Bow – Śārṅga and (v) the conch – Pāñcajanya and started on his chariot along with his army. On his way, there were long descriptions of markets . When he came out of Dwāraka city, he saw an ocean, where the poet Māgha depicts it's glory wonderfully."
			}],
			"canto4": [{
				"title": "Sanskrit",
				"desc": "भगवतः कृष्णस्य इन्द्रप्रस्थानं प्रति गमनसमये मार्गे विद्यमानस्य रैवतकपर्वतस्य बहुधा वर्णनं कृतं कविना अस्मिन् सर्गे | विन्ध्यपर्वतः इव विद्यमानं रैवतकपर्वतं दृष्ट्वा श्रीकृष्णः उत्कण्ठितः अभूत् | तदानीं तस्य सारथिः दारुकः अमुं  रैवतकपर्वतं बहुधा वर्णयामास | सूर्ये उदयमाने सति चन्द्रमसि च अस्तमयमाने अयं रैवतकपर्वतः विलम्बमानकिङ्किणीयुगलवेष्टितगजराजशोभां धारयति । अनेनैव वर्णनेन कर्विमाघः 'घण्टामाघः' इति प्रसिद्धः जातः | अस्य पर्वतस्य भूमिः स्वर्णमयी | अस्य झरस्य जलं देवाङ्गनानां शरीराणि शैत्यीकर्तुं प्रभवति | जलेऽस्मिन् एकतः स्फटिकवर्णः अन्यतः नीलवर्णः गङ्गायमुनयोः सङ्गमः इव प्रतिभाति | अयं पर्वतः चम्पकपुष्पाणां शोभया सुवर्णमयभित्तिभिः सुमेरुपर्वतसदृशः भाति | पर्वतेऽस्मिन् कम्बलमृगाः विचरन्ति तथा स्त्रीसहितसिद्धगणाः विहरन्ति, सुखकरः वायुः वहति च | पर्वतोऽयं बहुविधरत्नानां निधिरस्ति | किन्नराणां विहारस्थलोऽयं सिद्धपुरुषाणां निवासस्थानं च | अत्र न केवलं गावः अपितु गजराजाः अपि विचरन्ति | इत्थं नैकविधैः विशेषगुणैस्सह विडम्बितश्रृङ्गसमूहशोभैः तीव्रमारुतप्रेरितैः सलीलम्  उत्पतद्भिः बलभद्राम्बरवच्छ्यामैः मेघैः सौत्सुक्यम् श्रीकृष्णस्य अभ्युत्थानं करोतीव दृश्यते |"
			}, {
				"title": "Hindi",
				"desc": "आगे चलते हुए श्रीकृष्ण भगवान् ने बड़ी-बड़ी चट्टानों के ऊपर उठते हुए बादलों से सूर्य-मार्ग को पुनः रोकने के लिए उद्यत विन्ध्यपर्वत के समान प्रतीयमान रैवतक को देखा । भगवान को उत्कण्ठित देख उनका सारथि दारुक उस रैवतक पर्वत का वर्णन करने लगा । उसने कहा – सूर्य के उदय तथा चन्द्रमा के अस्त होते रहने पर दोनों पार्श्वों में लटकते हुए दो घण्टाओंवाले हाथी के समान यह पर्वत शोभता है । इसी वर्णन के कारण कवि माघ 'घण्टामाघ' के नाम से प्रसिद्ध हुए हैं । स्वर्णमयी भूमिवाला यह रैवतक पर्वत ऊँचे शिखरों से गिरते हुए झरनों के ऊपर उछले हुए जलबिन्दुओं से स्वर्गीय देवाङ्गनाओं का शरीर शीतल करता है । पानि में एक ओर स्फटिक तथा दूसरी ओर नीलमणि की कान्ति से गङ्गा-यमुना के सङ्गम के समान इसका जलाशय शोभता है । एक ओर सुवर्णमयी तथा दूसरी ओर रजतमयी दीवार से यह पर्वत भस्मोद्धूलित एवं नेत्र से अग्निकण निकलते हुए शिवजी के समान प्रतीत होता है । विकसित चम्पक से पिङ्गलवर्ण कनकमयी दीवारों से सुमेरुतुल्य इस पर्वत के द्वारा भारतवर्ष इलावृत के समान शोभता है । यहाँ कम्बलमृग विचरते हैं और स्त्री सहित सिद्धगण विहार करते हैं, रात्रि में औषधियाँ चमकती हैं, पुष्पित कदम्ब को कम्पित करती हुई सुखकर वायु बहती है । यहाँ दारिद्र्यनाशक रत्नों की खाने हैं, तथा यह किन्नरों की विहारस्थली है । यहाँ न केवल चमरी गायें अपितु विशालकाय हाथी विचरते हैं । अनेक प्रकार से भोगभूमि होता हुआ भी यह पर्वत सिद्धभूमि भी है, क्योंकि यहाँ पर मैत्री आदि चारों वृत्तियों के ज्ञाता, अविनद्या आदि पाँच क्लेशों का त्यागकर सबीज योग को प्राप्त किये हुए प्रकृति-पुरुष की भिन्नता से ज्ञान प्राप्तकर उसे भी रोकने के लिए समाधि लगाये हुए बहुत से सिद्धपुरुष निवास करते हैं । इस प्रकार परमश्रेष्ठ यह रैवतक पर्वत ऊपर उठते हुए श्यामल मेघों से मानों श्रीकृष्ण का अभ्युत्थान करने के लिए ऊपर उठ रहा है ।"
			}, {
				"title": "English ",
				"desc": "In this canto, poet Māgha depicts Raivataka mountain. On the way to his march towards Indraprashta, Śrī Kṛṣṇa, became very much excited when he saw Raivataka mountain. Having seen him thus, his charioteer Dāruka depicts the greatness of the same.This mountain is endowed with riches such as many-hued minerals of which were imbedded with sapphires, and which, therefore, was, as if it were, the vapour of the hissing of serpents, bursting from the ground and rising along with the radiance of jewels, after having broken open the ground. With the sun with his string like rays spread upwards rising on one side and the moon setting on the other, this mountain resembles a stately elephant begirt by a pair of bells hanging on either side of his body. Thus, with this depiction, the poet Māgha became popular as 'Ghaṇṭā  Māgha'. Land of this mountain is said to be golden. It's water falls cool the bodies of celestial beauties. Here, rivers, that have their waters, in one place, mingled with the rays of the crystal bank and in another, blended with the radiance of sapphires, assume the beauty of the Ganges, heightened by the waters of Yamunā, flowing into her. On account of this mountain, who has attained the beauty of the ridge of Sumeru by displaying his sky-touching walls of gold which have the tawny lustre of the Champaka conspicuous by its full-blown flowers, the Bhāratavarsha appears like Ilāvrita. On this mountain Rallaka deer wander. It is a treasure of various gems, abode of siddhas and a pastime place for kinneras. Thus, with such various embellishments, this high mountain is, as if it were, rising hastily, by means of clouds, to greet Śrī Kṛṣṇa."
			}],
            "canto5": [{
				"title": "Sanskrit",
				"desc": "रैवतकपर्वतमधिकृत्य दारुकस्य वर्णनं श्रुत्वा श्रीकृष्णः रैवतकाद्रौ क्रीडितुम् अभिललाष अतः तत्र वसतुम् ऐच्छत् सेनया सह रैवतकपर्वतं प्रति च ययौ | एकतः गजसमूहः चलति चेत् अन्यतः अश्वाः पङ्क्तिबद्धाः चरन्ति स्म | एकतः रथानां श्रेणयः रैवतकपर्वतप्रान्तधावत्स्यन्दनप्रधिकोटिचूर्णीकृतकठोरपाषाणतलचूर्णमध्याः आसन्  अन्यतः उष्ट्रानां समूहः इयाय | इत्थं गत्वा श्रीकृष्णस्य सेना स्वं-स्वं निवासस्थाने तस्थौ | तत्र राज्ञाम् निवासस्थानानि शोभाकारिभिः,  अत्यन्तभस्मरचनाकान्तिभिः शुशुभिरे | श्वेतपटोपकल्पितानि रज्जुबद्धानि श्वेतसूक्ष्मतेजोऽवयवव्याप्तानि चन्द्रमण्डलनिभानि राज्ञां गृहाणि नीरन्ध्राभिः उन्नतैः मातङ्गघटाभिः नीलजलपङ्क्तिपरिवेष्टं प्रापुः। तथा च पीयूषजलेन आप्लाविताः इव  प्रकण्डावलम्बितवस्त्रालङ्कारमनोहराः वनवृक्षाः नानाविधाभीष्टफलयुक्तैः, कल्पद्रुमाः  इव शोभन्ते स्म । नृपपत्नीभिः दूर्वाप्रचयस्वाभाविकतल्पेषु पटमण्डपेषु निद्राजनितसुखम् असेव्यत । सेनाचराः स्नानं चक्रुः, पानीयम् अपिबन्, वस्त्राणि अक्षालयन्, कलितप्रफुल्लपद्माः मृणालं भक्षयाञ्चक्रुः । हस्तिनां समूहाः चञ्चलशुण्डाग्ररन्ध्रोत्क्षिप्तैः जलवर्षैः शरीरं वारं वारं सिषिचुः। इत्थं ते सैन्याः, पर्वतनदीनां जलसम्पदां स्नानाद्युपभोगेन सम्यक् उपाभुञ्जत ।"
			},{
				"title": "Hindi",
				"desc": "<p>दारुक से रैवतक पर्वत का उदात्त वर्णन सुनकर उस पर विहार करने के लिए श्रीकृष्ण भगवान् ने सेनासहित प्रस्थान किया । कहीं घूमते हुए गजराजों के झुण्ड चल रहे थे तो कहीं बड़े-बड़े घोडे पङ्क्तिबद्ध होकर अपने पदाघातों के द्वारा नगाडा बजाते हुए चल रहे थे । एक ओर रथ-श्रेणि भूमि की धूलि को महीन करती हुई चल रही थी तो दूसरी तरफ झुण्ड के भारवाही ऊँट चल रहे थे । इस प्रकार आगे बढ़ती हुई सेना यथास्थान पहुँच कर अपनी-अपनी इच्छा के अनुकूल स्थानों पर ठहर गयी । उसमें कुछ सैनिक रमणियों सहित पर्वत की उन कन्दराओं में ठहर गये जहाँ गजराजाओं को मानकर लाये हुए मोती सिंहों के पञ्जों से बिखरे पड़े थे । </p><p> उस सेना-निवेश में एक ओर पर्वताकार विशालकाय हाथी के झुण्ड मद चुवा रहे थे और दूसरी ओर खूँटे को उखाड़कर भागते हुए घोडे सैनिकों को व्याकुल कर रहे थे । एक ओर कोई बैल बोझा उतारने पर पेड के नीचे बैठकर जुगाली कर रहा था तो दूसरी ओर कोई नदी तट को उखाड़ता हुआ उच्च स्वर से गरज रहा था । कहीं पर नीम के कड़वे पत्तों को खाते समय मधुर एवं कोमल आम्रपल्लव को कोई ऊँट इस प्रकार उगल रहा था, जिस प्रकार निषाद के भ्रम से मुख में पड़े हुए ब्राह्मण को गरुड ने उगल दिया था । इस प्रकार पडाव में स्थित यादव-नृपतियों की प्रशस्तियों को यथा समय वैतालिक गा रहे थे और वहाँ पर सान्ध्य मेघ के समान अरुण वर्ण के पटमण्डप (खेमे) शोभ रहे थे । </p>"
			},  {
				"title": "English ",
				"desc": "<p>Having heard the truthful words of beloved Dāruka. Śrī Kṛṣṇa, wanted to stay and have amorous sport on Raivataka mountain, that is covered with a row of trees, which appears like a cloth on a mountain, that beautifies a forest and hence his army marched towards it. On one side while flock of elephants were walking, on the other side horses of best race when lined up and were galloping, was as if they were beating the drum kind special instruments. Similarly, on one side while felly of wheels of chariots when moving had ground the strong rocks that fell under them, on the other side multitudes of camels were moving around. While moving thus, the army has settled down in their respective canopies. </p><p> Canopies of kings were made up of white clothes and were fastened with white ropes. At that time, trees of the forest, with the dresses and ornaments of the army, that were hung upon them, were as if, they were bearing wonderful fruits and were looking splendorous like a tree called kalpa. The queens, whose sweat that came out of tiredness, was removed by the wind that entered slowly from the porticos of tents, went into deep sleep on the beds made up of quitch. The army bathed in the river water, drank water, washed their clothes, bore blossomed lotuses and ate lotus-stalk. Multitude of elephants in the army have drenched their bodies by raining water with the front part of their trunks. Thus, the army of Śrī Kṛṣṇa, enjoyed the mountain-pleasures.</p>"
			}],
            "canto6": [{
				"title": "Sanskrit",
				"desc": "<p>सेनानिवेशानन्तरं रैवतकपर्वते रन्तुमिच्छुं हरिं निषेवितुं यथास्वतरुकृतप्रसवश्रिया वसन्तादिऋतुगणः समकालं पृथिव्यां  प्रादुरभूत् । <p></p> तत्र च आदौ किंशुक-कमलादिभिः पुष्पसमृद्धिभिः सह सुगन्धिः वसन्तर्तुः आजगाम | विधुतचिकुरनिकरः सन् सारङ्गक्षीणं ललाटोत्थं घर्माम्बु परिमृजन् तडागानाम् सूक्ष्मकल्लोलमालं विकस्वरोत्पलं चालयन् सुगन्धिशीतलः वसन्तवायुः उवाह । <p></p>  ग्रीष्मर्तुः शिरीषाख्यातरुपुष्परेणुभासः सूर्याश्वरोमसावर्ण्यं बिभ्रति  सति नूतनजातिकुसुमानि चिरकालावस्थायिसुगन्धसमृद्धिः कुर्वन् असौ प्राप्तः। विकसितमृदुपाटलमुकुले स्वयुवतिमुखोच्छ्वासानुकुर्वणो मत्तपरिचलद्भ्रमरे ग्रीष्मवायौ वहति सति श्रृङ्गारिभिः पुरुषैः मदचापल्यं, कन्दर्पाकुलितत्वं गृहीतम् । <p></p> वर्षर्तौ धृतेन्द्रचापमण्डलस्य मेघस्य विचित्रता नानावर्णमणियुक्तकर्णभूषणदीप्तिपुञ्जमिश्रितनिजनीलभासं बलिनामकासुराहङ्कारापहारकस्य हरेः शरीरम् अनुचकार । अपि च आत्मीयया गर्जनसमृद्ध्या विहितमार्जनाख्यसंस्कारसहितमर्दलाख्यवाद्यमण्डलध्वनिविजया मेघमाला उत्कटमदं मधुरस्वरं मयूरवृन्दं नर्तयामास । <p></p> शरदृतौ हंसध्वनयः कठोरीकृतध्वनिनीलकण्ठं निष्ठुरीकृतनादमयूरं हृद्यत्वं प्रापुः । विकसितकमलनयनतडागपानीयेन अतिधवलदेहपक्षिद्योतमानान्तरिक्षेण तृणविशेषोन्नतदन्तकाष्ठावदनेन च शरद्रुतुः सर्वत्रैव हृष्टः आसीत् | <p></p> स्मरादागतं सहजम् प्रेम प्रकाशमाने अतिशयेन उपकारयुक्ते हेमन्ते स्वेदसम्भावनारहितकालेऽपि अत्यर्थं स्वेदजलयुक्ताः ताः कामिन्यः श्रृङ्गारिणः प्रियान् अरमन्त । महागजप्रमाणा, अतिगम्भीरा अपि नदीः हिमीकुर्वन् हैमनः बिन्दूनां स्वामी वायुः पन्थस्त्रीणां नेत्राणां महासन्तापकारिणीम् अश्रुजलं विस्तारयामास । <p></p>  वने प्रियङ्गुलताः पुष्पयन्  मदप्रसृतैः उत्पादितहुङ्कारशब्दः शिशिरऋतुवायुः कान्तान् कोपाद् वियुञ्जानाः वधूः निर्भर्त्सयमास । </p>"
			}, {
				"title": "Hindi",
				"desc": "इस प्रकार रैवतक पर्वत पर विहार करने की इच्छा करनेवाले श्रीकृष्ण भगवान् की सेवा करने में वसन्तादि छः ऋतु एक साथ प्रवृत्त हुए । वसन्त ऋतु के आने पर वृक्षों ने नवपल्लवों को तथा लताओं ने सुरभित पुष्पों को उत्पन्न कर दिया, शीतल मन्द सुगन्ध हवा बहने लगी, कुरुबक, चम्पा, बकुल के फूल विकसित हो गये । आम के पेड़ों में मंजरियाँ लग गयीं, कोयलें कुहुकने लगीं, भौंरे गुञ्जार करने लगे और कामपीडित रमणियों की दूतियाँ उनके पति के पास जा-जाकर उसकी अवस्थाओं का वर्णन करके उन्हें रमणियों के पास जाने के लिए कहने लगीं । ग्रीष्म ऋतु के आने पर शिरीष तथा नवमल्लिका के फूल विकसित हो गये, अपनी प्रियतमाओं के श्वासवायु के समान सुरभित पाटल (गुलाब) के फूलने पर कामीलोग मद से चञ्चल हो उठे और रमणियाँ आर्द्र चन्दन लगाये हुए स्तनों को प्रियतमों के वक्षःस्थल पर रखकर बार-बार आलिंगन करने लगीं । वर्षा ऋतु के आनेपर चमकती हुई बिजली से युक्त मेघों से भी न डरती हुई कामार्ता रमणियाँ प्रियतम के पास चल पडी । मेघ को देखकर परदेशी प्रियतम घर के लिए चल पडे । मयूर केका शब्द करने लगे, कदम्ब, केतकी कुटज मालती में फूल लग गये । शरद् ऋतु के आरम्भ होने पर चन्द्रकिरणें निर्मल हो गयीं, मयूरों की तथा हंसों की ध्वनि क्रमशः कर्णकटु तथा कर्णमधुर हो गई । बाण, आसन, सप्तच्छद तथा कमल विकसित हो गये तथा धान की रखवाली करनेवाली गोपकन्याओं के गीत सुनने में तन्मय होकर मृग-समूह धान खाना भी भूल गये और झुण्ड के झुण्ड तोते उड़ने लगे । हेमन्त ऋतु के उपस्थित होने पर हाथी के डूब जाने योग्य अगाध जलाशयों का पानी जमकर कम हो गया, परन्तु वियोगिनी रमणियों की आँखों से गर्म आँसुओं की धारा बहने लगी । कामीजन परस्पर विविध प्रकार से सुरत में प्रवृत्त हो गये और शिशिर ऋतु के उपस्थित होने पर पुष्पित प्रियङ्गुलता पर भ्रमर गुञ्जार करने लगे । सूर्यकिरणों का तेज मन्द पड़ गया । रमणियाँ प्रियतमों का आलिङ्गन कर पयोधरस्थ अपनी उष्णता को सार्थक करने लगीं । कुन्द तथा लवङ्ग के पुष्पराग से भ्रमर मलिन हो गये ।"
			}, {
				"title": "English ",
				"desc": "<p>Thus when the military array has halted,  group of seasons, at once had arrived, while producing the beauty of buds and flowers according to their trees, to serve lord Śrī Kṛṣṇa, who was desirous to enjoy on the Raivataka mountain.</p><p> At the very outset, the fragrant spring season had arrived with bunch of flowers with tender leaves of red lac called 'palāśa' and that which was spread with blossomed lotuses. Flowers of Aśoka, standing in conjunction with flowers of a tree called 'champaka', were splendorous like radiant golden color. </p><p> The summer has arrived with pollen-dust of flowers of Flea tree (Śirīṣa) bearing the splendor in green color that resembled rays of the Sun and pores of a horse and enduring fragrance of tender Jasmine flowers. </p><p> During the rainy season, clouds that are endowed with Indra's bow i.e., a variegated rainbow resembled the splendor of lordVāmana who possessed ear-rings that contained various splendorous gems. Multitude of clouds with its affluence of sound that can win over the sound of a drum, made to dance the flock of peacocks that cry with melodious 'keka' sound, having been intoxicated. </p><p> In the autumn season, chirping of swans obtained pleasantness while making peacocks' sound unpleasant. This season was endowed with ponds that were filled with blossomed eyes of lotuses and which was being delightful with the sky on which, birds were with very much dazzling white wings, resembling face with dentates, with a kind of grass called 'kāśa'. </p><p> Winter season, that is born out of cupid, invoked natural love, and which is utmost subservient, made women, to produce sweat and gave pleasure to sportive lovers. Wind of this season made the river water that was as huge as the size of elephants, icy. </p><p> During the dewy season i.e., Śiśira, wind, while blossoming a species of plant called Priyañgulathā, in the forest, was scaring the women who were away from their husbands by producing the humming sound of intoxicated bumble-bees.,/p>"
			}]
		}];
		
		$log.info('printing data here ');
		$log.info($scope.cantos);
		
		 $scope.tabs = [
		                { title:'Dynamic Title 1', content:'Dynamic content 1' },
		                { title:'Dynamic Title 2', content:'Dynamic content 2', disabled: true }
		              ];
		
	}]);
	
})();
