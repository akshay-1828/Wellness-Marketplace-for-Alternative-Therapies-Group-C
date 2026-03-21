import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const ProductListPage = () => {
  const { itemCount } = useCart();
  const { wishlistIds, loadedOnce } = useWishlist();

  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setProducts([
      {
        id: 1,
        name: "Ashwagandha Stress Relief Capsules",
        description:
          "Ayurvedic capsules that help reduce stress and improve energy levels",
        category: "Ayurveda Remedies",
        price: 499,
        stock: 100,
      },
      {
        id: 2,
        name: "Triphala Digestive Tablets",
        description:
          "Traditional Ayurvedic tablets that improve digestion and gut health",
        category: "Ayurveda Remedies",
        price: 350,
        stock: 120,
      },
      {
        id: 3,
        name: "Brahmi Memory Booster Syrup",
        description:
          "Ayurvedic tonic known to improve memory and concentration",
        category: "Ayurveda Remedies",
        price: 420,
        stock: 90,
      },
      {
        id: 4,
        name: "Amla Juice",
        description: "Rich in vitamin C and supports immunity and digestion",
        category: "Ayurveda Remedies",
        price: 280,
        stock: 80,
      },
      {
        id: 5,
        name: "Giloy Powder",
        description:
          "Herbal immunity support powder used in traditional wellness routines",
        category: "Ayurveda Remedies",
        price: 320,
        stock: 70,
      },
      {
        id: 6,
        name: "Chyawanprash",
        description:
          "Traditional herbal health supplement for energy and immunity",
        category: "Ayurveda Remedies",
        price: 390,
        stock: 95,
      },
      {
        id: 7,
        name: "Shatavari Capsules",
        description:
          "Ayurvedic supplement commonly used for overall wellness support",
        category: "Ayurveda Remedies",
        price: 450,
        stock: 60,
      },
      {
        id: 8,
        name: "Herbal Tea",
        description: "Natural herbal tea blend for relaxation and daily wellness",
        category: "Relaxation & Stress Relief Products",
        price: 199,
        stock: 150,
      },
      {
        id: 9,
        name: "Lavender Oil",
        description: "A calming essential oil for relaxation and stress relief",
        category: "Relaxation & Stress Relief Products",
        price: 299,
        stock: 85,
      },
      {
        id: 10,
        name: "Acupressure Mat",
        description:
          "Helps stimulate pressure points and promote relaxation",
        category: "Acupuncture / Acupressure Tools",
        price: 899,
        stock: 40,
      },
      {
        id: 11,
        name: "Acupuncture Needles",
        description: "Professional acupuncture needles for therapy use",
        category: "Acupuncture / Acupressure Tools",
        price: 599,
        stock: 100,
      },
      {
        id: 12,
        name: "Exercise Ball",
        description:
          "Useful for stretching, balance exercises, and physiotherapy",
        category: "Physiotherapy Equipment",
        price: 749,
        stock: 55,
      },
      {
        id: 13,
        name: "Shoulder Pulley",
        description:
          "Supports shoulder mobility and rehabilitation exercises",
        category: "Physiotherapy Equipment",
        price: 699,
        stock: 35,
      },
      {
        id: 14,
        name: "Lumbar Cushion",
        description: "Provides lower back support for sitting comfort",
        category: "Chiropractic Support Products",
        price: 549,
        stock: 65,
      },
      {
        id: 15,
        name: "Neck Support Pillow",
        description:
          "Helps support the neck and improve comfort during rest",
        category: "Chiropractic Support Products",
        price: 799,
        stock: 50,
      },
    ]);

    setLoading(false);
    setError("");
  }, []);

  const categories = useMemo(() => {
    return [
      "All",
      ...Array.from(new Set(products.map((p) => p.category).filter(Boolean))),
    ];
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "All") return products;
    return products.filter((p) => p.category === selectedCategory);
  }, [products, selectedCategory]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-100">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="rounded-3xl border border-emerald-200/70 bg-gradient-to-r from-emerald-100 via-green-50 to-teal-100 px-6 py-6 shadow-md shadow-emerald-100/60">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-emerald-950">
                Wellness Products
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-emerald-800/80">
                Explore curated wellness essentials sold by verified practitioners.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/community"
                className="rounded-xl border border-emerald-500/20 bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
              >
                Community Q&amp;A
              </Link>

              <Link
                to="/wishlist"
                className="rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-2.5 text-sm font-semibold text-emerald-900 transition hover:bg-emerald-100"
              >
                Wishlist ({loadedOnce ? wishlistIds.length : 0})
              </Link>

              <Link
                to="/cart"
                className="rounded-xl border border-teal-300 bg-teal-50 px-4 py-2.5 text-sm font-semibold text-teal-900 transition hover:bg-teal-100"
              >
                Cart ({itemCount})
              </Link>
            </div>
          </div>
        </div>

        {loading && (
          <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm text-emerald-800 shadow-sm">
            Loading products...
          </div>
        )}

        {error && (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-4 text-sm text-red-700 shadow-sm">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            {/* Category Filter */}
            <div className="mt-6 rounded-3xl border border-green-200/70 bg-gradient-to-r from-green-100 via-emerald-50 to-lime-50 px-5 py-5 shadow-md shadow-green-100/50">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-bold text-emerald-950">
                    Browse by Category
                  </h2>
                  <p className="mt-1 text-sm text-emerald-800/75">
                    Choose a category to filter products.
                  </p>
                </div>

                <div className="rounded-full bg-white/70 px-4 py-2 text-sm font-medium text-emerald-900 shadow-sm">
                  Showing{" "}
                  <span className="font-bold">{filteredProducts.length}</span>{" "}
                  products
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`rounded-full border px-4 py-2.5 text-sm font-semibold transition ${
                      selectedCategory === cat
                        ? "border-emerald-700 bg-emerald-600 text-white shadow-md"
                        : "border-emerald-200 bg-white/75 text-emerald-900 hover:bg-emerald-100"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Product Grid */}
            <div className="mt-8">
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="rounded-3xl border border-emerald-200 bg-emerald-50 px-6 py-10 text-center shadow-sm">
                  <p className="text-sm text-emerald-800">
                    No products found in this category.
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductListPage;