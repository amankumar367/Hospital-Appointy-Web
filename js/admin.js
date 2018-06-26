
var data;
firebase.auth().onAuthStateChanged(function(user){
			if(user){
				
				 data=user.uid;
				 // alert(data);
			}else{
				window.location = "index.html";				
			}
		
});
var uniqid;

firebase.database().ref().child("Manager_Details").on('child_added' , function (childSnapshot){


		var id = childSnapshot.key;
	    var email = childSnapshot.child("Email").val();
	    var name = childSnapshot.child("Name").val();
	    var  address = childSnapshot.child("address").val();
	    var specialization= childSnapshot.child("Specialization").val();

			 id =  '\''+id+'\'';

			  $(document).ready(function(){


		$('#tableshow').append(
		'<tbody id="mytable"><tr><td>'+name+'</td><td>'+email+'</td><td>'+specialization+'</td><td><button id='+id+'type="button" class="btn btn-warning" onClick="approve('+id+'); changeButtonText('+id+')">Approve</button><button class="btn btn-info" onClick="showManagerData('+id+')">Show</button><button class="btn btn-danger" onClick="deleteManager('+id+')">Delete</button></td></tr></tbody>'
			);

								afterApproval();
				  });
				});



// theis function work on Edit prfile nav
	
function updateProfile(data)
{

						// alert(data);
				$(document).ready(function(){

							var ref = firebase.database().ref().child("Admin").child(data);

							ref.once('value',function(data){

							var add = data.child("Address").val();
							var age= data.child("Age").val();
							var contact = data.child("Contact").val();
							var email = data.child("Email").val();
							var experiance = data.child("Experiance").val();
							var gender = data.child("Gender").val();
							var name = data.child("Name").val();
							var	passsword=data.child("Password").val();
							var specialization=data.child("Specialization").val();
							// alert(age);
									

							$(document).ready(function(){
							$("#myModal").modal('show');
								$('#modal-button').text('Update Details');
							document.getElementById('Address').value=add;
							document.getElementById('Age').value=age;
							document.getElementById('Contact').value=contact;
							document.getElementById('Email').value=email;
							document.getElementById('Experiance').value=experiance;
							document.getElementById('Gender').value=gender;
							document.getElementById('Name').value=name;
							document.getElementById('Specialization').value=specialization;
							document.getElementById('pwd1').value=passsword;

							});

						});
				});
}


	
function showManagerData(id)
{
			var setdata;
			uniqid=id;
			wanttoupdateid = id;
						// alert(id);
				$(document).ready(function(){

							var ref = firebase.database().ref().child("Manager_Details").child(id);

							ref.once('value',function(data){

							var add = data.child("Address").val();
							var age= data.child("Age").val();
							var contact = data.child("Contact").val();
							var email = data.child("Email").val();
							var experiance = data.child("Experiance").val();
							var gender = data.child("Gender").val();
							var name = data.child("Name").val();
							var	passsword=data.child("Password").val();
							var shift=data.child("Shift").val();
							var specialization=data.child("Specialization").val();
							alert(age);
									

							$(document).ready(function(){
							$("#myModal").modal('show');
							$('#modal-button').text('Update Manager Details');
							
							document.getElementById('Address').value=add;
							document.getElementById('Age').value=age;
							document.getElementById('Contact').value=contact;
							document.getElementById('Email').value=email;
							document.getElementById('Experiance').value=experiance;
							document.getElementById('Gender').value=gender;
							document.getElementById('Name').value=name;
							document.getElementById('Specialization').value=specialization;
							document.getElementById('pwd1').value=passsword;

							});

						});
				});
}
function logout(){

					 // Sign-out successful.
					firebase.auth().signOut().then(function() {

					  alert("logout successfully!");
					  window.location = "index.html";

						}).catch(function(error) {
					  
					  // An error happened.
					  alert(error);
					});
}



function deleteManager(id){

		var userId = id;

			if(confirm(" Are You Sure ?"))
			{
				deleteManagerAccount(userId);
				updateManagerStatus(userId);
			
			}
}

function deleteManagerAccount(userId){

			var userAccount =	firebase.database().ref().child("Manager_Details").child(userId);

			userAccount.remove().then(function(){

				alert("Manager Deleted");
				window.location = "admin.html";

			}).catch(function(error){

				alert(error.message);
			});

}

