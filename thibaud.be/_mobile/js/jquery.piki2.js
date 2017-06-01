/*
 *
 *	@titre: global.
 *	@description: layout javascript.
 *	@auteur: neov - http://www.neov.net.
 *	@creation: 20110104.
 *	@modification: 20110607.
 *	@required: jquery 1.6.1.
 *
 */
// DEFINE VARS.
// constructor.
var dc = function (elem) {
        return document.createElement(elem);
    }

    // hex to rgb converter.
var hexToRgb = function (h) {
        var hexa = parseInt(((h.indexOf('#') > -1) ? h.substring(1) : h), 16);
        return {
            r: hexa >> 16,
            g: (hexa & 0x00FF00) >> 8,
            b: (hexa & 0x0000FF)
        };
    }

    // global vars.
var scrollDuration = 500; // global scroll effect duration.
var normalEffectDuration = 500; // global effect duration.
var fastEffectDuration = 100; // fast effect duration.
var thumbScale = 80; // global thumb size.
var minWindowSize = 360; // remove main margin below this size.
var contactSplitSize = 500; // redraw contact layout below this size.
var maxVideoWidth = 854; // maximum video width.
var maxVideoHeight = 480; // maximum video height.
var defaultColor = '#fafafa'; // default section background color.
var defaultOpacity = 0.85; // default background color opacity.
var iColor = hexToRgb(defaultColor); // convert hex value of default background color to rgb.
var irgb = 'rgb(' + iColor.r + ',' + iColor.g + ',' + iColor.b + ')'; // default rgb value of background color.
var irgba = null; // store rgba background color.
var globalScrollOpt = {
    queue: true,
    easing: 'linear'
};
var oldBrowser = ($.browser.msie && $.browser.version < 7) || ($.browser.mozilla && $.browser.version.substr(0, 3) == "1.9");
var uid2hash = {};
var hash2uid = {};
var site = '';
var lastPos = 0;
var bgRatio = 1; // Bg size Ratio
var bgImage = new Image();
//Fill uid2hash and hash2uid with existing data from the websites json
for (p in websites) {
    var w = websites[p];
    var h = '/' + w.name;
    if (p == 0) h = '';
    uid2hash[w.uid] = h;
    hash2uid[h] = w.uid;
}

