$(function() {  

    $(document).on("click", "#commentBtn", function(){
        alert("commentBtn");
    });

	$(document).on("click", "#deleteBtn", function(){
		const thisId= ($(this).parent().attr("data-id"));
		console.log(thisId)
		$.ajax({
			method: "PUT",
			url: "/delete/" + thisId
		}).then(function(e){
			console.log(e);
		})
	});

	$(document).on("click", "#saveBtn", function(){
        const thisID = ($(this).attr("id"));
        console.log(thisID)
	})
})
