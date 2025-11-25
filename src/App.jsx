import React, { useState, useEffect } from "react";

export default function App() {
  // ------------------ Artwork Data ------------------
  const initialArtworks = [
    {
      id: "a1",
      title: "Moonlit Blossom",
      priceBase: 60,
      image:
        "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?w=1200&q=80&auto=format&fit=crop",
      tags: ["floral", "digital"],
      sold: false,
      description: "Soft pastel floral with moon veins.",
    },
    {
      id: "a2",
      title: "Neon Cityscape",
      priceBase: 95,
      image:
        "https://images.unsplash.com/photo-1503602642458-232111445657?w=1200&q=80&auto=format&fit=crop",
      tags: ["city", "neon"],
      sold: false,
      description: "A dreamy neon skyline study.",
    },
    {
      id: "a3",
      title: "Quiet Lake",
      priceBase: 40,
      image:
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&q=80&auto=format&fit=crop",
      tags: ["landscape", "calm"],
      sold: true,
      description: "Original sold piece — tranquil waters.",
    },
    {
      id: "a4",
      title: "Custom Portrait Sample",
      priceBase: 120,
      image:
        "https://images.unsplash.com/photo-1542377287-2a2e23f8b3f4?w=1200&q=80&auto=format&fit=crop",
      tags: ["portrait", "commission"],
      sold: false,
      description: "Example of a customizable portrait.",
      customizable: true,
    },
  ];

  const sizes = [
    { id: "s", label: "Small (12x16)", multiplier: 1 },
    { id: "m", label: "Medium (18x24)", multiplier: 1.5 },
    { id: "l", label: "Large (24x36)", multiplier: 2.2 },
  ];

  const frames = [
    { id: "none", label: "No frame", price: 0 },
    { id: "wood", label: "Wood frame", price: 20 },
    { id: "gold", label: "Gold frame", price: 45 },
  ];

  // ------------------ State ------------------
  const [artworks] = useState(initialArtworks);
  const [query, setQuery] = useState("");
  const [filterTag, setFilterTag] = useState("all");
  const [onlyAvailable, setOnlyAvailable] = useState(true);

  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart_v1")) || [];
    } catch {
      return [];
    }
  });

  const [selectedArt, setSelectedArt] = useState(null);
  const [checkoutView, setCheckoutView] = useState(false);

  const [testimonials] = useState([
    {
      id: 1,
      name: "Rina K.",
      text: "Absolutely lovely — the colors and details are perfect.",
      rating: 5,
    },
    {
      id: 2,
      name: "Marco P.",
      text: "Quick response and a beautiful framed print arrived safe.",
      rating: 5,
    },
  ]);

  // Save cart to local storage
  useEffect(() => {
    localStorage.setItem("cart_v1", JSON.stringify(cart));
  }, [cart]);

  // ------------------ Utility Functions ------------------
  const calculatePrice = (base, { sizeId = "s", frameId = "none", customization = 0 } = {}) => {
    const size = sizes.find((s) => s.id === sizeId) || sizes[0];
    const frame = frames.find((f) => f.id === frameId) || frames[0];

    return Math.max(
      10,
      Math.round((base * size.multiplier + frame.price + customization) * 100) / 100
    );
  };

  const fmt = (v) => `$${v.toFixed(2)}`;

  const addToCart = (item) =>
    setCart((c) => [...c, { ...item, cartId: Date.now() + Math.random() }]);

  const removeCartItem = (cartId) =>
    setCart((c) => c.filter((i) => i.cartId !== cartId));

  const clearCart = () => setCart([]);

  const filtered = artworks.filter((a) => {
    if (onlyAvailable && a.sold) return false;
    if (filterTag !== "all" && !a.tags.includes(filterTag)) return false;
    if (query && !`${a.title} ${a.description} ${a.tags.join(" ")}`.toLowerCase().includes(query.toLowerCase()))
      return false;
    return true;
  });

  const handleCheckout = (details) => {
    console.log("Checkout:", details);
    clearCart();
    setCheckoutView(false);
    alert("Order placed (demo)");
  };

  // ------------------ UI ------------------
  return (
    <div className="min-h-screen bg-gradient-to-tr from-pink-50 via-white to-pink-25 text-gray-800">
      {/* HEADER */}
      <header className="sticky top-0 bg-white/70 backdrop-blur z-30">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-300 to-pink-500 flex items-center justify-center text-white font-bold shadow">
              DA
            </div>
            <div>
              <h1 className="font-semibold">Digital Artist</h1>
              <p className="text-xs text-pink-600">Soft & modern digital prints</p>
            </div>
          </div>

          <nav className="hidden md:flex gap-3 items-center">
            <a href="#gallery" className="text-sm hover:underline">Gallery</a>
            <a href="#sold" className="text-sm hover:underline">Sold</a>
            <a href="#custom" className="text-sm hover:underline">Custom</a>
            <a href="#about" className="text-sm hover:underline">About</a>
            <a href="#contact" className="text-sm hover:underline">Contact</a>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex border rounded-lg px-3 py-1 items-center gap-2 bg-white">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search artworks..."
                className="outline-none text-sm placeholder:text-gray-400"
              />
            </div>

            {/* CART BUTTON */}
            <button
              className="relative"
              onClick={() => setCheckoutView((s) => !s)}
              aria-label="Open Cart"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-pink-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 7M7 13l-2 6m5-6v6m6-6v6"
                />
              </svg>

              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-6xl mx-auto px-4 py-8">

        {/* HERO */}
        <section className="mb-8 grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold">
              Soft digital art, ready for your space.
            </h2>
            <p className="mt-3 text-gray-600">
              Originals, limited prints, and fully customizable commissions.
            </p>
            <div className="mt-4 flex gap-3">
              <a href="#gallery" className="px-4 py-2 rounded-lg bg-pink-600 text-white text-sm shadow">
                Browse Gallery
              </a>
              <a href="#custom" className="px-4 py-2 rounded-lg border text-sm">
                Custom Commissions
              </a>
            </div>
          </div>

          <div className="rounded-lg overflow-hidden shadow-lg">
            <img
              src={artworks[0].image}
              alt="hero"
              className="w-full h-72 object-cover"
            />
          </div>
        </section>

        {/* FILTERS */}
        <section className="mb-6 flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="flex gap-2 items-center">
            <label className="text-sm">Filter:</label>
            <select
              value={filterTag}
              onChange={(e) => setFilterTag(e.target.value)}
              className="text-sm rounded border p-1"
            >
              <option value="all">All</option>
              <option value="floral">Floral</option>
              <option value="city">City</option>
              <option value="portrait">Portrait</option>
              <option value="landscape">Landscape</option>
              <option value="commission">Commission</option>
            </select>

            <label className="flex items-center gap-2 text-sm ml-3">
              <input
                type="checkbox"
                checked={onlyAvailable}
                onChange={(e) => setOnlyAvailable(e.target.checked)}
              />
              Only available
            </label>
          </div>

          <div className="flex items-center gap-3">
            <div className="md:hidden">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                className="text-sm rounded border p-1"
              />
            </div>

            <div className="text-sm text-gray-600">{filtered.length} artworks</div>
          </div>
        </section>

        {/* GALLERY */}
        <section id="gallery" className="mb-12">
          <h3 className="text-2xl font-semibold mb-4">Gallery</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filtered.map((a) => (
              <article
                key={a.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={a.image}
                    alt={a.title}
                    className="w-full h-56 object-cover"
                  />
                  {a.sold && (
                    <span className="absolute top-3 left-3 bg-gray-800 text-white px-2 py-1 rounded text-xs">
                      SOLD
                    </span>
                  )}
                </div>

                <div className="p-4">
                  <h4 className="font-semibold">{a.title}</h4>
                  <p className="text-sm text-gray-500 mt-1">{a.description}</p>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="text-pink-600 font-medium">{fmt(a.priceBase)}</div>

                    <div className="flex gap-2">
                      <button
                        className="text-sm px-3 py-1 border rounded"
                        onClick={() => setSelectedArt(a)}
                      >
                        View
                      </button>

                      {!a.sold && (
                        <button
                          className="text-sm px-3 py-1 rounded bg-pink-600 text-white"
                          onClick={() => setSelectedArt(a)}
                        >
                          Buy
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* SOLD ITEMS */}
        <section id="sold" className="mb-12">
          <h3 className="text-2xl font-semibold mb-4">Sold Artworks</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {artworks
              .filter((a) => a.sold)
              .map((s) => (
                <div
                  key={s.id}
                  className="bg-white rounded-lg overflow-hidden shadow-sm"
                >
                  <img
                    src={s.image}
                    alt={s.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-3">
                    <h4 className="font-semibold">{s.title}</h4>
                    <p className="text-xs text-gray-500 mt-1">{s.description}</p>
                  </div>
                </div>
              ))}
          </div>
        </section>

        {/* CUSTOM COMMISSIONS */}
        <section id="custom" className="mb-12">
          <h3 className="text-2xl font-semibold mb-4">Custom & Commissioned Artworks</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* FORM */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="font-semibold">Commission a custom piece</h4>
              <p className="mt-2 text-sm text-gray-500">
                Choose size, frame, and describe what you'd like.
              </p>

              <CustomForm
                artwork={{ title: "Custom Portrait", priceBase: 120 }}
                sizes={sizes}
                frames={frames}
                calculatePrice={calculatePrice}
                onAdd={(item) => addToCart(item)}
                fmt={fmt}
              />
            </div>

            {/* SIDE INFO */}
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h5 className="font-semibold">Why commission?</h5>
                <ul className="mt-2 text-sm text-gray-600 list-disc list-inside">
                  <li>Custom color palette & composition</li>
                  <li>High-resolution files suitable for print</li>
                  <li>Print & framing options</li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h5 className="font-semibold">Turnaround</h5>
                <p className="text-sm text-gray-600">
                  Typical commission time: 1–3 weeks depending on complexity.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="mb-12">
          <h3 className="text-2xl font-semibold mb-4">Testimonials</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {testimonials.map((t) => (
              <div key={t.id} className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                    {t.name[0]}
                  </div>

                  <div>
                    <div className="font-semibold">{t.name}</div>
                    <div className="text-xs text-gray-500">
                      {"★".repeat(t.rating)}
                    </div>
                  </div>
                </div>

                <p className="mt-3 text-sm text-gray-600">{t.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="mb-12 bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-2xl font-semibold mb-2">About the Artist</h3>
          <p className="text-sm text-gray-600">
            Hello! I'm a digital artist who works primarily in soft pastels and
            light-focused compositions...
          </p>
        </section>

        {/* CONTACT */}
        <section id="contact" className="mb-16 grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-2xl font-semibold mb-2">Contact</h3>
            <p className="text-sm text-gray-600">
              Questions? Send a message below.
            </p>

            <ContactForm onSend={(d) => alert("Message sent: " + JSON.stringify(d))} />

            <div className="mt-4 text-sm text-gray-600">
              <div>Email: hello@digitalartist.com</div>
              <div>Instagram: @digitalartist</div>
              <div>Location: Remote / Ships worldwide</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h4 className="font-semibold">Newsletter</h4>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Joined newsletter (demo)");
                e.target.reset();
              }}
              className="mt-3 flex gap-2"
            >
              <input
                name="email"
                type="email"
                placeholder="you@email.com"
                className="flex-1 rounded border p-2 text-sm"
                required
              />
              <button className="px-4 py-2 rounded bg-pink-600 text-white text-sm">
                Join
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="py-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Digital Artist — Built with care.
      </footer>

      {/* ================= CART / CHECKOUT DRAWER ================= */}
      <div
        className={`fixed right-4 bottom-4 md:bottom-8 md:right-8 w-full md:w-96 transition-all ${
          checkoutView ? "translate-y-0" : "translate-y-10 opacity-0"
        }`}
      >
        <div className="bg-white rounded-lg shadow-lg p-4">
          <div className="flex items-center justify-between">
            <div className="font-semibold">Cart</div>
            <div className="text-sm text-gray-500">{cart.length} items</div>
          </div>

          <div className="mt-3 max-h-64 overflow-auto">
            {cart.length === 0 && (
              <div className="text-sm text-gray-500">Your cart is empty.</div>
            )}

            {cart.map((c) => (
              <div key={c.cartId} className="flex items-center gap-3 border-b py-2">
                <img
                  src={c.image}
                  className="w-14 h-14 object-cover rounded"
                  alt="cart"
                />

                <div className="flex-1">
                  <div className="font-semibold text-sm">{c.title}</div>
                  <div className="text-xs text-gray-500">
                    {c.sizeLabel} • {c.frameLabel}
                  </div>
                </div>

                <div className="text-sm font-medium">{fmt(c.price)}</div>

                <button
                  onClick={() => removeCartItem(c.cartId)}
                  className="ml-2 text-xs text-gray-400"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-3 flex items-center justify-between">
            <div className="font-semibold">Total</div>
            <div className="font-semibold">
              {fmt(cart.reduce((s, it) => s + (it.price || 0), 0))}
            </div>
          </div>

          <div className="mt-3 flex gap-2">
            <button
              onClick={() => setCheckoutView(false)}
              className="flex-1 border rounded px-3 py-2"
            >
              Continue shopping
            </button>

            <button
              onClick={() => {
                if (cart.length === 0) return alert("Cart empty");
                setCheckoutView(true);
              }}
              className="flex-1 rounded px-3 py-2 bg-pink-600 text-white"
            >
              Checkout
            </button>

            <button onClick={clearCart} className="px-3 py-2 text-sm text-gray-500">
              Clear
            </button>
          </div>

          {checkoutView && (
            <div id="checkout-form" className="mt-4 border-t pt-4">
              <h4 className="font-semibold">Checkout (demo)</h4>

              <CheckoutForm
                onCheckout={handleCheckout}
                total={cart.reduce((s, it) => s + (it.price || 0), 0)}
              />
            </div>
          )}
        </div>
      </div>

      {/* ART MODAL */}
      {selectedArt && (
        <ArtModal
          art={selectedArt}
          onClose={() => setSelectedArt(null)}
          sizes={sizes}
          frames={frames}
          calculatePrice={calculatePrice}
          onAdd={(it) => {
            addToCart(it);
            setSelectedArt(null);
          }}
          fmt={fmt}
        />
      )}
    </div>
  );
}

/* ======================================================================
   INDIVIDUAL COMPONENTS
   ====================================================================== */

function ArtModal({ art, onClose, sizes, frames, calculatePrice, onAdd, fmt }) {
  const [sizeId, setSizeId] = useState(sizes[0].id);
  const [frameId, setFrameId] = useState(frames[0].id);
  const [customFee, setCustomFee] = useState(0);

  const price = calculatePrice(art.priceBase, {
    sizeId,
    frameId,
    customization: Number(customFee),
  });

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-3xl w-full overflow-auto">
        <div className="flex items-start gap-4">
          <img
            src={art.image}
            alt={art.title}
            className="w-1/2 object-cover h-72 rounded-l"
          />

          <div className="p-4 flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-xl font-semibold">{art.title}</h4>
                <p className="text-sm text-gray-500 mt-1">{art.description}</p>
              </div>

              <button onClick={onClose} className="text-gray-400">✕</button>
            </div>

            <div className="mt-4 space-y-3">
              {/* Size */}
              <div>
                <label className="text-sm">Size</label>
                <select
                  value={sizeId}
                  onChange={(e) => setSizeId(e.target.value)}
                  className="block mt-1 rounded border p-2 w-full"
                >
                  {sizes.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Frame */}
              <div>
                <label className="text-sm">Frame</label>
                <select
                  value={frameId}
                  onChange={(e) => setFrameId(e.target.value)}
                  className="block mt-1 rounded border p-2 w-full"
                >
                  {frames.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Fee */}
              <div>
                <label className="text-sm">Customization fee (optional)</label>
                <input
                  type="number"
                  min="0"
                  value={customFee}
                  onChange={(e) => setCustomFee(e.target.value)}
                  className="block mt-1 rounded border p-2 w-full"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">Price preview</div>
                <div className="text-lg font-semibold text-pink-600">
                  {fmt(price)}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() =>
                    onAdd({
                      artId: art.id,
                      image: art.image,
                      title: art.title,
                      sizeId,
                      sizeLabel: sizes.find((s) => s.id === sizeId).label,
                      frameId,
                      frameLabel: frames.find((f) => f.id === frameId).label,
                      customization: Number(customFee),
                      price,
                    })
                  }
                  className="flex-1 bg-pink-600 text-white rounded p-2"
                >
                  Add to cart
                </button>

                <button onClick={onClose} className="flex-1 border rounded p-2">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CustomForm({ artwork, sizes, frames, calculatePrice, onAdd, fmt }) {
  const [sizeId, setSizeId] = useState(sizes[0].id);
  const [frameId, setFrameId] = useState(frames[0].id);
  const [notes, setNotes] = useState("");
  const [customFee, setCustomFee] = useState(0);

  const price = calculatePrice(artwork.priceBase, {
    sizeId,
    frameId,
    customization: Number(customFee),
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        onAdd({
          artId: "custom",
          image: artwork.image,
          title: artwork.title,
          sizeId,
          sizeLabel: sizes.find((s) => s.id === sizeId).label,
          frameId,
          frameLabel: frames.find((f) => f.id === frameId).label,
          customization: Number(customFee),
          notes,
          price,
        });

        alert("Added custom commission to cart (demo)");
      }}
      className="mt-4 space-y-3"
    >
      <div>
        <label className="text-sm">Size</label>
        <select
          value={sizeId}
          onChange={(e) => setSizeId(e.target.value)}
          className="block mt-1 rounded border p-2 w-full"
        >
          {sizes.map((s) => (
            <option key={s.id} value={s.id}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-sm">Frame</label>
        <select
          value={frameId}
          onChange={(e) => setFrameId(e.target.value)}
          className="block mt-1 rounded border p-2 w-full"
        >
          {frames.map((f) => (
            <option key={f.id} value={f.id}>
              {f.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-sm">Customization notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Color palette, subject..."
          className="block mt-1 rounded border p-2 w-full"
          rows={4}
        />
      </div>

      <div>
        <label className="text-sm">Extra fee (optional)</label>
        <input
          type="number"
          value={customFee}
          onChange={(e) => setCustomFee(e.target.value)}
          className="block mt-1 rounded border p-2 w-full"
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">Estimated price</div>
        <div className="text-lg font-semibold text-pink-600">{fmt(price)}</div>
      </div>

      <div className="flex gap-2">
        <button type="submit" className="flex-1 bg-pink-600 text-white rounded p-2">
          Add commission to cart
        </button>

        <button
          type="button"
          onClick={() => {
            setNotes("");
            setCustomFee(0);
          }}
          className="flex-1 border rounded p-2"
        >
          Reset
        </button>
      </div>
    </form>
  );
}

function ContactForm({ onSend }) {
  const [sending, setSending] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const data = {
          name: e.target.name.value,
          email: e.target.email.value,
          message: e.target.message.value,
        };

        setSending(true);
        setTimeout(() => {
          setSending(false);
          onSend(data);
          e.target.reset();
        }, 700);
      }}
      className="mt-4 space-y-3"
    >
      <input name="name" placeholder="Your name" className="block w-full rounded border p-2" required />
      <input name="email" type="email" placeholder="Email" className="block w-full rounded border p-2" required />
      <textarea name="message" placeholder="Message" className="block w-full rounded border p-2" rows={4} required />

      <div className="flex gap-2">
        <button type="submit" className="px-4 py-2 rounded bg-pink-600 text-white">
          {sending ? "Sending..." : "Send message"}
        </button>

        <button type="reset" className="px-4 py-2 rounded border">
          Clear
        </button>
      </div>
    </form>
  );
}

function CheckoutForm({ onCheckout, total }) {
  const [loading, setLoading] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setLoading(true);

        const details = {
          name: e.target.name.value,
          email: e.target.email.value,
          address: e.target.address.value,
          total,
        };

        setTimeout(() => {
          setLoading(false);
          onCheckout(details);
        }, 900);
      }}
      className="space-y-2"
    >
      <input name="name" placeholder="Full name" className="block w-full rounded border p-2" required />
      <input name="email" type="email" placeholder="Email" className="block w-full rounded border p-2" required />
      <input name="address" placeholder="Shipping address" className="block w-full rounded border p-2" required />

      <div className="flex items-center justify-between">
        <div className="text-sm">Pay securely</div>
        <div className="font-semibold">${total.toFixed(2)}</div>
      </div>

      <button type="submit" disabled={loading} className="w-full bg-pink-600 text-white rounded p-2">
        {loading ? "Processing..." : "Place order"}
      </button>
    </form>
  );
}
