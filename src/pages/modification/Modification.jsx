import { useEffect, useState } from "react";
import "./Modification.css";

const WHATSAPP_NUMBER = "91XXXXXXXXXX"; // apna WhatsApp number yahan daalo (country code ke saath)

const inr = (n) => `₹${Math.round(n).toLocaleString("en-IN")}`;
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

// Gaadi ke type ke hisaab se indicative price multiplier
const vehicles = { Hatchback: 1, Sedan: 1.1, SUV: 1.25, "Luxury Car": 1.5 };

// Har option ki photo: /images/mods/<option-name-slug>.jpg  (na mile to category ki photo dikhti hai)
const categories = [
  { id: "interior", title: "Interior Customisation", desc: "Seats, ambient lighting, dashboard and premium finishes.", image: "/wash/exterior.jpeg", items: [
    { name: "Seat Upholstery", price: 8500, desc: "Custom leatherette seat covers, stitched to fit your seats." },
    { name: "Ambient Lighting", price: 3500, desc: "Colour LED strips along the dashboard and doors." },
    { name: "Premium Floor Mats", price: 2500, desc: "Custom-cut 7D mats that cover the whole floor." },
    { name: "Steering Wheel Wrap", price: 2200, desc: "Leather or carbon-look wrap for a better grip." },
    { name: "Dashboard Trim Kit", price: 5500, desc: "Wood, carbon or matte trims for the dashboard." } ] },
  { id: "exterior", title: "Exterior Styling", desc: "Body kits, spoilers, wraps and a distinctive road presence.", image: "/images/mod-exterior.jpg", items: [
    { name: "Body Kit Installation", price: 15000, desc: "Front and rear bumper lips with side skirts." },
    { name: "Roof Wrapping", price: 6500, desc: "Gloss black, matte or carbon vinyl wrap for the roof." },
    { name: "Spoiler Installation", price: 4500, desc: "Sporty rear spoiler, fitted and finished." },
    { name: "Full Body Wrap", price: 38000, desc: "Complete colour change with premium vinyl." },
    { name: "Side Skirts", price: 5500, desc: "Lower body panels for a sportier side profile." } ] },
  { id: "wheels", title: "Alloy Wheels", desc: "Give your car a fresh stance with stylish wheel upgrades.", image: "/images/mod-wheels.jpg", items: [
    { name: "Alloy Wheel Upgrade", price: 22000, desc: "A full set of 4 stylish alloys (price depends on size)." },
    { name: "Wheel Painting", price: 4500, desc: "Re-colour your existing wheels in the finish you pick." },
    { name: "Caliper Painting", price: 3000, desc: "Heat-resistant paint in red, yellow or other colours." },
    { name: "Tyre Upgrade", price: 16000, desc: "Wider or better-grip tyres for your new wheels." },
    { name: "Custom Centre Caps", price: 1500, desc: "Branded or plain caps that match your wheels." } ] },
  { id: "lighting", title: "Lighting & Accessories", desc: "Upgrade your car with modern lighting and accessories.", image: "/images/mod-lights.jpg", items: [
    { name: "LED Headlights", price: 6500, desc: "Brighter, whiter LED headlight bulbs or units." },
    { name: "Fog Lamp Upgrade", price: 4000, desc: "Clearer view in fog and rain with LED fog lamps." },
    { name: "Reverse Camera", price: 3500, desc: "Camera with guide lines for easier parking." },
    { name: "DRL Strips", price: 3000, desc: "Daytime running light strips for a modern look." },
    { name: "Parking Sensors", price: 2500, desc: "Front or rear sensors that beep as you get close." } ] },
];

const packages = [
  { name: "Essential", subtitle: "A fresh new look", price: 9999, features: ["Interior detailing", "Premium floor mats", "Basic lighting upgrade"] },
  { name: "Sport", subtitle: "Bold and sporty", price: 24999, features: ["Sporty exterior styling", "Lighting upgrade", "Wheel styling consultation"] },
  { name: "Signature", subtitle: "A personalised build", price: 44999, features: ["Interior customisation", "Exterior styling consultation", "Premium accessories"] },
];

const products = [
  { name: "Premium Seat Covers", category: "Interior", price: 4999, image: "/images/mod-interior.jpg" },
  { name: "Sporty Rear Spoiler", category: "Exterior", price: 3499, image: "/images/mod-exterior.jpg" },
  { name: "LED Headlight Set", category: "Lighting", price: 5999, image: "/images/mod-lights.jpg" },
];

const steps = [
  ["Tell us your vision", "Share your car details, preferred style and budget."],
  ["Plan your build", "Discuss compatible upgrades, products and estimates."],
  ["Confirm the details", "Approve the quotation, products and installation plan."],
  ["Personalise your car", "Get the agreed work completed by our team."],
];

