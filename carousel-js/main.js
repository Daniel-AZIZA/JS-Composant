class Carousel
{
    /**
     * @param {HTMLElement} element
     * @param {Object} options
     * @param {Object} options.slidesToScroll   nombre d'element à faire défiler
     * @param {Objetc} options.slidesVisible    nombre d'element visible dans un slide
     * @param {boolean} options.loop            doit-on boucler à la fin du carousel ? 
     */

    constructor (element, options = {}) {
        this.element = element;
        this.options = Object.assign({}, {
            slidesToScroll : 1,
            slidesVisible : 1,
            loop : false
            }, options)
    
        let children = [].slice.call(element.children);
        this.currentItem = 0;
        this.root = this.createDivWithClass('carousel');
        this.container = this.createDivWithClass('carousel_container');
        this.root.appendChild(this.container);
        this.element.appendChild(this.root);
        this.moveCallbacks = [];
        this.items = children.map((child) => {
            let item = this.createDivWithClass('carousel_item');
            item.appendChild(child);
            this.container.appendChild(item);
            return (item);
        })
        this.setStyle();
        this.createNavigation(); 
    }


    /**
     * applique les bonnes dimensions aux éléments du carousel 
     */

    setStyle () {

        let ratio = this.items.length / this.options.slidesVisible;
        this.container.style.width = (ratio * 100) + "%";
        this.items.forEach(item => item.style.width = ((100 / this.options.slidesVisible) / ratio) + "%");

    }

    createNavigation () {
        let nextButton = this.createDivWithClass('carousel_next');
        let prevButton = this.createDivWithClass('carousel_prev');
        this.root.appendChild(nextButton);
        this.root.appendChild(prevButton);
        nextButton.addEventListener('click', this.next.bind(this));
        prevButton.addEventListener('click', this.prev.bind(this));
        if (index == 0) {
            prevButton.classList.add('carousel_prev--hidden'); 
        }
        else{
            prevButton.classList.remove('carousel_prev--hidden');
        }
    }

    next () {
        this.goToItem(this.currentItem + this.options.slidesToScroll);
    }

    prev () {
        this.goToItem(this.currentItem - this.options.slidesToScroll);
    }

    /**
     * déplace le carousel vers l'élément ciblé
     * @param {number} index 
     */
    goToItem (index)
    {
        if (index < 0) {
            index = this.items.length - this.options.slidesVisible;
        }
        else if (index >= this.items.length || this.items[this.currentItem + this.options.slidesVisible] === undefined) {
            index = 0;
        }
        let translateX = index * -100 / this.items.length;
        this.container.style.transform = 'translate3d(' + translateX + '%, 0, 0)';
        this.currentItem = index;
        this.moveCallbacks.forEach(cb => cb(index));
    }

    onMove (cb) {       /* call backs */
        this.moveCallbacks.push(cb);
    }

    /**
     * 
     * @param {string} className
     * @returns {HTMLElement}
    */

    createDivWithClass (className) {
        let div = document.createElement('div');
        div.setAttribute('class', className);   
        return (div);
    }
}


document.addEventListener('DOMContentLoaded', function() {
        
    new Carousel(document.querySelector('#carousel1'), {
        slidesVisible : 3,
        slidesToScroll: 3,
        loop: false
    })
})

document.addEventListener('DOMContentLoaded', function() {
        
    new Carousel(document.querySelector('#carousel2'), {
        slidesVisible : 2,
        slidesToScroll: 2
    })
})


/**
 * arrete vidéo 40min https://www.youtube.com/watch?v=1hHVvuShsGo&t=877s
 */