function getData(people) {
	var data = {
		total: people.length,
		groups: [],
		group: [],
		male: 0,
		female: 0,
		total_age: 0,
		max_age: {
			age: 0,
			last_name: ""
		},
		min_age: {
			age: Infinity,
			last_name: ""
		}
	};
	for (var i in people) {
		data.total_age += people[i].age;
		if (data.groups.indexOf(people[i].group) === -1) {
			data.groups.push(people[i].group);
			// пишем группу
			data.group[people[i].group] = [];
			data.group[people[i].group].push(people[i]);
		} else {
			data.group[people[i].group].push(people[i]);
		}
		if (people[i].gender === "f") {
			data.female++;
		}
		if (people[i].gender === "m") {
			data.male++;
		}
		if (data.max_age.age < people[i].age) {
			data.max_age.age = people[i].age;
			data.max_age.last_name = people[i].name.last
		}
		if (data.min_age.age > people[i].age) {
			data.min_age.age = people[i].age;
			data.min_age.last_name = people[i].name.last
		}
	}
	return data;
}

function getList(people) {
	var list = '<ol id="stud-list">';
	people.sort(function (a, b) {
		if (a.name.last < b.name.last) {
			return -1;
		}
		if (a.name.last > b.name.last) {
			return 1;
		}
		return 0;
	});
	people.forEach(function (person) {
		list += "<li id='" + person._id + "'>Группа№: " + person.group + " ФИО: "
		+ person.name.last + " " + person.name.first + " <i class='fa fa-pencil icon-active'></i> <i class='fa fa-trash icon-active'></i></li>";
	});

	list += "</ol>";
	return list;
}
function getGroupData(data) {
	var list = "<ul>";

	for (var i in data) {
		var info = getData(data[i]);
		var common = "Всего студентов в группе: " + info.total + "<br>" +
			"Средний возраст: " + parseInt(info.total_age / info.total) + "<br> " +
			"Число мужчин: " + info.male + "<br>" +
			"Число женщин: " + info.female;

		list += "<ul onclick='toggleClass(this)'>Группа №" + i + "<br>" + common + "<div class='hidden'>";

		for (var j in data[i]) {
			list += "<li> ФИО: " + data[i][j].name.first + " " + data[i][j].name.last + "</li>";
		}
		list += "</div></ul>";
	}
	list += "</ul>";
	return list;
}
function updateStudent(event) {
	event.preventDefault();
	var id = document.getElementsByName('_id')[0].value;
	for (var i = 0; i < people.length; i++) {
		if (people[i]._id === id) {
			people[i].name.first = document.getElementsByName('name')[0].value;
			people[i].name.last = document.getElementsByName('surname')[0].value;
		}
	}
	document.getElementById('list').innerHTML = getList(people);
	setDeleteEventStudents();
	setUpdateEventStudents();
}
function close() {
	document.getElementById("popup").style.display = "none";
}
function toggleInfo() {
	var blockForShow = document.getElementsByClassName(this.id)[0];
	//удаляем класс активности
	var navList = document.getElementsByClassName('nav-item');
	for (var i = 0; i < navList.length; i++) {
		if (navList[i].classList.contains('active')) {
			navList[i].classList.remove('active');
		}
	}
	this.parentNode.classList.add('active');
	var currentBlocks = document.getElementsByClassName('show')[0];
	currentBlocks.classList.remove('show');
	currentBlocks.classList.add('hidden');
	blockForShow.classList.remove('hidden');
	blockForShow.classList.add('show');
}
function toggleClass(elem) {
	var className = elem.getElementsByTagName('div')[0].style.display = "block";
}
function showData() {
	var id = this.parentNode.id;
	document.getElementById("popup").style.display = "block";

	var name = document.querySelector('input[name=name]');
	var surname = document.querySelector('input[name=surname]');
	var gender = document.querySelector('input[name=gender]');
	var age = document.querySelector('input[name=age]');
	var group = document.querySelector('input[name=group]');
	var _id = document.querySelector('input[name=_id]');
	for (var i = 0; i < people.length; i++) {
		if (people[i]._id === id) {
			var genderData = (people[i].gender === 'm') ? "Мужской" : "Женский";
			_id.value = people[i]._id;
			name.value = people[i].name.first;
			surname.value = people[i].name.last;
			gender.value = genderData;
			age.value = people[i].age;
			group.value = people[i].group;
		}
	}
}

function deleteStudent() {
	var id = this.parentNode.id;
	console.log(this.parentNode)
	for (var i = 0; i < people.length; i++) {
		if (people[i]._id === id) {
			//удаляем с индекса кол во элементов
			people.splice(i, 1);
			break;
		}
	}
	document.getElementById('list').innerHTML = getList(people);
	setDeleteEventStudents();
	setUpdateEventStudents();
}

function setUpdateEventStudents() {
	var liElems = document.querySelectorAll('#stud-list li i.fa-pencil');
	for (var i = 0; i < liElems.length; i++) {
		liElems[i].onclick = showData;
	}
}
function setDeleteEventStudents() {
	var liElems = document.querySelectorAll('#stud-list li i.fa-trash');
	for (var i = 0; i < liElems.length; i++) {
		liElems[i].onclick = deleteStudent;
	}
}
function searchStud(){
	var currentVal = document.querySelector('#autocomplete-stud').value;
	if(currentVal.length > 1) {
		var newPeople = [];
		for(var stud of people) {
			if (stud.name.last.match(currentVal)){
				newPeople.push(stud);
			}
		}
	}
	document.getElementById('list').innerHTML = getList(newPeople);
	setDeleteEventStudents();
	setUpdateEventStudents();
}
var data = getData(people);
var group = getGroupData(data.group);
var list = getList(people);

document.getElementById('count').innerHTML = data.total;
document.getElementById('groups-count').innerHTML = data.groups.length;
document.getElementById('male').innerHTML = data.male;
document.getElementById('female').innerHTML = data.female;
document.getElementById('avgAge').innerHTML = parseInt(data.total_age / data.total);
document.getElementById('maxAge').innerHTML = data.max_age.age + " " + data.max_age.last_name;
document.getElementById('minAge').innerHTML = data.min_age.age + " " + data.min_age.last_name;
document.getElementById('list').innerHTML = list;
document.getElementById('list-group').innerHTML = group;
setDeleteEventStudents();
setUpdateEventStudents();
var navLink = document.getElementsByClassName('nav-link');
for (var i = 0; i < navLink.length; i++) {
	navLink[i].onclick = toggleInfo;
}

document.getElementById('close').onclick = close;
document.getElementById('autocomplete-stud').oninput = searchStud;
