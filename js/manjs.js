/* this is the login function*/
	var data;
	var wanttoupdateid;

firebase.auth().onAuthStateChanged(function(user){
			if(user){
					 data=user.uid;
				 	// alert(" manager ID = "+data);

			}else{
				 window.location = "index.html";				
			}
		});

var uniqid;


firebase.database().ref().child("Doctor_Details").on('child_added' , function (childSnapshot){


		var id = childSnapshot.key;
	    var email = childSnapshot.child("Email").val();
	    var name = childSnapshot.child("Name").val();
	    var address = childSnapshot.child("address").val();
	    var specialization = childSnapshot.child("Specialization").val();
	    var shift=childSnapshot.child("Shift").val();

			 id =  '\''+id+'\'';

			  $(document).ready(function(){


		$('#tableshow').append(
		'<tbody id="mytable"><tr><td>'+name+'</td><td>'+specialization+'</td><td>'+shift+'</td><td><button id='+id+'type="button" class="btn btn-warning" onClick="approve('+id+'); changeButtonText('+id+')">Approve</button><button class="btn btn-primary" onClick="update('+id+')">Update</button><button class="btn btn-danger" onClick="deleteUser('+id+')">Delete</button></td></tr></tbody>'); afterApproval(); });
});

					
function checkState(){

		firebase.auth().onAuthStateChanged(function(user){
			if(user){
				// alert(user);
				alert("Logged in");
			}else{
				// alert(user);
				alert("not Logged in");
				
			}
		});
}	




/* the  logout function of manager*/
function logout(){

					 // Sign-out successful.
					firebase.auth().signOut().then(function() {

					  alert("Logout Successfull!");
					  window.location = "index.html";

						}).catch(function(error) {
					  
					  // An error happened.
					  alert(error);
					});
} 	