const faqs = [
  ["Can I customise my car within a fixed budget?", "Yes. Share your budget and preferred upgrades with our team. We will suggest suitable options and confirm a quotation before work begins."],
  ["Are the prices shown final?", "No. Prices on this page are indicative. Actual pricing depends on your vehicle, parts, availability and fitting requirements."],
  ["Can every upgrade fit every car?", "No. Compatibility varies by make, model and variant. Our team verifies fitment before you confirm an upgrade."],
  ["Can I request a custom package?", "Yes. Describe your requirements in the enquiry form and we will suggest a combination for your vehicle and budget."],
];

function Img({ src, alt }) {
  return (
  <img 
  src={src}
   alt={alt}
    loading="lazy"
     onError={(e) => 
        { e.currentTarget.style.display = "none"; }} />
);
}

function OptionImg({ name, fallback }) {
  const [src, setSrc] = useState(`/images/mods/${slug(name)}.jpg`);

  
  return (
    <img
      src={src}
      alt={name}
      loading="lazy"
      onError={(e) => (src !== fallback ? setSrc(fallback) : (e.currentTarget.style.visibility = "hidden"))}
    />
  );
}

function Modification() {
  const [car, setCar] = useState("Hatchback");
  const [mods, setMods] = useState([]);
  const [cart, setCart] = useState([]); // { ...product, qty }
  const [openFaq, setOpenFaq] = useState(0);
  const [sent, setSent] = useState(false);
 

  const [form, setForm] = useState({ name: ""
    , phone: ""
    , car: ""
    , requirement: "" }
);


const setField = (key) => (e) => { setForm((f) => ({ ...f, [key]: e.target.value })); setSent(false); };



const submitEnquiry = (e) => {
    e.preventDefault();
    const text = `Hi Rahul Motors, I'd like a quotation.\n Name: ${form.name}\nPhone: ${form.phone}\nCar: ${form.car}\nRequirement: ${form.requirement}`;
   
   
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
    setSent(true);


  };

  
  const [preview, setPreview] = useState(null); // { item, fallback }
  useEffect(() => {
    if (!preview) return;
  
    const onKey = (e) => e.key === "@" && setPreview(null);
    
    window.addEventListener("keydown", onKey);

    return () => window.removeEventListener("keydown", onKey);
  }, [preview]);




  const multiplier = vehicles[car];
  const modsTotal = mods.reduce((s, m) => s + m.price, 0) * multiplier;
  const cartCount = cart.reduce((s, p) => s + p.qty, 0);
  const cartTotal = cart.reduce((s, p) => s + p.qty * p.price, 0);
  const isOn = (item) => mods.some((m) => m.name === item.name);

  const goTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const fillAndGo = (requirement) => { setForm((f) => ({ ...f, requirement })); setSent(false); goTo("mod-enquiry"); };

  const toggleMod = (item) =>
    setMods((prev) => (prev.some((m) => m.name === item.name) ? prev.filter((m) => m.name !== item.name) : [...prev, item]));

  const addToCart = (product) =>
    setCart((prev) =>
      prev.some((p) => p.name === product.name)
        ? prev.map((p) => (p.name === product.name ? { ...p, qty: p.qty + 1 } : p))
        : [...prev, { ...product, qty: 1 }]
    );

  const changeQty = (name, delta) =>
    setCart((prev) => prev.map((p) => (p.name === name ? { ...p, qty: p.qty + delta } : p)).filter((p) => p.qty > 0));

  const requestQuote = () =>
    fillAndGo(`${car} build: ${mods.map((m) => m.name).join(", ")}. Estimated total: ${inr(modsTotal)}`);


  return (
    <main className="mod-page">
      {/* HERO */}
      <section className="mod-hero">
        <div className="mod-hero-visual"><Img src="/frontend/public/wash/exterior.jpeg" alt="Car customisation at Rahul Motors" /></div>
        <div className="mod-wrap mod-hero-content">
          <span className="mod-eyebrow">Rahul Motors by GLS Group</span>
          <h1>Your car.<br /><span>Your style.</span></h1>
          <p>Premium car customisation with expert installation. Pick your upgrades, see an estimate, and talk to our team.</p>
          <div className="mod-actions">
            <button className="mod-btn mod-btn-primary" onClick={() => goTo("builder")}>Build my car</button>
            <button className="mod-btn mod-btn-outline" onClick={() => goTo("mod-categories")}>Explore services</button>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mod-section mod-wrap" id="mod-categories">
        <div className="mod-heading">
          <h2>Choose your <span>upgrade.</span></h2>
          <p>Explore our services and select what suits your car.</p>
        </div>
        <div className="mod-grid mod-grid-2">
          {categories.map((c) => (
            <article className="mod-card" key={c.id}>
              <div className="mod-card-img"><Img src={c.image} alt={c.title} /></div>
              <div className="mod-card-body">
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
                <button className="mod-link" onClick={() => goTo(`${c.id}-services`)}>See options and prices</button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* BUILDER */}
      <section className="mod-band" id="builder">
        <div className="mod-section mod-wrap">
          <div className="mod-heading">
            <h2>Build your <span>own setup.</span></h2>
            <p>Select your vehicle type and the upgrades you want. Your estimate updates automatically.</p>
          </div>
          <div className="mod-builder">
            <div>
              <label className="mod-label" htmlFor="mod-car-type">Vehicle type</label>
              <select id="mod-car-type" value={car} onChange={(e) => setCar(e.target.value)}>
                {Object.keys(vehicles).map((v) => <option key={v}>{v}</option>)}
              </select>

              {categories.map((c) => (
                <div className="mod-group" id={`${c.id}-services`} key={c.id}>
                  <h3>{c.title}</h3>
                  {c.items.map((item) => {
                    const on = isOn(item);
                    return (
                      <div className={`mod-option ${on ? "is-on" : ""}`} key={item.name}>
                        <button type="button" className="mod-thumb" onClick={() => setPreview({ item, fallback: c.image })} aria-label={`View photo of ${item.name}`}>
                          <OptionImg name={item.name} fallback={c.image} />
                        </button>
                        <div className="mod-option-info">
                          <span className="mod-option-name">{item.name}</span>
                          <small>{item.desc}</small>
                          <button type="button" className="mod-link" onClick={() => setPreview({ item, fallback: c.image })}>View photo</button>
                        </div>
                        <div className="mod-option-buy">
                          <strong>{inr(item.price * multiplier)}</strong>
                          <button type="button" className={`mod-btn ${on ? "mod-btn-primary" : "mod-btn-outline"}`} aria-pressed={on} onClick={() => toggleMod(item)}>
                            {on ? "Added ✓" : "Add"}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            <aside className="mod-summary">
              <h3>Build summary</h3>
              <p className="mod-small">Vehicle: <strong>{car}</strong></p>
              {mods.length === 0 ? (
                <p className="mod-small">No upgrades selected yet. Tap Add on any option to start your estimate.</p>
              ) : (
                <ul className="mod-lines">
                  {mods.map((m) => <li key={m.name}><span>{m.name}</span><strong>{inr(m.price * multiplier)}</strong></li>)}
                </ul>
              )}
              <div className="mod-total"><span>Estimated total</span><strong>{inr(modsTotal)}</strong></div>
              <p className="mod-note">Indicative prices only. Final cost depends on vehicle compatibility, products and fitting.</p>
              <button className="mod-btn mod-btn-primary mod-full" disabled={mods.length === 0} onClick={requestQuote}>Request a quote</button>
              {mods.length > 0 && <button className="mod-btn mod-ghost mod-full" onClick={() => setMods([])}>Clear selections</button>}
            </aside>
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section className="mod-section mod-wrap">
        <div className="mod-heading">
          <h2>Choose your <span>package.</span></h2>
          <p>Starting-price examples to help you plan your build.</p>
        </div>
        <div className="mod-grid mod-grid-3">
          {packages.map((p, i) => (
            <article className={`mod-card mod-pack ${i === 1 ? "is-featured" : ""}`} key={p.name}>
              {i === 1 && <span className="mod-badge">Most popular</span>}
              <h3>{p.name}</h3>
              <p>{p.subtitle}</p>
              <div className="mod-price"><strong>{inr(p.price)}</strong><span>starting from</span></div>
              <ul>{p.features.map((f) => <li key={f}>{f}</li>)}</ul>
              <button className="mod-btn mod-btn-outline mod-full" onClick={() => fillAndGo(`${p.name} Package`)}>Enquire about this package</button>
            </article>
          ))}
        </div>
        <p className="mod-note mod-center">Package prices are illustrative, not fixed quotations. Final pricing is confirmed by Rahul Motors.</p>
      </section>

      {/* PRODUCTS */}
      <section className="mod-section mod-wrap">
        <div className="mod-heading">
          <h2>Popular <span>upgrades.</span></h2>
          <p className="mod-cart-count">Cart: <strong>{cartCount} {cartCount === 1 ? "item" : "items"}</strong> · <strong>{inr(cartTotal)}</strong></p>
        </div>
        <div className="mod-grid mod-grid-3">
          {products.map((p) => (
            <article className="mod-card" key={p.name}>
              <div className="mod-card-img mod-card-img-sm"><Img src={p.image} alt={p.name} /><span className="mod-tag">{p.category}</span></div>
              <div className="mod-card-body mod-row">
                <div><h3>{p.name}</h3><strong>{inr(p.price)}</strong></div>
                <button className="mod-btn mod-btn-outline" onClick={() => addToCart(p)}>Add</button>
              </div>
            </article>
          ))}
        </div>

        {cart.length > 0 && (
          <div className="mod-cart">
            <ul className="mod-lines">
              {cart.map((p) => (
                <li key={p.name}>
                  <span>{p.name}</span>
                  <span className="mod-qty">
                    <button aria-label={`Decrease ${p.name}`} onClick={() => changeQty(p.name, -1)}>−</button>
                    {p.qty}
                    <button aria-label={`Increase ${p.name}`} onClick={() => changeQty(p.name, 1)}>+</button>
                  </span>
                  <strong>{inr(p.price * p.qty)}</strong>
                </li>
              ))}
            </ul>
            <p className="mod-note">Items are saved on this page only. No order is placed.</p>
            <button className="mod-btn mod-btn-primary" onClick={() => fillAndGo(`Product enquiry: ${cart.map((p) => `${p.name} x${p.qty}`).join(", ")}`)}>Enquire about these products</button>
          </div>
        )}
      </section>

      {/* PROCESS */}
      <section className="mod-section mod-wrap mod-top-line">
        <div className="mod-heading"><h2>A simple process. <span>A personal result.</span></h2></div>
        <ol className="mod-grid mod-grid-4 mod-steps">
          {steps.map(([title, text], i) => (
            <li key={title}><span>{i + 1}</span><h3>{title}</h3><p>{text}</p></li>
          ))}
        </ol>
      </section>

      {/* FAQ */}
      <section className="mod-section mod-wrap mod-faq">
        <h2>Frequently asked <span>questions.</span></h2>
        <div>
          {faqs.map(([q, a], i) => (
            <div className="mod-faq-item" key={q}>
              <button type="button" aria-expanded={openFaq === i} onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                <span>{q}</span><strong>{openFaq === i ? "−" : "+"}</strong>
              </button>
              {openFaq === i && <p>{a}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* ENQUIRY */}
      <section className="mod-band" id="mod-enquiry">
        <div className="mod-section mod-wrap mod-enquiry">
          <div>
            <h2>Your vision. <span>Our workshop.</span></h2>
            <p>Tell us about your car and the modifications you have in mind. We will discuss compatible options and prepare a quotation.</p>
          </div>
          <form className="mod-form" onSubmit={submitEnquiry}>
            <h3>Request a quotation</h3>
            <label>Your name<input required value={form.name} onChange={setField("name")} placeholder="Enter your name" autoComplete="name" /></label>
            <label>Phone number<input required type="tel" inputMode="numeric" pattern="[0-9]{10}" title="Enter a 10-digit mobile number" value={form.phone} onChange={setField("phone")} placeholder="10-digit mobile number" autoComplete="tel" /></label>
            <label>Car make and model<input required value={form.car} onChange={setField("car")} placeholder="e.g. Hyundai Creta 2024" /></label>
            <label>Your requirements<textarea required rows="4" value={form.requirement} onChange={setField("requirement")} placeholder="Tell us about the modifications you want" /></label>
            <button className="mod-btn mod-btn-primary mod-full" type="submit">Send on WhatsApp</button>
            {sent && <p className="mod-success" role="status">WhatsApp has opened with your details. Press send there to reach Rahul Motors.</p>}
          </form>
        </div>
      </section>

      {/* PHOTO PREVIEW */}
      {preview && (
        <div className="mod-modal" onClick={() => setPreview(null)}>
          <div className="mod-modal-box" role="dialog" aria-modal="true" aria-label={preview.item.name} onClick={(e) => e.stopPropagation()}>
            <div className="mod-modal-img"><OptionImg name={preview.item.name} fallback={preview.fallback} /></div>
            <div className="mod-modal-info">
              <h3>{preview.item.name}</h3>
              <p>{preview.item.desc}</p>
              <strong>{inr(preview.item.price * multiplier)}</strong>
              <p className="mod-note">Price for {car}. Final cost is confirmed after checking your car.</p>
              <button className={`mod-btn ${isOn(preview.item) ? "mod-btn-outline" : "mod-btn-primary"} mod-full`} onClick={() => toggleMod(preview.item)}>
                {isOn(preview.item) ? "Remove from my build" : "Add to my build"}
              </button>
              <button className="mod-btn mod-ghost mod-full" onClick={() => setPreview(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Modification;