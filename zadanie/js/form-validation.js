var form = document.getElementById('contact-form');
var okBox = document.getElementById('form-ok');

function chyba(id, text) {
  var el = document.getElementById(id);
  if (el) {
    el.innerHTML = text;
  }
}

function vycistiChyby() {
  var ids = ['errName', 'errEmail', 'errGoal', 'errDate', 'errType', 'errMsg', 'errTerms'];
  for (var i = 0; i < ids.length; i = i + 1) {
    chyba(ids[i], '');
  }
}

function trimText(text) {
  return text.replace(/^\s+|\s+$/g, '');
}

if (form) {
  form.onsubmit = function (e) {
    e.preventDefault();
    vycistiChyby();
    if (okBox) {
      okBox.style.display = 'none';
    }

    var ok = true;
    var name = trimText(document.getElementById('name').value);
    var email = trimText(document.getElementById('email').value);
    var goal = document.getElementById('goal').value;
    var date = document.getElementById('date').value;
    var msg = trimText(document.getElementById('message').value);
    var terms = document.getElementById('terms').checked;
    var types = document.getElementsByName('trainingType');
    var typeChecked = false;

    for (var i = 0; i < types.length; i = i + 1) {
      if (types[i].checked) {
        typeChecked = true;
      }
    }

    if (name.length < 2) {
      chyba('errName', 'Meno musi mat aspon 2 znaky.');
      ok = false;
    }

    if (email.indexOf('@') === -1 || email.indexOf('.') === -1 || email.length < 6) {
      chyba('errEmail', 'Email nevyzera spravne.');
      ok = false;
    }

    if (goal === '') {
      chyba('errGoal', 'Vyber ciel treningu.');
      ok = false;
    }

    if (date === '') {
      chyba('errDate', 'Vyber datum.');
      ok = false;
    }

    if (!typeChecked) {
      chyba('errType', 'Vyber typ treningu.');
      ok = false;
    }

    if (msg.length < 15) {
      chyba('errMsg', 'Sprava musi mat aspon 15 znakov.');
      ok = false;
    }

    if (!terms) {
      chyba('errTerms', 'Treba potvrdit suhlas.');
      ok = false;
    }

    if (ok) {
      okBox.style.display = 'block';
      form.reset();
    }

    return false;
  };
}