var pathSection = ''; 
var pathSectionMedia = '';
var log = false;
SWFAddress.setStrict(false); //some of our url hash are are #p/m and not #/s/p/m
var applyLayout = function () {
        if (log) console.log('//// APPLY LAYOUT ////')
        if (typeof background != 'undefined' && !background.layout) {
			background.layout = true;
            if (log) console.log("jquery.layout.js Ready Fired and content is there======");
            if (!seoFile) SWFAddress.setTitle(websites[websiteIndex].title);
            //Fill uid2hash and hash2uid with data from sectionData from the html we just loaded.
            for (s in sectionData) {
                section = sectionData[s];
                var mH = site + section.name + "/";
                uid2hash[section.uid] = mH;
                hash2uid[mH] = section.uid;
                if (section.media) {
                    for (m in section.media) {
                        var hash = mH + (parseInt(m) + 1) + '/';
                        uid2hash[section.media[m].uid] = hash;
                        hash2uid[hash] = section.media[m].uid;
                    }
                }
            }
            //convert numeric jumpUrl to urlhash
      			/*if (log) console.log('$.pikibox.jumpUrl -->', $.pikibox.jumpUrl);
                  if ($.pikibox.jumpUrl) {
                     $.pikibox.showSectionAndMedia();
                  }
      			*/
            // YOUTUBE SCRIPT
            // This code loads the IFrame Player API code asynchronously.
            /* var tag = document.createElement('script');
            tag.src = "http://www.youtube.com/player_api";
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag); */


            // set background color to rgba.
            irgba = ($.browser.msie && $.browser.version < 9) ? irgb : 'rgba(' + iColor.r + ',' + iColor.g + ',' + iColor.b + ',' + defaultOpacity + ')';

            // set animation duration to 0 for iPhone. Prevent scrolling problem.
            if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))) {
                if (document.cookie.indexOf("iphone_redirect=false") == -1) {
                    // turn off jquery.fx (set duration to 0).
                    jQuery.fx.off = true;
                }
            }

            if (oldBrowser) {
                scrollDuration = 200;
                normalEffectDuration = 200;
                fastEffectDuration = 50;
            }

            // ajust html object size depending window size.


            function adjustSize() {
                var h = 0;
                 
                // get current window width.
                var windowWidth = $(window).width();


                // edit #main margin.
                if (windowWidth < minWindowSize) $('#main').css({
                    margin: 0
                });
                else $('#main').css({
                    margin: '0 5px'
                });

                // edit contact layout.
                if (windowWidth < contactSplitSize) $('#main').addClass('smallerWidth');
                else $('#main').removeClass('smallerWidth');

                // set video size.
                if (windowWidth < maxVideoWidth) {
                    h = windowWidth / 1.8;
                    $('.jp-video').height(h);
                    $('.flashContent').height(h);

                } else {
                    $('.jp-video').height(maxVideoHeight);
                    $('.flashContent').height(maxVideoHeight);
                }

                // set video size.
                if (windowWidth < 640) {
                    h = windowWidth / 1.6;
                    $('.youtubeContent').height(h);
                } else {
                    $('.youtubeContent').height(385);
                }

            }
            
            // MODIF :  Adjust bg size
            
            function adjustBgSize () {
                var windowRatio = $(window).width() / $(window).height(); // if (> 1) then winWidth > winHeight
                if (log) console.log ( 'windowRatio = ' + windowRatio + ' / bgRatio = ' + bgRatio  );
                if ( windowRatio > bgRatio ) {
                   $('body').css({ 'background-size':'100% auto' }); 

                } else {
                    $('body').css({ 'background-size':'auto 100%' });
                }
            }
            
            $(window).resize( function () {
                adjustSize();
                if ( background.classes == 'resize' ) {
                    adjustBgSize();
                }
            });

            // append div#media-builder in body for building media image content.
            var $builder = $(dc('div')).attr({
                id: 'media-builder'
            });
            $('body').append($builder);

            // preload section header images, main logo and background then show content.
            var sectionLength = $('h2 img').length;
            var logoCount = $('h1 img').length;
            var preloadImage = sectionLength + logoCount;
            var loadingCounter = 0;

            if (background.image) {
                preloadImage++;
            }

            if (log) console.log("loadingCounter:" + loadingCounter + ", preloadImage:" + preloadImage);
            // fade out loader when image loaded.


            function checkLoadedImage() {
                loadingCounter++;
                if (log) console.log($(this).attr('src') + ' loaded checkLoadedImage()-> loadingCounter =  ' + loadingCounter + " of " + preloadImage);


                if (loadingCounter == preloadImage) {
                    // hide loader.
					//convert numeric jumpUrl to urlhash				
					$('#main').removeClass('preload');
                    $('#loading').fadeOut(
                    200, function () {                        
                        // set body background image.
                        if (background.image) {
                            bgImage.src = background.image;
                            
                            bgRatio = bgImage.width / bgImage.height ;
                            
                            if (log) console.log( bgRatio );
                            
                            $('body').css({
                                backgroundImage: 'url(' + background.image + ')'
                            });
                        } else {
                            $('body').css({
                                backgroundImage: 'none'
                            });
						
						}
                        
                        if (background.classes) {
                            $('body').removeClass();
                            $('body').addClass(background.classes);
                            if (log) console.log ('jquery.layout.js [94] -> ' + background.classes);
                            
                            // set  size of the Bg if body.resize
                            if ( background.classes == 'resize' ) {
                                adjustBgSize();
                            }
                            
                        }

                        // set body background color.
                        if (background.color) {
                            var bgColor = hexToRgb(background.color);
                            $('body').css({
                                backgroundColor: 'rgb(' + bgColor.r + ',' + bgColor.g + ',' + bgColor.b + ')'
                            });
                        }

                        // show content.
                        $('#main').fadeIn(
                        200, function () {
                            // call ajustSize.
                            adjustSize();

                            // set all pikibox event.
                            $('h2', this).pikibox_piki({
                                thumbSize: thumbScale,
                                parent: $('#main')
                            });

                            // MODIF : All script loaded : set firstLoad to false;
                            if (log) console.log ( 'All script loaded' );
                            firstLoad = false;
							if ($.pikibox.jumpUrl) {
								$.pikibox.showSectionAndMedia();
							}
                        });
                        
                        
                        // YOUTUBE SCRIPT
                        // This code loads the IFrame Player API code asynchronously.
/*
                        var tag = document.createElement('script');
                        tag.src = "http://www.youtube.com/player_api";
                        var firstScriptTag = document.getElementsByTagName('script')[0];
                        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
*/                      
                        
                    });
                }
            }

            // log info on error loading image.


            function errorLoadingImage() {
                if (log) console.info('Error loading image:', this);
            }

            // background.
            var imgBackground = new Image();

            $(imgBackground).load(checkLoadedImage).error(errorLoadingImage).attr({
                src: background.image
            });

            // section header images.
            $('h1 img, h2 img').each(

            function () {
                var img = new Image();
                $(img).load(checkLoadedImage).error(errorLoadingImage).attr({
                    src: $(this).attr('src')
                })
            });

        } else {
            if (log) console.log("jquery.layout.js Ready Fired NO CONTENT===========");
        }

        $('.contact form').each(

        function () {
            var $form = $(this);
            $form.validate({
                rules: {
                    contact_name: 'required',
                    contact_mail: {
                        required: true,
                        email: true
                    },
                    contact_message: 'required'
                },
                messages: {
                    contact_name: {
                        required: 'Name required.'
                    },
                    contact_mail: {
                        required: 'Email address required.',
                        email: 'Please enter a valid email address.'
                    },
                    contact_message: {
                        required: 'Invalid messages.'
                    }
                }
            });

            $('.submit-btn', this).click(

            function () {
				$.ajax({
					type: 'POST',
					url: flashvars.mailServer,
					data: $form.serialize()+"&mode=html",
					success: function (data) {
						$form.parent().html(data);
					}
				});
			
                //$form.submit();
                return false;
            });

        });
    }

