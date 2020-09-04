var dataTable;

$(document).ready(function () {
    loadDataTable();
});

function loadDataTable() {
    dataTable = $('#DT_load').DataTable({
        "ajax": {
            "url": "/api/book",
            "type": "GET",
            "dataType": "json"
        },
        "columns": [
            {"data": "name",    "width": "26%"},
            {"data":"author",  "width": "26%"},
            { "data": "isbn",  "width": "26%" },
            {
                "data": "id",
                "render": function (data) {
                    return `
                        <div class="text-center">
                            <a  class="btn btn-danger text-white btn-sm" style="cursor:pionter; width:70px;"
                                onclick=Delete('./api/book?id='+${data})>
                                Delete
                            </a>
                            &nbsp;
                            <a href="/BookList/Upsert?id=${data}" class="btn btn-success text-white btn-sm" style="cursor:pionter; width:70px;">
                                Edit    
                            </a>
                        </div>
                    `; "width:30%"
                }
            }
        ],
        "language": {
            "emptyTable": "no data found"
        },
        "width":"100%"
    })
}

function Delete(url) {
    // alert form
    swal({
        title: "Are you sure?",
        text: "Once deleted, you not be able to recover.",
        icon: "warning",
        buttons: true,
        dangerMode: true
    })
    .then((willDelete) =>
    {
        if (willDelete) {
            $.ajax ({
                type: "DELETE",
                url: url,
                success: function (data) {
                    if (toastr.success) {
                        toastr.success(data.message);
                        dataTable.ajax.reload();
                    } else {
                        toastr.error(data.message);
                    }
                }
            });
        }
    });
}