

	var user_type;
	var name1;
	var email1;
	var password1;
	var age1;
	var education1;
	var specialization1;
	var experiance1;
	var contact1;
	var address1;
	var gender;
	var doc;

	firebase.auth().onAuthStateChanged(function(user){

		if(user){

			var userId = user.uid;

			// alert("User Id ="+userId);
			firebase.database().ref('/User_Type/' + userId).once('value').then(function(snapshot) {
  				var type = snapshot.child('Type').val();
  				var status = snapshot.child('Status').val();
  				// alert(type+"==="+status);

  				if(type == "Doctor" && status == "Approved"){
  					goToDoctor();
  				}else if (type == "Manager" && status == "Approved") {
  					goToManager();
  				}else if(type == "Admin"){
  					goToAdmin();
  				}else{
  					alert("Your approval is Pendding / Account is Deleted");
  					logout();
  				}
			});
		}
		else
		{
			
		}


	});	


function register(type){
	user_type = type;

	name1=document.getElementById('name').value;
	email1=document.getElementById('email1').value;
	password1=document.getElementById('password1').value;
	age1=document.getElementById('age').value;
	education1=document.getElementById('education').value;
	experiance1=document.getElementById('experiance').value;
	contact1=document.getElementById('contact').value;
	address1=document.getElementById('address').value;
	specialization1	=document.getElementById('specialization').value;

	// alert(specialization1);
				if(document.getElementById('male').checked)
				{
					gender = "Male";
				}
				else if(document.getElementById('female').checked)
				{
					gender = "Female";
				}
				else
				{
					gender = "";
				}

	if (user_type == "doctor")
	{

		createAccount();
		sendToDoctorDatabase();

	}//if(docotor) ending
	else{

		createAccount();
		sendToManagerDatabase();
		
	}//else is ending
}//regster func ending


function createAccount(){

	firebase.auth().createUserWithEmailAndPassword(email1, password1).catch(function(error)
		{
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  		if (error) 
		  		{
		  			alert(errorMessage);
				}
				alert("User account has been created!");		 
		});
}

function sendToDoctorDatabase(){

	firebase.auth().onAuthStateChanged(function(user) {
	  if (user) {
	    alert("user authentication  doctor mode");
	    var data=user.uid;
	    
	    // alert(data);

	  } 

	  			firebase.database().ref().child("Specialization").child(specialization1).push().child("Doctor_ID").set(data);

	  			firebase.database().ref().child("User_Type").child(data).set({

	  				Type:"Doctor",
	  				Status:"Pendding",
	  			});

	  			firebase.database().ref().child("Doctor_Details").child(data).set(
				{
					Name:name1,
					Email:email1,
					Password:password1,
					Age:age1,
					Gender:gender,
					Contact:contact1,
					Education:education1,
					Specialization:specialization1,
					Experiance:experiance1,
					Address:address1
					}).then (function(data){

					// alert("Data added to DB");
				});//authstatechange ending

				logout();

			

	});	//authentication ending
}

function sendToManagerDatabase(){

	//Adding details of Current User
		firebase.auth().onAuthStateChanged(function(user) {
		  if (user) {
		    alert("user authentication manager mode");
		    var data=user.uid;
		    
		    alert(data);
		  } 
		  				firebase.database().ref().child("User_Type").child(data).set({

			  				Type:"Manager",
			  				Status:"Pendding",
			  			});

		  				firebase.database().ref().child("Manager_Details").child(data).set(
						{
							Name:name1,
							Email:email1,
							Password:password1,
							Age:age1,
							Gender:gender,
							Contact:contact1,
							Education:education1,
							Specialization:specialization1,
							Experiance:experiance1,
							Address:address1
							}).then (function(data){

								// alert("data added");
							});//authstatechange ending

							logout();
						});	//authentication ending

}

function logout(){

					 // Sign-out successful.
					firebase.auth().signOut().then(function() {

					  alert("Logout Successfully!");
					  window.location = "index.html";

						}).catch(function(error) {
					  
					  // An error happened.
					  alert(error);
					});
}


function login(){

	email1 = document.getElementById('email').value;
	password1 = document.getElementById('password').value;

	// alert(email1+"-----"+password1);


		firebase.auth().signInWithEmailAndPassword(email1, password1).catch(function(error) {  
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;

			if(error){
				alert(errorMessage);
			}
		});  

	 //checkState();
}
	
function checkState(){

		
}

function goToDoctor(){
	//window.location = "manager.html";
	alert("Your Are Doctor and U can use our Mobile Application");
	logout();
}

function goToManager(){
	window.location = "manager.html";
}

function goToAdmin(){
	window.location = "admin.html";
}

function initApp(){
  document.getElementById('shubh')
        .addEventListener('click', login);
}



window.onload = function() {
   initApp();
 }