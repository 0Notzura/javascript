'use strict';

///////////////////////////////////////
// Modal window
console.log('kmfvortkvlmtbijopyt')
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const header=document.querySelector('.header')
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs=document.querySelectorAll('.operations__tab')
const tabsContainer=document.querySelector('.operations__tab-container')
const tabsContent=document.querySelectorAll('.operations__content')
const nav=document.querySelector('.nav')
const allSections=document.querySelectorAll('.section')
const imgTargets=document.querySelectorAll('img[data-src]')
const slides=document.querySelectorAll('.slide')
const btnleft=document.querySelector('.slider__btn--left')
const btnright=document.querySelector('.slider__btn--right')
const dotcontainer=document.querySelector('.dots')

const openModal = function (e) {
  e.preventDefault()
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {

  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn=>btn.addEventListener('click', openModal))

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
const msg=document.createElement('div')
msg.classList.add('cookie-message')
msg.innerHTML='We use cokies for improved functionality and analytics<button class="btn btn--close--cookie">Goti it!</button>'
header.append(msg)
console.log(header)

//header.prepend(msg.cloneNode(true))//necessario para q o objeto esteja em mais de um lugar ao mesmo tempo
/* fazem o mesmo que o prepend e o append,mas o objeto se torna um irmão n um filho
header.before(msg)
header.after(msg) */

document.querySelector('.btn--close--cookie').addEventListener('click',()=>{
    msg.remove()
})

//Mexendo no css

msg.style.backgroundColor='#37383d'
msg.style.width='120%'
console.log(getComputedStyle(msg))
msg.style.height=(parseFloat(getComputedStyle(msg).height,10)+30+'px')
document.documentElement.style.setProperty('--color-primary','orangered')//esta mudando o valor da propriedade --color-primary

// Button scrolling
btnScrollTo.addEventListener('click', function (e) {
    /* const s1coords = section1.getBoundingClientRect();
    console.log(s1coords);
  
    console.log(e.target.getBoundingClientRect());//pega os valores de tamanho,posição geral e posição relativa ao topo da tela visivel no browser
  
    console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);//pega a distancia do topo da pagina ate o topo da tela visivel no browser
  
    console.log(
      'height/width viewport',
      document.documentElement.clientHeight,//altura visivel
      document.documentElement.clientWidth//largura visivel
    ); */
  
    // Scrolling
    // window.scrollTo(
    //   s1coords.left + window.pageXOffset,
    //   s1coords.top + window.pageYOffset
    // );
  
    // window.scrollTo({
    //   left: s1coords.left + window.pageXOffset,
    //   top: s1coords.top + window.pageYOffset,
    //   behavior: 'smooth', 
    // });
  
    section1.scrollIntoView({ behavior: 'smooth' });
  });

/* document.querySelectorAll('.nav__link').forEach((e)=>{
    e.addEventListener('click',function(e){
        e.preventDefault()
        const id=this.getAttribute('href')
        console.log(id)
        document.querySelector(id).scrollIntoView({behavior:'smooth'})
    })
})*/
document.querySelector('.nav__links').addEventListener('click',(e)=>{
    e.preventDefault()

    if(e.target.classList.contains('nav__link')){
    console.log(e.target)
    const id=e.target.getAttribute('href')
    document.querySelector(id).scrollIntoView({behavior:'smooth'})
    }
})

tabsContainer.addEventListener('click',(e)=>{
    const clicked=e.target.closest('.operations__tab')
    if(!clicked) return
    tabs.forEach((t)=>{
        t.classList.remove('operations__tab--active')
    })
    clicked.classList.add('operations__tab--active')
    tabsContent.forEach((c)=>{
        c.classList.remove('operations__content--active')
    })
    console.log(clicked.dataset.tab)
    document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active') 
})

function mousehandler(e){
    const hover=e.target
    if(hover.classList.contains('nav__link')){
        const father=e.target.closest('.nav')
        const links=father.querySelectorAll('.nav__link')
        const logo=father.querySelector('img')
        links.forEach((l)=>{
            if(l!==hover) l.style.opacity=this
        })
        logo.style.opacity=this
    }
}

nav.addEventListener('mouseover',mousehandler.bind(.5))
nav.addEventListener('mouseout',mousehandler.bind(1))

/* const coordenades=section1.getBoundingClientRect()
window.addEventListener('scroll',()=>{
    if(window.scrollY>coordenades.top) nav.classList.add('sticky')
    else nav.classList.remove('sticky')
}) */

const navHeight=nav.getBoundingClientRect().height
function stick(entries){
    const [entry]=entries
    if(!entry.isIntersecting)nav.classList.add('sticky')
    else nav.classList.remove('sticky')
}
const headerobserver= new IntersectionObserver(stick,{
    root:null,
    threshold:0,
    rootMargin:`-${navHeight}px`
})
headerobserver.observe(header)



function revealsection(entries,observer){
    const [entry]=entries
    if(!entry.isIntersecting) return
    entry.target.classList.remove('section--hidden')
    observer.unobserve(entry.target)
}
const sectionObserver=new IntersectionObserver(revealsection,{
    root:null,
    threshold:.15,

})
allSections.forEach((e)=>{
    sectionObserver.observe(e)/* 
    e.classList.add('section--hidden') */
})

function imgshow(entries,observer){
    const [entry]=entries
    if(!entry.isIntersecting) return
    entry.target.src=entry.target.dataset.src
    entry.target.addEventListener('load',(e)=>{
        entry.target.classList.remove('lazy-img')
    })
    observer.unobserve(entry.target)
}

const imgobserver=new IntersectionObserver(imgshow,{
    root:null,
    threshold:.1,
})

imgTargets.forEach((e)=>{
    imgobserver.observe(e)

})


let slidein=0

function activatedots(slide){
    document.querySelectorAll('.dots__dot').forEach(e => {
        e.classList.remove('dots__dot--active')

    document.querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
    });
}

function goslide(slide){
    slides.forEach((e,i)=>{
        e.style.transform=`translateX(${(i-slide)*100}%)`
        activatedots(slide)
    })
}
goslide(0)


function nextslide(){
    if(slidein<2)slidein++
    else slidein=0
    goslide(slidein)
}
function prevslide(slide){

    if(slidein>0) slidein--
    else slidein=2
    goslide(slidein)
}
btnright.addEventListener('click',nextslide )
btnleft.addEventListener('click',prevslide)

document.addEventListener('keydown',function(e){
    if(e.key=='ArrowLeft')prevslide()
    if(e.key=='ArrowRight')nextslide()
})

function createDots () {
    slides.forEach(function (_, i) {
      dotcontainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };
  createDots()

  dotcontainer.addEventListener('click',(e)=>{
    if(e.target.classList.contains('dots__dot')){
        const {slide}=e.target.dataset
        goslide(slide)
    }
  })