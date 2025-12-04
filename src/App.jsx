import React, { useState, useEffect, useMemo } from "react";

export default function App() {
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
    {
      id: "a5",
      title: "Pastel Harbor",
      priceBase: 55,
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80&auto=format&fit=crop",
      tags: ["landscape", "pastel"],
      sold: false,
      description: "Harbor at dusk in soft tones.",
    },
    {
      id: "a6",
      title: "Saffron Fields",
      priceBase: 70,
      image:
        "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=1200&q=80&auto=format&fit=crop",
      tags: ["landscape", "fields"],
      sold: true,
      description: "Warm fields study — sold original.",
    },
    {
      id: "a7",
      title: "Digital Orchid",
      priceBase: 48,
      image:
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=80&auto=format&fit=crop",
      tags: ["floral", "digital"],
      sold: false,
      description: "Botanical digital piece — limited run.",
    },
    {
      id: "a8",
      title: "Retro Skyline",
      priceBase: 82,
      image:
        "https://images.unsplash.com/photo-1549888834-1d2a6f4a9a2f?w=1200&q=80&auto=format&fit=crop",
      tags: ["city", "retro"],
      sold: true,
      description: "A small retro-inspired city print (sold).",
    },
    {
      id: "a9",
      title: "Gentle Waves",
      priceBase: 38,
      image:
        "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&q=80&auto=format&fit=crop",
      tags: ["ocean", "calm"],
      sold: false,
      description: "Minimal seascape, calming palette.",
    },
    {
      id: "a10",
      title: "Lilac Afternoon",
      priceBase: 66,
      image:
        "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?w=1200&q=80&auto=format&fit=crop",
      tags: ["floral", "pastel"],
      sold: false,
      description: "Pastel floral arrangement.",
    },
    {
      id: "a11",
      title: "Crimson Dunes",
      priceBase: 85,
      image:
        "https://images.unsplash.com/photo-1508264165352-cb7a1f6b7a0c?w=1200&q=80&auto=format&fit=crop",
      tags: ["landscape", "desert"],
      sold: true,
      description: "Warm desert study — sold original.",
    },
    {
      id: "a12",
      title: "Silk Road Remnant",
      priceBase: 110,
      image:
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-1.2.1&w=1200&q=80&auto=format&fit=crop",
      tags: ["travel", "digital"],
      sold: true,
      description: "Mixed-media inspired piece, sold to a collector.",
    },
    {
      id: "a13",
      title: "Azure Window",
      priceBase: 75,
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&q=80&auto=format&fit=crop",
      tags: ["ocean", "architectural"],
      sold: true,
      description: "Seascape with architectural linework — sold.",
    },
    {
      id: "a14",
      title: "Golden Alley",
      priceBase: 54,
      image:
        "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?w=1200&q=80&auto=format&fit=crop",
      tags: ["city", "street"],
      sold: true,
      description: "Small alley study capturing golden hour — sold.",
    },
    {
      id: "a15",
      title: "Violet Orchard",
      priceBase: 68,
      image:
        "https://images.unsplash.com/photo-1524594154904-8d4b4b4b9f3b?w=1200&q=80&auto=format&fit=crop",
      tags: ["floral", "orchard"],
      sold: true,
      description: "Limited edition print from the orchard series — sold.",
    },
    {
      id: "a16",
      title: "Hushed Metro",
      priceBase: 92,
      image:
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80&auto=format&fit=crop",
      tags: ["city", "metro"],
      sold: true,
      description: "Metro study in muted tones — sold to a gallery.",
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

  const handleCheckout = (details) => {
    console.log("Checkout:", details);
    clearCart();
    setCheckoutView(false);
    alert("Order placed (demo)");
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-pink-50 via-white to-pink-25 text-gray-800">
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

      <main className="max-w-6xl mx-auto px-4 py-8">
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

        <section id="custom" className="mb-12">
          <h3 className="text-2xl font-semibold mb-4">Custom & Commissioned Artworks</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="font-semibold">Commission a custom piece</h4>
              <p className="mt-2 text-sm text-gray-500">
                Choose size, frame, and describe what you'd like.
              </p>

              <CustomForm
                artwork={{ title: "Custom Portrait", priceBase: 120, image: artworks[3].image }}
                sizes={sizes}
                frames={frames}
                calculatePrice={calculatePrice}
                onAdd={(item) => addToCart(item)}
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

        <section id="contact" className="mb-16 grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-2xl font-semibold mb-2">Contact</h3>
            <p className="text-sm text-gray-600">
              Questions? Send a message below and I'll get back to you.
            </p>

            <ContactForm onSend={(d) => alert("Message sent: " + JSON.stringify(d))} />
          </div>

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
                e.target.reset();
              }}
              className="mt-1 flex flex-col sm:flex-row gap-3 items-start"
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
  );
}

