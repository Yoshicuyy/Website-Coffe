gsap.registerPlugin(ScrollTrigger);

// =======================
// THEME TOGGLE
// =======================
const btn = document.getElementById('themeToggle');
let dark = false;

btn.onclick = () => {
  dark = !dark;
  document.body.setAttribute('data-theme', dark ? 'dark' : 'light');
  btn.textContent = dark ? '☀️' : '🌙';
};

// =======================
// HERO 3D LOGO
// =======================
function initHero3D() {
  const canvas = document.getElementById('hero3d');

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.z = 6;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
  renderer.setSize(300, 300);

  scene.add(new THREE.AmbientLight(0xffffff, 1));

  new THREE.TextureLoader().load('img/logo.png', (texture) => {
    const geo = new THREE.PlaneGeometry(4, 4);
    const mat = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true
    });
    const logo = new THREE.Mesh(geo, mat);
    scene.add(logo);

    function animate() {
      requestAnimationFrame(animate);
      logo.rotation.y += 0.004;
      renderer.render(scene, camera);
    }
    animate();
  });
}

// =======================
// PRODUCT 3D
// =======================
function initProduct3D() {
  document.querySelectorAll('.product3d').forEach(canvas => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 50);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setSize(200, 260);

    scene.add(new THREE.AmbientLight(0xffffff, 0.9));

    const light = new THREE.DirectionalLight(0xffffff, 0.8);
    light.position.set(3, 5, 2);
    scene.add(light);

    new THREE.TextureLoader().load(canvas.dataset.texture, (texture) => {
      const geo = new THREE.BoxGeometry(1.6, 2.4, 0.6);
      const frontTexture = new THREE.TextureLoader().load(canvas.dataset.texture);

frontTexture.wrapS = THREE.ClampToEdgeWrapping;
frontTexture.wrapT = THREE.ClampToEdgeWrapping;

const materials = [
  new THREE.MeshStandardMaterial({ color: 0x3b2a1a }), 
  new THREE.MeshStandardMaterial({ color: 0x3b2a1a }), 
  new THREE.MeshStandardMaterial({ color: 0x3b2a1a }), 
  new THREE.MeshStandardMaterial({ color: 0x3b2a1a }), 
  new THREE.MeshStandardMaterial({ map: frontTexture }), 
  new THREE.MeshStandardMaterial({ color: 0x3b2a1a })  
];

const box = new THREE.Mesh(geo, materials);
scene.add(box);

      scene.add(box);

      canvas.onmousemove = (e) => {
        const r = canvas.getBoundingClientRect();
        box.rotation.y = ((e.clientX - r.left) / r.width - 0.5) * 1.3;
        box.rotation.x = ((e.clientY - r.top) / r.height - 0.5) * 1.2;
      };

      function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      }
      animate();
    });
  });
}

// =======================
window.onload = () => {
  initHero3D();
  initProduct3D();
};

// =======================
// BASIC PAGE ANIMATION
// =======================
window.addEventListener('load', () => {
  gsap.from('.navbar', {
    y: -40,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out'
  });

  gsap.from('.hero-text h2', {
    y: 30,
    opacity: 0,
    delay: 0.3,
    duration: 0.8
  });

  gsap.from('.hero-text p', {
    y: 20,
    opacity: 0,
    delay: 0.5,
    duration: 0.8
  });

  gsap.from('.product-card', {
    y: 40,
    opacity: 0,
    stagger: 0.2,
    delay: 0.6,
    duration: 0.8
  });
});

// =======================
// SCROLL ANIMATION
// =======================

// PRODUCTS
gsap.from('.product-card', {
  scrollTrigger: {
    trigger: '.products',
    start: 'top 80%'
  },
  y: 60,
  opacity: 0,
  duration: 0.8,
  stagger: 0.2,
  ease: 'power2.out'
});

// ABOUT
gsap.from('.about h2, .about p', {
  scrollTrigger: {
    trigger: '.about',
    start: 'top 80%'
  },
  y: 40,
  opacity: 0,
  duration: 0.8,
  stagger: 0.2
});

// CTA
gsap.from('.cta h2, .cta p, .btn-primary', {
  scrollTrigger: {
    trigger: '.cta',
    start: 'top 85%'
  },
  scale: 0.9,
  opacity: 0,
  duration: 0.8,
  stagger: 0.2
});

// FOOTER
gsap.from('.footer', {
  scrollTrigger: {
    trigger: '.footer',
    start: 'top 95%'
  },
  opacity: 0,
  duration: 1
});

window.addEventListener("load", () => {
  const tl = gsap.timeline();

  tl.from(".hero-title", {
    y: 60,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
  })

  .from(".hero-desc", {
    y: 40,
    opacity: 0,
    duration: 0.8
  }, "-=0.5")

  .from(".hero-logo", {
    scale: 0.6,
    opacity: 0,
    duration: 1,
    ease: "elastic.out(1, 0.6)"
  }, "-=0.4")

  .from("#hero3d", {
    opacity: 0,
    scale: 0.9,
    duration: 1
  }, "-=0.8");
});

gsap.fromTo(".product-card",
  {
    opacity: 0,
    y: 80
  },
  {
    opacity: 1,
    y: 0,
    duration: 1,
    stagger: 0.3,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".product-card",
      start: "top 85%",
      toggleActions: "play none none none"
    }
  }
);

gsap.to(".hero-logo", {
  y: 12,
  duration: 3,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut"
});

function updateTotal() {
  let total = 0;
  document.querySelectorAll(".item-price").forEach(item => {
    total += parseInt(item.dataset.price);
  });

  document.getElementById("totalPrice").innerText =
    "Rp " + total.toLocaleString("id-ID");
}

updateTotal();


gsap.from(".checkout-box", {
  scale: 0.9,
  opacity: 0,
  duration: 1,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".checkout",
    start: "top 80%"
  }
});


function formatRupiah(num) {
  return "Rp " + num.toLocaleString("id-ID");
}

function updateCheckout() {
  let total = 0;

  document.querySelectorAll(".checkout-item").forEach(item => {
    const price = parseInt(item.dataset.price);
    const qtyEl = item.querySelector(".qty");
    const qty = parseInt(qtyEl.innerText);

    const subtotal = price * qty;
    item.querySelector(".item-subtotal").innerText =
      formatRupiah(subtotal);

    total += subtotal;
  });

  document.getElementById("totalPrice").innerText =
    formatRupiah(total);
}

document.querySelectorAll(".qty-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const item = btn.closest(".checkout-item");
    const qtyEl = item.querySelector(".qty");
    let qty = parseInt(qtyEl.innerText);

    if (btn.classList.contains("plus")) qty++;
    if (btn.classList.contains("minus") && qty > 0) qty--;

    qtyEl.innerText = qty;
    updateCheckout();
  });
});

// INIT
updateCheckout();
