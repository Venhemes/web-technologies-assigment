var btn = document.getElementById('load-data');
var tbody = document.getElementById('data-body');
var statusText = document.getElementById('ajax-status');

function setStatus(text) {
  if (statusText) {
    statusText.innerHTML = text;
  }
}

function emptyTable(text) {
  tbody.innerHTML = '<tr><td colspan="7">' + text + '</td></tr>';
}

function makeRows(data) {
  var rows = [];
  var programs = data.programs || [];

  for (var p = 0; p < programs.length; p = p + 1) {
    var program = programs[p];
    for (var w = 0; w < program.weeks.length; w = w + 1) {
      var week = program.weeks[w];
      for (var d = 0; d < week.days.length; d = d + 1) {
        var day = week.days[d];
        for (var e = 0; e < day.exercises.length; e = e + 1) {
          var ex = day.exercises[e];
          rows.push({
            program: program.name,
            week: week.number,
            day: day.name,
            exercise: ex.name,
            sets: ex.sets,
            reps: ex.reps,
            note: ex.note,
          });
        }
      }
    }
  }

  return rows;
}

function renderRows(rows) {
  var html = '';
  for (var i = 0; i < rows.length; i = i + 1) {
    html += '<tr>';
    html += '<td>' + rows[i].program + '</td>';
    html += '<td>' + rows[i].week + '</td>';
    html += '<td>' + rows[i].day + '</td>';
    html += '<td>' + rows[i].exercise + '</td>';
    html += '<td>' + rows[i].sets + '</td>';
    html += '<td>' + rows[i].reps + '</td>';
    html += '<td>' + rows[i].note + '</td>';
    html += '</tr>';
  }
  tbody.innerHTML = html;
}

function loadData() {
  setStatus('Plan sa nacitava...');
  btn.disabled = true;

  fetch('data/gym-data.json')
    .then(function (response) {
      if (!response.ok) {
        throw new Error('HTTP chyba ' + response.status);
      }
      return response.json();
    })
    .then(function (data) {
      var rows = makeRows(data);
      if (rows.length === 0) {
        emptyTable('Momentálne nie je dostupny ziadny treningovy plan.');
      } else {
        renderRows(rows);
      }
      setStatus('Aktualny rozpis treningov');
      btn.disabled = false;
    })
    .catch(function (err) {
      emptyTable('Plan sa nepodarilo zobrazit. Skus obnovit stranku.');
      setStatus('Plan nie je dostupny.');
      btn.disabled = false;
    });
}

if (btn) {
  btn.onclick = loadData;
  loadData();
}
