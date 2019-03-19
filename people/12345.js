let htmlData
function getData() {
  let data = {
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

  }

 htmlData ="<ol>";
  for(let i in people) {
      data.total_age += people[i].age;
      if(data.groups.indexOf(people [i].group) === -1) {
        data.groups.push (people[i].group);
            data.group[people[i].group] = [];
            data.group[people[i].group].push(people[i]);
        } else {
         data.group[people[i].group].push(people[i]);
        }
       htmlData += '<li id="'+people[i]._id+'">' +
         '<div>' +
         '<br>id: ' + people[i]._id +
          '<br>ФИО: ' + people[i].name.last+' '+people[i].name.first +
          '<br>Группа: ' + people[i].group +
          '<br>Пол: ' + people[i]. gender +
          '</div>' +
          '</li>';
       if(data.max_age.age< people[i].age) {
         data.max_age.age= people[i].age;
         data.max_age.last_name= people[i].name.last;
       }
       if(data.min_age.age> people[i].age) {
         data.min_age.age= people[i].age;
         data.min_age.last_name= people[i].name.last;
       }
    if(people[i].gender==='f'){
      data.female++
    } else {
      data.male++
    }
  }
  htmlData+="</ol>";
return data;
}
const data = getData(people);
console.log(data.group);
console.log(list);
function toggleInfo () {
  let blockForShow = document.getElementsByClassName(this.id)[0];
  let navList = document.getElementsByClassName('nav-item');
  for( let i = 0; i< navList.length; i++) {
    if(navList[i].classList.contains('active')) {
      navList[i].classList.remove('active');

    }

  }
  this.parentNode.classList.add('active');
  let currentBlocks = document.getElementsByClassName("show")[0];
  currentBlocks.classList.remove("show");
  currentBlocks.classList.add("hidden");
  blockForShow.classList.remove("hidden");
  blockForShow.classList.add('show');

}
function getGroupData(data) {
  let list = "<ul>";

  for(i in data) {
    let info = getData(data[i]);
    let common = "Всего студентов в группе: " + info.total + "<br>" +
    "Средний возраст: " + peseInt(info.total_age/info.total) + "<br>" +
    "Число мужчин: " + info.male + "<br>" +
    "число женщин: " + info.female;
    list+= "<ul onclick=' toggleClass(this)'> Группа № " + i + "<br>" + common + "<div class 'hidden'>";
    for(let j in data[i]) {
      list += "<li> ФИО: " + people[i].name.last+' '+people[i].name.first + "</li>";
    }
    list+="</div></ul>";
  }
  list += "</ul>";
  return list;

}
document.getElementById('count').innerHTML = data.total;
document.getElementById('male').innerHTML = data.male;
document.getElementById('female').innerHTML = data.female;
document.getElementById('avgAge').innerHTML = parseInt(data.total_age/data.total);
document.getElementById('maxAge').innerHTML = data.max_age.age + " " + data.max_age.last_name;
document.getElementById('minAge').innerHTML = data.min_age.age + " " + data.min_age.last_name;
document.getElementById('groups-count').innerHTML = data.groups.length;
document.getElementById('list').innerHTML = htmlData;
document.getElementById('st-common').onclick= toggleInfo;
document.getElementById('st-list').onclick= toggleInfo;
document.getElementById('st-groups').onclick= toggleInfo;
document.getElementById('list-group').innerHTML = getGroupData;
