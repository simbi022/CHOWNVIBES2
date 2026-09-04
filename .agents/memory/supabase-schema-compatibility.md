---
name: Supabase schema compatibility
description: Durable schema decision for the restaurant ordering app.
---

The restaurant app uses the supplied clean Supabase schema as the source of truth rather than creating auxiliary tables at runtime. Menu data comes from `menu_items` (`category` and `available`), orders store payment state in `payment_status`, and table numbers are carried in order notes when no table table exists.

**Why:** The deployed Supabase schema does not contain the older `menu_categories`, `bar_tables`, `payments`, or `profiles.name` fields that the imported UI originally queried.

**How to apply:** Keep future Supabase reads and writes aligned with the clean migration before adding new UI features; do not silently reintroduce the removed auxiliary-table assumptions.