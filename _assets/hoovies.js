"use strict";
jQuery(function($) {	
	var ContentContent = $(".content-content"),
		Nav = $("#stage-nav"),
		NavLinks = $("#stage-nav a"),
		ContentTitle = $("#content-title"),
		ContentClose = $("#content-close"),
		Content = $("#content"),
		BackgroundStack = $("#backgroundStack"),
		BackgroundColor = $("#backgroundStack-solidColor"),
		BackgroundGradient = $("#backgroundStack-gradient"),
		BackgroundNoise = $("#backgroundStack-noise"),
		BackgroundPic = $("#backgroundStack-pic"),
		Background3D = $("#backgroundStack-3d"),
		Preloader = $("#preloader");
	
    function stageHeader() {
        var Element = $("#stage-header-tagline");
        $(Element).children("span").css("opacity", 0);
        $(Element).children("span:first-child").css("opacity", 1).addClass("current");
        setInterval(Change, 6000);

        function Change() {
            var NextElement = $(Element).children("span.current").eq(0).next();
            $(Element).children("span.current").eq(0).animate({
                opacity: 0
            }, 300).removeClass("current");
            if (NextElement.length === 0) {
                setTimeout(function() {
                    $(Element).children("span:first-child").animate({
                        opacity: 1
                    }, 300).addClass("current");
                }, 500);
            } else {
                setTimeout(function() {
                    $(NextElement).animate({
                        opacity: 1
                    }, 300).addClass("current");
                }, 500);
            }
        }


    }

    function initMap() {
        var customMapType = new google.maps.StyledMapType(HooviesConfig.Map.Style);
        var customMapTypeId = 'custom_style';

        var map = new google.maps.Map(document.getElementById('contact-map'), {
            zoom: 12,
            center: {
                lat: HooviesConfig.Map.Latitude,
                lng: HooviesConfig.Map.Longtitude
            },
            scrollwheel: false,
            mapTypeControlOptions: {
                mapTypeIds: [google.maps.MapTypeId.ROADMAP, customMapTypeId]
            }
        });
		
		var marker = new google.maps.Marker({
            draggable: false,
            animation: google.maps.Animation.DROP,
            position: {lat: HooviesConfig.Map.Latitude, lng: HooviesConfig.Map.Longtitude},
            map: map
        });

        map.mapTypes.set(customMapTypeId, customMapType);
        map.setMapTypeId(customMapTypeId);
    }

    function gradient() {
        function generateGradient() {
            var canvas = $(BackgroundGradient)[0];
            var ctx = canvas.getContext('2d');

            canvas.height = $(BackgroundGradient).parent().height();
            canvas.width = $(BackgroundGradient).parent().width();

            var alphaA = 1;
            var alphaB = 0;
            var x = 0;
            var xx = canvas.width;
            var xTrend = true;
            var xxTrend = true;
            var trendA = true;
            var trendB = false;
            var draw = function draw() {
                if (trendA) {
                    alphaA += 0.003 + Math.random() * 0.005;
                } else {
                    alphaA -= 0.003 + Math.random() * 0.005;
                }
                if (trendB) {
                    alphaB += 0.003 + Math.random() * 0.005;
                } else {
                    alphaB -= 0.003 + Math.random() * 0.005;
                }
                if (alphaA <= 0.4) {
                    trendA = true;
                }
                if (alphaB <= 0.4) {
                    trendB = true;
                }
                if (alphaA >= 1) {
                    trendA = false;
                }
                if (alphaB >= 1) {
                    trendB = false;
                }
                if (xTrend) {
                    x += 0.51 + Math.random() * 0.1;
                } else {
                    x -= 0.51 + Math.random() * 0.1;
                }
                if (x < 0) {
                    xTrend = true;
                }
                if (x > canvas.width / 4) {
                    xTrend = false;
                }
                if (xxTrend) {
                    xx += 0.51 + Math.random() * 0.1;
                } else {
                    xx -= 0.51 + Math.random() * 0.1;
                }
                if (xx < canvas.width / 4 * 3) {
                    xxTrend = true;
                }
                if (xx > canvas.width) {
                    xxTrend = false;
                }
                var gradient = ctx.createLinearGradient(Math.floor(x), 0, Math.floor(xx), canvas.height);
                gradient.addColorStop(0, "rgba(" + HooviesConfig.Background.Gradient.StopAColor + "," + alphaA + ")");
                gradient.addColorStop(0.4, "rgba(" + HooviesConfig.Background.Gradient.StopAColor + ",0)");
                gradient.addColorStop(0.6, "rgba(" + HooviesConfig.Background.Gradient.StopBColor + ",0)");
                gradient.addColorStop(1, "rgba(" + HooviesConfig.Background.Gradient.StopBColor + "," + alphaB + ")");

                ctx.save();
                ctx.fillStyle = gradient;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.restore();
                window.requestAnimationFrame(draw);
            };

            draw();

            $(window).on('resize', function() {
                canvas.height = window.innerHeight;
                canvas.width = window.innerWidth;
            });
        }

        if (HooviesConfig.Background.Gradient.Enabled) {
            generateGradient();
        } else {
            $(BackgroundGradient).remove();
        }
    }

    function menu() {
		var AnimationInProgress = false;
        $(Nav).on("click","a",function() {
            if (!AnimationInProgress) {
                AnimationInProgress = true;
                var It = this;
                $(NavLinks).removeClass("hover");
                $(It).addClass("hover");
                $(BackgroundStack).addClass("contentOn");
                $(ContentTitle).html($(It).html());
                $(ContentClose).addClass("active");
                if ($(Content).hasClass("contentOn")) {
                    $(ContentContent).animate({
                        opacity: 0
                    }, 300);
                    setTimeout(function() {
                        $(ContentContent).css("display", "none");
                    }, 300);
                } else {
                    $(ContentContent).css("opacity", 0).css("display", "none");
                    $(Content).addClass("contentOn");
                }
                setTimeout(function() {
                    $(ContentTitle).animate({
                        opacity: 1
                    }, 300);
                }, 500);
                setTimeout(function() {
                    $(ContentTitle).animate({
                        opacity: 0
                    }, 300);
                }, 1300);
                setTimeout(function() {
                    $("#content-content--" + $(It).attr("data-page")).css("display", "block").animate({
                        opacity: 1
                    }, 300);
                }, 1700);
                setTimeout(function() {
                    initMap();
                    AnimationInProgress = false;
                }, 2000);

            }
        });
        $(ContentClose).on("click",function() {
            if (!AnimationInProgress) {
                AnimationInProgress = true;
                $(ContentClose).removeClass("active");
                $(BackgroundStack).removeClass("contentOn");
                $(Content).removeClass("contentOn");
                $(NavLinks).removeClass("hover");
                setTimeout(function() {
                    $(ContentContent).css("opacity", 0).css("display", "none");
                    AnimationInProgress = false;
                }, 300);
            }
        });
    }

    function config() {
        $(BackgroundColor).css("background", HooviesConfig.Background.SolidBg.Color);
        $(BackgroundGradient).css("opacity", HooviesConfig.Background.Gradient.Opacity);

        if (HooviesConfig.Background.Picture.Enabled) {
            $(BackgroundPic).css("opacity", HooviesConfig.Background.Picture.Opacity);
        } else {
            $(BackgroundPic).remove();
        }

        if (HooviesConfig.Background.Noise.Enabled) {
            $(BackgroundNoise).css("opacity", HooviesConfig.Background.Noise.Opacity);
        } else {
            $(BackgroundNoise).remove();
        }

        if (HooviesConfig.Colors.JSOverride) {
            var CSS = '<style type="text/css">.stage > .stage-header h1 { color:' + HooviesConfig.Colors.Tagline.FirstLine + ';} .stage > .stage-header h2 { color:' + HooviesConfig.Colors.Tagline.SecondLine + ';} a.nice-link { color:' + HooviesConfig.Colors.Buttons.Text + '; } a.nice-link > .hover > span { background:' + HooviesConfig.Colors.Buttons.Outline + '; } a.nice-link:hover, a.nice-link.hover { color:' + HooviesConfig.Colors.Buttons.TextHover + '; } .content { background:' + HooviesConfig.Colors.SideContent.Background + '; color:' + HooviesConfig.Colors.SideContent.Text + '; } .content .content-content.content-content--contact .contact-grid > li .fa { color:' + HooviesConfig.Colors.SideContent.ContactIcons + '}</style>';
            $("head").append(CSS);
        }
    }

    config();
    stageHeader();
    menu();
    gradient();

	$(ContentContent).css("opacity", 0).css("display", "none");
	
    $(window).on("load", function() {
        if ($(Background3D).length) {
            $(Background3D).Hoovies3DAnim(HooviesConfig.Background.Sphere3D);
        }

        $(Preloader).animate({
            opacity: 0
        }, 1000, function() {
            $(Preloader).css("display", "none");
        });
    });

});
