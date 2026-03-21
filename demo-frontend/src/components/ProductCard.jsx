import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import { useCart } from "../context/CartContext";
import { getProductImageSrc } from "../services/imageService";
import { useWishlist } from "../context/WishlistContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const imageUrl = getProductImageSrc(product);
  const wished = isWishlisted(product?.id);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-emerald-200/70 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-100 p-5 shadow-md shadow-emerald-100/60 transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <button
        type="button"
        onClick={async () => {
          try {
            await toggleWishlist(product.id);
          } catch (e) {
            console.error("Wishlist toggle error", e);
          }
        }}
        className={`absolute right-4 top-4 z-10 rounded-full border p-2.5 shadow-sm transition ${
          wished
            ? "border-red-200 bg-red-50 text-red-600"
            : "border-emerald-200 bg-white/80 text-emerald-700 hover:text-red-500"
        }`}
        title={wished ? "Remove from Wishlist" : "Add to Wishlist"}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill={wished ? "currentColor" : "none"}
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </button>

      <div className="mb-4 overflow-hidden rounded-2xl border border-emerald-100 bg-white/70 backdrop-blur-sm">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product.name}
            className="h-44 w-full object-contain p-3 transition duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-44 w-full items-center justify-center text-sm font-medium text-emerald-700">
            No image
          </div>
        )}
      </div>

      <h3 className="text-xl font-bold text-emerald-950">{product.name}</h3>

      <p className="mt-2 min-h-[72px] text-sm leading-6 text-emerald-900/80 line-clamp-3">
        {product.description}
      </p>

      <div className="mt-4 space-y-2 rounded-2xl bg-white/60 p-4 text-sm text-emerald-950 shadow-sm">
        <p>
          <span className="font-semibold text-emerald-900">Category:</span>{" "}
          {product.category}
        </p>
        <p>
          <span className="font-semibold text-emerald-900">Price:</span>{" "}
          ₹{product.price}
        </p>
        <p>
          <span className="font-semibold text-emerald-900">Stock:</span>{" "}
          {product.stock}
        </p>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <Link to={`/products/${product.id}`} className="sm:flex-1">
          <Button
            variant="secondary"
            className="w-full rounded-xl border border-emerald-300 bg-white/80 px-4 py-2.5 text-emerald-900 hover:bg-emerald-100"
          >
            View Details
          </Button>
        </Link>

        <Button
          variant="primary"
          className="w-full rounded-xl bg-emerald-600 px-4 py-2.5 text-white hover:bg-emerald-700 sm:flex-1"
          onClick={() => addToCart(product, 1)}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;