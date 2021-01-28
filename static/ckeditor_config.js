CKEDITOR.editorConfig = function(config, shouldSetToolbarWithoutTimeout) {
  // http://docs.ckeditor.com/#!/api/CKEDITOR.config
  config.language = 'ru';
  config.allowedContent = true;
  config.extraPlugins = 'htmlbuttons,toolbar'
  config.removePlugins = 'find';
  config.entities = false;
  config.resize_enabled = false;
  config.autoGrow_maxHeight = 850;
  const toolbar = [
    { name: 'document', items: ['Source'] },
    { name: 'clipboard', items: ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo', 'Anchor'] },
    { name: 'links', items: ['Link', 'Unlink', 'Anchor'] },
    { name: 'insert', items: ['Image', 'Table', 'HorizontalRule', 'SpecialChar', 'Iframe'] },
    {name: 'tools', items: ['Maximize']},
    '/',
    { name: 'basicstyles', items: ['Bold', 'Italic', 'Strike', '-', 'RemoveFormat'] },
    { name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', 'Blockquote'] },
    { name: 'styles', items: ['Format'] },
    '/',
    { name: 'journal-items', items: ['Quote-full-screen', 'Quote-Text', 'Text-Quote', '-', 'Image-full-width', 'Image-Text', 'Text-Image'] },
  ]
  if (shouldSetToolbarWithoutTimeout) config.toolbar = toolbar
  else setTimeout(() => config.toolbar = toolbar, 0);
  config.htmlbuttons = [{
      name: 'Quote-full-screen',
      icon: 'quote.svg',
      html: `<div class="quote-full-screen" style="width:100%; height:auto;">
              <blockquote class="quote-block">
                <h2 class="quote-block__title"> </h2>
              </blockquote>
            </div>`,
      title: 'Цитата на всю ширину'
    },
    {
      name: 'Quote-Text',
      icon: 'arrow-left.svg',
      html: `<div class="quote-text-block" style="display:flex;align-items:center;width:100%; height:auto;">
                <div class="quote-text-block__left-block" style="width:50%;">
                  <blockquote class="quote-block">
                    <h2 class="quote-block__title" style="margin:0;"> </h2>
                  </blockquote>
                </div>
                <div class="quote-text-block__right-block" style="width:50%;">
                  <p class="right-block__text"> </p>
                </div>
              </div>`,
      title: 'Цитата слева, текст справа'
    },
    {
      name: 'Text-Quote',
      icon: 'arrow-right.svg',
      html: `<div class="text-quote-block" style="display:flex;align-items:center;width:100%; height:auto;">
                <div class="text-quote-block__left-block" style="width:50%;">
                  <p class="left-block__text"> </p>
                </div>
                <div class="quote-text-block__right-block" style="width:50%;">
                  <blockquote class="quote-block">
                    <h2 class="quote-block__title" style="margin:0;"> </h2>
                  </blockquote>
                </div>
              </div>`,
      title: 'Цитата справа, текст слева'
    },
    {
      name: 'Image-full-width',
      icon: 'image.svg',
      html: `<div class="image-full-width" style="display:flex;align-items:center;width:100%; height:auto;">
            <p class="image-full-width__image-container" style="text-align:center;width:100%;">
              <img class="image-full-width__image" src="http://via.placeholder.com/400x200" />
            </>
        </div>`,
      title: 'Изображение на всю ширину'
    },
    {
      name: 'Image-Text',
      icon: 'arrow-left.svg',
      html: `<div class="image-text-block" style="display:flex;align-items:flex-start;width:100%; height:auto;">
                <div class="image-text-block__left-block" style="width:50%; overflow:hidden;">
                  <img class="left-block__image" src="http://via.placeholder.com/200x200" />
                </div>
                <div class="image-text-block__right-block" style="width:50%;">
                  <p class="image-block__text"> </p>
                </div>
              </div>`,
      title: 'Изображение слева, текст справа'
    },
    {
      name: 'Text-Image',
      icon: 'arrow-right.svg',
      html: `<div class="text-image-block" style="display:flex;align-items:flex-start;width:100%; height:auto;">
                <div class="text-image-block__left-block" style="width:50%;">
                  <p class="image-block__text"> </p>
                </div>
                <div class="text-image-block__right-block" style="width:50%; overflow:hidden;">
                  <img class="right-block__image" src="http://via.placeholder.com/200x200" />
                </div>
              </div>`,
      title: 'Изображение справа, текст слева'
    },
  ]

  window.CustomButtons.init()
};

// https://github.com/github/details-dialog-element
const CLOSE_ATTR="data-close-dialog",CLOSE_SELECTOR=`[${CLOSE_ATTR}]`;function autofocus(e){let t=Array.from(e.querySelectorAll("[autofocus]")).filter(focusable)[0];t||(t=e,e.setAttribute("tabindex","-1")),t.focus()}function keydown(e){const t=e.currentTarget;t instanceof Element&&("Escape"===e.key||"Esc"===e.key?(toggleDetails(t,!1),e.stopPropagation()):"Tab"===e.key&&restrictTabBehavior(e))}function focusable(e){return e.tabIndex>=0&&!e.disabled&&visible(e)}function visible(e){return!e.hidden&&(!e.type||"hidden"!==e.type)&&(e.offsetWidth>0||e.offsetHeight>0)}function restrictTabBehavior(e){if(!(e.currentTarget instanceof Element))return;const t=e.currentTarget.querySelector("details-dialog");if(!t)return;e.preventDefault();const n=Array.from(t.querySelectorAll("*")).filter(focusable);if(0===n.length)return;const i=e.shiftKey?-1:1,o=t.getRootNode(),r=t.contains(o.activeElement)?o.activeElement:null;let s=-1===i?-1:0;if(r instanceof HTMLElement){const e=n.indexOf(r);-1!==e&&(s=e+i)}s<0?s=n.length-1:s%=n.length,n[s].focus()}function allowClosingDialog(e){const t=e.querySelector("details-dialog");return!(t instanceof DetailsDialogElement)||t.dispatchEvent(new CustomEvent("details-dialog-close",{bubbles:!0,cancelable:!0}))}function onSummaryClick(e){if(!(e.currentTarget instanceof Element))return;const t=e.currentTarget.closest("details");t&&t.hasAttribute("open")&&(allowClosingDialog(t)||(e.preventDefault(),e.stopPropagation()))}function toggle(e){const t=e.currentTarget;if(!(t instanceof Element))return;const n=t.querySelector("details-dialog");if(n instanceof DetailsDialogElement)if(t.hasAttribute("open")){const e="getRootNode"in n?n.getRootNode():document;e.activeElement instanceof HTMLElement&&initialized.set(n,{details:t,activeElement:e.activeElement}),autofocus(n),t.addEventListener("keydown",keydown)}else{for(const e of n.querySelectorAll("form"))e.reset();const e=findFocusElement(t,n);e&&e.focus(),t.removeEventListener("keydown",keydown)}}function findFocusElement(e,t){const n=initialized.get(t);return n&&n.activeElement instanceof HTMLElement?n.activeElement:e.querySelector("summary")}function toggleDetails(e,t){t!==e.hasAttribute("open")&&(t?e.setAttribute("open",""):allowClosingDialog(e)&&e.removeAttribute("open"))}function loadIncludeFragment(e){const t=e.currentTarget;if(!(t instanceof Element))return;const n=t.querySelector("details-dialog");if(!(n instanceof DetailsDialogElement))return;const i=n.querySelector("include-fragment:not([src])");if(!i)return;const o=n.src;null!==o&&(i.addEventListener("loadend",()=>{t.hasAttribute("open")&&autofocus(n)}),i.setAttribute("src",o),removeIncludeFragmentEventListeners(t))}function updateIncludeFragmentEventListeners(e,t,n){removeIncludeFragmentEventListeners(e),t&&e.addEventListener("toggle",loadIncludeFragment,{once:!0}),t&&n&&e.addEventListener("mouseover",loadIncludeFragment,{once:!0})}function removeIncludeFragmentEventListeners(e){e.removeEventListener("toggle",loadIncludeFragment),e.removeEventListener("mouseover",loadIncludeFragment)}const initialized=new WeakMap;class DetailsDialogElement extends HTMLElement{static get CLOSE_ATTR(){return CLOSE_ATTR}static get CLOSE_SELECTOR(){return CLOSE_SELECTOR}constructor(){super(),initialized.set(this,{details:null,activeElement:null}),this.addEventListener("click",function({target:e}){if(!(e instanceof Element))return;const t=e.closest("details");t&&e.closest(CLOSE_SELECTOR)&&toggleDetails(t,!1)})}get src(){return this.getAttribute("src")}set src(e){this.setAttribute("src",e||"")}get preload(){return this.hasAttribute("preload")}set preload(e){e?this.setAttribute("preload",""):this.removeAttribute("preload")}connectedCallback(){this.setAttribute("role","dialog"),this.setAttribute("aria-modal","true");const e=initialized.get(this);if(!e)return;const t=this.parentElement;if(!t)return;const n=t.querySelector("summary");n&&(n.hasAttribute("role")||n.setAttribute("role","button"),n.addEventListener("click",onSummaryClick,{capture:!0})),t.addEventListener("toggle",toggle),e.details=t,updateIncludeFragmentEventListeners(t,this.src,this.preload)}disconnectedCallback(){const e=initialized.get(this);if(!e)return;const{details:t}=e;if(!t)return;t.removeEventListener("toggle",toggle),removeIncludeFragmentEventListeners(t);const n=t.querySelector("summary");n&&n.removeEventListener("click",onSummaryClick,{capture:!0}),e.details=null}toggle(e){const t=initialized.get(this);if(!t)return;const{details:n}=t;n&&toggleDetails(n,e)}static get observedAttributes(){return["src","preload"]}attributeChangedCallback(){const e=initialized.get(this);if(!e)return;const{details:t}=e;t&&updateIncludeFragmentEventListeners(t,this.src,this.preload)}}window.customElements.get("details-dialog")||(window.DetailsDialogElement=DetailsDialogElement,window.customElements.define("details-dialog",DetailsDialogElement));

const formSectionTools = (function() {
  const rootSectionClass = 'formSection'
  const getSectionModifierClass = (sectionName) => `${rootSectionClass}--${sectionName}`
  const getSectionCompleteClass = (sectionName) => `${rootSectionClass} ${getSectionModifierClass(sectionName)}`

  const hideAllSections = ($form) => {
    const $allSections = $form.getElementsByClassName(rootSectionClass)
    Array.from($allSections).forEach((section) => {
      section.style.display = ''
    })
  }

  const showSelectedSections = ($form, sectionName) => {
    const $selectedSections = $form.getElementsByClassName(getSectionModifierClass(sectionName))
    Array.from($selectedSections).forEach((section) => {
      section.style.display = 'block'
    })
  }

  const selectSectionFieldName = 'sectionName'
  const getSectionFieldName = (sectionName, fieldName) => `${sectionName}_${fieldName}`

  return { getSectionCompleteClass, hideAllSections, showSelectedSections, selectSectionFieldName, getSectionFieldName }
}())

const loadFile = (function() {
  const _loadFile = (filePath, headers) =>
    new Promise((resolve, reject) => {
      var request = new XMLHttpRequest();

      request.open('GET', filePath, false);
      request.onreadystatechange = () => {
        const { readyState, status, response } = request
        if (readyState != 4) return;

        if (status != 200) {
          reject()
        } else {
          resolve(response)
        }
      }

      _setHeaders(request, headers)
      request.send()
    })

  function _setHeaders(request, headers = {}) {
    for (const key in headers) {
      request.setRequestHeader(key, headers[key])
    }
  }
  return _loadFile
}());

const Selectors = {
  BUTTONS_CONTAINER: '#buttonBar',
  EDITOR: '.cke_inner',
  PANEL: '.cke_toolbox',
  CONTENT_SOURCE: '.cke_editable',
  CONTENT_SOURCE_IFRAME: '.cke_wysiwyg_frame',
  BUNTTONS_CONTAINER: '.cke_top',
  CUSTOM_BUTTON: '.dialogHolder__button',
}

// https://codepen.io/ShiningFinger/pen/PLGYBp?editors=0110
const Popup = (function() {
  let shouldAskToCloseDialog = true
  document.addEventListener('details-dialog-close', (event) => {
    if (shouldAskToCloseDialog && !confirm('Вы уверены?')) {
      event.preventDefault()
    }
  })

  const TEMPLATE = `
    <details class="dialogHolder" id="{{popupId}}">
      <summary class="${Selectors.CUSTOM_BUTTON.slice(1)}">
        {{buttonName}}
      </summary>

      <details-dialog class="customDialog">
        <section class="customDialog__content">{{content}}</section>
        <button class="customDialog__closeButton" type="button" data-close-dialog>Закрыть</button>
      </details-dialog>
    </details>
  `

  const tryToBindDialogQuantity = {}
  let radioButtonNamePostfix = 0
  const createDialog = (selector, dialogConfig, submitConfig) => {
    const nodes = document.querySelectorAll(selector)
    const bindQuantity = tryToBindDialogQuantity[dialogConfig.formId] || 0
    if (bindQuantity >= 4) return
    if (!nodes.length) {
      setTimeout(() => createDialog(selector, dialogConfig, submitConfig), 3e3)
      tryToBindDialogQuantity[dialogConfig.formId] = bindQuantity + 1
      return
    }

    const dialogHtml = _getDialogHtml(dialogConfig)
    const radioButtonNames = ['contentType', 'direction', 'headingWeight']
    nodes.forEach($node => {
      let resultDialogHtml = dialogHtml
      radioButtonNames.forEach((radioButtonName) => {
        resultDialogHtml = resultDialogHtml
          .replace(
            new RegExp(`name=${radioButtonName}`, 'g'),
            `name=${radioButtonName}_${radioButtonNamePostfix}`
          )
          .replace(
            new RegExp(`(id|for|aria\-labelledby)=${radioButtonName}(Input|Label)_[0-9]+`, 'gi'),
            (matchedText) => `${matchedText}_${radioButtonNamePostfix}`,
          )
      })

      $node.insertAdjacentHTML('beforeend', resultDialogHtml)
      radioButtonNamePostfix += 1
    })
    if (submitConfig) {
      _addMousedownListener(submitConfig)
      _addSubmitListener(submitConfig)
      _addSelectSectionListener(submitConfig)
    }
    document.querySelectorAll(Selectors.CUSTOM_BUTTON).forEach(($button) => {
      $button.addEventListener('click', window.CustomButtons.memorizeEditorToInjectContent)
    })
  }

  function _getDialogHtml(properties) {
    let resultHtml = TEMPLATE
    properties.forEach(({ property, value }) => {
      const regexp = new RegExp(`{{${property}}}`, 'g')
      resultHtml = resultHtml.replace(regexp, value)
    })
    return resultHtml
  }

  // Родительский блок панели инстументов .cke_1_toolbox имеет свойство onmousedown="return false;"
  // которое блокирует нажатия на select и textarea в попапах.
  // Поэтому отменим в форме это свойство.
  function _addMousedownListener(submitConfig) {
    const { formId } = submitConfig
    const forms = document.querySelectorAll(`#${formId}`)

    const mousedownHandler = (event) => event.stopPropagation()

    forms.forEach($form => $form.addEventListener('mousedown', mousedownHandler))
  }

  const { hideAllSections, showSelectedSections, selectSectionFieldName } = formSectionTools

  function _addSubmitListener(submitConfig) {
    const { formId, onSubmit } = submitConfig
    const forms = document.querySelectorAll(`#${formId}`)

    forms.forEach(($form) => {
      const submitHandler = (event) => {
        event.preventDefault()
        onSubmit(event, $form)
        hideAllSections($form)

        shouldAskToCloseDialog = false
        document.querySelectorAll('[data-close-dialog]')
          .forEach(closeButton => closeButton.click())
        shouldAskToCloseDialog = true
      }

      $form.addEventListener('submit', submitHandler)
    })
  }

  function _addSelectSectionListener(submitConfig) {
    const { formId } = submitConfig
    const forms = document.querySelectorAll(`#${formId}`)
    forms.forEach(($form) => {
      const $selectSection = $form[selectSectionFieldName]
      if (!$selectSection) return

      const selectSectionHandler = (event) => {
        hideAllSections($form)

        const sectionName = event.target.value
        if (!sectionName) return

        showSelectedSections($form, sectionName)
      }

      $selectSection.addEventListener('change', selectSectionHandler)
    })
  }

  const getDialogConfig = ({ content, buttonName, popupId }) => [
    { property: 'popupId', value: popupId },
    { property: 'buttonName', value: buttonName },
    { property: 'content', value: content }
  ]

  const getSubmitConfig = (formId, onSubmit) => ({ formId, onSubmit })

  return { createDialog, getDialogConfig, getSubmitConfig }
})();

const Components = (function() {
  let multiplyer = 1;
  const makeInput = (props) => {
    const {
      name,
      labelText,
      type = 'text',
      defaultValue = '',
      placeholder = '',
      choices = [],
      select = [],
      min,
      max,
      isContent,
      sectionName,
    } = props
    const { getSectionFieldName, getSectionCompleteClass } = formSectionTools

    let inputHtml = ''
    const inputName = sectionName ? getSectionFieldName(sectionName, name) : name
    const shouldMakeChoice = choices.length
    const shouldMakeSelect = select.length
    if (shouldMakeChoice) {
      inputHtml = choices.map(({ value, description }, index) => {
        const order = `${index}${multiplyer}`
        const labelId = `${inputName}Label_${order}`
        const inputId = `${inputName}Input_${order}`
        return `
          <div class="radioContainer">
            <input id=${inputId} name=${inputName} type=radio checked=${index === 0} value="${value}" aria-labelledby=${labelId} />
            <label for=${inputId} id=${labelId}><span>${description}</span></label>
          </div>`
      }).join('')
    } else if (shouldMakeSelect) {
      inputHtml = select.map(({ value, description }) => {
        return `<option value="${value}">${description}</option>`
      }).join('')
      inputHtml = `<select name="${inputName}" class="selectInput">${inputHtml}</select>`
    } else {
      inputHtml = `<${isContent ? 'textarea' : 'input'} name="${inputName}" id="${inputName}Input" placeholder="${placeholder}" `

      if (!isContent) {
        inputHtml += ` type="${type}" value="${defaultValue}" `
      }
      if (min && max) {
        inputHtml += ` min=${min} max=${max} `
      }

      inputHtml += isContent ? `>${defaultValue}</textarea>` : '/>'
    }
    multiplyer += 1

    if (labelText) {
      const coveredTag = (shouldMakeChoice || shouldMakeSelect) ? 'h3' : 'label'
      inputHtml = `
          <${coveredTag} for=${inputName}Input id="${inputName}Label" class="${type}Label">
              <span>${labelText}</span>
              ${inputHtml}
          </${coveredTag}>
        `
    }

    if (sectionName) {
      inputHtml = `<div class="${getSectionCompleteClass(sectionName)}">${inputHtml}</div>`
    }

    return inputHtml
  }

  const makeButton = (props) => {
    const { id, text, type = 'button', className = '' } = props
    return `<button id=${id} type=${type} class=${className}>${text}</button>`
  }

  const makeForm = (props) => {
    const { fields, submitText, buttonId, formId, className = '' } = props
    let formHtml = `<form id=${formId} class="${className}">`
    fields.forEach(inputConfig => {
      formHtml += makeInput(inputConfig)
    })
    formHtml += `${makeButton({ id: buttonId, text: submitText, type: 'submit' })}</form>`
    return formHtml
  }

  const makeIframe = (props) => {
    const { src, className = '' } = props
    return `
        <iframe
          class="${className}"
          src="${src}"
          frameborder="0"
          style="margin:0;"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        />
      `
  }

  const makeParagraph = ({ className = '', style, text }) =>
    `<p class="${className}" style="${style}">${text}</p>`

  const makeVideoText = ({ text, src }) => {
    const containerClassName = 'video-text-block'
    const { iframe, paragraph } = _getIrameAndParagraph({
      text,
      src,
      paragraphClasses: `${containerClassName}__right-block`,
      iframeClasses: 'left-block__video',
      isTextLast: true,
    })

    return _wrapFlexContainer(
      containerClassName,
      `${paragraph}
         <div class="${containerClassName}__left-block" style="width:50%;">
            ${iframe}
         </div>`
    )
  }

  function _getIrameAndParagraph({ src, text, paragraphClasses, iframeClasses, isTextLast }) {
    return {
      paragraph: makeParagraph({
        text,
        className: paragraphClasses,
        style: `width: 50%;${isTextLast ? 'order:2;' : ''}`
      }),
      iframe: makeIframe({ src, className: iframeClasses }),
    }
  }

  function _wrapFlexContainer(className = '', content, isColumn) {
    return `<div class="${className}" style="display:flex;${isColumn ? 'flex-direction:column;' : ''}">${content}</div>`
  }

  const makeTextVideo = ({ text, src }) => {
    const containerClassName = 'text-video-block'
    const { iframe, paragraph } = _getIrameAndParagraph({
      text,
      src,
      paragraphClasses: `${containerClassName}__left-block`,
      iframeClasses: 'right-block__video',
    })
    return _wrapFlexContainer(
      containerClassName,
      `${paragraph}
         <div class="${containerClassName}__right-block" style="width:50%;">
          ${iframe}
         </div>`
    )
  }

  const makeHeading = (props) => {
    const { text, level = 2, className = '', style = '', headingStyles = '' } = props
    const tag = 'h' + level
    return `<${tag} class="${className}" style="${style || headingStyles}">${text}</${tag}>`
  }

  const makeHeadingText = (props) => {
    const { containerClass = 'heading-text-block', isParagraphLast = true, ...config } = props
    const { paragraph, heading } = _getHeadingAndParagraph({
      paragraphClasses: `${containerClass}__${isParagraphLast ? 'right-block' : 'left-block'}`,
      headingClasses: `${containerClass}__${isParagraphLast ? 'left-block' : 'right-block'}`,
      isParagraphLast,
      ...config,
    })
    return _wrapFlexContainer(containerClass, `${paragraph}${heading}`, config.hasFullWidth)
  }

  const makeTextHeading = (props) => {
    return makeHeadingText({
      containerClass: 'text-heading-block',
      isParagraphLast: false,
      ...props
    })
  }

  function _getHeadingAndParagraph(props) {
    const { level, paragraphClasses, headingClasses, isParagraphLast, headingText, paragraphText, headingStyles = '', hasFullWidth } = props
    const width = `width:${hasFullWidth ? 100 : 50}%;`
    return {
      paragraph: makeParagraph({
        text: paragraphText,
        className: paragraphClasses,
        style: `${isParagraphLast ? 'order:1;' : ''}${width}`,
      }),
      heading: makeHeading({
        level,
        text: headingText,
        className: headingClasses,
        style: `${width}${headingStyles}`,
      }),
    }
  }

  const makeShortcut = (props) => {
    const { attributes, shortcutName, content } = props
    if (!shortcutName) return ''

    let shortcutOpenedTag = shortcutName
    Object.keys(attributes).forEach((key) => {
      const value = attributes[key]
      if (key.includes('isInNewWindow') && value) shortcutOpenedTag += ` target="_blank"`
      else if (value) shortcutOpenedTag += ` ${key}="${unescape(value)}"`
    })
    return `
        [${shortcutOpenedTag}]
          ${content}
        [/${shortcutName}]
      `
  }

  return {
    input: makeInput,
    form: makeForm,
    button: makeButton,
    iframe: makeIframe,
    paragraph: makeParagraph,
    heading: makeHeading,
    videoText: makeVideoText,
    textVideo: makeTextVideo,
    textHeading: makeTextHeading,
    headingText: makeHeadingText,
    shortcut: makeShortcut,
  }
})();

// https://gist.github.com/isLishude/6ccd1fbf42d1eaac667d6873e7b134f8
class Caret {
  constructor(target, contextDocument) {
    this.isContentEditable = target && target.contentEditable
    this.target = target
    this.lastCaretPosition = 0
    this.document = contextDocument || document
  }

  setPosition() {
    if (this.isContentEditable) {
      this.target.focus()
      const _range = this.document.getSelection().getRangeAt(0)
      const range = _range.cloneRange()
      range.selectNodeContents(this.target)
      range.setEnd(_range.endContainer, _range.endOffset)
      this.lastCaretPosition = range.toString().length;
    } else {
      this.lastCaretPosition = this.target.selectionStart
    }
  }
}

const Utils = (function() {
  const throttle = (callback, delay) => {
    let shouldRunCallback = true
    let timer

    return (...args) => {
      if (shouldRunCallback) {
        callback(...args)
        shouldRunCallback = false
      } else if (timer) clearTimeout(timer)

      timer = setTimeout(() => {
        shouldRunCallback = true
      }, delay)
    }
  }

  return { throttle }
}())

window.CustomButtons = (function() {
  const HTMLBUTTONS_PATH = '/WebUI/ckeditor/plugins/htmlbuttons'

  function injectButtonsToEditor() {
    const $editor = getElement(Selectors.EDITOR)
    const $buttons = getElement(Selectors.BUTTONS_CONTAINER)

    if ($editor && $buttons) $editor.appendChild($buttons)
    else setTimeout(injectButtonsToEditor, 1e3)
  }

  function getElement(selector) {
    return document.querySelector(selector)
  }

  function _getIcon(iconFileName) {
    return `<img src="${HTMLBUTTONS_PATH}/${iconFileName}" />`
  }

  function _getRadioButtonValue($form, fieldName) {
    return $form.querySelector(`[name*="${fieldName}"]:checked`).value
  }

  const Submitters = {
    IFRAME: (event, $form) => {
      const type = _getRadioButtonValue($form, 'contentType')
      const componentHtml = Components[type]({
        src: $form['iframeSrc'].value,
        text: 'Вставьте сюда текст'
      })

      _insertHtmlToContentSource(componentHtml)
    },

    HEADING: (event, $form) => {
      const getFormValue = fieldName => $form[fieldName].value
      const type = _getRadioButtonValue($form, 'contentType')
      const level = getFormValue('level')
      const weight = _getRadioButtonValue($form, 'headingWeight')
      const direction = _getRadioButtonValue($form, 'direction')

      let headingStyles
      if (weight === 'normal') headingStyles = 'font-family:tele2_displayserif-regular;font-weight: 400;'

      const text = `Заголовок уровня ${level}`
      const componentHtml = Components[type]({
        headingText: text,
        paragraphText: 'Текст набивка, которую стоит удалить',
        hasFullWidth: direction === 'column',
        text,
        level,
        headingStyles,
      })

      _insertHtmlToContentSource(componentHtml)
    },

    SHORTCUT: (event, $form) => {
      const { selectSectionFieldName, getSectionFieldName } = formSectionTools

      const shortcutName = $form[selectSectionFieldName].value
      const getFormValue = fieldName => $form[getSectionFieldName(shortcutName, fieldName)].value
      let content = ''
      let attributes = {}

      switch (shortcutName) {
        case 'promoblock':
          {
            content = getFormValue('content')
            attributes = {
              isInNewWindow: $form[getSectionFieldName(shortcutName, 'isInNewWindow')].checked,
              title: getFormValue('title'),
              buttonText: getFormValue('buttonText'),
              link: getFormValue('link'),
            }
            break
          }
        case 'webimbutton':
          {
            attributes = {
              buttonText: getFormValue('buttonText'),
              location: getFormValue('location'),
            }
            break
          }
        default:
      }

      const componentHtml = Components.shortcut({ content, shortcutName, attributes })

      _insertHtmlToContentSource(componentHtml)
    }
  }

  const injectButtonsToPanel = (response) => {
    const { dialogsConfigs = [] } = JSON.parse(response)
    dialogsConfigs.forEach(({ submitConfig, dialogConfig }) => {
      const {
        isOpenDialogButtonImage,
        popupId,
        buttonName,
        buttonId,
        submitText,
        fields,
      } = dialogConfig
      const { formId, submitterId } = submitConfig
      const config = Popup.getSubmitConfig(formId, Submitters[submitterId])
      const dialog = Popup.getDialogConfig({
        popupId,
        buttonName: isOpenDialogButtonImage ? _getIcon(buttonName) : buttonName,
        content: Components.form({ fields, formId, buttonId, submitText }),
      })

      _createDialog(dialog, config)
    })
  }

  function _createDialog(dialogConfig, submitConfig) {
    Popup.createDialog(Selectors.PANEL, dialogConfig, submitConfig)
  }

  let _editor, _caret, _lastFocusedElement
  function _insertHtmlToContentSource(html) {
    setEditorEvents()

    const isTextarea = _editor.tagName === 'TEXTAREA'
    if ((_caret && _caret.lastCaretPosition === 0) || !_lastFocusedElement) {
      if (isTextarea) _editor.value = `${html}${_editor.value}`
      else _editor.insertAdjacentHTML('afterbegin', html)
    } else if (_lastFocusedElement) {
      if (isTextarea) _editor.value += html
      else _lastFocusedElement.insertAdjacentHTML('afterend', html)
    }
  }

  function setEditorEvents() {
    const iframes = document.querySelectorAll(Selectors.CONTENT_SOURCE_IFRAME)
    if (!iframes.length) return setTimeout(setEditorEvents, 1e3)

    iframes.forEach(($iframe) => {
      const iframeDocument = $iframe.contentWindow.document
      const $editor = iframeDocument.querySelector(Selectors.CONTENT_SOURCE)
      if (!$editor) return setTimeout(setEditorEvents, 1e3)

      const caret = new Caret($editor, iframeDocument)
      const memorizeCaret = event => _memorizeCaret(event, iframeDocument, caret, $editor)
      $editor.addEventListener('keydown', memorizeCaret)
      $editor.addEventListener('click', memorizeCaret)
    })
  }

  function _memorizeEditorToInjectContent({ target }) {
    const iframeContainer = target.closest(Selectors.EDITOR)
    const $iframe = iframeContainer.querySelector(Selectors.CONTENT_SOURCE_IFRAME)
    let context
    if ($iframe) context = $iframe.contentWindow.document
    else context = iframeContainer
    const $editor = context.querySelector(Selectors.CONTENT_SOURCE)
    const caret = new Caret($editor, context)
    if (_editor && _caret && _editor.isEqualNode($editor)) return null

    _editor = $editor
    _caret = caret
  }

  function _memorizeCaret(event, iframeDocument, caret, editor) {
    if (event.target.contentEditable) {
      const { focusNode } = iframeDocument.getSelection()
      const $parent = focusNode.parentElement
      _lastFocusedElement = $parent === editor ? focusNode : $parent
    }

    _caret = caret
    _editor = editor

    caret.setPosition()
  }

  function fixInputTextFocus() {
    document.body.addEventListener('click', (event) => {
      const { target } = event
      const isInput = target.tagName.toUpperCase() === 'INPUT'
      const shouldFixInputFocus = type => ['text', 'number'].some(compareType => type === compareType)
      if (isInput && shouldFixInputFocus(target.type)) target.focus()
    })
  }

  const dialogConfigsFilePath = `${HTMLBUTTONS_PATH}/dialogsConfigs.json`
  function init() {
    setTimeout(function() {
      fixInputTextFocus();
      setEditorEvents();
      injectButtonsToEditor();
      loadFile(dialogConfigsFilePath)
        .then(injectButtonsToPanel)
        .catch(console.error)
    }, 1e3)
  }

  return {
    init: Utils.throttle(init, 1e3),
    memorizeEditorToInjectContent: _memorizeEditorToInjectContent,
  }
}());