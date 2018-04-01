
var numof_columns = 12;
var numof_rows = 12;

/* 2D array to store the element
	tr:  h  h  h  h  h
	tr:  h  td td td td 
	tr:	 h  td td td td	
	tr:	 h  td td td td 
	tr:	 h  td td td td 
	
	|
	|
	|
	|->->->->

	[row][column]	
*/

/*
table_array
title_row
title_column

puzzle_left
puzzle_top
puzzle_table
*/


// table_array   
var table_array;
var title_row;
var title_column;
var puzzle_top;
var puzzle_left;
var puzzle_table_fill;
var puzzle_table;
var table = document.getElementById('mytable');



function addsize(){
	numof_rows++;
	numof_columns++;
	clearTable();
	clearVar();
	generateTable();
}
function minsize(){
	numof_rows--;
	numof_columns--;
	clearTable();
	clearVar();
	generateTable();
}

function clearVar(){

	table_array.length = 0;
	puzzle_top.length=0;
	puzzle_left.length = 0;
	puzzle_table_fill.length = 0;
	puzzle_table.length = 0;
}

function clearTable(){
	table.innerHTML="";
}

function generateTable(){
	table_array =new Array(numof_rows);
	for (var i = 0;i < numof_rows; i++){
		table_array[i] = new Array(numof_columns);
	}

	title_row =new Array(numof_columns+1);
	title_column =new Array(numof_rows+1);

	puzzle_top = new Array(numof_columns);
	for (var i = 0;i < numof_columns;i++){
		puzzle_top[i] = new Array();
	}

	puzzle_left = new Array(numof_rows);
	for (var i = 0;i < numof_rows;i++){
		puzzle_left[i] = new Array();
	}

	puzzle_table_fill = new Array(numof_rows);
	for (var i = 0;i < numof_rows;i++){
		puzzle_table_fill[i] = new Array(numof_columns);
	}

	puzzle_table = new Array(numof_rows);
	for (var i = 0;i < numof_rows;i++){
		puzzle_table[i] = new Array(numof_columns);
	}


	//generate table dynamically


	//build title row 
	var tr = document.createElement('tr');
	for(var i=0;i<numof_columns+1;i++){
		var td=document.createElement('td');
		tr.appendChild(td);
		title_row[i]=td;
		if(i==0){
			title_column[0]=td;
		}
	}
	table.appendChild(tr);


	for (var i =0;i<numof_rows;i++){
		var tr= document.createElement('tr');
		//build title column
		var td = document.createElement('td');
		tr.appendChild(td);
		title_column[i+1]=td;

		//build data 
		for(var j=0;j<numof_columns;j++){
			var td = document.createElement('td');
			tr.appendChild(td);
			// put td into table 
			table_array[i][j]=td;
		}
		table.appendChild(tr);
	}

	//set id 
	for (var i=0;i<numof_rows;i++){
		for (var j=0;j<numof_columns;j++){
			table_array[i][j].id = i +"r"+j +"c";
		}
	}
	//set listener
	for (var i=0;i<numof_rows;i++){
		for (var j=0;j<numof_columns;j++){
			table_array[i][j].addEventListener("click",record_and_change);
		}
	}
}
//------------------------------------
//generate puzzle 
function generatePuzzle(){
	clearTable();
	clearVar();
	generateTable();
	for (var i = 0;i < numof_rows;i++){
		for (var j =0;j<numof_columns;j++){
			puzzle_table[i][j] = Math.floor(Math.random()*2);
			puzzle_table_fill[i][j] = 0;
		}
	}
	for (var i = 0;i < numof_columns;i++){
		var temp = 0;
		puzzle_top[i][temp]=0;
		for (var j =0;j<numof_rows;j++){
			if(puzzle_top[i][0]==0 &&
			 puzzle_table[j][i] == 1){
				puzzle_top[i][temp]++;
			}
			else if(puzzle_table[j][i] ==1 ){
				if(puzzle_table[j-1][i]==1){
					puzzle_top[i][temp]++;
				}
				else{
					temp++;
					puzzle_top[i][temp]=1;
				}
			}

		}
	}
	
	for (var i = 0;i < numof_rows;i++){
		var temp = 0;
		puzzle_left[i][temp]=0;
		for (var j =0;j<numof_columns;j++){
			if(puzzle_table[i][j] == 1 &&
				puzzle_left[i][0]==0 ){
				puzzle_left[i][temp]++;
			}
			else if(puzzle_table[i][j] ==1){
				if(puzzle_table[i][j-1]==1){
					puzzle_left[i][temp]++;
				}
				else{
					temp++;
					puzzle_left[i][temp]=1;
				}
			}
		}
	}

	for(var i=0;i<numof_columns;i++){
		var temp_str="";
		for (j in puzzle_top[i]){
			temp_str += puzzle_top[i][j] + " ";
		}

		title_row[i+1].innerHTML = temp_str;

	}
	for(var i=0;i<numof_rows;i++){
		var temp_str="";
		for(j in puzzle_left[i]){
			temp_str += puzzle_left[i][j] + " ";
		}
		title_column[i+1].innerHTML=temp_str;
	}
	
}
//td attribute set 




function record_and_change(evt){
	var id = evt.target.id;
	var id_row = parseInt(id.slice(0,id.search("r")));
	var id_column = parseInt(id.slice(id.search("r")+1,id.search("c")));
	if (puzzle_table_fill[id_row][id_column] === 1) {
		puzzle_table_fill[id_row][id_column] = 0;
		table_array[id_row][id_column].style.backgroundColor="white";
	}
	else{
		puzzle_table_fill[id_row][id_column] = 1;
		table_array[id_row][id_column].style.backgroundColor="green";
	}
	check_victory();
	}



//reset 
function resetboard(){
	for (var i=0;i<numof_rows;i++){
		for (var j=0;j<numof_columns;j++){
			if( puzzle_table_fill[i][j]==1){
				puzzle_table_fill[i][j]=0;
			}
			table_array[i][j].style.backgroundColor="white";
		}
	}
	clearanswer();
}

//show solution 
function showanswer(){
	for (var i=0;i<numof_rows;i++){
		for (var j=0;j<numof_columns;j++){
			if( puzzle_table[i][j]==1){
				table_array[i][j].style.border="4px solid red";
			}
		}
	}
}

//clear show solution 
function clearanswer(){
	for (var i=0;i<numof_rows;i++){
		for (var j=0;j<numof_columns;j++){
			table_array[i][j].style.border="1px solid #339933";
		}
	}
	
}


//check
function check_victory(){
	var correct = 1;
	for (var i=0;i<numof_rows;i++){
		for (var j=0;j<numof_columns;j++){
			if(puzzle_table[i][j]!=puzzle_table_fill[i][j]){
				correct = 0;
			}
		}
	}
	if(correct === 1){
		setTimeout(function(){alert("CONGRATULATION!");},500);
	}
}

//autofill
function autofill(){
	for (var i=0;i<numof_rows;i++){
		for (var j=0;j<numof_columns;j++){
			if( puzzle_table[i][j]==1){
			table_array[i][j].style.backgroundColor="green";
			puzzle_table_fill[i][j]=1;
			}
			else{
			table_array[i][j].style.backgroundColor="white";
			puzzle_table_fill[i][j]=0;
			}
			
		}
	}
	check_victory();
}
generateTable();


