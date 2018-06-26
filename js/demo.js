



var uqid;
var user_current;
var  user_type;




function myfunction(type)
{

	user_type = type;

	firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    alert("user  created....");
    user_current=user;
	uqid = user.uid;
	sentTodatabase();

  } 


	var email1=document.getElementById('email1').value;
	var password1=document.getElementById('password1').value;
		alert(email1+password1);
			firebase.auth().createUserWithEmailAndPassword(email1, password1).catch(function(error)
			{
			  // Handle Errors here.
			  var errorCode = error.code;
			  var errorMessage = error.message;
			  		if (error) 
			  		{
			  			alert(errorMessage);
					}
					else
					{
						sentTodatabase();	
					}
			 
			});



});

 
  } ///function end here

	







function loginfun(){

								alert("the function is run");


						var email=document.getElementById('email').value;
						var password=document.getElementById('password').value;
						
							firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
								alert(email+password);
						 
						  var errorCode = error.code;
						  var errorMessage = error.message;
						  	 if(error){
						  	 		alert(errorMessage);
						  	 }
						 
						});


	window.location = "manager.html";								
}


function logout()
{

			firebase.auth().signOut().then(function() {
  // Sign-out successful.

  alert("logout successfully!");
  window.location = "../index.html";

}).catch(function(error) {
  // An error happened.
  alert(error);
});
}


function sentTodatabase()
{

    var name1=document.getElementById('name').value;
	var email1=document.getElementById('email1').value;
	var password1=document.getElementById('password1').value;
	var age1=document.getElementById('age').value;
	var education1=document.getElementById('education').value;
	var specialization1=document.getElementById('specialization').value;
	var experiance1=document.getElementById('experiance').value;
	var contact1=document.getElementById('contact').value;
	var address1=document.getElementById('address').value;

	var gender;
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

	if(user_type=="docter")

					{

						alert(name1 + " " + age1 + " " + education1 + " " + specialization1 + " " + experiance1 + " " + contact1 + " " + address1  + " " +  gender);

						firebase.database().ref().child("Aman").child("Name").set("Amanbfka");
						firebase.database().ref().child("User_Type").child(uqid).child("Type").set("Doctor");


						alert("this is the doctor sign in"+uqid);
						
						firebase.database().ref().child("Doctor_Details").child(uqid).set(
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
						}).then (function(data)
				{

					alert("data added");
				});


						
		manlogout();
				alert("Now You Can Login");

				}
	else
	{

						alert("this is the manager sign in"+uqid);

		firebase.database().ref().child("User_Type").child(uqid).child("Type").set("Manager");

		firebase.database().ref().child("Manager_Details").child(uqid).set(
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


		});


		manlogout();
				alert("Now You Can Login");



}

}



function manlogout(){

						firebase.auth().signOut().then(function() {
  // Sign-out successful.

  alert("logout successfully!");
  window.location = "index.html";

}).catch(function(error) {
  // An error happened.
  alert(error);
});
}