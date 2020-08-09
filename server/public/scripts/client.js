console.log('js');

$(document).ready(handleReady);

function handleReady() {
	console.log('jQuery is ready');
	getToDos();
	// set up click listeners
	$('#submit-button').on('click', createToDo);
	$('#delete-button').on('click', deleteToDo);
	// $('#submit-button').on('click', createToDo);
	}

function createToDo() {
	console.log('click in createToDo')
	let newToDo = {
		name: $('#task-name').val(),
		section: $('#task-subject').val(),
		priority: $('#task-priority').val(),
		notes: $('#task-notes').val()
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
	let todoDelete = $(this).closest('tr').data('todo-id');
	$.ajax({
	  type: 'DELETE',
	  url: `/todolist/${todoDelete}`
	}).then(function(response) {
	  console.log(`Response from server`, response);
	  getToDos();
	}).catch(function(error){
	  console.log(`Error in DELETE:`, error);
	  alert(`Unable to delete entry at this time. Please try again later.`);
	});
}

function editToDo() {
	console.log('click in editToDo')
	let todoId = $( this ).closest( 'tr' ).data( 'todo-id' );
	console.log('status changed, todo id is:', todoId);
  
	let markTask = {};
  
	if ( $(this).is(':checked') ) {
	  markTask.complete = true;
	} else if ( !$(this).is(':checked') ) {
	  markTask.complete = false;
	};
	$.ajax({
	  method: 'PUT',
	  url: `/todolist/${todoId}`,
	  data: markTask
	}).then( function( result ){
	  console.log( 'Back to client from readyToMove', result );
	  getToDos();
	}).catch( function( error ){
	  console.log( 'Error in client from readyToMove', error );
	});
}

function getToDos() {
	console.log('in getToDos')
	$.ajax({
		type: 'GET',
		url: '/todolist'
	}).then(function(response) {
		console.log(response);
		displayToDos(response);
	}).catch(function(error){
		console.log('Error in GET', error);
	});
}// end getToDos

function displayToDos(todoItems) {
	console.log('in displayToDo')
	$('#display-items').empty();

	for(i=0; i<todoItems.length; i++) {
	let todo = todoItems[i];
		let $tr = $(`<tr data-todo-id="${todoItems[i].id}">`);
			// $tr.data('todo', todo);
			$tr.append(`<td>${todo.name}</td>`);
			$tr.append(`<td>${todo.section}</td>`);
			$tr.append(`<td>${todo.priority}</td>`);
			$tr.append(`<td>${todo.notes}</td>`);
			if ( todo.complete === true ){
				$('<input>', {
				type:"checkbox",
				"checked":"checked",
				class:"complete-box"
				}).appendTo($tr);
			} else if ( todo.complete === false ) {
				$tr.append(`<td><input class='complete-box' type="checkbox"</td>`);
			}
			$tr.append(`<td><button class="delete-button">DELETE</button></td>`);
			$tr.append(`</tr>`)
			$('#viewToDos').append($tr);
	}
}// end displayToDos