var replaceModvatar = function(mod, url) {
    $('img.user_id[alt='+mod+']').replaceWith('<img src='+url+' class=user_id alt='+mod+' id='+mod+'>');
    $('#'+mod).addClass('mod-avatar');
}

var modvatars = [
    { mod : 'Keii',      url : '//tinyurl.ru/hkei'},
    { mod : 'DJZebro',   url : '//tinyurl.ru/hkmm'},
    { mod : 'Nodocchi',  url : '//nodocchi.com/nodocchi'},
    { mod : 'RAILGUN',   url : '//oi56.tinypic.com/714eqh.jpg'},
    { mod : 'Xiox',      url : '//i.imgur.com/pWCYo.gif'},
    { mod : 'Tofutoshi', url : '//i.imgur.com/pOBRZ.gif'},
    { mod : 'AnimuXD',   url : '//i.imgur.com/t1YlE.gif'}];    

var replaceModvatars = function () {
    for(i in modvatars) {
        replaceModvatar(modvatars[i].mod, modvatars[i].url);
    }
}

var doit = function (){
    replaceModvatars();
    $.getScript('//cloud.github.com/downloads/malsup/cycle/jquery.cycle.all.2.74.js', function () {
        $('.slideshow').cycle({
            fx: 'fade',
            random: 1,
            timeout: 10000,
            next: '.slideshow',
            pause: 1
        });
        $('.box').hide();
        $('ul.group li:first').addClass('active').show();
        $('.box:first').show();
        $('ul.group li').click(function () {
            $('ul.group li').removeClass('active');
            $(this).addClass('active');
            $('.box').hide();
            var activeTab = $(this).find('a').attr('href');
            $(activeTab).fadeIn();
            return false;
        });
    });
};


