import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import API_BASE_URL from "./config/api";

// Carousel component (basic implementation)
function Carousel({ items, itemRenderer, perPage }) {
  const [page, setPage] = useState(0);
  const itemsPerPage = perPage.md || perPage.sm || perPage.base || 1;
  const pageCount = Math.ceil(items.length / itemsPerPage);

  const prevPage = () => setPage((p) => Math.max(0, p - 1));
  const nextPage = () => setPage((p) => Math.min(pageCount - 1, p + 1));

  useEffect(() => {
    if (page >= pageCount) setPage(0);
  }, [pageCount, page]);

  const startIndex = page * itemsPerPage;
  const visibleItems = items.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      <div className="flex gap-4 overflow-hidden">
        {visibleItems.map(itemRenderer)}
      </div>
      <div className="flex justify-center mt-3 gap-3">
        <button
          onClick={prevPage}
          disabled={page === 0}
          className="px-3 py-1 rounded bg-pink-100 disabled:opacity-50"
        >
          Prev
        </button>
        <button
          onClick={nextPage}
          disabled={page === pageCount - 1}
          className="px-3 py-1 rounded bg-pink-100 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

// CustomForm component
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

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      artId: "custom",
      image: artwork.image,
      title: artwork.title,
      sizeId,
      sizeLabel: sizes.find((s) => s.id === sizeId).label,
      frameId,
      frameLabel: frames.find((f) => f.id === frameId).label,
      notes,
      customization: Number(customFee),
      price,
    });
    setSizeId(sizes[0].id);
    setFrameId(frames[0].id);
    setNotes("");
    setCustomFee(0);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-3">
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
          min={0}
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
            setSizeId(sizes[0].id);
            setFrameId(frames[0].id);
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

// ContactForm component
function ContactForm({ onSend }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSend({ name, email, message });
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full border p-2 rounded"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full border p-2 rounded"
      />
      <textarea
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
        className="w-full border p-2 rounded"
        rows={4}
      />
      <button type="submit" className="bg-pink-600 text-white px-4 py-2 rounded">
        Send Message
      </button>
    </form>
  );
}

// NewsletterForm component
function NewsletterForm({ onSubscribe }) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubscribe(email);
    setEmail("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 max-w-md">
      <input
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="flex-1 border p-2 rounded"
      />
      <button type="submit" className="bg-pink-600 text-white px-4 rounded">
        Subscribe
      </button>
    </form>
  );
}

// CheckoutForm component
function CheckoutForm({ onCheckout, total }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onCheckout({ name, email, phone });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 mt-3">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full border p-2 rounded"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full border p-2 rounded"
      />
      <input
        type="tel"
        placeholder="Phone (optional)"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full border p-2 rounded"
      />
      <div className="text-right font-semibold text-lg mb-2">
        Total: ${total.toFixed(2)}
      </div>
      <button type="submit" className="w-full bg-pink-600 text-white p-2 rounded">
        Place Order
      </button>
    </form>
  );
}

