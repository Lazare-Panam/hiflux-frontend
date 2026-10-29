// AlgoScience
// Search docs...
// ⌘K

// Profile
// Cohorts
// Dashboard
// What's New
// Contests
// Quant & HFT
// Free Articles
// All Courses
// System Design
// AI / ML
// Low-Level Design
// Interview Prep
// Quizzes
// Cognitive Atlas
// Back to chapter

// Inheritance vs Composition
// Lesson 3

// Abstract Classes vs Interfaces
// Lesson 3

// Polymorphism and Interfaces
// TL;DR: Polymorphism lets code work through a shared contract without depending on one concrete class. Interfaces are one way to define that contract. When behavior genuinely varies by subtype, dynamic dispatch can replace repeated type-checking branches and localize a new variant to a new implementation.

// Polymorphism: One Interface, Many Implementations
// Polymorphism: One Interface, Many Implementations

// Why This Matters in Interviews
// Every design pattern you'll use in LLD interviews -- Strategy, Observer, Factory -- relies on polymorphism. If you don't reach for interfaces naturally, you'll end up with rigid code full of type-checking conditionals. The interviewer is watching for whether you can design systems where adding a new type doesn't require changing existing code.

// The Problem: Type-Checking Conditionals
// Here's a pattern that shows up constantly in weak LLD answers:

// Java
// C++
// Python
// Copy
// // BAD: ParkingLot checks vehicle type with conditionals
// class ParkingLot {
//     public ParkingSpot findSpot(Vehicle vehicle) {
//         if (vehicle.type.equals("car")) {
//             return findSpotOfSize(SpotSize.MEDIUM);
//         } else if (vehicle.type.equals("motorcycle")) {
//             return findSpotOfSize(SpotSize.SMALL);
//         } else if (vehicle.type.equals("bus")) {
//             return findSpotOfSize(SpotSize.LARGE);
//         }
//         throw new IllegalArgumentException("Unknown vehicle type");
//     }
// }
// This breaks every time you add a new vehicle type. Want to add a Truck? You have to open ParkingLot and modify its code. Want to add a Van? Same thing. The parking lot is doing work that belongs to the vehicles themselves.

// The Fix: Let Each Type Define Its Own Behavior
// Instead of asking "what type are you?" and branching, define a contract that every vehicle must fulfill:

// Java
// C++
// Python
// Copy
// // GOOD: Vehicle interface defines the contract
// interface Vehicle {
//     SpotSize getRequiredSpotSize();
// }

// class Car implements Vehicle {
//     @Override
//     public SpotSize getRequiredSpotSize() {
//         return SpotSize.MEDIUM;
//     }
// }

// class Motorcycle implements Vehicle {
//     @Override
//     public SpotSize getRequiredSpotSize() {
//         return SpotSize.SMALL;
//     }
// }

// class Truck implements Vehicle {
//     @Override
//     public SpotSize getRequiredSpotSize() {
//         return SpotSize.LARGE;
//     }
// }

// // ParkingLot does not change when a new vehicle maps to an existing SpotSize.
// class ParkingLot {
//     public ParkingSpot findSpot(Vehicle vehicle) {
//         return findSpotOfSize(vehicle.getRequiredSpotSize());
//     }
// }
// Adding a Van that uses an existing SpotSize now means creating one new class; ParkingLot does not change. A vehicle that introduces a new spot category or assignment rule can still require changes elsewhere, so Open/Closed is always relative to the anticipated axis of change.

// Interview tip: When you catch yourself writing if (thing.type == ...), ask whether the behavior belongs to the variant, to a separate policy object, or to a deliberately closed dispatcher. Polymorphism is useful when new variants are expected; a small closed enum can be clearer when the cases are stable and data-like.

// Interfaces Define the Contract
// An interface defines the instance contract a caller can rely on. Java interfaces may also contain default, static, and private methods, but they do not carry per-instance fields or constructors the way an abstract class can.

// Java
// C++
// Python
// Copy
// // The contract: any payment method can process a payment
// interface PaymentMethod {
//     boolean process(long amountCents);
// }

// interface PaymentGateway {
//     boolean charge(String cardNumber, long amountCents);
// }

// class CreditCardPayment implements PaymentMethod {
//     private final String cardNumber;
//     private final PaymentGateway gateway;