function Carousel({ items = [], itemRenderer, perPage = { base: 1, sm: 2, md: 3 } }) {
  const [index, setIndex] = useState(0);

  const getPerPage = () => {
    if (typeof window === "undefined") return perPage.base || 1;
    const w = window.innerWidth;
    if (w >= 1024) return perPage.lg ?? perPage.md ?? perPage.sm ?? perPage.base ?? 1;
    if (w >= 768) return perPage.md ?? perPage.sm ?? perPage.base ?? 1;
    if (w >= 640) return perPage.sm ?? perPage.base ?? 1;
    return perPage.base ?? 1;
  };

  const [visible, setVisible] = useState(getPerPage());

  useEffect(() => {
    const onResize = () => setVisible(getPerPage());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const maxIndex = Math.max(0, Math.ceil(items.length / visible) - 1);

  useEffect(() => {
    if (index > maxIndex) setIndex(maxIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, items.length, maxIndex]);

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(maxIndex, i + 1));

  if (!items || items.length === 0) {
    return <div className="text-sm text-gray-500">No items</div>;
  }

  const startIdx = index * visible;
  const endIdx = Math.min(startIdx + visible, items.length);
  const visibleItems = items.slice(startIdx, endIdx);
  const columnCount = Math.max(1, visibleItems.length);

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm text-gray-600">{items.length} items</div>

        <div className="flex gap-2">
          <button
            onClick={prev}
            disabled={index === 0}
            className={`px-3 py-1 border rounded ${index === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
            aria-label="Previous"
          >
            ‹
          </button>
          <button
            onClick={next}
            disabled={index >= maxIndex}
            className={`px-3 py-1 border rounded ${index >= maxIndex ? "opacity-50 cursor-not-allowed" : ""}`}
            aria-label="Next"
          >
            ›
          </button>
        </div>
      </div>

      <div
        className="grid gap-2"
        style={{ gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))` }}
      >
        {visibleItems.map((it, i) => (
          <div key={startIdx + i} className="w-full">
            {itemRenderer(it)}
          </div>
        ))}
      </div>

      <div className="flex gap-2 justify-center mt-3">
        {Array.from({ length: Math.max(1, maxIndex + 1) }).map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-2 h-2 rounded-full ${i === index ? "bg-pink-600" : "bg-gray-300"}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

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
    <div className="fixed inset-0 bg-gradient-to-br from-black/70 via-transparent to-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full overflow-hidden border border-pink-100">
        <div className="cursor-pointer text-gray-400 text-lg font-bold text-right p-4" onClick={onClose}>
          ✕
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="relative md:w-1/2 w-full">
            <div className="absolute inset-4 rounded-3xl bg-gradient-to-br from-pink-100/70 via-transparent to-pink-100/20 pointer-events-none" />
            <img
              src={art.image}
              alt={art.title}
              className="relative z-10 w-full h-96 object-cover rounded-3xl md:rounded-none md:rounded-l-3xl shadow-inner"
            />
          </div>

          <div className="md:w-1/2 w-full p-6 space-y-4">
            <div>
              <h4 className="text-2xl font-semibold">{art.title}</h4>
              <p className="text-sm text-gray-500 mt-1">{art.description}</p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-600">Size</label>
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
                <label className="text-sm font-medium text-gray-600">Frame</label>
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
                <label className="text-sm font-medium text-gray-600">Customization fee (optional)</label>
                <input
                  type="number"
                  min="0"
                  value={customFee}
                  onChange={(e) => setCustomFee(e.target.value)}
                  className="block mt-1 rounded border p-2 w-full"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">Price preview</div>
              <div className="text-2xl font-bold text-pink-600">
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
                className="flex-1 bg-pink-600 text-white rounded-2xl py-3 font-semibold shadow-lg"
              >
                Add to cart
              </button>

              <button onClick={onClose} className="flex-1 border rounded-2xl py-3 font-semibold">
                Cancel
              </button>
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
          notes,
          customization: Number(customFee),
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
      <input name="mobile" placeholder="Mobile number" className="block w-full rounded border p-2" required />
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

import { createRoot } from "react-dom/client";
const rootEl = document.getElementById("root") || document.body.appendChild(document.createElement("div"));
rootEl.id = "root";
createRoot(rootEl).render(<App />);