function updateManagerStatus(userId){
			
	  			firebase.database().ref().child("User_Type").child(userId).child("Status").set("Deleted");					
}



function approve(id){

					 
			
			$(document).ready(function(){

										var userId = id;
								
									var status;
									updateUserType(userId);
									var ref = firebase.database().ref().child("User_Type").child(userId);
										// alert(userId);
							ref.once('value',function(data){

									 status = data.child("Status").val();
										
									if(userId&&status=="Approved")
									{
										alert(status);
										$('#'+id).removeClass("btn btn-warning");
										$('#'+id).addClass("btn btn-success");
									}
		
							});
		});
}


function updateUserType(userId){

							firebase.database().ref().child("User_Type").child(userId).child("Status").set("Approved");					
								
}


function changeButtonText(id)  {
   
			   var text = document.getElementById(id);
			   if (text.firstChild.data == "Approved") 
			   {
			       
			   }
			   else 
			   {
			     text.firstChild.data = "Approved";
			   }
}
function afterApproval(){

						firebase.database().ref().child("User_Type").on('child_added' , function (childSnapshot){
						var id = childSnapshot.key;
						
							
						 var status = childSnapshot.child("Status").val();
						
									if(status=="Approved")
									{
											 var text = document.getElementById(id);
											 text.firstChild.data="Approved";

											 $('#'+id).removeClass("btn btn-warning");
											 $('#'+id).addClass("btn btn-success");
									}
						});		
				 

}




 function setUpdate(){

 		var id=wanttoupdateid;
		var btn  = $('#modal-button').text();


 			var data1=uniqid;

 	// alert(data1);


			name1=document.getElementById('Name').value;
			email1=document.getElementById('Email').value;

			age1=document.getElementById('Age').value;
			
			experiance1=document.getElementById('Experiance').value;
			contact1=document.getElementById('Contact').value;
			address1=document.getElementById('Address').value;
			gender1=document.getElementById('Gender').value;
			specialization = document.getElementById('Specialization').value;
			selValue=document.getElementById('selectbox1').value;
			passsword=document.getElementById('pwd1').value;


				if(btn=="Update Manager Details")
		    {
							firebase.database().ref().child("Manager_Details").child(id).child("Name").set(name1);
	    					firebase.database().ref().child("Manager_Details").child(id).child("Email").set(email1);

	    					firebase.database().ref().child("Manager_Details").child(id).child("Password").set(passsword);
	    					firebase.database().ref().child("Manager_Details").child(id).child("Age").set(age1);
	    					firebase.database().ref().child("Manager_Details").child(id).child("Gender").set(gender1);
	    					firebase.database().ref().child("Manager_Details").child(id).child("Contact").set(contact1);
	    					firebase.database().ref().child("Manager_Details").child(id).child("Experiance").set(experiance1);
	    					firebase.database().ref().child("Manager_Details").child(id).child("Specialization").set(specialization);
	    					firebase.database().ref().child("Manager_Details").child(id).child("Shift").set(selValue);
	    					firebase.database().ref().child("Manager_Details").child(id).child("Address").set(address1);

							alert("Manager updated");
							window.location = "admin.html"
			}
				if(btn=="Update Details")
		    	{
		    				alert(data);

		    				firebase.database().ref().child("Admin").child(data).child("Name").set(name1);
	    					firebase.database().ref().child("Admin").child(data).child("Email").set(email1);

	    					firebase.database().ref().child("Admin").child(data).child("Password").set(passsword);
	    					firebase.database().ref().child("Admin").child(data).child("Age").set(age1);
	    					firebase.database().ref().child("Admin").child(data).child("Gender").set(gender1);
	    					firebase.database().ref().child("Admin").child(data).child("Contact").set(contact1);
	    					firebase.database().ref().child("Admin").child(data).child("Address").set(address1);

					alert("Profile Updated");
				
		   		}
 }

function checkState(){

		firebase.auth().onAuthStateChanged(function(user){
			if(user){
				alert(user);
				alert("Logged in");
			}else{
				alert(user);
				alert("not Logged in");
				
			}
		});
}



