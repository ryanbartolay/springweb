$(document).ready(function(){
	$('#userstable').DataTable({
        "paging": true,
        "lengthChange": true,
        "searching": true,
        "ordering": true,
        "info": true,
        "autoWidth": false,
        
        "language": {
            "url": url
        }
	
      });
	
	
	
})