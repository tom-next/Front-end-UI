// shadow DOM中利用:host定义宿主的样式
// :host 是伪类选择器（Pseudo Selector）,:host或者 :host(*)是默认给所有的宿主添加样式，或者单独给一个宿主添加样式，即通过:host(x)，x可以是宿主的标签或者类选择器等。
const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host{
      display: block;
      /* background-color: red; */
      position: relative;
      background-size: 100% 100%;
      /* image-rendering: pixelated; */
    }
    img {
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      animation-name: fade-in;
      animation-duration: 5s;
    }
    @keyframes fade-in {
      from {opacity: 0}
    }
  </style>
`;

const io = new IntersectionObserver(entries => {
  for(const entry of entries) {
    if(entry.isIntersecting) {
      console.log("进入可视区域", entry.target);
      entry.target.setAttribute('full', '');
    }
  }
});

class SCImg extends HTMLElement {
  static get observedAttributes() {
    return ['full'];
  }

  constructor() {
    super();
    // 创建一个 shadow root
    this.attachShadow({mode: 'open'});
    // 将创建元素附加到 shadow dom
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    console.log("22222", this.shadowRoot);

  }

  // 会在 custome element 首次被插入到dom节点上时被调用
  connectedCallback() {
    io.observe(this);
  }
  //  当 custom element从文档DOM中删除时，被调用。
  disconnectedCallback() {
    io.unobserve(this);
  }

  get full() {
    return this.hasAttribute('full');
  }

  get src() {
    return this.getAttribute('src');
  }

  attributeChangedCallback() {
     console.log("11111")
    if(this.loaded)
      return;
    const img = document.createElement('img');
    img.src = this.src;
    img.onload = _ => {
      this.loaded = true;
      this.shadowRoot.appendChild(img);
    };
  }
}

customElements.define('sc-img', SCImg);
