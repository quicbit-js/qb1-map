# qb1-map

IN PROGRESS - not ready for distribution.

qb1-map currently just captures the changes to qb-hmap that simplified / removed the type-driven support (vtype handling).

vtype or "value" type handling is important for qb1 optimizations where structures are type-aware, but it's best
to separate that complexity and dependency from the raw index/hash/retrieval code.