"use strict";

function reformatDateString(s) {
  var b = s.split(/\D/);
  return b.reverse().join('-');
}

$(document).ready(function () {

  $('[data-toggle=offcanvas]').click(function () {
    $('.row-offcanvas').toggleClass('active');
  });

});

$(document).ready(() => {
  $('.btn-sm').on('click', (event) => {
    event.preventDefault();
    var currentId = $(event.target).closest("tr")[0]['cells'][0].innerText - 1;
    if ($(event.currentTarget).find('i').hasClass( "fa-edit" )) {
      let row_line_number = $(event.target).closest("tr").index() + 1;
      let column_count = $(event.target).closest("tr")[0]['childElementCount'];
      $('#editArrtibuteModal').modal('show');
      for (let z = 0; z < column_count - 2; z++) {
        let currentValue = $(event.target).closest("tr")[0]['cells'][z + 1].innerText;
        let currentFormInput = $('#editArrtibuteModal').find('form')[0][z];
        if (currentFormInput['type'] == "date") {
          currentValue = reformatDateString(currentValue);
          $('#editArrtibuteModal').find('form')[0][z]['value'] = currentValue
        } else {
          $('#editArrtibuteModal').find('form')[0][z]['value'] = currentValue;
        }
        $('#updateBtn').attr('data-button', currentId);
      }
    } else if ($(event.currentTarget).find('i').hasClass("fa-trash-alt")) {
      var row_line_number = $(event.target).closest("tr").index() + 1;
      $('#deleteArrtibuteModal').modal('show');
      $('#deleteBtn').attr('data-button', currentId);
    }
  })
})

$(document).ready(() => {
  $('#updateBtn').on('click', (event) => {
    event.preventDefault();
    let form = $('#editArrtibuteModal').find('form')[0];
    var isValid = form.checkValidity();
    if (isValid) {
      let currentId = $('#updateBtn').attr('data-button');
      let currentRow = $('table.table > tbody').children()[currentId]
      currentRow['cells'][0].innerText = currentId;
      let columnCount = currentRow['childElementCount']
      currentRow['cells'][0].innerText = parseInt(currentId) + 1;
      for (let z = 0; z < columnCount - 2; z++) {
        let currentFormInput = $('#editArrtibuteModal').find('form')[0][z]
        let currentText = currentFormInput['value']
        if (currentFormInput['type'] == "date") {
          currentText = reformatDateString(currentText);
        }
        currentRow['cells'][z + 1].innerText = currentText;
      }
      $('#editArrtibuteModal').modal('hide');
    }
  })
})

$(document).ready(() => {
  $('#deleteBtn').on('click', (event) => {
    let currentId = $('#deleteBtn').attr('data-button');
    let currentRow = $('table.table > tbody').children()[currentId]
    currentRow.remove();
    updateRowsID();
    $('#deleteAttributeModal').modal('hide');
  })
})

function updateRowsID() {
  let tableRowCount = $('table.table > tbody').children().length;
  for (let z = 0; z < tableRowCount; z++) {
    let currentRow = $('table.table > tbody').children()[z];
    $(currentRow).children()[0].innerText = z + 1;
  }
}
$(document).ready(() => {
  $('#addNewAttr').on('click', (event) => {
    event.preventDefault();
    let form = $('#addNewArrtibuteModal').find('form')[0];
    var isValid = form.checkValidity();
    if (isValid) {
      var clonedRow = $('tbody tr:last').clone();
      let newId = parseInt(clonedRow.children()[0].innerText) + 1
      clonedRow[0]['cells'][0].innerText = newId;
      let columnCount = clonedRow[0]['childElementCount']
      for (let z = 0; z < columnCount - 2; z++) {
        let currentFormInput = $('#addNewArrtibuteModal').find('form')[0][z]
        let currentText = currentFormInput['value']
        if (currentFormInput['type'] == "date") {
          currentText = reformatDateString(currentText);
        }
        clonedRow[0]['cells'][z + 1].innerText = currentText;
      }
      $('tbody').append(clonedRow);
      $('#addNewArrtibuteModal').modal('hide');
    }
  })
})

$(document).ready(() => {
  $('#editArrtibuteModal').on('hidden.bs.modal', function (e) {
    $(this)
      .find("input,textarea,select")
      .val('')
      .end()
      .find("input[type=checkbox], input[type=radio]")
      .prop("checked", "")
      .end();
  })
})