console.log('js');

$(document).ready(handleReady);

function handleReady() {
	console.log('jQuery is ready');
	getToDos();
	}

function handleReady() {
	// set up click listeners
	$('#submit-button').on('click', createToDo);
}

function createToDo() {
	console.log('click in createToDo')
	let newToDo = {
		name: $('#task-name').val(),
		subject: $('#task-subject').val(),
		priority: $('#task-priority').val(),
		status: $('#task-status').val()
	};

	$.ajax({
		type: 'POST',
		url: '/todolist',
		data: newToDo,
	}).then(function(response) {
		console.log('Response from server', response);
		// displayToDos();
	}).catch(function(error) {
		console.log(`Error in POST`, error);
		// alert(`Unable to create to-do item at this time.`);
		response.sendStatus(500);
	});
}// end createToDo

function deleteToDo() {
	console.log('click in deleteToDo')

}

function displayToDos() {
	console.log('click in displayToDo')

}

function editToDo() {
	console.log('click in editToDo')

}

function getToDos() {
	console.log('click in getToDos')
	$.ajax({
		type: 'GET',
		url: '/todolist'
	}).then(function(response) {
		console.log(response);
	}).catch(function(error){
		console.log('Error in GET', error);
	});
}// end getToDos