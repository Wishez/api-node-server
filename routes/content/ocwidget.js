/**
 * @file ЗАГРУЗЧИК ocWIDGET.CORE.JS - ВЫПОЛНЯЕТСЯ ПЕРВЫМ
 */

 function ocWidgetChecker() {

    window.RTC = '';
    
    window.ocWidget = {

        version: '1.7.0',

        workTimeoutID: false,

        /**
         * Объект с методами получения доступа к внутренним настройкам урл
         * @type {{get, set}}
         */
        pathConstructor: {

            init: function() {

                var paths = {
                    coreInit: 'webChat/init',
                    coreSettings: 'webChat/settings',
                    coreWebSocket: 'webChat/WebSocket',
                    cobrowsingWebsocket: 'coBrowsing/WebSocket',
                    cobrowsingTerminate: 'coBrowsing/terminate',
                    logger: 'jsErrorLogger',
                    sharing: 'sharing',
                    sharingRoom: 'room',
                    FSThumb: 'fileStorage/files/thumb',
                    FSSize: 'fileStorage/size',
                    FSUpload: 'fileStorage/fileUpload',
                    innerWidgetPath: 'ocWidget'
                },

                getDomainURL = function(protocol){
                    protocol = protocol || 'http';
                    return paths[protocol+'Protocol'] + paths.domain + '/';
                },

                isValidProtocol = function(protocol){
                    var  permissibleProtocols = ['ws://', 'wss://', 'http://', 'https://'];
                    if (~permissibleProtocols.indexOf(protocol)){
                        return true;
                    }
                    return false;
                },

                setWsProtocol = function(protocol){
                    if(isValidProtocol(protocol)){
                        paths.wsProtocol = protocol;
                        return true;
                    }
                    return false;
                },

                setHttpProtocol = function(protocol){
                    if(isValidProtocol(protocol)){
                        paths.httpProtocol = protocol;
                        return true;
                    }
                    return false;
                },

                gcoreInit = function(){
                    if(typeof paths['coreInit'] === 'undefined'){
                        console.error('ocWidget: error - coreInit path undefined');
                        return false;
                    }

                    return getDomainURL() + paths['coreInit'];
                },

                gcoreSettings = function(){
                    if(typeof paths['coreSettings'] === 'undefined'){
                        console.error('ocWidget: error - coreSettings path undefined');
                        return false;
                    }

                    return getDomainURL() + paths['coreSettings'];
                },

                gcoreWebSocket = function(){
                    if(typeof paths['coreWebSocket'] === 'undefined'){
                        console.error('ocWidget: error - coreWebSocket path undefined');
                        return false;
                    }

                    return getDomainURL('ws') + paths['coreWebSocket'];
                },

                gcobrowsingWebsocket = function(){
                    if(typeof paths['cobrowsingWebsocket'] === 'undefined'){
                        console.error('ocWidget: error - cobrowsingWebsocket path undefined');
                        return false;
                    }

                    return getDomainURL('ws') + paths['cobrowsingWebsocket'];
                },

                gcobrowsingTerminate = function(){
                    if(typeof paths['cobrowsingTerminate'] === 'undefined'){
                        console.error('ocWidget: error - cobrowsingTerminate path undefined');
                        return false;
                    }

                    return getDomainURL() + paths['cobrowsingTerminate'];
                },

                glogger = function(){
                    if(typeof paths['logger'] === 'undefined'){
                        console.error('ocWidget: error - logger path undefined');
                        return false;
                    }
                    return getDomainURL() + paths['logger'];
                },

                gsharing = function(room){
                    if(typeof paths['sharing'] === 'undefined'){
                        console.error('ocWidget: error - sharing path undefined');
                        return false;
                    }

                    var path = getDomainURL() + paths['sharing'];
                    if(room){
                        path += '/' + paths['sharingRoom'];
                    }
                    return path;
                },

                gfileStorage = function(action){
                    if(action && action.length){
                        var tempArray = action.toLocaleLowerCase().split('');
                        tempArray[0] = tempArray[0].toLocaleUpperCase();
                        action = tempArray.join('');
                    }

                    if(typeof paths['FS' + action] === 'undefined'){
                        console.error('ocWidget: error - fileStorage path undefined');
                        return false;
                    }

                    return getDomainURL() + paths['FS' + action] + '/';
                },

                ginnerWidgetPath = function(){
                    return paths['innerWidgetPath'];
                },

                gwidgetRoot = function(){
                    return getDomainURL() + paths['widgetPath'];
                },

                swidgetRoot = function(widgetRoot){
                    var regexpURL = /(http[s]?:\/\/)?([-ёa-яa-z0-9_.]{2,256}(\.[-ёa-яa-z0-9_]{2,8})?(:[0-9]{2,5})?)\/([-ёa-яa-z0-9_/]*)?/i;
                    var resultURL = regexpURL.exec(widgetRoot);

                    if(resultURL){
                        setHttpProtocol(resultURL[1]);
                        setWsProtocol((resultURL[1] == 'https://' ? 'wss' : 'ws') + '://');
                        paths.domain = resultURL [2];

                        paths.widgetPath = '';
                        if(resultURL[5]) {
                            paths.widgetPath = resultURL[5].split('/').filter(function(element){if (element !== ''){return element}}).join('/') + '/';
                        }

                        return {
                            domain: paths.domain,
                            widgetPath: paths.widgetPath,
                            httpProtocol: paths.httpProtocol,
                            wsProtocol: paths.wsProtocol
                        };
                    }
                    return false;
                }

                return {
                    getCoreInitPath: gcoreInit,
    
                    getCoreSettingsPath: gcoreSettings,
    
                    getCoreWebSocketPath: gcoreWebSocket,
    
                    getCobrowsingTerminatePath: gcobrowsingTerminate,
    
                    getCobrowsingWebsocketPath: gcobrowsingWebsocket,
    
                    getLoggerPath: glogger,
    
                    getSharingPath: gsharing,
    
                    getFileStoragePath: gfileStorage,
    
                    getInnerWidgetPath: ginnerWidgetPath,
    
                    getWidgetRootPath: gwidgetRoot,
    
                    setWidgetRootPath: swidgetRoot
                }
            }

        },

        /**
         * Метод для совместимости с кодом встраивания старой версии
         * преобразует устаревшие опции к новыму виду
         *
         * ocWidget_messengerType -> options.channel_id
         * options.auth.name -> options.auth.full_name
         * options.group_id -> options.auth.group_id
         * options.channel_id -> options.channelId
         * options.project_id -> options.projectId
         * options.projectId === undefined -> options.projectId === 1
         *
         * @param {Object} options - опции из кода встраивания
         * @param {String} channelId - передан глобальный ocWidget_messengerType (является устаревшим)
         * @returns {*} - преобразованный объект с опциями
         */
        combinationOldNewInitOptions: function(options, channelId) {

            options = options || {};
            options.auth = options.auth || {};

            /**
             * channelId
             */
            if(options.channel_id){
                options.channelId = options.channel_id;
                delete options.channel_id;
            }
            if(channelId){
                options.channelId = channelId;
            }

            if(!options.channelId) {
                // TODO: logging if undefined options.channelId
                console.error('ocWidget: error - undefined channelId');
                return false;
            }

            /**
             * projectId
             */
            if(!options.project_id) {
                options.projectId = 1;
            } else {
                options.projectId = options.project_id;
                delete options.project_id;
            }

            /**
             * group_id
             */
            if(options.group_id) {
                options.auth.group_id = options.group_id;
                delete options.group_id;
            }

            /**
             * full_name
             */
            if(typeof options.auth.name !== 'undefined') {
                options.auth.full_name = options.auth.name;
                delete options.auth.name;
            }

            return options;
        },

        /**
         * Получение настроек из ARM
         * @namespace
         * @type {Object}
         */
        getSettings: {

            is: {done: false},

            /**
             * Ссылки альтернативных каналов
             * к которым быдет потом добавлен external_id из settings
             */
            alternativeChannelsLinks: {
                "vk": "https://vk.com/im?sel=",
                "telegram": "https://telegram.me/",
                "viber": "https://www.viber.com/",
                "fb": "https://www.facebook.com/"
            },

            /**
             * Настройки экранов с пречатполями
             * экраны: 
             *  - primary - первоначальный экран (авторизация не пройдена)
             *  - secondary - экран повторного обращения (авторизация пройдена)
             *  - offline - экран при отсутствии агентов в выбранной группе
             * 
             * list - типы полей пречатов
             * параметры полей:
             *  - name - имя поля указывается в атрибут name у поля
             *  - checkOffline - флаг включения логики проверки операторов онлайн по изменению значения этого поля
             *  - action - имя метода, будет находиться в ocWidget.chat.auth.prechats.actions,
             *           вызывается пока что только для поля select на событие onchange
             *  - type - проверяемый тип, по которому выводится шаблон поля
             */
            prechats: {
                list: {
                    skillId: {
                        name: "skillId",
                        checkOffline: 1,
                        action: "checkAvaliableOperatorInGroup",
                        type: "select"
                    },
                    fullName: {
                        name: "fullName",
                        type: "text"
                    },
                    phone: {
                        name: "phone",
                        type: "phone"
                    },
                    message: {
                        name: "message",
                        type: "textarea"
                    }
                },
                primary:    ["skillId", "fullName", "phone", "message"],
                secondary:  ["skillId", "message"],
                offline:    ["skillId"]
            },

            /**
             * Метод осуществляет глубокое слияние объектов
             * @param {Object} target - объект, куда будет вливаться другой объект
             * @param {Object} source - вливаемый объект
             * @returns {Object|false} - объект-результат глубокого слияния или false
             */
            deepMerge: function(target, source) {
                if(typeof target !== 'object' || typeof source !== 'object') return false;
                for(var prop in source) {
                    if(!source.hasOwnProperty(prop)) continue;
                    if(prop in target) {
                        if(typeof target[prop] !== 'object') {
                            target[prop] = source[prop];
                        } else {
                            if(typeof source[prop] !== 'object') {
                                target[prop] = source[prop];
                            } else {
                                if(target[prop].concat && source[prop].concat) {
                                    target[prop] = target[prop].concat(source[prop]);
                                } else {
                                    target[prop] = this.deepMerge(target[prop], source[prop]);
                                }
                            }
                        }
                } else {
                    target[prop] = source[prop];
                }
            }
            return target;
            },

            /**
             * Отправка запроса
             * @param  {boolean}  again    - выполняется ли повторно?
             * @param  {Function} callback - коллбек прокидывающийся из ocWidget.init и возвращающийся обратно
             * @return {void}
             */
            get: function () {
                if (ocWidget.options) { // Todo: проверка необходимых параметров для запуска с тестами
                    getData({
                        url: ocWidget.pathConstructor.getCoreSettingsPath(),
                        type: 'POST',
                        dataType: 'JSON',
                        data: {
                            project_id: ocWidget.options.projectId,
                            messengerType: ocWidget.options.channelId
                        },
                        success: function (r, rdate) {
                            window.ocWidgetServerDate = new Date(rdate);
                            if (r.errors === undefined && Object.keys(r).length) {
                                ocWidget.options.alternativeChannels = ocWidget.getSettings.alternativeChannelsLinks;
                                ocWidget.options.behaviour.prechats = ocWidget.getSettings.prechats;
                                ocWidget.options = ocWidget.getSettings.deepMerge(ocWidget.options, r);
                                ocWidget.getSettings.settings.init(ocWidget.options); 
                            }
                            if (!ocWidget.options.behaviour.isEnabled) {
                                console.log('ocWidget: switched off');
                                return false;
                            }
                            ocWidget.getSettings.skip();
                        },
                        error: ocWidget.getSettings.get
                    });
                } else {
                    var errorText = "ocWidget: error - ocWidget.options undefined; ocWidget was not started";
                    console.error(errorText);
                    ocWidget.JSlogging.write(errorText);
                }

                function getData(params) {
                    var request = new XMLHttpRequest();
                    request.open(params.type, params.url, true);
                    request.onload = function () {
                        if (request.status >= 200 && request.status < 400) {
                            params.data.status = 'SUCCESS';
                            var response = request.responseText ? JSON.parse(request.responseText) : '';
                            params.success(response, request.getResponseHeader('Date'));
                        } else params.data.status = 'ERROR';
                    };
                    if (params.type === 'POST') {
                        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
                        var data = '', key;
                        for (key in params.data) {
                            if(params.data.hasOwnProperty(key)) {
                                data += key + '=' + params.data[key] + '&';
                            }
                        }
                        request.send(data);
                    } else {
                        request.send();
                    }
                }
            },

            /**
             * Получения json с локализацией виджета
             * @param {*} callback - цункция вызываемая после получения данных локализации
             */
            getLocale: function(callback){
                var localePath = 'src/localization/' + ocWidget.options.behaviour.locale.language + '.json';
                var xhr = new XMLHttpRequest();
                xhr.open('GET', ocWidget.pathConstructor.getWidgetRootPath() + localePath, true);
                xhr.onreadystatechange = function () {
                    if (this.readyState === 4 && this.status !== 404) {
                        ocWidget.locale = JSON.parse(this.responseText);
                        callback();
                    }
                };
                xhr.send();
            },

            /**
             * Выполняется после запроса настроек
             * @param  {boolean}   again    - выполняется ли повторно?
             * @param  {Function} callback - коллбек прокидывающийся из ocWidget.init и возвращающийся обратно
             * @return {void}
             */
            skip: function () {

                ocWidget.getSettings.is.done = true;

                if( support() ) {
                    ocWidgetStart();
                } else {
                    console.log('ocWidget: unsupported browser or time');
                }

                function support() {
                    var sup = {
                        browser: isOldBrowser(),
                        time: ocWidget.getSettings.doNotDisplay()
                    };

                    /**
                     * Проверка старый ли браузер на основе userAgent
                     */
                    function isOldBrowser() {
                        var ua = window.navigator.userAgent,
                            version,
                            // REGEXPs
                            versionReg = new RegExp('version\/(\\d+(\\.\\d+)?)', 'i'),
                            ieReg = new RegExp('(?:msie|rv:)[\\s\/]?(\\d+(\\.\\d+)?)', 'i'),
                            operaReg = new RegExp('(?:opera|opr)[\\s\/](\\d+(\\.\\d+)?)', 'i'),
                            chromeReg = new RegExp('(?:chrome)[\\s\/](\\d+(\\.\\d+)?)', 'i'),
                            mozillaReg = new RegExp('(?:firefox)[\\s\/](\\d+(\\.\\d+)?)', 'i'),
                            safariReg = new RegExp('(?:AppleWebKit)[\\s\/](\\d+(\\.\\d+)?)', 'i');

                        function getFirstMatch(regex) {
                            var match = ua.match(regex);
                            return (match && match.length > 1 && match[1]) || '';
                        }

                        var versionIdentifier = getFirstMatch(versionReg);

                        if (/msie|trident/i.test(ua)) {
                            ocWidget.options.settings.browser = 'msie';
                            return (getFirstMatch(ieReg) < 10 || document.compatMode !== 'CSS1Compat');
                        }

                        if (/opera|opr/i.test(ua)) {
                            ocWidget.options.settings.browser = 'opera';
                            version = versionIdentifier || getFirstMatch(operaReg);
                            if(version) {
                                return version < 43;
                            }
                        }

                        if (/chrome/i.test(ua)) {
                            ocWidget.options.settings.browser = 'chrome';
                            version = versionIdentifier || getFirstMatch(chromeReg);
                            if (version) {
                                return version < 36;
                            }
                        }

                        if (/safari/i.test(ua)) {
                            ocWidget.options.settings.browser = 'safari';
                            version = versionIdentifier || getFirstMatch(safariReg);
                            if(version) {
                                return version < 7;
                            }
                        }

                        if (/mozilla|firefox/i.test(ua)) {
                            ocWidget.options.settings.browser = 'mozilla';
                            version = versionIdentifier || getFirstMatch(mozillaReg);
                            if(version) {
                                return version < 31;
                            }
                        }

                        return false;
                    }

                    /**
                     * Установка таймера выключения виджета по окончанию его срока работы
                     */
                    function destroyTimer() {
                        var time_from = window.ocWidgetServerDate,
                            time_to = new Date( window.ocWidgetServerDate.getUTCFullYear(),
                                window.ocWidgetServerDate.getUTCMonth(),
                                window.ocWidgetServerDate.getUTCDate(),
                                ocWidget.options.behaviour.schedule.to + 1 // +1 - включение последнего часа работы виджета
                            ),
                            time_left = Math.abs(time_to - time_from);

                        window.ocWidget.workTimeoutID = setTimeout(function(){
                            // destroy только если бар отображен (чат закрыт)
                            if(ocWidget.bar.is.opened){
                                ocWidget.destroy();
                            }
                        }, time_left);

                    }

                    if(!sup.browser && !sup.time) {
                        // если есть перерыв в работе виджета запускаем таймер на destroy
                        if(ocWidget.options.behaviour.schedule.to + 1 - ocWidget.options.behaviour.schedule.from < 24) {
                            destroyTimer();
                        }
                        return true;
                    } else {
                        return false;
                    }

                }

                function ocWidgetStart() {
                    JSlogging();

                    var head = document.getElementsByTagName('head')[0],
                        commonjs = document.createElement('script');

                    commonjs.src = ocWidget.pathConstructor.getWidgetRootPath() + 'src/js/common.js?ver=' + window.ocWidget.version;
                    head.appendChild(commonjs);

                    // СИНХРОННАЯ ЗАГРУЗКА
                    commonjs.onload = function () {

                        if(!ocWidget.options.behaviour.cobrowsing.isEnabled) {
                            loadWidget();
                        } else {
                            loadCobrowing();
                        }

                        function loadCobrowing() {
                            var cobrowsingJs = document.createElement('script');
                            cobrowsingJs.src = ocWidget.pathConstructor.getWidgetRootPath() + 'src/js/ocWidget.cobrowsing.js?ver=' + window.ocWidget.version;
                            head.appendChild(cobrowsingJs);

                            cobrowsingJs.onload = function() {
                                if(!ocCobrowsing.init()) {
                                    loadWidget();
                                }
                            }
                        }

                        function loadWidget() {
                            if (ocWidget.options.behaviour.locale.language) { // Todo: проверка наличия параметра языка
                                ocWidget.getSettings.getLocale(CascadedLoading);
                            } else {
                                var errorText = "ocWidget: error - language parameter undefined; ocWidget was not started";
                                console.error(errorText);
                                ocWidget.JSlogging.write(errorText);
                            }

                            function CascadedLoading(){
                                loadScript('ocWidget.core.js', function() {
                                    loadScript('ocWidget.tpls.js', function() {
                                        loadScript('ocWidget.dragndrop.js', function() {
                                            loadScript('ocWidget.websocket.js', function() {
                                                loadScript('ocWidget.tools.js', function() {
                                                    loadScript('ocWidget.emoji.js', function() {
                                                        loadScript('ocWidget.storage.js', function() {
                                                            loadScript('ocWidget.bar.js', function() {
                                                                loadScript('ocWidget.chat.js', ocWidget.init.start);
                                                            });
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            } 

                            function loadScript(script, callback) {
                                var code = document.createElement('script');
                                code.src = ocWidget.pathConstructor.getWidgetRootPath() + 'src/js/' + script + '?ver=' + window.ocWidget.version;
                                head.appendChild(code);

                                code.onload = function () {
                                    callback();
                                };
                            }
                        }
                    };
                }

                function JSlogging() {
                    window.addEventListener('error', ocWidget.JSlogging.write);
                }
            },

            /**
             * Проверка времени отображения виджета
             * @returns {boolean}
             */
            doNotDisplay: function() {
                var timezone = ocWidget.options.behaviour.schedule.timeZone || 3,
                    hours = (window.ocWidgetServerDate.getUTCHours() + timezone) % 24;
                if (hours >= ocWidget.options.behaviour.schedule.from &&
                    hours < ocWidget.options.behaviour.schedule.to) {
                    return false;
                }
                return true;
            },

            /**
             * Сохранение настроек с сервера
             */
            settings: {
                /**
                 * Вызов методов обработки входящих данных с сервера
                 * @param data
                 */
                init: function(configs) {

                    this.saveChannels(configs);

                    if(this.skills.hasFieldInScreens()) {
                        var skillsValid = this.skills.isValid(configs.channels.skills);
                        if(skillsValid){
                            this.skills.setFieldOptions(skillsValid);
                        } else {
                            this.skills.deleteFieldFromScreens();
                        }
                    }
                },

                /**
                 * Запись настроек списка каналов
                 * @param {Object} configs - объект со всеми настройками виджета
                 */
                saveChannels: function(configs) {
                    if(!configs.channels.all || !configs.channels.skills) return;
                    var channels = [];
                    for(var skillGroup in configs.channels.skills) {
                        if(configs.channels.skills.hasOwnProperty(skillGroup) && configs.channels.skills[skillGroup].alias) {
                            configs.channels.skills[skillGroup].channels.forEach(function(channelId) {
                                configs.channels.all.forEach(function(channel, index) {
                                    if(channel.id === channelId) {
                                        channels.push(channel);
                                        configs.channels.all.splice(index, 1);
                                    }
                                });
                            });
                        }
                    }
                    if(channels){
                        configs.channels.list = channels;
                    }
                },

                /**
                 * Запись настроек псевдонимов групп (пречатполе) из данных ответа settings
                 */
                skills: {

                    /**
                     * Имя поля в config.json
                     */
                    fieldName: 'skillId',

                    /**
                     * Сохранение в настройках данных псевдонима групп
                     * @param data
                     */
                    setFieldOptions: function(data){
                        for(var i in ocWidget.options.behaviour.prechats.list){
                            if(ocWidget.options.behaviour.prechats.list.hasOwnProperty(i)) {
                                if(i === this.fieldName){
                                    ocWidget.options.behaviour.prechats.list[i].values = data;
                                    break;
                                }
                            }
                        }
                    },

                    /**
                     * Проверка на наличие пречатполя псевдонима групп в одном из экранов пречатполей
                     * @returns {*|number|Number}
                     */
                    hasFieldInScreens: function(){
                        return ~ocWidget.options.behaviour.prechats.primary.indexOf(this.fieldName) || ~ocWidget.options.behaviour.prechats.secondary.indexOf(this.fieldName);
                    },

                    /**
                     * Удаление поля псевдонимов полей из списка полей
                     * для экранов с пречат полями (primary и secondary)
                     */
                    deleteFieldFromScreens: function(){
                        var screens = ocWidget.options.behaviour.prechats;
                        screens.primary.splice(screens.primary.indexOf(this.fieldName), 1);
                        screens.secondary.splice(screens.secondary.indexOf(this.fieldName), 1);
                        screens.list[this.fieldName].isNecessary = false;
                    },

                    /**
                     * Проверка элемента, является ли он объектом
                     * @param el
                     * @returns {boolean|Number}
                     */
                    isObject: function(el){
                        return typeof el == 'object' && !el.length && Object.keys(el).length;
                    },

                    /**
                     * Преобразование объекта в массив, отбрасывая ключи
                     * @param obj
                     * @returns {Array|false}
                     */
                    objectToArray: function(obj) {
                        var newArr = [];
                        for(var i in obj) {
                            if(obj.hasOwnProperty(i)) {
                                newArr.push(obj[i]);
                            } 
                        }
                        if(!newArr.length) {
                            return false;
                        }
                        return newArr;
                    },

                    /**
                     * Валидация входящих данных
                     * @param obj
                     * @returns {Array|false}
                     */
                    isValid: function(obj) {
                        if(!obj || typeof obj !== 'object'){
                            return false;
                        }
                        for(var i in obj) {
                            if(obj.hasOwnProperty(i)) {
                                if(!obj[i].alias) delete obj[i];
                            }
                        }
                        if(!obj.length){
                            obj = this.objectToArray(obj);
                        }
                        return obj;
                    }
                }
            }
        },

        // ЛОГИРОВАНИЕ JS
        JSlogging: {
            log: '',
            write: function(logData) {
                var data = logData.error ? logData.error.stack : logData,
                    message = '  ';

                if (/(ocWidget|ocCobrowsing)/i.test(data) || data.action) {
                    if (typeof data === 'object') {
                        for (var key in data) {
                            if(data.hasOwnProperty(key)) {
                                message += key + ': ' + data[key] + '  ';
                            }
                        }
                    }

                    data = message || data;
                    if(this.log === data) return;
                    this.log = data;

                    var xhr = new XMLHttpRequest();
                    var body = 'info=' + data;
                    xhr.open("POST", ocWidget.pathConstructor.getLoggerPath(), true);
                    xhr.onload = xhr.onerror = function () {
                        if (this.status == 200) {
                            var resp = xhr.responseText;
                            if (resp.errors === undefined) {
                                if (ocWidget.options.behaviour.debug)
                                    console.log('ocWidget: JS log has been successfully saved.');
                            } else {
                                console.log('ocWidget.log ' + resp.errors);
                            }
                        } else {
                            console.log("ocWidget.log: error " + this.status);
                        }
                    };

                    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
                    xhr.send(body);
                }
            }
        },

        LOADER: function (ocWidgetOptions) {
            ocWidget.pathConstructor = ocWidget.pathConstructor.init();
            ocWidget.options = ocWidget.combinationOldNewInitOptions(ocWidgetOptions, window.ocWidget_messengerType);
            if(ocWidget.options === false) return;
            var widgetIitiationScript = document.querySelector('script[src*="/ocwidget.js"]').getAttribute('src');
            var regexpPath = new RegExp('(' + ocWidget.pathConstructor.getInnerWidgetPath() + '.*)?ocwidget\.js', 'i');
            ocWidget.pathConstructor.setWidgetRootPath(widgetIitiationScript.split(regexpPath)[0]);
            ocWidget.options.behaviour = {};
            ocWidget.options.behaviour.mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            ocWidget.pathConstructor.setWidgetRootPath(ocWidget.pathConstructor.getWidgetRootPath() + ocWidget.pathConstructor.getInnerWidgetPath() + '/');
            ocWidget.options.settings = {};
            ocWidget.getSettings.get();
        }

    };

    ocWidget.LOADER(window.ocWidgetOptions || window._ocwidget_opt);
 };


if (typeof window !== 'undefined') {

    // TODO: logging undefined ocWidgetOptions || window._ocwidget_opt
    // TODO: logging undefined ocWidget_messengerType || channel_id
    if(typeof ocWidget === 'undefined') {
        ocWidgetChecker();
    }
    
} else {

    /**
     * add methods to test
     * @type {{
     *           combinationOldNewInitOptions: ocWidget.combinationOldNewInitOptions,
     *           ocWidget.pathConstructor: ocWidget.pathConstructor
     * }}
     */
    module.exports = {
        combinationOldNewInitOptions: ocWidget.combinationOldNewInitOptions,
        pathConstructor: ocWidget.pathConstructor.init()
    }

}