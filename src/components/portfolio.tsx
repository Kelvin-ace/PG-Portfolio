'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, Building2, Facebook, Instagram, Linkedin, Menu, Music2, Play, Shirt, Smartphone, X } from 'lucide-react';
import { site } from '@/data/site';

const nav = [['Home', 'home'], ['About', 'about'], ['Brands', 'brands'], ['Journey', 'journey'], ['Achievements', 'achievements'], ['Contact', 'contact']];
const clientExperience = [
  { title: 'Clear Communication', text: 'Helpful guidance keeps choosing the right product simple and straightforward.' },
  { title: 'Dependable Service', text: 'A professional, responsive experience from the first question to delivery.' },
  { title: 'Quality That Shows', text: 'Thoughtfully selected tech and fashion pieces made for everyday use.' },
  { title: 'On Time, With Care', text: 'Orders are handled with attention, care and respect for your time.' },
];
const phoneProducts = site.products.filter((product) => product.category === 'Phone George');
const apparelProducts = site.products.filter((product) => product.category === 'George Apparels');
const productSlides = Array.from({ length: Math.ceil(Math.max(phoneProducts.length, apparelProducts.length) / 2) }, (_, slide) => [
  phoneProducts[(slide * 2) % phoneProducts.length],
  apparelProducts[(slide * 2) % apparelProducts.length],
  phoneProducts[(slide * 2 + 1) % phoneProducts.length],
  apparelProducts[(slide * 2 + 1) % apparelProducts.length],
]);