/*
 *
 *	@titre: global.
 *	@description: layout javascript.
 *	@auteur: neov - http://www.neov.net.
 *	@creation: 20110104.
 *	@modification: 20111106.
 *	@required: jquery 1.6.1.
 *	@required: jquery.thumbs.
 *
 */
var playingTube = false;

/**
 *
 *  URL encode / decode
 *  http://www.webtoolkit.info/
 *
 **/

var Url = {

    // public method for url encoding
    encode: function (string) {
        return escape(this._utf8_encode(string));
    },

    // public method for url decoding
    decode: function (string) {
        return this._utf8_decode(unescape(string));
    },

    // private method for UTF-8 encoding
    _utf8_encode: function (string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    },

    // private method for UTF-8 decoding
    _utf8_decode: function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;

        while (i < utftext.length) {

            c = utftext.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }

        }

        return string;
    }

};

/* End of URL encode / decode  */

var urlToDecode = Url;

(function ($) {

    if (!$.pikibox) {
        $.pikibox = new Object();
        $.pikibox.jumpUid = -2;

        //not needed in fact.
        $.pikibox.canonizeUrl = function (url) {
            if (url.indexOf('#') == 0) {
                url = url.slice(1);
                if (Number(url).toString() == url) {
                    return url;
                } else {
                    if (url.indexOf('/') == 0) if ((url.length > 2) && (url.lastIndexOf('/') != url.length)) url = url + '/';
                }

            }
            return url;
        };

        $.pikibox.url2webSiteIndex = function (url, visit) {


            if (Number(url).toString() == url) {
                //url is uid
                $.pikibox.jumpUid = Number(url);
                for (p in websites) {
                    website = websites[p];
                    if (website.uids.indexOf(',' + url + ',') != -1) return p;
                }
            } else {
                if (url.indexOf('/') == 0) {
                    if ((url.length > 2) && (url.lastIndexOf('/') != url.length)) url = url + "/";
                    //extract site name
                    websiteName = url.slice(1, url.indexOf('/', 2));
                    for (p in websites) {
                        website = websites[p];
                        if (website.name == websiteName) {
                            $.pikibox.jumpUid = -2; //wait load for hash convert
                            return p;
                        }
                    }
                }
            }
            return 0;
        };
        $.pikibox.uid2hash = function (uid) {
			if (log) console.log ( 'jquery.pikibox.js [140] -> ' + uid2hash[uid] );
            if (uid2hash[uid]) {
                return uid2hash[uid];
            } else {
                return uid;
            }

        }
        $.pikibox.gotoUrl = function (url) {

            if (log) console.log('$.pikibox.gotoUrl:' + url + ' with current websiteIndex:' + websiteIndex);
            if (url.indexOf('#') == 0) {
                url = url.slice(1);
                var newWebsiteIndex = 0;
                newWebsiteIndex = $.pikibox.url2webSiteIndex(url);
				if (log) console.log('$.pikibox.gotoUrl:' + url + ' with new websiteIndex:' + newWebsiteIndex);
				$.pikibox.jumpUrl = url;
                if ((newWebsiteIndex >= 0) && (newWebsiteIndex != websiteIndex)) {
                    // A page load is required for this gotoUrl
                    websiteIndex = newWebsiteIndex;
                    if (websites[newWebsiteIndex].password) {
                        $.pikibox.askPassword();
                    } else {
                        if (websiteIndex) site = "/" + websites[websiteIndex].name + "/";
                        else site = "";

                        //$('body').load(baseUrl + websites[websiteIndex].html + '_part.html', applyLayout);
                        //Should be same as .load?
                        $.ajax({
                            url: baseUrl + websites[websiteIndex].html + '_part.html',
                            success: function (data) {
                                $('body').html(data);
                                $(applyLayout());
                            }
                        });
                        $.scrollTo(0);

                    }
                } else {
                    if (!firstLoad) {
						$.pikibox.showSectionAndMedia(); //otherwise let layout do it after events are setup.
					} else {
						if (websites[websiteIndex].password) {
							$.pikibox.askPassword();
						}
					}
                }
                //internal url prevent defaults
                return false;
            } else {
                //external URL simply go there
                window.open(url)
                return false;
            }
        };

        $.pikibox.showSectionAndMedia = function () {
            if (Number($.pikibox.jumpUrl).toString() == $.pikibox.jumpUrl) {
                $.pikibox.jumpUrl = $.pikibox.uid2hash($.pikibox.jumpUrl);
            }
            $.pikibox.jumpUrl = $.pikibox.canonizeUrl($.pikibox.jumpUrl);

            var path = $.pikibox.jumpUrl.split('/');
            var sectionName = '';
            var mediaIndex = '';

            if (log) console.log('PATH ->', path)

            if (path.length == 1 && path[0] == '') {
                // hash was #
                // root site,
                // scroll to top. 
            } else if (path.length == 2) {
                // hash was #section/
                // just a section url of the root site
                // open the section
                // index can be found by matching path[0] sur sectionData[i].name
                sectionName = path[0];
                pathSection = sectionName + '/';
            } else if (path.length == 3 && path[0] == '') {
                // hash was #/site/
                // root of subsite 
                // scroll to top.
            } else if (path.length == 3) {
                // hash was #section/media/
                // path[0] is section name, path[1] is media index.
                sectionName = path[0];
                mediaIndex = path[1];
                pathSection = sectionName + '/' + mediaIndex + '/';
            } else if (path.length == 4) {
                //hash was #/site/section/
                // path[2] is section name.
                sectionName = path[2];
                pathSection = '/' + path[1] + '/' + path[2] + '/';
            } else if (path.length == 5) {
                //hash was #/site/section/media/
                // path[2] is section name, path[3] is media index.
                sectionName = path[2];
                mediaIndex = path[3];
                pathSection = '/' + path[1] + '/' + path[2] + '/' + mediaIndex + '/';

            }
			
			
            if (log) console.log('pathSection ----> ' + pathSection);


            //TODO: Open the section and if present in the url the media
            //maybe let current code act and emulate clicks...
            var pos;

            $('section').not('#main-section').find('.title > span').each(

            function (index) {
				if (log) console.log('search click emulation target:' + index);
                if ($(this).text() === sectionName) {
					if (log) console.log('found section name:' + sectionName);
 
                    if ($(this).parents('a').hasClass('active')) {
                        if (log) console.log('sectionName = ', sectionName, ' - mediaIndex = ', mediaIndex);
                        pos = $(this).offset().top - 10;
                        lastPos = pos;
                        $('html').css({
                            height: $(window).height() + pos
                        });
                        $.scrollTo(pos, scrollDuration, globalScrollOpt);
                    } else {
						if (log) console.log('do click on:' + sectionName);
                        $(this).parents('a').click();

                    }

                    if (mediaIndex) {
                        $(this).parents('a').parent().next().find('.galleryNav').find('a').eq(mediaIndex - 1).not('.active').click();

/*
						var $med = $(this)
						$(
							function ()
							{
								if (log) console.log('ready');
								$med.parents('a').parent().next().find('.galleryNav').find('a').eq(mediaIndex - 1).not('.active').click();
							}
						);
						*/
                    }

                }
            });

            // SWFAddress.setValue($.pikibox.jumpUrl);
            $.pikibox.jumpUrl = null;
        };

        $.pikibox.askPassword = function () {
            $('body').removeClass().addClass('login').html('<div class="login"><form action="">\n            <fieldset>\n                <legend>Login form</legend>\n                <p><input type="text" name="password" id="password" value="password" title="password"> <input type="image" name="submit" id="submit" title="submit" alt="submit" src="templatehtml/images/layout/submit.jpg"></p>\n                <p class="error">Wrong password</p>\n            </fieldset>\n        </form></div>\n');
            $('#password').focus(

            function () { //that works
                if ($(this).val() === $(this).attr('title')) {
                    $(this).val('');
                }
            }).blur(

            function () { //that works
                if ($(this).val() === '') {
                    //$(this).val($(this).attr('title'));
                    //$(this).val(websites[websiteIndex].password);
                }
            });

            $('form').submit(

            function () {
                if ($('#password').val() != websites[websiteIndex].password) {
                    $('.error').fadeIn(500);
                } else {
                    if (websiteIndex) site = "/" + websites[websiteIndex].name + "/";
                    else site = "";

                    //						$('body').load(baseUrl + websites[websiteIndex].html + '_part.html', applyLayout);
                    $.ajax({
                        url: websites[websiteIndex].html + '_part.html',
                        success: function (data) {
                            $('body').html(data);
                            applyLayout();
                        }
                    });
                }
                return false;
            });
        }
    };

    $.pikibox.piki = function (el, options) {
        // To avoid scope issues, use 'base' instead of 'this'
        // to reference this class from internal events and functions.
        var base = this;

        // Access to jQuery and DOM versions of element
        base.$section = $(el);
        base.section = el;

        base.selected = 0;

        base.$content = base.$section.next('.content-wrapper').find('.content').eq(0);
        base.$gallery = base.$section.next('.content-wrapper').find('.galleryContent');

        base.$builder = $('#media-builder');

        // Add a reverse reference to the DOM object
        base.$section.data("pikibox.piki", base);

        // initialize.
        base.init = function () {
            if (typeof (processing) === "undefined" || processing === null) processing = false;

            base.processing = processing;

            base.options = $.extend({}, $.pikibox.piki.defaultOptions, options);

            base.options.index = base.options.parent.find('h2').index(base.$section);
            base.options.color = hexToRgb(sectionData[base.options.index].color);
            base.options.rgb = 'rgb(' + base.options.color.r + ',' + base.options.color.g + ',' + base.options.color.b + ')';
            base.options.rgba = ($.browser.msie && $.browser.version < 9) ? base.options.rgb : 'rgba(' + base.options.color.r + ',' + base.options.color.g + ',' + base.options.color.b + ',' + base.options.opacity + ')';

            // redraw thumbs.
            base.$section.find('img').thumbs({
                scale: base.options.thumbSize
            });

            // set colors.
            base.$section.find('.title-wrap').css({
                backgroundColor: irgba
            });
            base.$section.find('.imageholder').css({
                borderColor: base.options.rgb,
                backgroundColor: base.options.rgb
            });
            base.$section.find('.toprule').css({
                borderColor: base.options.rgb,
                backgroundColor: base.options.rgb
            });


            base.itemLength = $(sectionData[base.options.index].media).length;

            // add all events.
            base.addPikiEvent();
        };

        // piki events.
        base.addPikiEvent = function () {
			if (log) console.log('base.addPikiEvent on ' + base.name);
            var $section = base.$section.find('a');
            var $item = base.$content.find('.navigation').find('a');

            $section

            // section header hover.
            .hover(

            function () {
                $section.find('.title-wrap').css({
                    backgroundColor: base.options.rgba
                });
                $section.find('.title-wrap *').css({
                    color: '#ffffff'
                });
            }, function () {
                $section.find('.title-wrap').css({
                    backgroundColor: irgba
                });
                $section.find('.title-wrap *').css({
                    color: '#666666'
                });
            })

            // section header click.
            .click(

            function () {
                if (log) console.log('SECTION CLICK EVENT LAUNCH');
				if ($(this).hasClass('jump')) {
					if (log) console.log('SECTION CLICK on JUMP');
					if ($(this).attr('href').indexOf('#') != 0) {
						window.open($(this).attr('href'));
						return false;
					} else {
						if (log) console.log('SECTION CLICK return true');
						return true;
					}
				}

                // do action when no process running.
                if (!base.processing) {
                    if (log) console.log($(window).height(), $('body').height(), base.$content.height(), $(this).offset().top)
                    // toggle active class.
                    $section.toggleClass('active');
                    if (log) console.log('--------------> eventClick');
                    // showing content.
                    if ($section.hasClass('active')) {
                        base.processing = true;
                        var uid = sectionData[base.options.index].uid;                        
                        
                        if (log) console.log('jquery.pikibox [430] ->' + $.pikibox.uid2hash(uid));
                        if (log) console.log('jquery.pikibox [431] -> firstLoad : ' + firstLoad);
                        if ( !firstLoad ) {
                            SWFAddress.setValue($.pikibox.uid2hash(uid));
						}
                        // MODIF: set html @ section header click.
                        $('html').css({
                            height: $(window).height() + base.$section.offset().top - 5
                        });

                        // MODIF: scroll onStart du clic
						pos = base.$section.offset().top - 5;
                        $.scrollTo(
                        pos, scrollDuration, {
                            queue: true,
                            easing: 'linear',
                            onAfter: function () {
                                // gallery content.
                                if (base.$content.hasClass('galleryNav')) {
                                    var navigationCounter = 0;
                                    var navigationItem = base.$content.find('li').length;

                                    // preload image first then show when ready.
                                    base.$content.find('.navigation img').each(

                                    function () {
                                        var img = new Image();

                                        $(img).load(

                                        function () {
                                            navigationCounter++;

                                            if (navigationCounter == navigationItem) {
                                                base.$content.slideDown(normalEffectDuration);

                                                if (base.$content.find('.navigation a.active').length != 0) base.$gallery.slideDown();
                                            }
                                        }).error(

                                        function () {
                                            if (log) console.info('Error loading image: ', this);
                                        }).attr({
                                            src: $(this).attr('src')
                                        })
                                    });
                                }
                                // non gallery content.
                                else {
                                    if (base.$content.find('article').length == 0 || base.$content.find('article').children().length != 0) base.$content.slideDown(normalEffectDuration);
                                }
                            }
                        });

                        $section.find('.title-wrap').css({
                            backgroundColor: irgba
                        });
                        $section.find('.title-wrap *').css({
                            color: '#666666'
                        });

                        $section.find('.title-wrap').addClass('processing');
                        $section.find('.toprule').show();



                        // slide down done.
                        $.when(base.$content).done(

                        function () {

                            $section.find('.title-wrap').removeClass('processing');
                            // MODIF: suppression a faire
                            // scroll deplacer au clic
                            // $.scrollTo(base.$section.offset().top - 5, scrollDuration, globalScrollOpt);
                            base.processing = false;
                        });

                    }
                    // hiding content
                    else {

                        $section.find('.toprule').hide();

                        // stop players.
                        var $playingVideo = base.$content.next('.content').find('.jp-jplayer');
                        var $youtubeVideo = base.$content.next('.content').find('.ytPlayer');

                        if ($playingVideo.length != 0) $playingVideo.jPlayer('pause');

                        if (playingTube) playingTube.pauseVideo();

                        if ($youtubeVideo.length != 0) {
                            $youtubeVideo[0].stopVideo();
                        }

                        base.$gallery.slideUp(fastEffectDuration);
                        base.$content.slideUp(
                        fastEffectDuration, function () {
                            base.processing = false;
                            // MODIF: onEnd section head.
                            $('body').css({
                                height: 'auto'
                            });
                            $('html').animate({
                                height: $('body').height()
                            }, {
                                queue: false,
                                duration: normalEffectDuration,
                                easing: 'linear'
                            });
                            $('body').trigger('click');
                        });

                    }
                }

                return false;
            });

            // thumbs click.
            $item.click(

            function () {
                if (!base.processing) {
                    // get selected media info.
                    var $t = base.$content.find('.navigation').find('a').not('.links');
                    var iIndex = $t.index(this);
                    var itemLength = $t.length;
                    $t = null;
                    var itemIndex = base.$content.find('.navigation').find('a').index(this);
                    var type = sectionData[base.options.index].media[itemIndex].type;
                    var media = sectionData[base.options.index].media[itemIndex].data;
                    var uid = sectionData[base.options.index].media[itemIndex].uid;
                    var poster = sectionData[base.options.index].media[itemIndex].poster;
                    var $media = null;
                    var $mediaNavigation = base.$gallery.find('.mediaNav');
                    var $mediaHolder = base.$gallery.find('.mediaHolder');

                    // links
                    if ($(this).hasClass('links')) {
                        $.pikibox.gotoUrl(media);
                        //window.open(media);
                    } else {
                        if (!$(this).hasClass('active')) {
                            base.processing = true;
                            
                            //SWFAddress.setValue($.pikibox.uid2hash(uid));
                            
                            if (log) console.log('jquery.pikibox [580] -> firstLoad : ' + $.pikibox.uid2hash(uid));
                            if (log) console.log('jquery.pikibox [580] -> firstLoad : ' + $.pikibox.uid2hash(uid));
                            
                            if ( !firstLoad )
                                pathSection = $.pikibox.uid2hash(uid);
                            
                            SWFAddress.setValue(pathSection);
							
                            var currentBodyHeight = $('body').height();

                            $('html').css({
                                height: currentBodyHeight * 2
                            });

                            $item.removeClass('active');
                            $(this).addClass('active');

                            if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPad/i)) || (navigator.userAgent.match(/iPod/i))) {
                                $item.find('> .mask').fadeOut();
                                $('> .mask', this).fadeIn();
                            }

                            base.selected = itemIndex;

                            //destroy existing player in current media holder.
                            var $playingMedia = $mediaHolder.find('.jp-jplayer');
                            $playingMedia.jPlayer('destroy');


                            $mediaHolder.slideUp(
                            normalEffectDuration, function () {
                                $(this).empty();

                                if (base.itemLength <= 1) {
                                    $mediaNavigation.find('a').fadeOut();
                                } else {
                                    if (iIndex == 0) {
                                        $mediaNavigation.find('a').eq(0).fadeOut();
                                        $mediaNavigation.find('a').eq(1).fadeIn();
                                    } else if (iIndex == itemLength - 1) {
                                        $mediaNavigation.find('a').eq(0).fadeIn();
                                        $mediaNavigation.find('a').eq(1).fadeOut();
                                    } else {
                                        $mediaNavigation.find('a').fadeIn();
                                    }
                                }

                                base.$gallery.find('.mediaTitle > div').hide();
                                base.$gallery.find('.mediaTitle').addClass('loading');

                                base.$gallery.slideDown();

                                // current window width
                                var currentWindowWidth = $(window).width();

                                var $mediaContainer = $(dc('div'));

                                //return false;
                                switch (type) {
                                    // image.
                                case 1:

                                    var img = new Image();

                                    $(img).load(

                                    function () {
                                        base.$builder.empty().append(img);

                                        $media = $(dc('img'));
                                        $media.attr({
                                            src: baseUrl + media
                                        });

                                        $mediaContainer.append($media);

                                        base.$gallery.find('.mediaHolder').removeClass('audio');
                                        base.$gallery.find('.mediaHolder').append($mediaContainer);

                                        base.showGalleryContent({
                                            index: itemIndex,
                                            width: $(img).width(),
                                            empty: false
                                        });
                                    }).attr({
                                        src: baseUrl + media
                                    });

                                    break;

                                    // video.
                                case 2:

                                    $mediaContainer.attr({
                                        id: 'jquery_jplayer_' + base.options.index
                                    }).addClass('jp-jplayer');


                                    var h = (currentWindowWidth < maxVideoWidth) ? (currentWindowWidth / 1.8) : maxVideoHeight;

                                    var $mediaController = $('<div class="jp-video" style="height:' + h + 'px"><div class="jp-type-single"><div id="jp_interface_' + base.options.index + '" class="jp-interface"><div class="jp-video-play"></div><div class="jp-controller"><ul class="jp-controls"><li><a href="#" class="jp-play" tabindex="1">play</a></li><li><a href="#" class="jp-pause" tabindex="1">pause</a></li><li><a href="#" class="jp-stop" tabindex="1">stop</a></li><li><a href="#" class="jp-mute" tabindex="1">mute</a></li><li><a href="#" class="jp-unmute" tabindex="1">unmute</a></li></ul><div class="jp-progress"><div class="jp-seek-bar"><div class="jp-play-bar"></div></div></div><div class="jp-volume-bar"><div class="jp-volume-bar-value"></div></div><div class="jp-current-time"></div><div class="jp-duration"></div></div></div></div></div>');
                                    base.$gallery.find('.mediaHolder').removeClass('audio');
                                    base.$gallery.find('.mediaHolder').append($mediaController.prepend($mediaContainer));


                                    $('.ytPlayer').each(

                                    function () {
                                        var playerId = $(this).attr('id');
                                        $(this)[0].addEventListener('onStateChange', '(function(state) { return playerState(state, "' + playerId + '"); })');
                                    });

                                    base.showGalleryContent({
                                        index: itemIndex,
                                        width: maxVideoWidth,
                                        empty: false,
                                        onEnd: function () {
                                            $mediaContainer.jPlayer({
                                                ready: function () {
                                                    $(this).jPlayer('setMedia', { /* poster: videoPoster, */
                                                        m4v: baseUrl + media
                                                    })
                                                    // autoplay player
                                                    .jPlayer('play');
                                                },
                                                swfPath: 'swf',
                                                supplied: 'm4v',
                                                cssSelectorAncestor: '#jp_interface_' + base.options.index
                                            }).bind(
                                            $.jPlayer.event.play, function () {
                                                $(".jp-jplayer").not(this).jPlayer("pause");
                                                if (playingTube) playingTube.pauseVideo();
                                            });
                                        }
                                    });

                                    break;

                                    // audio.
                                case 3:
                                    $mediaContainer.attr({
                                        id: 'jquery_jplayer_' + base.options.index
                                    }).addClass('jp-jplayer');

                                    var $mediaController = $('<div class="jp-audio"><div class="jp-type-single"><div id="jp_interface_' + base.options.index + '" class="jp-interface"><ul class="jp-controls"><li><a href="#" class="jp-play" tabindex="1">play</a></li><li><a href="#" class="jp-pause" tabindex="1">pause</a></li><li><a href="#" class="jp-stop" tabindex="1">stop</a></li><li><a href="#" class="jp-mute" tabindex="1">mute</a></li><li><a href="#" class="jp-unmute" tabindex="1">unmute</a></li></ul><div class="jp-progress"><div class="jp-seek-bar"><div class="jp-play-bar"></div></div></div><div class="jp-volume-bar"><div class="jp-volume-bar-value"></div></div><div class="jp-current-time"></div><div class="jp-duration"></div></div></div></div>');
                                    base.$gallery.find('.mediaHolder').removeClass('audio');
                                    base.$gallery.find('.mediaHolder').addClass('audio').append($mediaController.prepend($mediaContainer));

                                    base.showGalleryContent({
                                        index: itemIndex,
                                        width: 320,
                                        empty: false,
                                        onEnd: function () {
                                            $mediaContainer.jPlayer({
                                                ready: function () {
                                                    $(this).jPlayer('setMedia', {
                                                        poster: poster ? baseUrl + poster : 'assets/icons/thumb-audio.jpg',
                                                        m4a: baseUrl + media
                                                    })
                                                    // autoplay player
                                                    .jPlayer('play');
                                                },
                                                swfPath: 'swf',
                                                supplied: 'm4a',
                                                preload: 'metadata',
                                                cssSelectorAncestor: '#jp_interface_' + base.options.index
                                            }).bind(
                                            $.jPlayer.event.play, function () {
                                                $(".jp-jplayer").not(this).jPlayer("pause");

                                                if (playingTube) playingTube.pauseVideo();
                                            });
                                        }
                                    });
                                    break;

                                    // youtube.
                                case 4:
                                    $mediaContainer.addClass('youtubeContent');

                                    var h = (currentWindowWidth < 640) ? (currentWindowWidth / 1.6) : 390;

                                    $mediaContainer.height(h);
                                    $mediaContainer.append($('<div id="ytPlayer_' + base.options.index + '" class="youtube"></div>'));

                                    base.$gallery.find('.mediaHolder').removeClass('audio');
                                    base.$gallery.find('.mediaHolder').append($mediaContainer);

                                    var player;
                                    player = new YT.Player('ytPlayer_' + base.options.index, {
                                        height: '100%',
                                        width: '100%',
                                        videoId: sectionData[base.options.index].media[itemIndex].data,
                                        events: {
                                            'onStateChange': function (event) {
                                                if (event.data == YT.PlayerState.PLAYING) {
                                                    $(".jp-jplayer").jPlayer("pause");

                                                    if (playingTube && playingTube != player) playingTube.pauseVideo();

                                                    playingTube = player;
                                                }
                                            }
                                        }
                                    });

                                    base.showGalleryContent({
                                        index: itemIndex,
                                        width: 640,
                                        empty: false
                                    });

                                    break;

                                    // text.
                                case 5:
                                    $mediaContainer.addClass('textContent');
                                    $mediaContainer.text(sectionData[base.options.index].media[itemIndex].data);

                                    base.$gallery.find('.mediaHolder').removeClass('audio');
                                    base.$gallery.find('.mediaHolder').append($mediaContainer);

                                    var isEmpty;
                                    if (sectionData[base.options.index].media[itemIndex].data.length != 0) isEmpty = false;
                                    else isEmpty = true;


                                    base.showGalleryContent({
                                        index: itemIndex,
                                        width: 850,
                                        empty: isEmpty
                                    });
                                    break;

                                    // swf.
                                case 6:
                                    $mediaContainer.addClass('flashContent');

                                    var h = (currentWindowWidth < maxVideoWidth) ? (currentWindowWidth / 1.8) : maxVideoHeight;

                                    $mediaContainer.height(h);

                                    var $object = $('<object width="100%" height="100%"><param name="movie" value="' + media + '" /><param name="allowFullScreen" value="true" /><param name="allowscriptaccess" value="always" /><param name="bgcolor" value="#000000" /><embed src="' + media + '" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="100%" height="100%" bgcolor="#000000"></embed></object>');
                                    $mediaContainer.append($object);

                                    base.$gallery.find('.mediaHolder').removeClass('audio');
                                    base.$gallery.find('.mediaHolder').append($mediaContainer);

                                    base.showGalleryContent({
                                        index: itemIndex,
                                        width: 840,
                                        empty: false
                                    });
                                    break;

                                default:
                                    if (log) console.info('Incorrect media type');
                                    break;
                                }
                            });

                        }
                    }
                }
                //prevent default
                return false;

            });

            // content navigation.
            base.$gallery.find('.navigation').find('a').click(

            function () {
                if (!base.processing) {

                    if ($(this).hasClass('next')) {
                        base.selected++;
                        if (base.$content.find('.navigation').find('li > a').eq(base.selected).hasClass('links')) base.selected++;
                    } else {
                        base.selected--;
                        if (base.$content.find('.navigation').find('li > a').eq(base.selected).hasClass('links')) base.selected--;
                    }

                    base.$content.find('.navigation').find('li > a').eq(base.selected).click();
                }

                return false;
            });

        };

        base.showGalleryContent = function (o) {
            var defaults = {
                index: 0,
                width: 0,
                onEnd: false,
                empty: false
            };

            if (o) {
                options = $.extend(true, {}, defaults, o);

                var holderWidth = options.width;

                base.$gallery.find('.mediaTitle').removeClass('loading');
                base.$gallery.find('.mediaTitleHolder').animate({
                    width: holderWidth
                }, {
                    queue: false,
                    duration: fastEffectDuration,
                    easing: 'linear',
                    complete: function () {
                        base.$gallery.find('.mediaTitle > div').eq(options.index).fadeIn();
                        base.$gallery.find('.mediaHolder').width(options.width)

                        if (!options.empty) {
                            base.$gallery.find('.mediaHolder').slideDown(
                            normalEffectDuration, function () {

/*
                                        if (base.$gallery.find('.audio').length != 0)
										{
											var iH = base.$gallery.find('.mediaTitle').height() + 25;
											base.$gallery.find('.jp-jplayer').animate({top: '-=' + iH, marginBottom: '-=' + iH}, {queue: false, duration: fastEffectDuration, easing: 'linear'});
											base.$gallery.find('.jp-interface').animate({bottom: iH}, {queue: false, duration: fastEffectDuration, easing: 'linear'});
										}
										*/
								pos = base.$gallery.find('.mediaNav').offset().top - 5;
                                $.scrollTo(pos, scrollDuration, globalScrollOpt);

                                if (options.onEnd) options.onEnd.call();

                                $('html').css({
                                    height: $('body').height() + base.$gallery.find('.mediaNav').offset().top
                                });

                                base.processing = false;
                            })
                        } else {
                            if (log) console.log('test: ', base.$gallery.find('.mediaNav').offset().top - 5);
							pos = base.$gallery.find('.mediaNav').offset().top - 5;
                            $.scrollTo(pos, scrollDuration, globalScrollOpt);

                            if (options.onEnd) options.onEnd.call();

                            $('html').css({
                                height: $('body').height() + base.$gallery.find('.mediaNav').offset().top
                            });

                            base.processing = false;
                        }
                    }
                });
            }
        };
        // Run initializer
        base.init();
    };

    $.pikibox.piki.defaultOptions = {
        thumbSize: 80,
        color: null,
        rgb: null,
        rgba: null,
        opacity: 0.85,


        index: null,
        parent: null
    };

    $.fn.pikibox_piki = function (options) {
        return this.each(
        function () {
            (new $.pikibox.piki(this, options));
        });
    };

	// URL need to be decoded
	if (log) console.log ('hash = ' +  hash);
	$.pikibox.gotoUrl('#' + urlToDecode.decode(hash));
	/*
	if (firstLoad) {
		//events could not have been set to gotoUrl may fail
		if (log) console.log('set jumpUrl');
		$.pikibox.jumpUrl = '#' + urlToDecode.decode(hash);
	} else {
		if (log) console.log('gotoUrl');
		$.pikibox.gotoUrl('#' + urlToDecode.decode(hash));
	}
	*/
    function handleChange(event) {
        if (log) console.log('handleChange(' + event.path + ');');
        $.pikibox.gotoUrl('#' + event.path);
    }

    SWFAddress.addEventListener(SWFAddressEvent.EXTERNAL_CHANGE, handleChange);

})(jQuery);

// DOCUMENT READY.
$(applyLayout());