function update(id)
{
			var setdata;
			uniqid=id;
			wanttoupdateid = id;

				$(document).ready(function(){

							var ref = firebase.database().ref().child("Doctor_Details").child(id);

							ref.once('value',function(data){

							var add = data.child("Address").val();
							var age= data.child("Age").val();
							var contact = data.child("Contact").val();
							var email = data.child("Email").val();
							var experiance = data.child("Experiance").val();
							var gender = data.child("Gender").val();
							var name = data.child("Name").val();
							var specialization = data.child("Specialization").val();
							var passsword=data.child("Password").val();
							console.log(passsword);
									

							$(document).ready(function(){
							$("#myModal").modal('show');
							$('#modal-button').text('Update Docter Details');

							
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



function updateProfile(data)
{

				$(document).ready(function(){


							var ref = firebase.database().ref().child("Manager_Details").child(data);

							ref.once('value',function(data){

							var add = data.child("Address").val();
							var age= data.child("Age").val();
							var contact = data.child("Contact").val();
							var email = data.child("Email").val();
							var experiance = data.child("Experiance").val();
							var gender = data.child("Gender").val();
							var name = data.child("Name").val();
							console.log(age);
									

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
							});

						});
							
				});
}


function deleteUser(id){

			var userId = id;

			if(confirm(" Are You Sure ?"))
			{
				deleteUserSpecialization(userId);
				deletedUserType(userId);
				deleteUserAppointment(userId);
				deletePatientAppointment(userId);
				deleteUserAccount(userId);
			
			}
}

function deleteUserAccount(userId){

			var userAccount =	firebase.database().ref().child("Doctor_Details").child(userId);

			userAccount.remove().then(function(){

				alert("Doctor Deleted");
				window.location = "manager.html";

			}).catch(function(error){

			alert(error.message);
			});

}

function deletedUserType(userId){

				firebase.database().ref().child("User_Type").child(userId).child("Status").set("Deleted");						
}

function deleteUserSpecialization(userId){


				firebase.database().ref().child("Specialization").on('child_added' , function (childSnapshot){


					var special = childSnapshot.key;
					// alert(special);

					firebase.database().ref().child("Specialization").child(special).on('child_added' , function (childSnapshot){


						var pushKey = childSnapshot.key;
						var doctorID = childSnapshot.child("Doctor_ID").val();

						if(doctorID == userId){


							var userSpecialization = firebase.database().ref().child("Specialization").child(special).child(pushKey);

							userSpecialization.remove().then(function(){

								// alert("Deleted from Specialization");

							}).catch(function(error){

							alert(error.message);
							});

							// alert(pushKey+" -"+doctorID);
						}
					});


				});
}

function deleteUserAppointment(userId){

							var userAppointment = firebase.database().ref().child("Appointment").child(userId);

							userAppointment.remove().then(function(){

								// alert("Deleted from Appointment");

							}).catch(function(error){

							alert(error.message);
							});

}

function deletePatientAppointment(userId){

					firebase.database().ref().child("Booked_Appointments").on('child_added' , function (childSnapshot){


					var patientID = childSnapshot.key;
					// alert(special);

					firebase.database().ref().child("Booked_Appointments").child(patientID).on('child_added' , function (childSnapshot){


						var pushKey = childSnapshot.key;
						var doctorID = childSnapshot.child("Doctor_ID").val();

						if(doctorID == userId){


							var userBooked_Appointments = firebase.database().ref().child("Booked_Appointments").child(patientID).child(pushKey);

							userBooked_Appointments.remove().then(function(){

								// alert("Deleted from Booked_Appointments");

							}).catch(function(error){

							alert(error.message);
							});

							// alert(pushKey+" -"+doctorID);
						}
					});
				});
}



function approve(id){

					 
			
			$(document).ready(function(){

										var userId = id;
								
									var status;
									updateUserType(userId);
									var ref = firebase.database().ref().child("User_Type").child(userId);
										alert(userId);
									
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


 function GetItemValue(q) {
                    
                   }


function setUpdate(){

		var id = wanttoupdateid;
		var btn  = $('#modal-button').text();

		 	var data1=uniqid;

		 	// alert("the doctor id:"+data1+"the manager id"+data);


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

	
		    			if(btn=="Update Docter Details")
		    			{
		    					firebase.database().ref().child("Doctor_Details").child(id).child("Name").set(name1);
		    					firebase.database().ref().child("Doctor_Details").child(id).child("Email").set(email1);

		    					firebase.database().ref().child("Doctor_Details").child(id).child("Password").set(passsword);
		    					firebase.database().ref().child("Doctor_Details").child(id).child("Age").set(age1);
		    					firebase.database().ref().child("Doctor_Details").child(id).child("Gender").set(gender1);
		    					firebase.database().ref().child("Doctor_Details").child(id).child("Contact").set(contact1);
		    					firebase.database().ref().child("Doctor_Details").child(id).child("Experiance").set(experiance1);
		    					firebase.database().ref().child("Doctor_Details").child(id).child("Specialization").set(specialization);
		    					firebase.database().ref().child("Doctor_Details").child(id).child("Shift").set(selValue);
		    					firebase.database().ref().child("Doctor_Details").child(id).child("Address").set(address1);

							alert("Doctor  updated");

				 			window.location = "manager.html";				


		    			}

		    			if(btn=="Update Details")
		    			{
		    				
		    				firebase.database().ref().child("Manager_Details").child(data).child("Name").set(name1);
	    					firebase.database().ref().child("Manager_Details").child(data).child("Email").set(email1);

	    					firebase.database().ref().child("Manager_Details").child(data).child("Password").set(passsword);
	    					firebase.database().ref().child("Manager_Details").child(data).child("Age").set(age1);
	    					firebase.database().ref().child("Manager_Details").child(data).child("Gender").set(gender1);
	    					firebase.database().ref().child("Manager_Details").child(data).child("Contact").set(contact1);
	    					firebase.database().ref().child("Manager_Details").child(data).child("Experiance").set(experiance1);
	    					firebase.database().ref().child("Manager_Details").child(data).child("Specialization").set(specialization);
	    					firebase.database().ref().child("Manager_Details").child(data).child("Shift").set(selValue);
	    					firebase.database().ref().child("Manager_Details").child(data).child("Address").set(address1);

							alert("Profile updated");
		    			}
		 }
