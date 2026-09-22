import { describe, it, expect, beforeEach } from "vitest";
import { useCartStore, type CartItem } from "@/store/useCartStore";

const makeItem = (over: Partial<Omit<CartItem, "quantity">> = {}) => ({
  productId: "p1",
  sku: "SKU-1",
  name: "Needle Valve",
  thumbnailImage: "",
  price: 100,
  ...over,
});

const store = () => useCartStore.getState();

beforeEach(() => {
  useCartStore.setState({ items: [] });
  localStorage.clear();
});

describe("useCartStore", () => {
  it("adds an item with a default quantity of 1", () => {
    store().addItem(makeItem());
    expect(store().items).toHaveLength(1);
    expect(store().items[0].quantity).toBe(1);
  });

  it("increments quantity when the same sku is added again", () => {
    store().addItem(makeItem());
    store().addItem(makeItem(), 2);
    expect(store().items).toHaveLength(1);
    expect(store().items[0].quantity).toBe(3);
  });

  it("keeps distinct skus as separate line items", () => {
    store().addItem(makeItem());
    store().addItem(makeItem({ sku: "SKU-2" }));
    expect(store().items).toHaveLength(2);
  });

  it("updateQuantity sets an exact quantity", () => {
    store().addItem(makeItem());
    store().updateQuantity("SKU-1", 5);
    expect(store().items[0].quantity).toBe(5);
  });

  it("updateQuantity to 0 or below removes the item", () => {
    store().addItem(makeItem());
    store().updateQuantity("SKU-1", 0);
    expect(store().items).toHaveLength(0);
  });

  it("removeItem removes the matching sku only", () => {
    store().addItem(makeItem());
    store().addItem(makeItem({ sku: "SKU-2" }));
    store().removeItem("SKU-1");
    expect(store().items.map((i) => i.sku)).toEqual(["SKU-2"]);
  });

  it("totalItems sums quantities across line items", () => {
    store().addItem(makeItem(), 2);
    store().addItem(makeItem({ sku: "SKU-2" }), 3);
    expect(store().totalItems()).toBe(5);
  });

  it("totalPrice sums price * quantity", () => {
    store().addItem(makeItem({ price: 100 }), 2);
    store().addItem(makeItem({ sku: "SKU-2", price: 50 }), 1);
    expect(store().totalPrice()).toBe(250);
  });

  it("clearCart empties the cart", () => {
    store().addItem(makeItem());
    store().clearCart();
    expect(store().items).toHaveLength(0);
    expect(store().totalItems()).toBe(0);
  });
});
