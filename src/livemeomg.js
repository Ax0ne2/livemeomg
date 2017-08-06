
var current_page = 1, count = 0;

$(function(){
	setTimeout(function(){
		newSearch();
	}, 200);
});

function newSearch() {
	count = 0;
	current_page = 1;
	$('#main').html('');
	doSearch();
}
function doSearch(){
	$.ajax({
		url: 'https://live.ksmobile.net/live/newmaininfo',
		data: {
			page_size: 25,
			page_index: current_page
		},
		cache: false,
		type: 'GET',
		dataType: 'json',
		success: function(r){

			var max = $('#limit').val();
			if (r.data.video_info.length < max) max = r.data.video_info.length;

			for (index = 0; index < max; index++) {
				var entry = r.data.video_info[index];
				
				var level = parseInt(entry.level);
				if ((level > $('#min').val()) && (level < $('#max').val())) {
					count++;
					var h = '<div class="entry '+(entry.sex==0?'female':'male')+'"><img src="'+entry.videocapture+'"  onClick="watchStream(\''+entry.hlsvideosource+'\')">';
					h += '<h1>'+(entry.title.length > 0 ? entry.title : '-')+'</h1><h2><span>'+entry.uname+'</span></h2>';
					h += '<h2 class="userid">User ID: <span>'+entry.userid+'</span></h2>';
					h += '<h3>Level: <span>'+entry.level+'</span>Views: <span>'+entry.watchnumber+'</span></h3>';
					h += '<h3>Country: <span>'+entry.countryCode+'</span>Likes: <span>'+entry.likenum+'</span></h3>';
					h += '</div>';
					$('#main').append(h);

				}
			}

			if ((current_page < 5000) && (count < $('#limit').val() )) {
				current_page++;
				setTimeout(function(){
					doSearch();
				}, 25);
			}

		}
	});


}

function watchStream(u) {
	window.open('player.html?u='+u,'_player','width=360,height=640');	
}