export function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [productIndex, setProductIndex] = useState(0);
  const [aboutExpanded, setAboutExpanded] = useState(false);
  const [experienceIndex, setExperienceIndex] = useState(0);
  const experienceTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sectionIds = nav.map(([, id]) => id);
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target.id) setActiveSection(visible.target.id);
    }, { rootMargin: '-24% 0px -60% 0px', threshold: [0, 0.15, 0.35, 0.6] });
    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  const moveProducts = (direction: number) => setProductIndex((current) => (current + direction + productSlides.length) % productSlides.length);
  const moveExperience = (direction: number) => {
    const track = experienceTrackRef.current;
    if (!track) return;
    const nextIndex = Math.max(0, Math.min(clientExperience.length - 1, experienceIndex + direction));
    const cardWidth = track.firstElementChild?.getBoundingClientRect().width ?? track.clientWidth;
    track.scrollTo({ left: nextIndex * cardWidth, behavior: 'smooth' });
    setExperienceIndex(nextIndex);
  };

  return <>
    <header className="site-header"><a className="brand-lockup" href="#home" aria-label="Promise George, home"><Image src="/images/promise-george-logo.png" width={420} height={140} alt="Promise George, Entrepreneur, Investor, Brand Builder" priority/></a>
      <button className="menu-toggle" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      <nav className={menuOpen ? 'navigation open' : 'navigation'} aria-label="Main navigation">{nav.map(([label, id]) => <a key={id} className={activeSection === id ? 'active' : ''} aria-current={activeSection === id ? 'location' : undefined} onClick={() => setMenuOpen(false)} href={`#${id}`}>{label}</a>)}<a className="button button-gold nav-cta" href="#contact">Let&apos;s Connect <ArrowRight size={14} /></a></nav>
    </header>
    <main>
      <section className="hero dark-section" id="home"><div className="hero-backdrop"/><div className="hero-copy"><p className="eyebrow pill">BUSINESS OWNER <i/> ENTREPRENEUR <i/> VISIONARY</p><h1>Promise <em>George</em></h1><p className="hero-tagline">Building People. Brands. Opportunities.</p><p className="hero-description">I&apos;m Promise George, the founder of The Phone George LTD, owner of Phone George and George Apparels, creating solutions, products and experiences that make everyday life better, smarter and more stylish.</p><div className="hero-actions"><a className="button button-gold" href="#brands">Explore My Brands <ArrowRight size={15}/></a><button className="button button-ghost" onClick={() => scrollTo('about')}><Play size={14}/> Watch My Story</button></div><div className="hero-stats" aria-label="Portfolio highlights"><div><strong>2+</strong><span>Brands Owned</span></div><div><strong>1000+</strong><span>Happy Customers</span></div><div><strong>Growing</strong><span>Across Africa</span></div></div></div>
      <div className="hero-portrait"><Image src="/images/promise-george-portrait.png" alt="Promise George in a black suit and sunglasses" fill priority sizes="(max-width: 760px) 100vw, 57vw"/></div><div className="hero-signature"><span>Promise George</span><small>FOUNDER & CEO<br/>THE PHONE GEORGE LTD</small></div></section>

      <section className="about light-section section-pad" id="about"><div className="about-photo"><div className="about-image" role="img" aria-label="Promise George seated in a warmly lit office"/><div className="play-orb"><Play fill="currentColor" size={18}/></div><div className="impact-card"><span>Driven by</span><b>Impact</b><b>People</b><b>Innovation</b><b>Growth</b></div></div><div className="about-copy"><p className="eyebrow">ABOUT ME</p><h2>Entrepreneur. Brand Builder.<br/>Problem Solver.</h2><p>{site.biography}</p><p>{site.mission}</p>{aboutExpanded && <p className="expanded-copy">I believe thoughtful products, dependable service and a strong sense of community can make everyday choices better. This portfolio brings together the work and vision behind each brand.</p>}<button className="button button-gold" onClick={() => setAboutExpanded(!aboutExpanded)}>{aboutExpanded ? 'Show Less' : 'More About Me'} <ArrowRight size={15}/></button><div className="signature-light">Promise George</div></div></section>

      <section className="skills-section light-section section-pad" aria-labelledby="skills-title"><div className="skills-heading"><p className="eyebrow">CORE CAPABILITIES</p><h2 id="skills-title">Skills</h2><p>A practical mix of leadership, strategy and technical expertise.</p></div><ul className="skills-list">{site.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul></section>

      <section className="brands dark-section section-pad" id="brands"><div className="brands-intro"><p className="eyebrow">MY BRANDS</p><h2>Two Powerful Brands,<br/>One Bigger Vision.</h2><p>Through The Phone George LTD, I&apos;ve built two distinct brands that serve different needs but share the same mission, quality, trust and customer satisfaction.</p><a className="button button-gold" href="#products">Explore All Brands <ArrowRight size={15}/></a></div><div className="brand-cards">{site.brands.map((brand) => <article className="brand-card" key={brand.name}><a className="brand-image" href={brand.href} target="_blank" rel="noreferrer" aria-label={`Visit ${brand.name} website`}><Image src={brand.image} alt={`${brand.name} website preview`} fill sizes="(max-width: 680px) 90vw, 34vw"/></a><div className="brand-card-body"><div className="brand-card-heading"><Image src={brand.logo} alt={`${brand.name} logo`} width={68} height={68}/><div><h3>{brand.name}</h3><span>{brand.category}</span></div></div><p>{brand.description}</p><a className="button button-dark" href={brand.href} target="_blank" rel="noreferrer">Visit {brand.name} <ArrowRight size={14}/></a></div></article>)}</div>
        <section className="proof-stats" id="achievements" aria-label="Brands and product range"><h2 className="sr-only">Our range</h2>{site.highlights.map((metric, i) => <div key={metric.label}><span>{['♧','◉','◇','↗'][i]}</span><strong>{metric.value}</strong><small>{metric.label}</small></div>)}</section></section>

      <section className="values light-section section-pad" id="values"><div className="section-heading centered"><p className="eyebrow">WHAT I STAND FOR</p><h2>Values That Drive<br/>Everything I Do.</h2><p>These are the core principles that guide my business,<br/>my decisions and my vision for the future.</p></div><div className="value-grid">{site.values.map((value) => <article className="value-card" key={value.title}><span className="value-icon">{value.icon}</span><h3>{value.title}</h3><p>{value.text}</p></article>)}</div></section>

      <section className="products dark-section section-pad" id="products"><div className="section-heading products-heading"><div><p className="eyebrow">FEATURED PRODUCTS & SERVICES</p><h2>From Tech to Fashion,<br/>We&apos;ve Got You Covered.</h2><p className="products-intro">Gadgets, phones and accessories, plus streetwear, shoes, bags and more.</p></div><div className="carousel-controls" aria-label="Featured products carousel"><button aria-label="Previous products" onClick={() => moveProducts(-1)}><ArrowLeft/></button><button aria-label="Next products" onClick={() => moveProducts(1)}><ArrowRight/></button></div></div><div className="product-track" aria-live="polite" onTouchStart={(event) => { event.currentTarget.dataset.touchStart = String(event.changedTouches[0].clientX); }} onTouchEnd={(event) => { const start = Number(event.currentTarget.dataset.touchStart); const delta = event.changedTouches[0].clientX - start; if (Math.abs(delta) > 45) moveProducts(delta < 0 ? 1 : -1); }}>{productSlides[productIndex].map((product, index) => <article className="product-card" key={`${product.title}-${productIndex}-${index}`}><div className="product-image"><Image src={product.image} alt={product.title} fill sizes="(max-width: 680px) 46vw, 48vw"/></div><div className="product-label"><span>{product.category}</span><h3>{product.title}</h3><p>{product.sub}</p></div></article>)}</div><div className="product-carousel-status"><span>Collection {productIndex + 1} of {productSlides.length}</span><div className="carousel-dots" aria-label="Choose a product collection">{productSlides.map((_, index) => <button key={index} aria-label={`Show product collection ${index + 1}`} aria-current={productIndex === index ? 'true' : undefined} onClick={() => setProductIndex(index)}/>)}</div></div></section>

      <section className="journey dark-section section-pad" id="journey"><div className="section-heading journey-heading"><div><p className="eyebrow">MY JOURNEY</p><h2>Milestones Along the Way.</h2></div><a className="button button-gold" href="#contact">View Full Journey <ArrowRight size={15}/></a></div><div className="timeline">{site.milestones.map((milestone, i) => <article className="milestone" key={milestone.title}><span className="milestone-icon">{i === 1 ? <Smartphone size={18} strokeWidth={1.8}/> : i === 2 ? <Shirt size={18} strokeWidth={1.8}/> : i === 3 ? <Building2 size={18} strokeWidth={1.8}/> : ['➤', null, null, null, '↗'][i]}</span><h3>{milestone.title}</h3><p>{milestone.text}</p></article>)}</div></section>

      <section className="testimonials light-section section-pad" aria-label="The client experience"><div className="section-heading testimonials-heading"><div><p className="eyebrow">THE CLIENT EXPERIENCE</p><h2>Good Work Speaks.</h2><p>Thoughtful service, dependable delivery and quality across tech and fashion.</p></div><div className="carousel-controls testimonial-carousel-controls" aria-label="Client experience carousel"><button aria-label="Previous client experience card" aria-controls="client-experience-cards" onClick={() => moveExperience(-1)} disabled={experienceIndex === 0}><ArrowLeft/></button><button aria-label="Next client experience card" aria-controls="client-experience-cards" onClick={() => moveExperience(1)} disabled={experienceIndex === clientExperience.length - 1}><ArrowRight/></button></div></div><div ref={experienceTrackRef} className="testimonial-grid" id="client-experience-cards" role="region" aria-label="Client experience cards" aria-roledescription="carousel" onScroll={(event) => { const track = event.currentTarget; const cardWidth = track.firstElementChild?.getBoundingClientRect().width ?? 0; if (cardWidth) setExperienceIndex(Math.round(track.scrollLeft / cardWidth)); }}>{clientExperience.map((item, index) => <article className="testimonial-card" key={item.title} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${clientExperience.length}`}><div className="testimonial-person"><span className="avatar">PG</span><span><strong>{item.title}</strong><small>Promise George brands</small></span></div><p>{item.text}</p></article>)}</div><p className="testimonial-carousel-status" aria-live="polite">Card {experienceIndex + 1} of {clientExperience.length}</p></section>

      <section className="contact-banner dark-section section-pad" id="contact"><div><p className="eyebrow">GET IN TOUCH</p><h2>Let&apos;s Build Something<br/>Greater Together.</h2><p>Whether you want to shop, partner, or just say hello, I&apos;d love to hear from you.</p></div><div className="contact-actions"><a className="button button-gold" href={`mailto:${site.email}`}>Email Promise <ArrowRight size={15}/></a><div className="socials" aria-label="Promise George social profiles">{site.socials.map((social) => <a key={social.name} href={social.href} target="_blank" rel="noreferrer" aria-label={`${social.name}: ${social.handle}`}>{social.icon === 'instagram' ? <Instagram/> : social.icon === 'facebook' ? <Facebook/> : social.icon === 'linkedin' ? <Linkedin/> : <Music2/>}</a>)}</div></div></section>
    </main>
    <footer className="footer dark-section"><div className="footer-main"><div className="footer-brand"><a className="brand-lockup" href="#home" aria-label="Promise George, home"><Image src="/images/promise-george-logo.png" width={420} height={140} alt="Promise George, Entrepreneur, Investor, Brand Builder"/></a><p>Through The Phone George LTD, we build brands that add value, create opportunities and inspire growth.</p><a className="footer-email" href={`mailto:${site.email}`}>{site.email}</a></div><div className="footer-links"><strong>Quick Links</strong>{nav.map(([label,id]) => <a key={id} href={`#${id}`}>{label}</a>)}</div><div className="footer-links"><strong>Our Brands</strong>{site.brands.map((brand) => <a key={brand.name} href={brand.href} target="_blank" rel="noreferrer">{brand.name}</a>)}</div><div className="footer-socials"><strong>Follow Promise</strong>{site.socials.map((social) => <a key={social.name} href={social.href} target="_blank" rel="noreferrer">{social.name} <ArrowRight size={13}/></a>)}</div></div><div className="footer-bottom"><span>© 2026 Promise George. All rights reserved.</span></div></footer>
  </>;
}
