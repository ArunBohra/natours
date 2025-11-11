# Discount Implementation Suggestion

## Overview

This document outlines suggested approaches for implementing discounts/promotions for tours in the Natours application.

## Recommended Approach: Flexible Discount System

### Option 1: Embedded Discount Model (Recommended for Simplicity)

**Best for:** Simple discount scenarios, fixed discounts per tour

#### Database Schema Addition to Tour Model:

```typescript
discounts: {
    type: [{
        code: {
            type: String,
            required: true,
            unique: true,
        },
        type: {
            type: String,
            enum: ['percentage', 'fixed'],
            required: true,
        },
        value: {
            type: Number,
            required: true,
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
        maxUses: {
            type: Number,
            default: null, // null = unlimited
        },
        usedCount: {
            type: Number,
            default: 0,
        },
        minPurchaseAmount: {
            type: Number,
            default: 0,
        },
        active: {
            type: Boolean,
            default: true,
        },
    }],
    default: [],
}
```

**Pros:**

- Simple to implement
- Easy to query discounts per tour
- Good for tour-specific promotions

**Cons:**

- Harder to manage global discounts
- Code duplication if discount logic is complex

---

### Option 2: Separate Discount Collection (Recommended for Flexibility)

**Best for:** Complex discount scenarios, global discounts, cross-tour promotions

#### New Discount Model:

```typescript
// domains/discounts/database/discountModel.ts
const discountSchema = new Schema(
    {
        code: {
            type: String,
            unique: true,
            required: true,
            uppercase: true,
        },
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        type: {
            type: String,
            enum: ['percentage', 'fixed', 'buy-x-get-y'],
            required: true,
        },
        value: {
            type: Number,
            required: true,
        },
        // Tour-specific or global
        tourIds: {
            type: [Types.ObjectId],
            ref: 'Tour',
            default: [], // Empty = applies to all tours
        },
        // Date range
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
        // Usage limits
        maxUses: {
            type: Number,
            default: null, // null = unlimited
        },
        maxUsesPerUser: {
            type: Number,
            default: 1,
        },
        usedCount: {
            type: Number,
            default: 0,
        },
        // Conditions
        minPurchaseAmount: {
            type: Number,
            default: 0,
        },
        minGroupSize: {
            type: Number,
            default: 0,
        },
        // User eligibility
        userEligibility: {
            type: String,
            enum: ['all', 'new-users', 'returning-users', 'verified-only'],
            default: 'all',
        },
        active: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    },
);
```

#### Discount Usage Tracking:

```typescript
// domains/discounts/database/discountUsageModel.ts
const discountUsageSchema = new Schema(
    {
        discountId: {
            type: Types.ObjectId,
            ref: 'Discount',
            required: true,
        },
        userId: {
            type: Types.ObjectId,
            ref: 'User',
            required: true,
        },
        tourId: {
            type: Types.ObjectId,
            ref: 'Tour',
            required: true,
        },
        bookingId: {
            type: Types.ObjectId,
            ref: 'Booking',
            required: true,
        },
        discountAmount: {
            type: Number,
            required: true,
        },
        originalPrice: {
            type: Number,
            required: true,
        },
        finalPrice: {
            type: Number,
            required: true,
        },
        usedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    },
);
```

**Pros:**

- Highly flexible
- Can manage global and tour-specific discounts
- Easy to track usage per user
- Can implement complex discount rules
- Better for analytics and reporting

**Cons:**

- More complex implementation
- Requires additional queries for discount validation

---

### Option 3: Hybrid Approach (Recommended for Production)

Combine both approaches:

- **Simple discounts** (quick sales, tour-specific): Embedded in Tour model
- **Complex discounts** (promotions, global campaigns): Separate Discount collection

---

## Implementation Recommendations

### 1. Discount Service Methods Needed:

```typescript
interface DiscountServicePort {
    // Validate discount code
    validateDiscount(code: string, tourId: string, userId: string, amount: number): Promise<DiscountValidationResult>;

    // Apply discount calculation
    calculateDiscount(originalPrice: number, discount: Discount): number;

    // Track discount usage
    recordDiscountUsage(discountId: string, userId: string, tourId: string, bookingId: string): Promise<void>;

    // Create discount
    createDiscount(discountData: CreateDiscountDTO): Promise<Discount>;

    // Check if user can use discount
    canUserUseDiscount(discountId: string, userId: string): Promise<boolean>;
}
```

