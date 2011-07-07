var modvatars = [ //Replacement avatars
//    { mod : 'Keii',      url : '//tinyurl.ru/hkei'}, // Link seems to be broken
//    { mod : 'DJZebro',   url : '//tinyurl.ru/hkmm'}, // ^
    { mod : 'Nodocchi',  url : '//nodocchi.com/nodocchi'},
    { mod : 'RAILGUN',   url : '//oi56.tinypic.com/714eqh.jpg'},
    { mod : 'Xiox',      url : '//i.imgur.com/pWCYo.gif'},
    { mod : 'Tofutoshi', url : '//i.imgur.com/pOBRZ.gif'},
    { mod : 'AnimuXD',   url : '//i.imgur.com/t1YlE.gif'}
];    
var word_filters = [ // Filtered words
    {pat : /madoka/ig,       new : 'meduca'},
    {pat : /homura/ig,       new : 'hameru'},
    {pat : /mami/ig,         new : 'mumi'},
    {pat : /kyoko/ig,        new : 'kyaku'},
    {pat : /sayaka/ig,       new : 'sayaku'},
    {pat : /(binaryheap)/ig, new : '$1-senpai'}
];


// Convenience function for hooking a javascript function
var instrumentFn = function(fn, pre) {
    argTransform = arguments[2];
    var newFn = function() 
    {
	var res = pre.apply(this, arguments); 
	if(argTransform) {arguments = res;}
        if(fn.instrumented) {fn = fn.restore();}
	return fn.apply(this, arguments)
    };
    newFn.restore = function() {return fn;}
    newFn.instrumented = true;
    return newFn;
}

var wordFilter = function(usr, msg, wat) {
    for(p in word_filters) {
	msg = msg.replace(word_filters[p].pat, word_filters[p].new);
    }
    return [usr, msg, wat];
}

var replaceModvatar = function(mod, url) {
    $('img.user_id[alt='+mod+']').replaceWith('<img src='+url+' class=user_id alt='+mod+' id='+mod+'>');
    $('#'+mod).addClass('mod-avatar');
}


var replaceModvatars = function () {
    for(i in modvatars) {
        replaceModvatar(modvatars[i].mod, modvatars[i].url);
    }
}

var doit = function (){
    replaceModvatars();
    chat.writeMessage = instrumentFn(chat.writeMessage, wordFilter, true);
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


