var ap1 = new CSNPlayer({
    element: document.getElementById('player1'),
    narrow: false,
    autoplay: true,
    showlrc: false,
    mutex: true,
    theme: '#e6d0b2',
    preload: 'metadata',
    mode: 'circulation',
    music: {
		title: 'I Lab You',
		author: 'Tiên Tiên',
		sources: {"MP3_128kbps":"http:\/\/data.chiasenhac.com\/downloads\/1828\/5\/1827038-6fbab8ee\/128\/I%20Lab%20You%20-%20Tien%20Tien%20[128kbps_MP3].mp3","MP3_320kbps":"http:\/\/data.chiasenhac.com\/downloads\/1828\/5\/1827038-6fbab8ee\/320\/I%20Lab%20You%20-%20Tien%20Tien%20[320kbps_MP3].mp3","M4A_500kbps":"http:\/\/data.chiasenhac.com\/downloads\/1828\/5\/1827038-6fbab8ee\/m4a\/I%20Lab%20You%20-%20Tien%20Tien%20[500kbps_M4A].m4a","M4A_32kbps":"http:\/\/data.chiasenhac.com\/downloads\/1828\/5\/1827038-6fbab8ee\/32\/I%20Lab%20You%20-%20Tien%20Tien%20[32kbps_M4A].m4a"},
		pic: 'http://data.chiasenhac.com/data/cover/77/76886.jpg',
    }
});
ap1.on('play', function () {
    console.log('play');
});
ap1.on('play', function () {
    console.log('play play');
});
ap1.on('pause', function () {
    console.log('pause');
});
ap1.on('canplay', function () {
    console.log('canplay');
});
ap1.on('playing', function () {
    console.log('playing');
});
ap1.on('ended', function () {
    console.log('ended');
});
ap1.on('error', function () {
    console.log('error');
});

var ap2 = new CSNPlayer({
    element: document.getElementById('player2'),
    narrow: true,
    autoplay: false,
    showlrc: false,
    mutex: true,
    theme: '#e6d0b2',
    mode: 'circulation',
    music: {
        title: 'Preparation',
        author: 'Hans Zimmer/Richard Harvey',
        url: 'http://devtest.qiniudn.com/Preparation.mp3',
        pic: 'http://devtest.qiniudn.com/Preparation.jpg'
    }
});

var ap3 = new CSNPlayer({
    element: document.getElementById('player3'),
    narrow: false,
    autoplay: false,
    showlrc: 3,
    mutex: true,
    theme: '#615754',
    mode: 'circulation',
    music: {
        title: '回レ！雪月花',
        author: '小倉唯',
        url: 'http://devtest.qiniudn.com/回レ！雪月花.mp3',
        pic: 'http://devtest.qiniudn.com/回レ！雪月花.jpg',
        lrc: "回レ！雪月花.lrc"
    }
});

var ap4 = new CSNPlayer({
    element: document.getElementById('player4'),
    narrow: false,
    autoplay: false,
    showlrc: false,
    mutex: true,
    theme: '#ad7a86',
    mode: 'random',
    music: [
        {
            title: 'あっちゅ～ま青春!',
            author: '七森中☆ごらく部',
            url: 'http://devtest.qiniudn.com/あっちゅ～ま青春!.mp3',
            pic: 'http://devtest.qiniudn.com/あっちゅ～ま青春!.jpg'
        },
        {
            title: 'secret base~君がくれたもの~',
            author: '茅野愛衣',
            url: 'http://devtest.qiniudn.com/secret base~.mp3',
            pic: 'http://devtest.qiniudn.com/secret base~.jpg'
        },
        {
            title: '回レ！雪月花',
            author: '小倉唯',
            url: 'http://devtest.qiniudn.com/回レ！雪月花.mp3',
            pic: 'http://devtest.qiniudn.com/回レ！雪月花.jpg'
        }
    ]
});

var ap5 = new CSNPlayer({
    element: document.getElementById('player5'),
    narrow: false,
    autoplay: false,
    showlrc: 3,
    mutex: true,
    theme: '#ad7a86',
    mode: 'random',
    listmaxheight: '80px',
    music: [
        {
            title: 'あっちゅ～ま青春!',
            author: '七森中☆ごらく部',
            url: 'http://devtest.qiniudn.com/あっちゅ～ま青春!.mp3',
            pic: 'http://devtest.qiniudn.com/あっちゅ～ま青春!.jpg',
            lrc: 'あっちゅ～ま青春!.lrc'
        },
        {
            title: 'secret base~君がくれたもの~',
            author: '茅野愛衣',
            url: 'http://devtest.qiniudn.com/secret base~.mp3',
            pic: 'http://devtest.qiniudn.com/secret base~.jpg',
            lrc: 'secret base~君がくれたもの~.lrc'
        },
        {
            title: '回レ！雪月花',
            author: '小倉唯',
            url: 'http://devtest.qiniudn.com/回レ！雪月花.mp3',
            pic: 'http://devtest.qiniudn.com/回レ！雪月花.jpg',
            lrc: '回レ！雪月花.lrc'
        }
    ]
});