// ArtModal component
function ArtModal({ art, onClose, sizes, frames, calculatePrice, onAdd, fmt }) {
  const [sizeId, setSizeId] = useState(sizes[0].id);
  const [frameId, setFrameId] = useState(frames[0].id);

  const price = calculatePrice(art.priceBase, { sizeId, frameId });

  const handleAdd = () => {
    onAdd({
      artId: art.id,
      title: art.title,
      image: art.image,
      sizeId,
      sizeLabel: sizes.find((s) => s.id === sizeId).label,
      frameId,
      frameLabel: frames.find((f) => f.id === frameId).label,
      price,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-xl w-full overflow-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-6 text-gray-600 text-3xl font-bold"
          aria-label="Close"
        >
          ×
        </button>
        <div className="flex flex-col md:flex-row gap-6 p-6">
          <img
            src={art.image}
            alt={art.title}
            className="w-full md:w-1/2 object-cover rounded-lg"
          />
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-semibold mb-4">{art.title}</h3>
              <p className="mb-4 text-gray-600">{art.description}</p>
              <div className="space-y-4">
                <div>
                  <label className="block mb-1 font-semibold">Size</label>
                  <select
                    className="w-full border rounded p-2"
                    value={sizeId}
                    onChange={(e) => setSizeId(e.target.value)}
                  >
                    {sizes.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block mb-1 font-semibold">Frame</label>
                  <select
                    className="w-full border rounded p-2"
                    value={frameId}
                    onChange={(e) => setFrameId(e.target.value)}
                  >
                    {frames.map((f) => (
                      <option key={f.id} value={f.id}>
                        {f.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <div className="text-lg font-bold text-pink-600">{fmt(price)}</div>
              <button
                onClick={handleAdd}
                className="bg-pink-600 text-white px-6 py-2 rounded"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MainApp() {
  const initialArtworks = [
    // ... same initial artworks array as above ...
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
  const [viewImageOnly, setViewImageOnly] = useState(null);
  const [checkoutView, setCheckoutView] = useState(false);

  const [testimonials] = useState([
    { id: 1, name: "Rina K.", text: "Absolutely lovely — the colors and details are perfect.", rating: 5 },
    { id: 2, name: "Marco P.", text: "Quick response and a beautiful framed print arrived safe.", rating: 5 },
    { id: 3, name: "Elsa W.", text: "Commission exceeded expectations — great communication.", rating: 5 },
    { id: 4, name: "Jon D.", text: "High-quality print and fast shipping.", rating: 4 },
    { id: 5, name: "Maya L.", text: "Colors are gorgeous in person.", rating: 5 },
    { id: 6, name: "Sam R.", text: "Perfect gift — the recipient loved it.", rating: 5 },
    { id: 7, name: "Priya S.", text: "Smooth process from concept to delivery.", rating: 5 },
    { id: 8, name: "Luca B.", text: "Beautiful framing and packaging.", rating: 4 },
  ]);

  useEffect(() => {
    localStorage.setItem("cart_v1", JSON.stringify(cart));
  }, [cart]);

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

  const filtered = useMemo(() => {
    return artworks.filter((a) => {
      if (onlyAvailable && a.sold) return false;
      if (filterTag !== "all" && !a.tags.includes(filterTag)) return false;
      if (query && !`${a.title} ${a.description} ${a.tags.join(" ")}`.toLowerCase().includes(query.toLowerCase()))
        return false;
      return true;
    });
  }, [artworks, onlyAvailable, filterTag, query]);

  // Popup state and control with 60% black overlay and blur background behind popup
  const [popup, setPopup] = useState({ show: false, message: "" });

  const showPopup = (message) => {
    setPopup({ show: true, message });
    setTimeout(() => setPopup({ show: false, message: "" }), 3500);
  };

  const [customFormResetKey, setCustomFormResetKey] = useState(Date.now());

  const handleCustomAddToCart = (item) => {
    addToCart(item);
    setCustomFormResetKey(Date.now());
    showPopup("Added custom artwork to cart!");
  };

  const handleCheckout = async (details) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/order`, {
        name: details.name,
        email: details.email,
        phone: details.phone || "",
        items: cart,
        totalPrice: cart.reduce((sum, item) => sum + item.price, 0),
      });
      if (response.data.success) {
        showPopup("Order placed successfully!");
        clearCart();
        setCheckoutView(false);
        setCustomFormResetKey(Date.now());
      } else {
        showPopup("Failed to place order. Try again.");
      }
    } catch (error) {
      showPopup("Something went wrong. Try again!");
      console.error(error);
    }
  };

  const handleSendMessage = async (data) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/contact`, data);
      if (response.data.success) {
        showPopup("Message sent successfully!");
      } else {
        showPopup("Failed to send message!");
      }
    } catch (error) {
      showPopup("Failed to send message!");
      console.error(error);
    }
  };

  const handleSubscribe = async (email) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/newsletter`, { email });
      if (response.data.success) {
        showPopup("Subscribed successfully!");
      } else {
        showPopup("Failed to subscribe!");
      }
    } catch (error) {
      showPopup("Failed to subscribe!");
      console.error(error);
    }
  };

  return (
    <>
      {popup.show && (
        <div className="fixed inset-0 z-40 backdrop-blur-md bg-black bg-opacity-60"></div>
      )}

      <div className={`min-h-screen bg-gradient-to-tr from-pink-50 via-white to-pink-25 text-gray-800 relative ${popup.show ? "pointer-events-none select-none" : ""}`}>
        {popup.show && (
          <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-auto px-4">
            <div className="bg-pink-600 text-white rounded-3xl px-12 py-8 shadow-lg max-w-lg w-full text-center font-semibold text-2xl animate-fadeInOut select-text">
              {popup.message}
            </div>
          </div>
        )}

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
              <a href="#about" className="text-sm hover:underline">Newsletter</a>
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
          {/* Hero */}
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

          {/* Filters */}
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

          {/* Gallery */}
          <section id="gallery" className="mb-12">
            <h3 className="text-2xl font-semibold mb-4">Gallery</h3>

            <Carousel
              items={filtered}
              itemRenderer={(a) => (
                <article
                  key={a.id}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-xs mx-auto border border-pink-50"
                >
                  <div className="relative">
                    <img
                      src={a.image}
                      alt={a.title}
                      className="w-full h-56 object-cover transition duration-300 hover:scale-105"
                    />
                    {a.sold && (
                      <span className="absolute top-3 left-3 bg-gray-900 text-white px-3 py-1 rounded-full text-xs tracking-wide">
                        SOLD
                      </span>
                    )}
                  </div>

                  <div className="p-5 space-y-3">
                    <div>
                      <h4 className="font-semibold text-lg">{a.title}</h4>
                      <p className="text-sm text-gray-500 mt-1 leading-tight">{a.description}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-pink-600 font-semibold text-lg">{fmt(a.priceBase)}</div>

                      <div className="flex gap-2">
                        <button
                          className="text-xs uppercase tracking-wide px-3 py-1 border border-pink-200 rounded-full hover:bg-pink-50 transition"
                          onClick={() => setViewImageOnly(a)}
                          aria-label={`View image of ${a.title}`}
                        >
                          View
                        </button>

                        {!a.sold && (
                          <button
                            className="text-xs uppercase tracking-wide px-3 py-1 rounded-full bg-pink-600 text-white shadow hover:shadow-md transition"
                            onClick={() => setSelectedArt(a)}
                            aria-label={`Buy ${a.title}`}
                          >
                            Buy
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              )}
              perPage={{ base: 1, sm: 2, md: 3 }}
            />
          </section>

          {/* Sold Artworks */}
          <section id="sold" className="mb-12">
            <h3 className="text-2xl font-semibold mb-4">Sold Artworks</h3>

            <Carousel
              items={artworks.filter((a) => a.sold)}
              itemRenderer={(s) => (
                <div
                  key={s.id}
                  className="bg-white rounded-lg overflow-hidden shadow-sm max-w-xs mx-auto"
                >
                  <img src={s.image} alt={s.title} className="w-full h-40 object-cover" />
                  <div className="p-3">
                    <h4 className="font-semibold">{s.title}</h4>
                    <p className="text-xs text-gray-500 mt-1">{s.description}</p>
                  </div>
                </div>
              )}
              perPage={{ base: 1, sm: 2, md: 3 }}
            />
          </section>

          {/* Custom & Commissioned Artworks */}
          <section id="custom" className="mb-12">
            <h3 className="text-2xl font-semibold mb-4">Custom & Commissioned Artworks</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h4 className="font-semibold">Commission a custom piece</h4>
                <p className="mt-2 text-sm text-gray-500">
                  Choose size, frame, and describe what you'd like.
                </p>

                <CustomForm
                  key={customFormResetKey}
                  artwork={{ title: "Custom Portrait", priceBase: 120, image: artworks[3].image }}
                  sizes={sizes}
                  frames={frames}
                  calculatePrice={calculatePrice}
                  onAdd={handleCustomAddToCart}
                  fmt={fmt}
                />
              </div>

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

          {/* Testimonials */}
          <section className="mb-12">
            <h3 className="text-2xl font-semibold mb-4">Testimonials</h3>

            <Carousel
              items={testimonials}
              itemRenderer={(t) => (
                <div
                  key={t.id}
                  className="bg-white rounded-lg shadow-sm w-full mx-auto p-5 flex flex-col gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center text-lg font-semibold">
                      {t.name[0]}
                    </div>

                    <div>
                      <div className="font-semibold text-lg">{t.name}</div>
                      <div className="text-xs tracking-wider text-gray-400">{"★".repeat(t.rating)}</div>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 line-clamp-3">{t.text}</p>
                </div>
              )}
              perPage={{ base: 1, md: 2 }}
            />
          </section>

          {/* Contact */}
          <section id="contact" className="mb-16 grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-2xl font-semibold mb-2">Contact</h3>
              <p className="text-sm text-gray-600">
                Questions? Send a message below and I'll get back to you.
              </p>

              <ContactForm onSend={handleSendMessage} />
            </div>

            {/* About the Artist */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="flex flex-col gap-4 items-center text-center">
                <h4 className="text-2xl md:text-3xl font-semibold leading-tight">About the Artist</h4>

                <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden shadow-md border border-pink-50">
                  <img
                    src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80"
                    alt="Artist portrait"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="text-sm text-gray-600 max-w-xl">
                  <p>Creating calming digital prints inspired by subtle color and texture.</p>
                </div>

                <div className="pt-3 border-t border-gray-100 w-full mt-2">
                  <h5 className="text-sm font-medium text-gray-700 mb-3 text-left">Contact & Social</h5>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <a
                      href="mailto:hello@digitalartist.com"
                      className="flex items-center gap-3 rounded-md bg-pink-50/40 p-3 text-sm text-gray-800 hover:bg-pink-50 transition"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M2 6.5C2 5.67 2.67 5 3.5 5h17c.83 0 1.5.67 1.5 1.5v11c0 .83-.67 1.5-1.5 1.5h-17A1.5 1.5 0 0 1 2 17.5v-11zM4.06 6l7.44 5.05c.3.2.7.2 1 0L20 6H4.06z"/>
                      </svg>

                      <div className="text-left">
                        <div className="font-medium">Email</div>
                        <div className="text-xs text-gray-600">hello@digitalartist.com</div>
                      </div>
                    </a>

                    <a
                      href="https://www.instagram.com/digitalartist"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-md bg-pink-50/40 p-3 text-sm text-gray-800 hover:bg-pink-50 transition"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 6.2A4.8 4.8 0 1 0 16.8 13 4.8 4.8 0 0 0 12 8.2zM18.6 6.2a1.1 1.1 0 1 1-1.1-1.1 1.1 1.1 0 0 1 1.1 1.1z"/>
                      </svg>

                      <div className="text-left">
                        <div className="font-medium">Instagram</div>
                        <div className="text-xs text-gray-600">@digitalartist</div>
                      </div>
                    </a>

                    <a
                      href="tel:+12345678900"
                      className="flex items-center gap-3 rounded-md bg-pink-50/40 p-3 text-sm text-gray-800 hover:bg-pink-50 transition"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24 11 11 0 0 0 3.5.56 1 1 0 0 1 1 1v3.5a1 1 0 0 1-1 1A18 18 0 0 1 3 5a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11 11 0 0 0 .56 3.5 1 1 0 0 1-.24 1l-2.2 2.2z"/>
                      </svg>

                      <div className="text-left">
                        <div className="font-medium">Mobile</div>
                        <div className="text-xs text-gray-600">+1 234 567 8900</div>
                      </div>
                    </a>

                    <a
                      href="#"
                      onClick={(e) => { e.preventDefault(); alert('Location: Remote / Ships worldwide'); }}
                      className="flex items-center gap-3 rounded-md bg-pink-50/40 p-3 text-sm text-gray-800 hover:bg-pink-50 transition"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 14.5 9 2.5 2.5 0 0 1 12 11.5z"/>
                      </svg>

                      <div className="text-left">
                        <div className="font-medium">Location</div>
                        <div className="text-xs text-gray-600">Remote / Ships worldwide</div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Newsletter */}
          <section id="about" className="mb-12">
            <div className="bg-white p-8 rounded-lg shadow-sm w-full mx-auto">
              <h3 className="text-2xl font-semibold mb-3 text-left">Newsletter</h3>
              <p className="text-sm text-gray-600 mb-4 text-left">
                Join the newsletter to get new artwork drops, exclusive discounts,
                and updates about commissions.
              </p>

              <NewsletterForm onSubscribe={handleSubscribe} />
            </div>
          </section>
        </main>

        {/* FOOTER */}
        <footer className="py-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Digital Artist — Built with care.
        </footer>

        {/* CART / CHECKOUT DRAWER */}
        <div
          className={`fixed top-20 md:top-24 right-4 md:right-8 w-full md:w-96 transition-all ${
            checkoutView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"
          }`}
        >
          <div className="bg-white rounded-lg shadow-lg p-4 max-h-[calc(100vh-140px)] overflow-auto">
            <div className="flex items-center justify-between">
              <div className="font-semibold">Cart</div>
              <div className="flex items-center gap-3">
                <div className="text-sm text-gray-500">{cart.length} items</div>
                <button
                  onClick={() => setCheckoutView(false)}
                  aria-label="Close cart"
                  className="text-gray-400 hover:text-gray-600 text-lg font-bold leading-none"
                >
                  ×
                </button>
              </div>
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

            <div className="mt-3 flex gap-2 flex-wrap">
              <button
                onClick={() => setCheckoutView(false)}
                className="flex-1 border rounded px-3 py-2"
              >
                Continue shopping
              </button>

              <button onClick={clearCart} className="px-3 py-2 text-sm text-gray-500">
                Clear
              </button>
            </div>

            {checkoutView && (
              <div id="checkout-form" className="mt-4 border-t pt-4">
                <h4 className="font-semibold">Checkout</h4>

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
              showPopup("Added to cart!");
            }}
            fmt={fmt}
          />
        )}

        {/* VIEW IMAGE ONLY MODAL */}
        {viewImageOnly && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
            <button
              onClick={() => setViewImageOnly(null)}
              className="absolute top-6 right-6 text-white text-3xl font-bold bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-75"
              aria-label="Close image view"
            >
              ×
            </button>
            <img
              src={viewImageOnly.image}
              alt={viewImageOnly.title}
              className="max-h-[90vh] max-w-full rounded-lg shadow-lg"
            />
          </div>
        )}
      </div>
    </>
  );
}

/* Add the following CSS to your global styles or style tag:

@keyframes fadeInOut {
  0%, 100% {opacity: 0; transform: translateY(-15px);}
  10%, 90% {opacity: 1; transform: translateY(0);}
}

.animate-fadeInOut {
  animation: fadeInOut 3.5s ease forwards;
}

.backdrop-blur-md {
  backdrop-filter: blur(6px);
}

*/

import { createRoot } from "react-dom/client";
const rootEl = document.getElementById("root") || document.body.appendChild(document.createElement("div"));
rootEl.id = "root";
createRoot(rootEl).render(<MainApp />);
