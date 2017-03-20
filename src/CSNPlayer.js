require('./CSNPlayer.scss');

let instances = [];

class CSNPlayer {
    /**
     * CSNPlayer constructor function
     *
     * @param {Object} option - See README
     * @constructor
     */
    constructor(option) {
        const svg = {
            'play': ['0 0 16 31', 'M15.552 15.168q0.448 0.32 0.448 0.832 0 0.448-0.448 0.768l-13.696 8.512q-0.768 0.512-1.312 0.192t-0.544-1.28v-16.448q0-0.96 0.544-1.28t1.312 0.192z'],
            'pause': ['0 0 17 32', 'M14.080 4.8q2.88 0 2.88 2.048v18.24q0 2.112-2.88 2.112t-2.88-2.112v-18.24q0-2.048 2.88-2.048zM2.88 4.8q2.88 0 2.88 2.048v18.24q0 2.112-2.88 2.112t-2.88-2.112v-18.24q0-2.048 2.88-2.048z'],
            'volume-up': ['0 0 28 32', 'M13.728 6.272v19.456q0 0.448-0.352 0.8t-0.8 0.32-0.8-0.32l-5.952-5.952h-4.672q-0.48 0-0.8-0.352t-0.352-0.8v-6.848q0-0.48 0.352-0.8t0.8-0.352h4.672l5.952-5.952q0.32-0.32 0.8-0.32t0.8 0.32 0.352 0.8zM20.576 16q0 1.344-0.768 2.528t-2.016 1.664q-0.16 0.096-0.448 0.096-0.448 0-0.8-0.32t-0.32-0.832q0-0.384 0.192-0.64t0.544-0.448 0.608-0.384 0.512-0.64 0.192-1.024-0.192-1.024-0.512-0.64-0.608-0.384-0.544-0.448-0.192-0.64q0-0.48 0.32-0.832t0.8-0.32q0.288 0 0.448 0.096 1.248 0.48 2.016 1.664t0.768 2.528zM25.152 16q0 2.72-1.536 5.056t-4 3.36q-0.256 0.096-0.448 0.096-0.48 0-0.832-0.352t-0.32-0.8q0-0.704 0.672-1.056 1.024-0.512 1.376-0.8 1.312-0.96 2.048-2.4t0.736-3.104-0.736-3.104-2.048-2.4q-0.352-0.288-1.376-0.8-0.672-0.352-0.672-1.056 0-0.448 0.32-0.8t0.8-0.352q0.224 0 0.48 0.096 2.496 1.056 4 3.36t1.536 5.056zM29.728 16q0 4.096-2.272 7.552t-6.048 5.056q-0.224 0.096-0.448 0.096-0.48 0-0.832-0.352t-0.32-0.8q0-0.64 0.704-1.056 0.128-0.064 0.384-0.192t0.416-0.192q0.8-0.448 1.44-0.896 2.208-1.632 3.456-4.064t1.216-5.152-1.216-5.152-3.456-4.064q-0.64-0.448-1.44-0.896-0.128-0.096-0.416-0.192t-0.384-0.192q-0.704-0.416-0.704-1.056 0-0.448 0.32-0.8t0.832-0.352q0.224 0 0.448 0.096 3.776 1.632 6.048 5.056t2.272 7.552z'],
            'volume-down': ['0 0 28 32', 'M13.728 6.272v19.456q0 0.448-0.352 0.8t-0.8 0.32-0.8-0.32l-5.952-5.952h-4.672q-0.48 0-0.8-0.352t-0.352-0.8v-6.848q0-0.48 0.352-0.8t0.8-0.352h4.672l5.952-5.952q0.32-0.32 0.8-0.32t0.8 0.32 0.352 0.8zM20.576 16q0 1.344-0.768 2.528t-2.016 1.664q-0.16 0.096-0.448 0.096-0.448 0-0.8-0.32t-0.32-0.832q0-0.384 0.192-0.64t0.544-0.448 0.608-0.384 0.512-0.64 0.192-1.024-0.192-1.024-0.512-0.64-0.608-0.384-0.544-0.448-0.192-0.64q0-0.48 0.32-0.832t0.8-0.32q0.288 0 0.448 0.096 1.248 0.48 2.016 1.664t0.768 2.528z'],
            'volume-off': ['0 0 28 32', 'M13.728 6.272v19.456q0 0.448-0.352 0.8t-0.8 0.32-0.8-0.32l-5.952-5.952h-4.672q-0.48 0-0.8-0.352t-0.352-0.8v-6.848q0-0.48 0.352-0.8t0.8-0.352h4.672l5.952-5.952q0.32-0.32 0.8-0.32t0.8 0.32 0.352 0.8z'],
            'circulation': ['0 0 29 32', 'M25.6 9.92q1.344 0 2.272 0.928t0.928 2.272v9.28q0 1.28-0.928 2.24t-2.272 0.96h-22.4q-1.28 0-2.24-0.96t-0.96-2.24v-9.28q0-1.344 0.96-2.272t2.24-0.928h8v-3.52l6.4 5.76-6.4 5.76v-3.52h-6.72v6.72h19.84v-6.72h-4.8v-4.48h6.080z'],
            'random': ['0 0 33 31', 'M29.867 9.356l-5.003 5.003c-0.094 0.094-0.235 0.141-0.36 0.141-0.266 0-0.5-0.219-0.5-0.5v-3.002h-4.002c-2.079 0-3.064 1.423-3.94 3.111-0.453 0.875-0.844 1.782-1.219 2.673-1.735 4.033-3.768 8.223-8.849 8.223h-3.502c-0.281 0-0.5-0.219-0.5-0.5v-3.002c0-0.281 0.219-0.5 0.5-0.5h3.502c2.079 0 3.064-1.423 3.94-3.111 0.453-0.875 0.844-1.782 1.219-2.673 1.735-4.033 3.768-8.223 8.849-8.223h4.002v-3.002c0-0.281 0.219-0.5 0.5-0.5 0.141 0 0.266 0.063 0.375 0.156l4.987 4.987c0.094 0.094 0.141 0.235 0.141 0.36s-0.047 0.266-0.141 0.36zM10.262 14.781c-0.907-1.892-1.907-3.783-4.268-3.783h-3.502c-0.281 0-0.5-0.219-0.5-0.5v-3.002c0-0.281 0.219-0.5 0.5-0.5h3.502c2.783 0 4.831 1.298 6.41 3.518-0.876 1.344-1.517 2.798-2.142 4.268zM29.867 23.363l-5.003 5.003c-0.094 0.094-0.235 0.141-0.36 0.141-0.266 0-0.5-0.235-0.5-0.5v-3.002c-4.643 0-7.504 0.547-10.396-3.518 0.86-1.344 1.501-2.798 2.126-4.268 0.907 1.892 1.907 3.783 4.268 3.783h4.002v-3.002c0-0.281 0.219-0.5 0.5-0.5 0.141 0 0.266 0.063 0.375 0.156l4.987 4.987c0.094 0.094 0.141 0.235 0.141 0.36s-0.047 0.266-0.141 0.36z'],
            'order': ['0 0 32 32', 'M0.622 18.334h19.54v7.55l11.052-9.412-11.052-9.413v7.549h-19.54v3.725z'],
            'single': ['0 0 38 32', 'M2.072 21.577c0.71-0.197 1.125-0.932 0.928-1.641-0.221-0.796-0.333-1.622-0.333-2.457 0-5.049 4.108-9.158 9.158-9.158h5.428c0.056-0.922 0.221-1.816 0.482-2.667h-5.911c-3.158 0-6.128 1.23-8.361 3.463s-3.463 5.203-3.463 8.361c0 1.076 0.145 2.143 0.431 3.171 0.164 0.59 0.7 0.976 1.284 0.976 0.117 0 0.238-0.016 0.357-0.049zM21.394 25.613h-12.409v-2.362c0-0.758-0.528-1.052-1.172-0.652l-5.685 3.522c-0.644 0.4-0.651 1.063-0.014 1.474l5.712 3.69c0.637 0.411 1.158 0.127 1.158-0.63v-2.374h12.409c3.158 0 6.128-1.23 8.361-3.463 1.424-1.424 2.44-3.148 2.99-5.029-0.985 0.368-2.033 0.606-3.125 0.691-1.492 3.038-4.619 5.135-8.226 5.135zM28.718 0c-4.985 0-9.026 4.041-9.026 9.026s4.041 9.026 9.026 9.026 9.026-4.041 9.026-9.026-4.041-9.026-9.026-9.026zM30.392 13.827h-1.728v-6.822c-0.635 0.576-1.433 1.004-2.407 1.285v-1.713c0.473-0.118 0.975-0.325 1.506-0.62 0.532-0.325 0.975-0.665 1.329-1.034h1.3v8.904z'],
            'menu': ['0 0 22 32', 'M20.8 14.4q0.704 0 1.152 0.48t0.448 1.12-0.48 1.12-1.12 0.48h-19.2q-0.64 0-1.12-0.48t-0.48-1.12 0.448-1.12 1.152-0.48h19.2zM1.6 11.2q-0.64 0-1.12-0.48t-0.48-1.12 0.448-1.12 1.152-0.48h19.2q0.704 0 1.152 0.48t0.448 1.12-0.48 1.12-1.12 0.48h-19.2zM20.8 20.8q0.704 0 1.152 0.48t0.448 1.12-0.48 1.12-1.12 0.48h-19.2q-0.64 0-1.12-0.48t-0.48-1.12 0.448-1.12 1.152-0.48h19.2z'],
            'prev': ['0 0 32 50', 'M35.965,0.114c-0.329-0.171-0.726-0.148-1.033,0.063L7.5,19.095V1c0-0.553-0.448-1-1-1s-1,0.447-1,1v40c0,0.553,0.448,1,1,1  s1-0.447,1-1V22.905l27.432,18.919C35.103,41.94,35.301,42,35.5,42c0.159,0,0.319-0.038,0.465-0.114  C36.294,41.713,36.5,41.372,36.5,41V1C36.5,0.628,36.294,0.287,35.965,0.114z M34.5,39.096L8.261,21L34.5,2.904V39.096z'],
            'next': ['0 0 32 50', 'M35.5,0c-0.552,0-1,0.447-1,1v18.095L7.068,0.177C6.762-0.034,6.364-0.057,6.035,0.114C5.706,0.287,5.5,0.628,5.5,1v40  c0,0.372,0.206,0.713,0.535,0.886C6.181,41.962,6.341,42,6.5,42c0.199,0,0.397-0.06,0.568-0.177L34.5,22.905V41c0,0.553,0.448,1,1,1  s1-0.447,1-1V1C36.5,0.447,36.052,0,35.5,0z M7.5,39.096V2.904L33.739,21L7.5,39.096z']
        };
        this.getSVG = (type) => {
            return `
                <svg xmlns:xlink="http://www.w3.org/1999/xlink" height="100%" version="1.1" viewBox="${svg[type][0]}" width="100%">
                    <use xlink:href="#csnplayer-${type}"></use>
                    <path class="csnplayer-fill" d="${svg[type][1]}" id="csnplayer-${type}"></path>
                </svg>
            `;
        };
        this.sendGaEvent = function (type, label) {
            if (this.currentEvent === 'undefined' || this.currentEvent !== type) {
                this.currentEvent = type;
                try {
                    ga('send', 'event', {
                        eventCategory: 'CSN Player',
                        eventAction: type,
                        eventLabel: label,
                        transport: 'beacon'
                    });
                } catch (e) {
                    console.error('You are not use Google Analytics. EventDetail: type: ' + type + ', label: ' + label);
                }
            }

        };
        this.isMobile = /mobile/i.test(window.navigator.userAgent);
        //this.isMobile=false;
        // compatibility: some mobile browsers don't suppose autoplay
        if (this.isMobile) {
            option.autoplay = false;
        }

        // default options
        const defaultOption = {
            element: document.getElementsByClassName('csnplayer')[0],
            narrow: false,
            autoplay: false,
            mutex: true,
            showlrc: 0,
            theme: '#b7daff',
            mode: 'circulation'
        };
        for (let defaultKey in defaultOption) {
            if (defaultOption.hasOwnProperty(defaultKey) && !option.hasOwnProperty(defaultKey)) {
                option[defaultKey] = defaultOption[defaultKey];
            }
        }

        // multiple music
        this.playIndex = Object.prototype.toString.call(option.music) === '[object Array]' ? 0 : -1;
        this.hasPlayList = option.hasPlayList;
        this.sourcelabel = [];
        this.canPlayType = function (audio_type) {
            var a = document.createElement('audio');
            return !!(a.canPlayType && a.canPlayType('audio/' + audio_type + ';').replace(/no/, ''));
        };
        this.buildMultiSource = function (option) {
            this.multisource = option.music.sources ? true : false;
            if (this.multisource) {
                this.sourcelabel = [];
                Object.keys(option.music.sources).map((item, index) => {
                    var check = option.music.sources[item].indexOf('.mp3') > -1;
                    if (this.canPlayType('flac')) {
                        check = check || option.music.sources[item].indexOf('.flac') > -1;
                    }
                    if (this.canPlayType('mp4')) {
                        check = check || option.music.sources[item].indexOf('.m4a') > -1;
                    }
                    if (check) {
                        if (!option.music.url) {
                            option.music.url = option.music.sources[item];
                        }
                        var tmp = item.split('_');
                        if (!this.activeSource) {
                            this.activeSource = tmp[tmp.length - 1];
                        }
                        this.sourcelabel[tmp[tmp.length - 1]] = item;
                    }
                });
                if (localStorage['activeSource']) {
                    if (option.music.sources[this.sourcelabel[localStorage['activeSource']]]) {
                        this.activeSource = localStorage['activeSource'];
                        option.music.url = option.music.sources[this.sourcelabel[localStorage['activeSource']]];
                    } else {
                        this.activeSource = Object.keys(this.sourcelabel)[0];
                    }
                    if (this.activesource) {
                        this.activesource.innerHTML = this.activeSource;
                    }

                }
            }
            return option;
        };
        this.option = this.buildMultiSource(option);
        this.audios = [];
        this.mode = option.mode;
        /**
         * Parse second to 00:00 format. 00:00:00 if audio is over an hour long.
         *
         * @param {Number} second
         * @return {String} 00:00 format. 00:00:00 if over an hour long.
         */
        this.secondToTime = (second) => {
            const add0 = (num) => {
                return num < 10 ? '0' + num : '' + num;
            };
            const min = parseInt(second / 60);
            const sec = parseInt(second - min * 60);
            const hours = parseInt(min / 60);
            const minAdjust = parseInt((second / 60) - (60 * parseInt((second / 60) / 60)));
            return second >= 3600 ? add0(hours) + ':' + add0(minAdjust) + ':' + add0(sec) : add0(min) + ':' + add0(sec);
        };

        // save lrc
        this.element = this.option.element;
        if (this.option.showlrc === 2 || this.option.showlrc === true) {
            this.savelrc = [];
            for (let i = 0; i < this.element.getElementsByClassName('csnplayer-lrc-content').length; i++) {
                this.savelrc.push(this.element.getElementsByClassName('csnplayer-lrc-content')[i].innerHTML);
            }
        }
        this.lrcs = [];

        /**
         * Update progress bar, including loading progress bar and play progress bar
         *
         * @param {String} type - Point out which bar it is, should be played loaded or volume
         * @param {Number} percentage
         * @param {String} direction - Point out the direction of this bar, Should be height or width
         */
        this.updateBar = (type, percentage, direction) => {
            percentage = percentage > 0 ? percentage : 0;
            percentage = percentage < 1 ? percentage : 1;
            bar[type + 'Bar'].style[direction] = percentage * 100 + '%';
        };

        /**
         * Update lrc
         *
         * @param {Number} currentTime
         */
        this.updateLrc = (currentTime = this.audio.currentTime) => {
            if (this.lrcIndex > this.lrc.length - 1 || currentTime < this.lrc[this.lrcIndex][0] || (!this.lrc[this.lrcIndex + 1] || currentTime >= this.lrc[this.lrcIndex + 1][0])) {
                for (let i = 0; i < this.lrc.length; i++) {
                    if (currentTime >= this.lrc[i][0] && (!this.lrc[i + 1] || currentTime < this.lrc[i + 1][0])) {
                        this.lrcIndex = i;
                        this.lrcContents.style.transform = `translateY(${-this.lrcIndex * 16}px)`;
                        this.lrcContents.style.webkitTransform = `translateY(${-this.lrcIndex * 16}px)`;
                        this.lrcContents.getElementsByClassName('csnplayer-lrc-current')[0].classList.remove('csnplayer-lrc-current');
                        this.lrcContents.getElementsByTagName('p')[i].classList.add('csnplayer-lrc-current');
                    }
                }
        }
        };

        // define CSNPlayer events
        const eventTypes = ['play', 'pause', 'canplay', 'playing', 'ended', 'error', 'prev', 'next'];
        this.event = {};
        for (let i = 0; i < eventTypes.length; i++) {
            this.event[eventTypes[i]] = [];
        }
        this.trigger = (type) => {
            if (typeof this.option.ga !== 'undefined' && this.option.ga) {
                this.sendGaEvent(type, this.option.music.title + ' - ' + this.option.music.author);
            }
            for (let i = 0; i < this.event[type].length; i++) {
                this.event[type][i]();
            }
        };

        this.multiple = this.playIndex > -1;
        this.music = this.multiple ? this.option.music[this.playIndex] : this.option.music;

        // add class csnplayer-withlrc
        if (this.option.showlrc) {
            this.element.classList.add('csnplayer-withlrc');
        }
        if (this.option.music.length > 1) {
            this.element.classList.add('csnplayer-list');
        }

        if (!this.multiple && this.mode !== 'circulation' && this.mode !== 'order' && this.mode !== 'random') {
            this.mode = 'circulation';
        }
        this.getRandomOrder();

        // fill in HTML
        let eleHTML = `
            <div class="csnplayer-bar-wrap">
                <div class="csnplayer-bar">
                    <div class="csnplayer-loaded" style="width: 0"></div>
                    <div class="csnplayer-played" style="width: 0; background: ${this.option.theme};">
                        <span class="csnplayer-thumb" style="border: 1px solid ${this.option.theme};"></span>
                    </div>
                </div>
            </div>
            <div class="csnplayer-pic" ${(this.music.pic ? (`style="background-image: url('${this.music.pic}');"`) : ``)}>
                <div class="csnplayer-button csnplayer-play">
                    <button class="csnplayer-icon csnplayer-icon-play">`
                + this.getSVG('play')
                + `     </button>
                </div>
            </div>
            <div class="csnplayer-info">
                <div class="csnplayer-music">
                    <span class="csnplayer-title"></span>
                    <span class="csnplayer-author"></span>
                </div>
                <div class="csnplayer-lrc">
                    <div class="csnplayer-lrc-contents" style="transform: translateY(0); -webkit-transform: translateY(0);"></div>
                </div>
                <div class="csnplayer-controller">
                    <div class="csnplayer-button-wrap" ${!this.hasPlayList ? 'style="display: none;"' : ''}>
                        <button class="csnplayer-icon csnplayer-icon-prev" title="Prev">`
                + this.getSVG('prev')
                + `              </button>
                         <button class="csnplayer-icon csnplayer-icon-next" title="Next">`
                + this.getSVG('next')
                + `              </button>                        
                    </div>   
                    <div class="csnplayer-source-wrap" ${!this.multisource ? 'style="display: none;"' : ''}>
                        <div class="csnplayer-active-source">` + this.activeSource + `</div>
                        <div class="csnplayer-sources-list-wrap">
                            <ul class="csnplayer-sources-list"></ul>
                        </div>                        
                    </div>
                    <div class="csnplayer-time">
                        <span class="csnplayer-time-inner">
                            <span class="csnplayer-ptime">00:00</span> / <span class="csnplayer-dtime">00:00</span>
                        </span>                        
                        <div class="csnplayer-volume-wrap">
                            <button class="csnplayer-icon csnplayer-icon-volume-down" ${this.isMobile ? 'style="display: none;"' : ''}>`
                + this.getSVG('volume-down')
                + `             </button>
                            <div class="csnplayer-volume-bar-wrap">
                                <div class="csnplayer-volume-bar">
                                    <div class="csnplayer-volume" style="height: 80%; background: ${this.option.theme};"></div>
                                </div>
                            </div>
                        </div>
                        <button class="csnplayer-icon csnplayer-icon-mode">`
                + this.getSVG(this.mode)
                + `         </button>
                        ${(this.multiple ? `<button class="csnplayer-icon csnplayer-icon-menu">`
                        + this.getSVG('menu')
                        + `         </button>` : ``)}
                    </div>
                </div>
            </div>`;
        if (this.multiple) {
            eleHTML += `
            <div class="csnplayer-list" ${this.option.listmaxheight ? `style="max-height: ${this.option.listmaxheight}` : ``}">
                <ol>`;
            for (let i = 0; i < this.option.music.length; i++) {
                eleHTML += `
                    <li>
                        <span class="csnplayer-list-cur" style="background: ${this.option.theme};"></span>
                        <span class="csnplayer-list-index">${(i + 1)}</span>
                        <span class="csnplayer-list-title">${this.option.music[i].title}</span>
                        <span class="csnplayer-list-author">${this.option.music[i].author}</span>
                    </li>`
            }
            eleHTML += `
                </ol>
            </div>`
        }
        this.element.innerHTML = eleHTML;
        this.prevBtn = this.element.getElementsByClassName('csnplayer-icon-prev')[0];
        this.nextBtn = this.element.getElementsByClassName('csnplayer-icon-next')[0];
        this.prevBtn.addEventListener('click', (e) => {
            this.trigger('prev');
        });
        this.nextBtn.addEventListener('click', (e) => {
            this.trigger('next');
        });
        //Set sources label
        let source_html = '';
        Object.keys(this.sourcelabel).map((item, index) => {
            source_html += '<li class="' + (this.activeSource === item || Object.keys(this.sourcelabel).length === 1 ? 'active-source' : '') + '">' + item + '</li>';
        });
        this.activesource = this.element.getElementsByClassName('csnplayer-active-source')[0];
        this.sourceWrap = this.element.getElementsByClassName('csnplayer-sources-list-wrap')[0]
        this.sourcelist = this.element.getElementsByClassName('csnplayer-sources-list')[0];
        this.sourcelist.innerHTML = source_html;
        //Add Event Listener Tooge Source List
        this.activesource.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            this.sourceWrap.style.display = this.sourceWrap.style.display === 'block' ? 'none' : 'block';
        });
        document.body.addEventListener('click', (e) => {
            this.sourceWrap.style.display = 'none';
        });
        this.switchSource = (source_label) => {
            if (option.music.sources[this.sourcelabel[source_label]]) {
                localStorage['activeSource'] = source_label;
                this.activeSource = source_label;
                this.activesource.innerText = source_label;
                var source_html = '';
                Object.keys(this.sourcelabel).map((item, index) => {
                    source_html += '<li class="' + (this.activeSource === item || Object.keys(this.sourcelabel).length === 1 ? 'active-source' : '') + '">' + item + '</li>'
                });
                this.sourcelist.innerHTML = source_html;
                this.rebindLiFunc();
                var currentTime = this.audio.currentTime;
                this.option.music.url = option.music.sources[this.sourcelabel[source_label]];
                this.setMusic(0);
                this.audio.currentTime = currentTime;
                if (typeof this.option.ga !== 'undefined' && this.option.ga) {
                    this.sendGaEvent('switchSource', this.option.music.title + ' - ' + this.option.music.author + ' [' + source_label + ']');
                }
                this.play();
            }
        };
        this.rebindLiFunc = () => {
            this.list_li = this.sourcelist.querySelectorAll('li');
            for (var i in this.list_li) {
                if (this.list_li[i].addEventListener) {
                    this.list_li[i].addEventListener('click', this.switchSource.bind(this, this.list_li[i].innerText));
                }
            }
        };
        this.rebindLiFunc();
        // hide mode button in arrow container
        if (this.element.offsetWidth < 300) {
            this.element.getElementsByClassName('csnplayer-icon-mode')[0].style.display = 'none';
        }

        this.ptime = this.element.getElementsByClassName('csnplayer-ptime')[0];

        if (this.element.getElementsByClassName('csnplayer-info')[0].offsetWidth < 200) {
            this.element.getElementsByClassName('csnplayer-time')[0].classList.add('csnplayer-time-narrow');
        }
        // fix the width of csnplayer bar
        let bar = {};
        bar.barWrap = this.element.getElementsByClassName('csnplayer-bar-wrap')[0];

        // switch to narrow style
        if (this.option.narrow) {
            this.element.classList.add('csnplayer-narrow');
        }

        // play and pause button
        this.button = this.element.getElementsByClassName('csnplayer-button')[0];
        this.button.addEventListener('click', (e) => {
            this.toggle();
        });

        // click music list: change music
        if (this.multiple) {
            const listItem = this.element.getElementsByClassName('csnplayer-list')[0].getElementsByTagName('li');
            for (let i = 0; i < this.option.music.length; i++) {
                listItem[i].addEventListener('click', () => {
                    const musicIndex = parseInt(listItem[i].getElementsByClassName('csnplayer-list-index')[0].innerHTML) - 1;
                    if (musicIndex !== this.playIndex) {
                        this.setMusic(musicIndex);
                        this.play();
                    } else {
                        this.toggle();
                    }
                });
            }
        }

        // control play progress
        bar.playedBar = this.element.getElementsByClassName('csnplayer-played')[0];
        bar.loadedBar = this.element.getElementsByClassName('csnplayer-loaded')[0];
        const thumb = this.element.getElementsByClassName('csnplayer-thumb')[0];
        let barWidth;
        bar.barWrap.addEventListener('click', (event) => {
            const e = event || window.event;
            barWidth = bar.barWrap.clientWidth;
            const percentage = (e.clientX - getElementViewLeft(bar.barWrap)) / barWidth;
            this.updateBar('played', percentage, 'width');
            this.element.getElementsByClassName('csnplayer-ptime')[0].innerHTML = this.secondToTime(percentage * this.audio.duration);
            this.audio.currentTime = parseFloat(bar.playedBar.style.width) / 100 * this.audio.duration;
        });

        thumb.addEventListener('mouseover', () => {
            thumb.style.background = this.option.theme;
        });
        thumb.addEventListener('mouseout', () => {
            thumb.style.background = '#fff';
        });

        const thumbMove = (event) => {
            const e = event || window.event;
            let percentage = (e.clientX - getElementViewLeft(bar.barWrap)) / barWidth;
            percentage = percentage > 0 ? percentage : 0;
            percentage = percentage < 1 ? percentage : 1;
            this.updateBar('played', percentage, 'width');
            if (this.option.showlrc) {
                this.updateLrc(parseFloat(bar.playedBar.style.width) / 100 * this.audio.duration);
            }
            this.element.getElementsByClassName('csnplayer-ptime')[0].innerHTML = this.secondToTime(percentage * this.audio.duration);
        };

        const thumbUp = () => {
            document.removeEventListener('mouseup', thumbUp);
            document.removeEventListener('mousemove', thumbMove);
            this.audio.currentTime = parseFloat(bar.playedBar.style.width) / 100 * this.audio.duration;
            this.playedTime = setInterval(() => {
                this.updateBar('played', this.audio.currentTime / this.audio.duration, 'width');
                if (this.option.showlrc) {
                    this.updateLrc();
                }
                this.element.getElementsByClassName('csnplayer-ptime')[0].innerHTML = this.secondToTime(this.audio.currentTime);
                this.trigger('playing');
            }, 100);
        };

        thumb.addEventListener('mousedown', () => {
            barWidth = bar.barWrap.clientWidth;
            clearInterval(this.playedTime);
            document.addEventListener('mousemove', thumbMove);
            document.addEventListener('mouseup', thumbUp);
        });

        // control volume
        bar.volumeBar = this.element.getElementsByClassName('csnplayer-volume')[0];
        const volumeBarWrap = this.element.getElementsByClassName('csnplayer-volume-bar')[0];
        this.volumeicon = this.element.getElementsByClassName('csnplayer-time')[0].getElementsByTagName('button')[0];
        const barHeight = 35;
        this.element.getElementsByClassName('csnplayer-volume-bar-wrap')[0].addEventListener('click', (event) => {
            const e = event || window.event;
            let percentage = (barHeight - e.clientY + getElementViewTop(volumeBarWrap)) / barHeight;
            percentage = percentage > 0 ? percentage : 0;
            percentage = percentage < 1 ? percentage : 1;
            this.volume(percentage);
        });
        this.volumeicon.addEventListener('click', () => {
            if (this.audio.muted) {
                this.audio.muted = false;
                this.volumeicon.className = this.audio.volume === 1 ? 'csnplayer-icon csnplayer-icon-volume-up' : 'csnplayer-icon csnplayer-icon-volume-down';
                if (this.audio.volume === 1) {
                    this.volumeicon.className = 'csnplayer-icon csnplayer-icon-volume-up';
                    this.volumeicon.innerHTML = this.getSVG('volume-up');
                } else {
                    this.volumeicon.className = 'csnplayer-icon csnplayer-icon-volume-down';
                    this.volumeicon.innerHTML = this.getSVG('volume-down');
                }
                this.updateBar('volume', this.audio.volume, 'height');
            } else {
                this.audio.muted = true;
                this.volumeicon.className = 'csnplayer-icon csnplayer-icon-volume-off';
                this.volumeicon.innerHTML = this.getSVG('volume-off');
                this.updateBar('volume', 0, 'height');
            }
        });

        // get element's view position
        function getElementViewLeft(element) {
            let actualLeft = element.offsetLeft;
            let current = element.offsetParent;
            let elementScrollLeft;
            while (current !== null) {
                actualLeft += current.offsetLeft;
                current = current.offsetParent;
            }
            elementScrollLeft = document.body.scrollLeft + document.documentElement.scrollLeft;
            return actualLeft - elementScrollLeft;
        }

        function getElementViewTop(element) {
            let actualTop = element.offsetTop;
            let current = element.offsetParent;
            let elementScrollTop;
            while (current !== null) {
                actualTop += current.offsetTop;
                current = current.offsetParent;
            }
            elementScrollTop = document.body.scrollTop + document.documentElement.scrollTop;
            return actualTop - elementScrollTop;
        }

        // mode control
        const modeEle = this.element.getElementsByClassName('csnplayer-icon-mode')[0];
        modeEle.addEventListener('click', () => {
            if (this.hasPlayList || this.multiple) {
                if (this.mode === 'random') {
                    this.mode = 'single';
                } else if (this.mode === 'single') {
                    this.mode = 'circulation';
                } else if (this.mode === 'circulation') {
                    this.mode = 'random';
                }
            } else {
                if (this.mode === 'circulation') {
                    this.mode = 'order';
                } else {
                    this.mode = 'circulation';
                }
            }
            modeEle.innerHTML = this.getSVG(this.mode);
            this.audio.loop = this.isMobile||!this.hasPlayList||!((this.hasPlayList && this.mode === 'circulation') || this.multiple || this.mode === 'order' || this.mode === 'random');
        });

        // toggle menu control
        if (this.multiple) {
            const list = this.element.getElementsByClassName('csnplayer-list')[0];
            list.style.height = list.offsetHeight + 'px';
            this.element.getElementsByClassName('csnplayer-icon-menu')[0].addEventListener('click', () => {
                if (!list.classList.contains('csnplayer-list-hide')) {
                    list.classList.add('csnplayer-list-hide');
                } else {
                    list.classList.remove('csnplayer-list-hide');
                }
            });
        }

        if (this.mode === 'random') {
            this.setMusic(this.randomOrder && this.randomOrder[0] ? this.randomOrder[0] : 0);
        } else {
            this.setMusic(0);
        }
        instances.push(this);
    }

    /**
     * Set music
     */
    setMusic(index) {
        // get this.music
        if (this.multiple && typeof (index) !== 'undefined') {
            this.playIndex = index;
        }
        const indexMusic = this.playIndex;
        this.music = this.multiple ? this.option.music[indexMusic] : this.option.music;

        // set html
        if (this.music.pic) {
            this.element.getElementsByClassName('csnplayer-pic')[0].style.backgroundImage = `url('${this.music.pic}')`;
        }
        this.element.getElementsByClassName('csnplayer-title')[0].innerHTML = this.music.title;
        this.element.getElementsByClassName('csnplayer-author')[0].innerHTML = ` - ${this.music.author}`;
        if (this.multiple) {
            if (this.element.getElementsByClassName('csnplayer-list-light')[0]) {
                this.element.getElementsByClassName('csnplayer-list-light')[0].classList.remove('csnplayer-list-light');
            }
            this.element.getElementsByClassName('csnplayer-list')[0].getElementsByTagName('li')[indexMusic].classList.add('csnplayer-list-light');
        }

        // set the previous audio object
        if (this.audio) {
            this.pause();
            this.audio.currentTime = 0;
        }

        if (this.multiple) {
            this.element.getElementsByClassName('csnplayer-list')[0].scrollTop = indexMusic * 33;
        }

        // get this audio object
        if ((this.multiple && !this.audios[indexMusic]) || this.playIndex === -1) {
            this.audio = document.createElement("audio");
            this.audio.src = this.music.url;
            this.audio.preload = this.option.preload ? this.option.preload : 'auto';

            // show audio time: the metadata has loaded or changed
            this.audio.addEventListener('durationchange', () => {
                if (this.audio.duration !== 1) {           // compatibility: Android browsers will output 1 at first
                    this.element.getElementsByClassName('csnplayer-dtime')[0].innerHTML = this.secondToTime(this.audio.duration);
                }
            });

            // show audio loaded bar: to inform interested parties of progress downloading the media
            this.audio.addEventListener('progress', () => {
                const percentage = this.audio.buffered.length ? this.audio.buffered.end(this.audio.buffered.length - 1) / this.audio.duration : 0;
                this.updateBar('loaded', percentage, 'width');
            });

            // audio download error: an error occurs
            this.audio.addEventListener('error', (e) => {
                this.element.getElementsByClassName('csnplayer-author')[0].innerHTML = ` - Error happens ╥﹏╥`;
                this.trigger('pause');
            });

            // audio can play: enough data is available that the media can be played
            this.audio.addEventListener('canplay', () => {
                this.trigger('canplay');
            });

            // multiple music play
            this.ended = false;
            if (this.multiple || this.hasPlayList) {
                this.audio.addEventListener('ended', () => {
                    if (this.isMobile) {
                        this.ended = true;
                        this.pause();
                        return;
                    }
                    if (this.audio.currentTime !== 0) {
                        if (this.mode === 'random') {
                            this.setMusic(this.nextRandomNum());
                        } else if (this.mode === 'single') {
                            this.setMusic(this.playIndex);
                        } else if (this.mode === 'order') {
                            if (this.playIndex < this.option.music.length - 1) {
                                this.setMusic(++this.playIndex);
                            } else {
                                this.ended = true;
                                this.pause();
                            }
                        } else if (this.mode === 'circulation') {
                            if (this.playIndex < this.option.music.length - 1) {
                                this.setMusic(++this.playIndex);
                            } else {
                                this.setMusic(0);
                            }
                        }
                    }
                    if (this.hasPlayList) {
                        this.pause();
                        this.trigger('ended');
                    }
                });
            } else {
                this.audio.addEventListener('ended', () => {
                    if (this.mode === 'order') {
                        this.ended = true;
                        this.pause();
                    }
                    if (this.hasPlayList) {
                        this.pause();
                        this.trigger('ended');
                    }
                });
            }

            // control volume
            this.audio.volume = parseInt(this.element.getElementsByClassName('csnplayer-volume')[0].style.height) / 100;

            // loop
            this.audio.loop = this.isMobile||!this.hasPlayList||!((this.hasPlayList && this.mode === 'circulation') || this.multiple || this.mode === 'order' || this.mode === 'random');

            if (this.multiple) {
                this.audios[indexMusic] = this.audio;
            }
        } else {
            this.audio = this.audios[indexMusic];
            this.audio.volume = parseInt(this.element.getElementsByClassName('csnplayer-volume')[0].style.height) / 100;
            this.audio.currentTime = 0;
        }

        /**
         * Parse lrc, suppose multiple time tag
         *
         * @param {String} lrc_s - Format:
         * [mm:ss.xx]lyric
         * [mm:ss.xxx]lyric
         * [mm:ss.xx][mm:ss.xx][mm:ss.xx]lyric
         *
         * @return {String} [[time, text], [time, text], [time, text], ...]
         */
        const parseLrc = (lrc_s) => {
            const lyric = lrc_s.split('\n');
            let lrc = [];
            const lyricLen = lyric.length;
            for (let i = 0; i < lyricLen; i++) {
                // match lrc time
                const lrcTimes = lyric[i].match(/\[(\d{2}):(\d{2})\.(\d{2,3})]/g);
                // match lrc text
                const lrcText = lyric[i].replace(/\[(\d{2}):(\d{2})\.(\d{2,3})]/g, '').replace(/^\s+|\s+$/g, '');

                if (lrcTimes != null) {
                    // handle multiple time tag
                    const timeLen = lrcTimes.length;
                    for (let j = 0; j < timeLen; j++) {
                        const oneTime = /\[(\d{2}):(\d{2})\.(\d{2,3})]/.exec(lrcTimes[j]);
                        const lrcTime = (oneTime[1]) * 60 + parseInt(oneTime[2]) + parseInt(oneTime[3]) / ((oneTime[3] + '').length === 2 ? 100 : 1000);
                        lrc.push([lrcTime, lrcText]);
                    }
                }
            }
            // sort by time
            lrc.sort((a, b) => a[0] - b[0]);
            return lrc;
        };

        // fill in lrc
        if (this.option.showlrc) {
            const index = this.multiple ? indexMusic : 0;

            if (!this.lrcs[index]) {
                let lrcs = '';
                if (this.option.showlrc === 1) {
                    if (this.multiple) {
                        lrcs = this.option.music[index].lrc;
                    } else {
                        lrcs = this.option.music.lrc;
                    }
                } else if (this.option.showlrc === 2 || this.option.showlrc === true) {
                    lrcs = this.savelrc[index];
                } else if (this.option.showlrc === 3) {
                    const xhr = new XMLHttpRequest();
                    xhr.onreadystatechange = () => {
                        if (xhr.readyState === 4) {
                            if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
                                lrcs = xhr.responseText;
                                this.lrcs[index] = parseLrc(lrcs);
                                this.lrc = this.lrcs[index];
                                let lrcHTML = '';
                                this.lrcContents = this.element.getElementsByClassName('csnplayer-lrc-contents')[0];
                                for (let i = 0; i < this.lrc.length; i++) {
                                    lrcHTML += `<p>${this.lrc[i][1]}</p>`;
                                }
                                this.lrcContents.innerHTML = lrcHTML;
                                if (!this.lrcIndex) {
                                    this.lrcIndex = 0;
                                }
                                this.lrcContents.getElementsByTagName('p')[0].classList.add('csnplayer-lrc-current');
                                this.lrcContents.style.transform = 'translateY(0px)';
                                this.lrcContents.style.webkitTransform = 'translateY(0px)';
                            } else {
                                console.log('Request was unsuccessful: ' + xhr.status);
                            }
                        }
                    };
                    let apiurl;
                    if (this.multiple) {
                        apiurl = this.option.music[index].lrc;
                    } else {
                        apiurl = this.option.music.lrc;
                    }
                    xhr.open('get', apiurl, true);
                    xhr.send(null);
                }
                if (lrcs) {
                    this.lrcs[index] = parseLrc(lrcs);
                } else {
                    this.lrcs[index] = [['00:00', 'Loading']];
                }
            }

            this.lrc = this.lrcs[index];
            let lrcHTML = '';
            this.lrcContents = this.element.getElementsByClassName('csnplayer-lrc-contents')[0];
            for (let i = 0; i < this.lrc.length; i++) {
                lrcHTML += `<p>${this.lrc[i][1]}</p>`;
            }
            this.lrcContents.innerHTML = lrcHTML;
            if (!this.lrcIndex) {
                this.lrcIndex = 0;
            }
            this.lrcContents.getElementsByTagName('p')[0].classList.add('csnplayer-lrc-current');
            this.lrcContents.style.transform = 'translateY(0px)';
            this.lrcContents.style.webkitTransform = 'translateY(0px)';
        }

        // set duration time
        if (this.audio.duration !== 1) {           // compatibility: Android browsers will output 1 at first
            this.element.getElementsByClassName('csnplayer-dtime')[0].innerHTML = this.audio.duration ? this.secondToTime(this.audio.duration) : '00:00';
        }

        // autoplay
        if (this.option.autoplay && !this.isMobile) {
            this.play();
        }
        this.option.autoplay = true;  // autoplay next music

        if (this.isMobile) {
            this.pause();
        }
    }
    /**
     * 
     * @param {type} music
     * @returns {undefined}
     */
    setSong(music) {
        this.multiple = typeof (music) == 'array' && music.length > 1;
        this.option.music = music;
        this.option = this.buildMultiSource(this.option);
        let source_html = '';
        Object.keys(this.sourcelabel).map((item, index) => {
            source_html += '<li class="' + (this.activeSource === item || Object.keys(this.sourcelabel).length === 1 ? 'active-source' : '') + '">' + item + '</li>'
        });
        this.sourcelist.innerHTML = source_html;
        this.rebindLiFunc();
        this.updateBar('played', 0, 'width');
        this.setMusic(0);
    }
    /**
     * Play music
     */
    play(time) {
        if (Object.prototype.toString.call(time) === '[object Number]') {
            this.audio.currentTime = time;
        }
        if (this.button.classList.contains('csnplayer-play')) {
            this.button.classList.remove('csnplayer-play');
            this.button.classList.add('csnplayer-pause');
            this.button.innerHTML = '';
            setTimeout(() => {
                this.button.innerHTML = `
                            <button class="csnplayer-icon csnplayer-icon-pause">`
                        + this.getSVG('pause')
                        + `     </button>`;
            }, 100);

            // pause other players (Thanks @Aprikyblue)
            if (this.option.mutex) {
                for (let i = 0; i < instances.length; i++) {
                    if (this != instances[i]) {
                        instances[i].pause();
                    }
                }
            }
            this.audio.play();
            if (this.playedTime) {
                clearInterval(this.playedTime);
            }
            this.playedTime = setInterval(() => {
                this.updateBar('played', this.audio.currentTime / this.audio.duration, 'width');
                if (this.option.showlrc) {
                    this.updateLrc();
                }
                this.ptime.innerHTML = this.secondToTime(this.audio.currentTime);
                this.trigger('playing');
            }, 100);
            this.trigger('play');
        }
    }

    /**
     * Pause music
     */
    pause() {
        if (this.button.classList.contains('csnplayer-pause') || this.ended) {
            this.ended = false;
            this.button.classList.remove('csnplayer-pause');
            this.button.classList.add('csnplayer-play');
            this.button.innerHTML = '';
            setTimeout(() => {
                this.button.innerHTML = `
                            <button class="csnplayer-icon csnplayer-icon-play">`
                        + this.getSVG('play')
                        + `     </button>`;
            }, 100);
            this.audio.pause();
            clearInterval(this.playedTime);
            this.trigger('pause');
        }
    }

    /**
     * Set volume
     */
    volume(percentage) {
        this.updateBar('volume', percentage, 'height');
        this.audio.volume = percentage;
        if (this.audio.muted) {
            this.audio.muted = false;
        }
        if (percentage === 1) {
            this.volumeicon.className = 'csnplayer-icon csnplayer-icon-volume-up';
            this.volumeicon.innerHTML = this.getSVG('volume-up');
        } else {
            this.volumeicon.className = 'csnplayer-icon csnplayer-icon-volume-down';
            this.volumeicon.innerHTML = this.getSVG('volume-down');
        }
    }

    /**
     * attach event
     */
    on(name, func) {
        if (typeof func === 'function') {
            this.event[name].push(func);
        }
    }

    /**
     * toggle between play and pause
     */
    toggle() {
        if (this.button.classList.contains('csnplayer-play')) {
            this.play();
        } else if (this.button.classList.contains('csnplayer-pause')) {
            this.pause();
        }
    }

    /**
     * get random order, using Fisher–Yates shuffle
     */
    getRandomOrder() {
        function random(min, max) {
            if (max == null) {
                max = min;
                min = 0;
            }
            return min + Math.floor(Math.random() * (max - min + 1));
        }
        function shuffle(arr) {
            var length = arr.length,
                    shuffled = new Array(length);
            for (var index = 0, rand; index < length; index++) {
                rand = random(0, index);
                if (rand !== index)
                    shuffled[index] = shuffled[rand];
                shuffled[rand] = arr[index];
            }
            return shuffled;
        }
        if (this.multiple) {
            if (!this.normalOrder) {
                this.normalOrder = [];
                for (let i = 0; i < this.option.music.length; i++) {
                    this.normalOrder[i] = i;
                }
            }
            this.randomOrder = shuffle(this.normalOrder);
        }
    }

    /**
     * get next random number
     */
    nextRandomNum() {
        if (this.multiple) {
            let index = this.randomOrder.indexOf(this.playIndex);
            if (index === this.randomOrder.length - 1) {
                return this.randomOrder[0];
            } else {
                return this.randomOrder[index + 1];
            }
        } else {
            return 0;
        }
    }
}

module.exports = CSNPlayer;