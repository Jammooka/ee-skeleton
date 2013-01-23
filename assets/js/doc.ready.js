$(document).ready(function()
{	
	/******************
	header-slideshow
	******************/
	if( $('#home-slideshow').length > 0 )
	{
	   	$('#home-slideshow').cycle({ 
	   		fx:	  'fade', 
			timeout:  8000,
			speed:  2000,
			fastOnEvent:   500,
			cleartype:  false,
			pause: 1,
			pauseOnPagerHover: 1,
			pager:  '#home-slideshow-buttons',
			next:	'#home-slideshow-next',
			prev:	'#home-slideshow-prev',
			pagerEvent: 'mouseover',
			pagerAnchorBuilder: function(idx, slide)
			{
				return '<a href="#"><img src="/assets/images/slideshow/bullets.png" /></a>';
			}
		});
		$('#home-slideshow-wrap').hover(
			function()
			{
				//show nav arrows
				$('#home-slideshow-arrows').fadeIn();
			},
			function()
			{
				//hide nav arrows
				$('#home-slideshow-arrows').fadeOut();
			}
		);
	}
	
	/******************
	CONTACT FORM
	******************/

	if( $('form').length > 0 )
	{
		/* AJAX Submission */
	
		$('#contact-form').ajaxForm({
			beforeSubmit: function(data, form, options)
			{
				// Validate
				var error = '';
				$.each($("#contact-form .val"), function(i,v) {
					var title = $(v).attr('title');
					var value = $(v).val();
					if(title == value)
					{
						error += "Please complete your " + value + '<br/>';
					}
				});

				if(error)
				{	
					$('#form-message').html('<span class="error">'+error+'</span>');
					return false;
				}
			},
			success: function(data)
			{
				if (data.match(/<title>Error<\/title>/))
				{
					var error = $(data).find('ul li:first').text();
					$('#form-message').html('<span class="error">'+error+'</span>');
				}
				else
				{
					$('#contact-form').hide();
					$('#form-message').html('Thank you for your interest.<br/>Your email has been sent.');
				}
			},
			dataType: 'html'
		});

	}
	
	/******************
	POPUPS - PRETTY PHOTO
	******************/
	
	$("a.popup").prettyPhoto(
	{
		default_width: 697,
		default_height: 392,
		theme: 'dark_rounded'
	});
	
	/******************
	ios-viewport-scaling-bug-fix.js
	******************/
	(function(doc)
	{
	 
		var addEvent = 'addEventListener',
			type = 'gesturestart',
			qsa = 'querySelectorAll',
			scales = [1, 1],
			meta = qsa in doc ? doc[qsa]('meta[name=viewport]') : [];
		function fix()
		{
			meta.content = 'width=device-width,minimum-scale=' + scales[0] + ',maximum-scale=' + scales[1];
			doc.removeEventListener(type, fix, true);
		}
		if ((meta = meta[meta.length - 1]) && addEvent in doc) {
			fix();
			scales = [.25, 1.6];
			doc[addEvent](type, fix, true);
		}
	}(document));
	
	/******************
	COOKIE NOTICE
	******************/
	if(getCookie('show_cookie_message') != 'no')
	{
		$('#cookie_box').show();
	}

	$('.cookie_box_close').click(function()
	{
		$('#cookie_box').animate({opacity:0 }, "slow");
		setCookie('show_cookie_message','no');
		return false;
	});	
	
});

function setCookie(cookie_name, value)
{
	document.cookie = cookie_name+ "=" + escape(value);
}

function getCookie(cookie_name)
{
	if (document.cookie.length>0)
	{
		cookie_start = document.cookie.indexOf(cookie_name + "=");
		if (cookie_start != -1)
		{ 
			cookie_start = cookie_start + cookie_name.length+1; 
			cookie_end = document.cookie.indexOf(";",cookie_start);
			if (cookie_end == -1)
			{
				cookie_end = document.cookie.length;
			}
			return unescape(document.cookie.substring(cookie_start,cookie_end));
		} 
	}
	return "";
}