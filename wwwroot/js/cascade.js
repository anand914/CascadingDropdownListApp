$(document).ready(function () {
    getUserList();
});
$('#btnAdd').click(function () {
    ClearTextBox();
    $('#Cascade_Model').modal('show');
    $('#header-text').text('Add User');
    $('#btnsave').val('Save');
    $('#btnsave').addClass('btn-primary');
    $('#state').attr('disabled', true);
    $('#city').attr('disabled', true);
    getCountries();
});
$('.btnClose').click(function () {
    $('#Cascade_Model').modal('hide');
})
$('#country').on('change', function () {
    let countryId = parseInt($(this).val());
    if (countryId > 0) {
        $('#state').attr('disabled', false);
        $('#city').val($('#city options:first').val());
        $('#city').attr('disabled', true);
        Getstates(countryId);
    }
    else {
        $('#state').val($('#state option:first').val());
        $('#city').val($('#city option:first').val());
        $('#state').attr('disabled', true);
        $('#city').attr('disabled', true);
    }
});
$('#state').on('change', function () {
    let stateId = parseInt($(this).val());
    if (stateId > 0) {
        $('#city').attr('disabled', false);
        Getcities(stateId);
    }
    else {
        $('#city').val($('#city option:first').val());
        $('#city').attr('disabled', true);
    }
});

function getUserList() {
    $.ajax({
        url: '/Home/GetuserList',
        type: 'get',
        success: function (response) {
            $('#tblcascade').html('');
            $.each(response, function (i, item) {
                $('#tblcascade').append(`
                  <tr>
                   <td>${item.name}</td>
                   <td>${item.email}</td>
                   <td>${item.countryName}</td>
                   <td>${item.stateName}</td>
                   <td>${item.cityName}</td>
                   <td>
                   <a class="btn btn-sm btn-primary" onClick="EditUserData(${item.userId})">Edit</a>|
                   <a class="btn btn-sm btn-danger" onClick="DeleteUser(${item.userId})">Delete</a>
                   </td>
                </tr>`);
            });
        }
    });
}

function getCountries(countryID) {
    $.ajax({
        url: '/Home/Getcountries',
        type: 'get',
        success: function (response) {
            $('#country').html('');
            $('#country').html(' <option value="">--Select Country---</option>');
            $.each(response, function (i, item) {
                if (countryID != null && countryID !== '' && countryID == item.cId) {
                    $('#country').append('<option value=' + item.cId + ' selected>' + item.countryName + '</option>');
                }
                else {
                    $('#country').append('<option value=' + item.cId + '>' + item.countryName + '</option>');
                }
            });
            //if (countryID == null || countryID == '') {
            //    $.each(response, function (i, item) {
            //        $('#country').append('<option value=' + item.cId + '>' + item.countryName + '</option > ');
            //    });
            //}
            //else {
            //    $.each(response, function (i, item) {
            //        if (countryID == item.cId) {
            //            $('#country').append('<option value=' + item.cId + 'selected>' + item.countryName + '</option >');
            //        }
            //        else {
            //            $('#country').append('<option value=' + item.cId + '>' + item.countryName + '</option > ');
            //        }
            //    });
            //}
        },
        erro: function () {
            alert('Error retrieving countries.');
        }
    });
}

function Getstates(countryID, stateId) {
    $.ajax({
        url: '/Home/Getstates?countryId=' + countryID,
        type: 'get',
        success: function (response) {
            $('#state').html('');
            $('#state').html(' <option value="">--Select State---</option>');
            $.each(response, function (i, item) {
                if (stateId != null && stateId !== '' && stateId == item.s_Id) {
                    $('#state').attr('disabled', false);
                    $('#state').append('<option value="' + item.s_Id + '" selected>' + item.stateName + '</option>');
                } else {
                    $('#state').append('<option value="' + item.s_Id + '">' + item.stateName + '</option>');
                }
            });
            $('#state').attr('disabled', false);

            //if (stateId == null || stateId == '') {
            //    $.each(response, function (i, item) {
            //        $('#state').append('<option value=' + item.s_Id + '>' + item.stateName + '</option > ')
            //    });
            //}
            //else {
            //    $.each(response, function (i, item) {
            //        if (stateId == item.s_Id) {
            //            $('#state').attr('disabled', false);
            //            $('#state').append('<option value=' + item.s_Id + 'selected>' + item.stateName + '</option > ')
            //        }
            //        else {
            //            $('#state').append('<option value=' + item.s_Id + '>' + item.stateName + '</option > ')
            //        }
            //    });
            //}
        },
        error: function () {
            alert('Error retrieving countries.');
        }
    });
}

