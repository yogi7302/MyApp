import React, { useState, useEffect, useMemo } from "react";
import Carousel from "@/components/Carousel";
import ArtModal from "@/components/ArtModal";
import CustomForm from "@/components/CustomForm";
import ContactForm from "@/components/ContactForm";
import CheckoutForm from "@/components/CheckoutForm";

export default function Index() {
  const initialArtworks = [
    {
      id"a1",
      title"Moonlit Blossom",
      priceBase"https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?w=1200&q=80&auto=format&fit=crop",
      tags"floral", "digital"],
      sold"Soft pastel floral with moon veins.",
    },
    {
      id"a2",
      title"Neon Cityscape",
      priceBase"https://images.unsplash.com/photo-1503602642458-232111445657?w=1200&q=80&auto=format&fit=crop",
      tags"city", "neon"],
      sold"A dreamy neon skyline study.",
    },
    {
      id"a3",
      title"Quiet Lake",
      priceBase"https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&q=80&auto=format&fit=crop",
      tags"landscape", "calm"],
      sold"Original sold piece — tranquil waters.",
    },
    {
      id"a4",
      title"Custom Portrait Sample",
      priceBase"https://images.unsplash.com/photo-1542377287-2a2e23f8b3f4?w=1200&q=80&auto=format&fit=crop",
      tags"portrait", "commission"],
      sold"Example of a customizable portrait.",
      customizable},
    {
      id"a5",
      title"Pastel Harbor",
      priceBase"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80&auto=format&fit=crop",
      tags"landscape", "pastel"],
      sold"Harbor at dusk in soft tones.",
    },
    {
      id"a6",
      title"Saffron Fields",
      priceBase"https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=1200&q=80&auto=format&fit=crop",
      tags"landscape", "fields"],
      sold"Warm fields study — sold original.",
    },
    {
      id"a7",
      title"Digital Orchid",
      priceBase"https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=80&auto=format&fit=crop",
      tags"floral", "digital"],
      sold"Botanical digital piece — limited run.",
    },
    {
      id"a8",
      title"Retro Skyline",
      priceBase"https://images.unsplash.com/photo-1549888834-1d2a6f4a9a2f?w=1200&q=80&auto=format&fit=crop",
      tags"city", "retro"],
      sold"A small retro-inspired city print (sold).",
    },
    {
      id"a9",
      title"Gentle Waves",
      priceBase"https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&q=80&auto=format&fit=crop",
      tags"ocean", "calm"],
      sold"Minimal seascape, calming palette.",
    },
    {
      id"a10",
      title"Lilac Afternoon",
      priceBase"https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?w=1200&q=80&auto=format&fit=crop",
      tags"floral", "pastel"],
      sold"Pastel floral arrangement.",
    },
    {
      id"a11",
      title"Crimson Dunes",
      priceBase"https://images.unsplash.com/photo-1508264165352-cb7a1f6b7a0c?w=1200&q=80&auto=format&fit=crop",
      tags"landscape", "desert"],
      sold"Warm desert study — sold original.",
    },
    {
      id"a12",
      title"Silk Road Remnant",
      priceBase"https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-1.2.1&w=1200&q=80&auto=format&fit=crop",
      tags"travel", "digital"],
      sold"Mixed-media inspired piece, sold to a collector.",
    },
    {
      id"a13",
      title"Azure Window",
      priceBase"https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&q=80&auto=format&fit=crop",
      tags"ocean", "architectural"],
      sold"Seascape with architectural linework — sold.",
    },
    {
      id"a14",
      title"Golden Alley",
      priceBase"https://images.unsplash.com/photo-1504198453319-5ce911bafcde?w=1200&q=80&auto=format&fit=crop",
      tags"city", "street"],
      sold"Small alley study capturing golden hour — sold.",
    },
    {
      id"a15",
      title"Violet Orchard",
      priceBase"https://images.unsplash.com/photo-1524594154904-8d4b4b4b9f3b?w=1200&q=80&auto=format&fit=crop",
      tags"floral", "orchard"],
      sold"Limited edition print from the orchard series — sold.",
    },
    {
      id"a16",
      title"Hushed Metro",
      priceBase"https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80&auto=format&fit=crop",
      tags"city", "metro"],
      sold"Metro study in muted tones — sold to a gallery.",
    },
  ];

  const sizes = [
    { id"s", label"Small (12x16)", multiplier},
    { id"m", label"Medium (18x24)", multiplier.5 },
    { id"l", label"Large (24x36)", multiplier.2 },
  ];

  const frames = [
    { id"none", label"No frame", price},
    { id"wood", label"Wood frame", price},
    { id"gold", label"Gold frame", price},
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

  const [selectedArt, setSelectedArt] = useState<typeof artworks[0] | null>(null);
  const [checkoutView, setCheckoutView] = useState(false);

  const [testimonials] = useState([
    { id"Rina K.", text"Absolutely lovely — the colors and details are perfect.", rating},
    { id"Marco P.", text"Quick response and a beautiful framed print arrived safe.", rating},
    { id"Elsa W.", text"Commission exceeded expectations — great communication.", rating},
    { id"Jon D.", text"High-quality print and fast shipping.", rating},
    { id"Maya L.", text"Colors are gorgeous in person.", rating},
    { id"Sam R.", text"Perfect gift — the recipient loved it.", rating},
    { id"Priya S.", text"Smooth process from concept to delivery.", rating},
    { id"Luca B.", text"Beautiful framing and packaging.", rating},
  ]);

  useEffect(() => {
    localStorage.setItem("cart_v1", JSON.stringify(cart));
  }, [cart]);

  const calculatePrice = (base{ sizeId = "s", frameId = "none", customization = 0 } = {}) => {
    const size = sizes.find((s) => s.id === sizeId) || sizes[0];
    const frame = frames.find((f) => f.id === frameId) || frames[0];

    return Math.max(
      10,
      Math.round((base * size.multiplier + frame.price + customization) * 100) / 100
    );
  };

  const fmt = (v) => `$${v.toFixed(2)}`;

  const addToCart = (item) =>
    setCart((c) => [...c, { ...item, cartId.now() + Math.random() }]);

  const removeCartItem = (cartId) =>
    setCart((c) => c.filter((i) => i.cartId == cartId));

  const clearCart = () => setCart([]);

  const filtered = useMemo(() => {
    return artworks.filter((a) => {
      if (onlyAvailable && a.sold) return false;
      if (filterTag == "all" && a.tags.includes(filterTag)) return false;
      if (query && `${a.title} ${a.description} ${a.tags.join(" ")}`.toLowerCase().includes(query.toLowerCase()))
        return false;
      return true;
    });
  }, [artworks, onlyAvailable, filterTag, query]);

  const handleCheckout = (details) => {
    console.log("Checkout:", details);
    clearCart();
    setCheckoutView(false);
    alert("Order placed (demo)");
  };

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

          <nav className="hidden md-3 items-center">
            <a href="#gallery" className="text-sm hover">Gallery</a>
            <a href="#sold" className="text-sm hover">Sold</a>
            <a href="#custom" className="text-sm hover">Custom</a>
            <a href="#about" className="text-sm hover">Newsletter</a>
            <a href="#contact" className="text-sm hover">Contact</a>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden md-lg px-3 py-1 items-center gap-2 bg-white">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search artworks..."
                className="outline-none text-sm placeholder-gray-400"
              />
            </div>

            {/* CART BUTTON */}
            <button
              className="relative"
              onClick={() => setCheckoutView((s) => s)}
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
        <section className="mb-8 grid md-cols-2 gap-6 items-center">
          <div>
            <h2 className="text-3xl md-4xl font-extrabold">
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
        <section className="mb-6 flex flex-col md-row gap-3 items-center justify-between">
          <div className="flex gap-2 items-center">
            <label className="text-sm">Filter/label>
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
            <div className="md">
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

        {/* GALLERY - Carousel with reduced gap spacing */}
        <section id="gallery" className="mb-12">
          <h3 className="text-2xl font-semibold mb-4">Gallery</h3>

          <Carousel items={filtered} itemRenderer={(a) => (
            <article
              key={a.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden max-w-xs mx-auto"
            >
              <div className="relative">
                <img src={a.image} alt={a.title} className="w-full h-56 object-cover" />
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
                    <button className="text-sm px-3 py-1 border rounded" onClick={() => setSelectedArt(a)}>
                      View
                    </button>

                    {a.sold && (
                      <button className="text-sm px-3 py-1 rounded bg-pink-600 text-white" onClick={() => setSelectedArt(a)}>
                        Buy
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </article>
          )} perPage={{ base}} />

        </section>

        {/* SOLD ITEMS - carousel with the additional 6 sold artworks */}
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
            perPage={{ base}}
          />
        </section>

        {/* CUSTOM COMMISSIONS */}
        <section id="custom" className="mb-12">
          <h3 className="text-2xl font-semibold mb-4">Custom & Commissioned Artworks</h3>

          <div className="grid grid-cols-1 md-cols-2 gap-6 items-start">
            {/* FORM */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="font-semibold">Commission a custom piece</h4>
              <p className="mt-2 text-sm text-gray-500">
                Choose size, frame, and describe what you'd like.
              </p>

              <CustomForm
                artwork={{ title"Custom Portrait", priceBase.image }}
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
                  Typical commission time–3 weeks depending on complexity.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS - carousel of testimonials (shows 2 per view on md) */}
        <section className="mb-12">
          <h3 className="text-2xl font-semibold mb-4">Testimonials</h3>

          <Carousel
            items={testimonials}
            itemRenderer={(t) => (
              <div key={t.id} className="bg-white p-4 rounded-lg shadow-sm max-w-md mx-auto">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                    {t.name[0]}
                  </div>

                  <div>
                    <div className="font-semibold">{t.name}</div>
                    <div className="text-xs text-gray-500">{"★".repeat(t.rating)}</div>
                  </div>
                </div>

                <p className="mt-3 text-sm text-gray-600">{t.text}</p>
              </div>
            )}
            perPage={{ base}}
          />
        </section>

        {/* CONTACT & ABOUT */}
        <section id="contact" className="mb-16 grid md-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-2xl font-semibold mb-2">Contact</h3>
            <p className="text-sm text-gray-600">
              Questions? Send a message below and I'll get back to you.
            </p>

            <ContactForm onSend={(d) => alert("Message sent" + JSON.stringify(d))} />
          </div>

          {/* Right column*/}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex flex-col gap-4 items-center text-center">
              <h4 className="text-2xl md-3xl font-semibold leading-tight">About the Artist</h4>

              <div className="w-24 h-24 md-28 md-28 rounded-full overflow-hidden shadow-md border border-pink-50">
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

                <div className="grid grid-cols-1 sm-cols-2 gap-3">
                  <a
                    href="mailto@digitalartist.com"
                    className="flex items-center gap-3 rounded-md bg-pink-50/40 p-3 text-sm text-gray-800 hover-pink-50 transition"
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
                    className="flex items-center gap-3 rounded-md bg-pink-50/40 p-3 text-sm text-gray-800 hover-pink-50 transition"
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
                    className="flex items-center gap-3 rounded-md bg-pink-50/40 p-3 text-sm text-gray-800 hover-pink-50 transition"
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
                    onClick={(e) => { e.preventDefault(); alert('Location/ Ships worldwide'); }}
                    className="flex items-center gap-3 rounded-md bg-pink-50/40 p-3 text-sm text-gray-800 hover-pink-50 transition"
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

        {/* NEWSLETTER */}
        <section id="about" className="mb-12">
          <div className="bg-white p-8 rounded-lg shadow-sm w-full mx-auto">
            <h3 className="text-2xl font-semibold mb-3 text-left">Newsletter</h3>
            <p className="text-sm text-gray-600 mb-4 text-left">
              Join the newsletter to get new artwork drops, exclusive discounts,
              and updates about commissions.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Joined newsletter (demo)");
                e.currentTarget.reset();
              }}
              className="mt-1 flex flex-col sm-row gap-3 items-start"
            >
              <input
                name="email"
                type="email"
                placeholder="you@email.com"
                className="flex-1 rounded border p-3 text-sm"
                required
              />
              <button className="px-5 py-3 rounded bg-pink-600 text-white text-sm">
                Join
              </button>
            </form>

            <div className="mt-6 text-sm text-gray-500 text-left">
              <strong>Why join?</strong>
              <ul className="list-disc list-inside mt-2">
                <li>Early access to new prints</li>
                <li>Subscriber-only discounts</li>
                <li>Commission availability updates</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Digital Artist — Built with care.
      </footer>

      {/* ================= CART / CHECKOUT DRAWER ================= */}
      <div
        className={`fixed right-4 bottom-4 md-8 md-8 w-full md-96 transition-all ${
          checkoutView ? "translate-y-0" "translate-y-10 opacity-0"
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

// --- Mount to DOM (auto-added) ---
import { createRoot } from "react-dom/client";
const rootEl = document.getElementById("root") || document.body.appendChild(document.createElement("div"));
rootEl.id = "root";
try {
  createRoot(rootEl).render(<App />);
} catch (e) {
  const Default = (typeof App !== 'undefined') ? App : (module && module.exports ? module.exports.default : null);
  if (Default) createRoot(rootEl).render(React.createElement(Default));
}