//     public CreditCardPayment(String cardNumber, PaymentGateway gateway) {
//         this.cardNumber = cardNumber;
//         this.gateway = gateway;
//     }

//     @Override
//     public boolean process(long amountCents) {
//         if (amountCents <= 0) throw new IllegalArgumentException("Must be positive");
//         return gateway.charge(cardNumber, amountCents);
//     }
// }

// class WalletPayment implements PaymentMethod {
//     private long balanceCents;

//     public WalletPayment(long balanceCents) {
//         if (balanceCents < 0) throw new IllegalArgumentException("Cannot be negative");
//         this.balanceCents = balanceCents;
//     }

//     @Override
//     public boolean process(long amountCents) {
//         if (amountCents <= 0) throw new IllegalArgumentException("Must be positive");
//         if (amountCents > balanceCents) return false;
//         balanceCents -= amountCents;
//         return true;
//     }
// }
// The key insight: CreditCardPayment talks to an external gateway. WalletPayment deducts from an internal balance. Completely different implementations, same interface. The calling code doesn't know or care which one it's using.

// Runtime Polymorphism in Action
// The caller works with the interface type, not the concrete class. The correct implementation is selected at runtime.

// Java
// C++
// Python
// Copy
// // The caller has no idea which PaymentMethod it's working with
// PaymentMethod method = new CreditCardPayment("4111-1111-1111-1111", gateway);
// method.process(5000);  // Calls CreditCardPayment.process()

// method = new WalletPayment(10000);
// method.process(5000);  // Calls WalletPayment.process()
// This is what makes polymorphism powerful in real systems. A Checkout class can accept any PaymentMethod. It processes the payment without knowing whether it's a credit card, wallet, bank transfer, or something that doesn't exist yet.

// Interview tip: In your LLD answer, when you declare a variable, use the interface type, not the concrete type. Writing PaymentMethod method = ... instead of CreditCardPayment method = ... signals to the interviewer that you understand polymorphism.

// When Polymorphism Helps vs. Hurts
// Polymorphism is not always the right tool.

// Use it when behavior varies by type and new types are likely. The parking lot example is a clear case: different vehicles need different spot sizes, and new vehicle types will be added.

// Avoid it when you have only two or three types that will never change, or when adding layers of abstraction makes the code harder to trace without providing real extensibility. If you have a NotificationService that only ever sends emails and will never send anything else, wrapping it in a Notifier interface adds indirection for no benefit.

// The test: is there a real caller that benefits from substituting implementations, and is that variation likely? If yes, a stable interface can isolate it. If not, a direct implementation is simpler to trace.

// The Connection to Design Patterns
// Many design patterns in Java are commonly expressed with polymorphism:

// Strategy: choose among algorithms at construction, configuration, or runtime (e.g., different PricingStrategy implementations)
// Observer: notify a list of EventListener objects without knowing their concrete types
// Factory: return different concrete classes through a common interface
// Interfaces and virtual dispatch are not mandatory implementations of these patterns: first-class functions can implement Strategy, and callbacks can implement Observer. The durable idea is substitutable behavior behind a stable boundary. The coming Java examples usually express that boundary as an interface.

// Quick Recap
// Concept	What it means	Why it matters in interviews
// Polymorphism	Same method call, different behavior depending on the concrete type	Eliminates if/else chains on types, makes code extensible
// Interface	Contract defining what methods a class must implement	Decouples the caller from the implementation
// Runtime dispatch	The JVM/runtime picks the correct method at call time	Callers work with abstractions, not concrete classes
// When to use	Behavior varies by type, new types are expected	Shows you can design extensible systems
// When to avoid	Few types, no expected extensions	Shows you don't over-engineer
// Chapter Quiz
// Test your understanding

// Interview Simulator
// Practice design decisions

// Inheritance vs Composition
// Back to chapter

// Abstract Classes vs Interfaces
// On this page
// Why This Matters in Interviews
// The Problem: Type-Checking Conditionals
// The Fix: Let Each Type Define Its Own Behavior
// Interfaces Define the Contract
// Runtime Polymorphism in Action
// When Polymorphism Helps vs. Hurts
// The Connection to Design Patterns
// Quick Recap