function Getcities(stateId, cityId) {
    $.ajax({
        url: '/Home/GetCity?stateId=' + stateId,
        type: 'get',
        success: function (response) {
            $('#city').html('');
            $('#city').html(' <option value="">--Select City---</option>');
            $.each(response, function (i, item) {
                if (cityId != null && cityId != '' && cityId == item.dId) {
                    $('#city').attr('disabled', false);
                    $('#city').append('<option value=' + item.dId + ' selected>' + item.cityName + '</option>');
                } else {
                    $('#city').append('<option value=' + item.dId + '>' + item.cityName + '</option>');
                }
            });
            $('#city').attr('disabled', false);

            //if (cityId == null || cityId == '') {
            //    $.each(response, function (i, item) {
            //        $('#city').append('<option value=' + item.dId + '>' + item.cityName + '</option > ')
            //    });
            //}
            //else {
            //    $.each(response, function (i, item) {
            //        if (cityId == item.dId) {
            //            $('#city').attr('disabled', false);
            //            $('#city').append('<option value=' + item.dId + 'selected>' + item.cityName + '</option > ')
            //        }
            //        else {
            //            $('#city').append('<option value=' + item.dId + '>' + item.cityName + '</option > ')
            //        }
            //    });
            //}
        },
        error: function () {
            alert('Error retrieving states.');
        }
    });
}
function ClearTextBox() {
    $('#userId').val('');
    $('#name').val('');
    $('#email').val('');
    $('#country').val($('#country option:first').val());
    $('#state').val($('#state option:first').val());
    $('#city').val($('#city option:first').val());

}


function GetFormData() {
    var userData = {};
    userData.userId = $('#userId').val();
    userData.Name = $('#Name').val();
    userData.email = $('#email').val();
    userData.countryID = $('#country').val();
    userData.stateId = $('#state').val();
    userData.cityId = $('#city').val();
    return userData;
}
function SaveUserData() {
    var data = GetFormData();
    $.ajax({
        url: '/Home/AddUser',
        type: 'post',
        data: data,
        success: function (response) {
            $('#Cascade_Model').modal('hide');
            getUserList();
            $('#alertSuccess').text(response.statusMessage).show();
            //$('#tblNotify').text(response.statusMessage);
            //$('#tblNotify').css('display', 'block');
            setTimeout(function () {
                $('#alertSuccess').fadeOut();
            }, 1000)
        },
        error: function () {
            alert('data not saved');
        },
    });
}

function EditUserData(userId) {
    $.ajax({
        url: '/Home/GetuserByid?userId=' + userId,
        type: 'get',
        success: function (response) {
            ClearTextBox();
            $('#Cascade_Model').modal('show');
            $('#userId').val(response.userId);
            $('#Name').val(response.name);
            $('#email').val(response.email);
            $('#header-text').text('Update Records');
            $('#btnsave').val('Update');
            $('#btnsave').addClass('btn-warning');
            getCountries(response.countryID);
            Getstates(response.countryID, response.stateId);
            Getcities(response.stateId, response.cityId);
        },
        error: function () {
            alert('not retrieved');
        }
    });
}
function DeleteUser(userId) {
    $.ajax({
        url: '/Home/Deletedata?userId=' + userId,
        type: 'DELETE',
        success: function (result) {
            debugger
            if (result.statusMessage === "data delete successfully!") {
                if (result.statusMessage === "data delete successfully!") {
                    $('#alertSuccess').text('Data deleted successfully').show();
                    setTimeout(function () {
                        $('#alertSuccess').fadeOut();
                    }, 3000);
                    //$('#tblNotify').text('Data deleted successfully').setTimeout(function () {
                    //    $('#tblNotify').fadeOut();
                    //}, 1000);
                    //// Refresh the user list after successful deletion
                    getUserList();
                } else {
                    $('#alertError').text('Error deleting data');
                }
            }
        },
        error: function () {
            alert('not retrieved');
        }
    });
}