### 2. Discount Validation Logic:

```typescript
async validateDiscount(code: string, tourId: string, userId: string, amount: number) {
    // 1. Check if discount exists and is active
    // 2. Check date range (startDate <= now <= endDate)
    // 3. Check if applies to this tour (tourIds empty or includes tourId)
    // 4. Check max uses (maxUses === null || usedCount < maxUses)
    // 5. Check min purchase amount
    // 6. Check user eligibility
    // 7. Check max uses per user
    // 8. Calculate discount amount
    // 9. Return validation result with discount amount
}
```

### 3. Booking Integration:

When creating a booking:

```typescript
// In booking service
if (discountCode) {
    const discount = await discountService.validateDiscount(discountCode, tourId, userId, tour.price);

    if (!discount.valid) {
        throw new AppError({ message: discount.message, statusCode: 400 });
    }

    finalPrice = discount.finalPrice;
    discountAmount = discount.discountAmount;
}
```

### 4. Discount Types to Support:

1. **Percentage Discount**: 10% off, 20% off
2. **Fixed Amount Discount**: $50 off, $100 off
3. **Buy X Get Y**: Buy 2 tickets, get 1 free
4. **Early Bird**: Discount for bookings made X days in advance
5. **Group Discount**: Discount based on group size
6. **Seasonal Discount**: Automatic discounts during certain periods

### 5. API Endpoints Needed:

```
POST   /api/v1/discounts                    - Create discount (admin)
GET    /api/v1/discounts                    - List discounts (admin)
GET    /api/v1/discounts/:id                - Get discount details
PATCH  /api/v1/discounts/:id                - Update discount (admin)
DELETE /api/v1/discounts/:id                - Delete discount (admin)
POST   /api/v1/discounts/validate           - Validate discount code (public)
GET    /api/v1/discounts/available/:tourId   - Get available discounts for tour
```

### 6. Database Indexes Needed:

```typescript
// In discountModel
discountSchema.index({ code: 1 });
discountSchema.index({ active: 1, startDate: 1, endDate: 1 });
discountSchema.index({ tourIds: 1 });

// In discountUsageModel
discountUsageSchema.index({ discountId: 1, userId: 1 });
discountUsageSchema.index({ userId: 1 });
```

### 7. Security Considerations:

- Rate limiting on discount validation endpoint
- Prevent discount code enumeration
- Log all discount usage attempts
- Validate discount ownership/eligibility on backend (never trust frontend)

---

## Recommended Implementation Order:

1. **Phase 1**: Basic discount model (Option 2 - Separate Collection)
    - Create discount model with basic fields
    - Implement discount validation service
    - Add discount validation endpoint

2. **Phase 2**: Discount application
    - Integrate with booking creation
    - Track discount usage
    - Calculate final prices

3. **Phase 3**: Advanced features
    - User eligibility rules
    - Usage limits per user
    - Complex discount types (buy-x-get-y)

4. **Phase 4**: Admin features
    - Discount management UI/API
    - Analytics and reporting
    - Bulk discount operations

---

## Example Discount Objects:

### Percentage Discount:

```json
{
    "code": "SUMMER20",
    "name": "Summer Sale",
    "type": "percentage",
    "value": 20,
    "startDate": "2024-06-01",
    "endDate": "2024-08-31",
    "maxUses": 1000,
    "minPurchaseAmount": 100
}
```

### Fixed Amount Discount:

```json
{
    "code": "SAVE50",
    "name": "Save $50",
    "type": "fixed",
    "value": 50,
    "startDate": "2024-01-01",
    "endDate": "2024-12-31",
    "tourIds": ["tour-id-1", "tour-id-2"]
}
```

---

## Questions to Consider:

1. Do you need automatic discounts (e.g., seasonal, early bird)?
2. Do you need discount stacking (multiple discounts)?
3. Do you need referral discounts?
4. Do you need loyalty/reward-based discounts?
5. Should discounts be combinable with other offers?

Based on your answers, we can refine the implementation approach.
