"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import Image from "next/image"
import { Search, Filter, Star, Grid, List } from "lucide-react"
import { getProducts, getCategories, type Product } from "@/lib/products"
import { useSearchParams } from "next/navigation"

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const categoryFilter = searchParams.get("category")

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState(categoryFilter || "all")
  const [sortBy, setSortBy] = useState("name")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const products = getProducts()
  const categories = getCategories()

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

    // Sort products
    filtered.sort((a: any, b: any) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        default:
          return 0
      }
    })

    return filtered
  }, [products, searchTerm, selectedCategory, sortBy])

  const ProductCard = ({ product }: { product: Product }) => (
    <Card className="group hover:shadow-lg transition-shadow">
      <CardHeader className="p-0">
        <div className="relative h-48 overflow-hidden rounded-t-lg">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />  
          <Badge className="absolute top-2 right-2 bg-primary/90">
            {categories.find((cat) => cat.id === product.category)?.name}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-2 mb-4">
          <CardTitle className="text-lg">{product.name}</CardTitle>
          <CardDescription className="line-clamp-2">{product.description}</CardDescription>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="text-2xl font-bold text-primary">₹{product.price}</div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span className="text-sm text-muted-foreground">4.8</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-1 mb-4">
          {product.features.slice(0, 2).map((feature, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {feature}
            </Badge>
          ))}
          {product.features.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{product.features.length - 2} more
            </Badge>
          )}
        </div>
        <Button className="w-full" asChild>
          <Link href={`/products/${product.id}`}>View Details</Link>
        </Button>
      </CardContent>
    </Card>
  )

  const ProductListItem = ({ product }: { product: Product }) => (
    <Card className="group hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex gap-6">
          <div className="relative h-32 w-32 flex-shrink-0 overflow-hidden rounded-lg">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="flex-1 space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-xl">{product.name}</CardTitle>
                  <Badge variant="secondary">{categories.find((cat) => cat.id === product.category)?.name}</Badge>
                </div>
                <CardDescription>{product.description}</CardDescription>
              </div>
              <div className="text-right space-y-2">
                <div className="text-2xl font-bold text-primary">₹{product.price}</div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <span className="text-sm text-muted-foreground">4.8</span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-1">
              {product.features.slice(0, 4).map((feature, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {feature}
                </Badge>
              ))}
              {product.features.length > 4 && (
                <Badge variant="outline" className="text-xs">
                  +{product.features.length - 4} more
                </Badge>
              )}
            </div>
            <Button asChild>
              <Link href={`/products/${product.id}`}>View Details</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Page Header */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-balance">Our Products</h1>
            <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
              Discover our comprehensive range of innovative lighting solutions designed for every application.
            </p>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full md:w-64"
                />
              </div>

              {/* Category Filter */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name A-Z</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{filteredAndSortedProducts.length} products</span>
              <div className="flex border rounded-md">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid/List */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {filteredAndSortedProducts.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-2xl font-semibold mb-4">No products found</h3>
              <p className="text-muted-foreground mb-8">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("all")
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "space-y-6"
              }
            >
              {filteredAndSortedProducts.map((product) =>
                viewMode === "grid" ? (
                  <ProductCard key={product.id} product={product} />
                ) : (
                  <ProductListItem key={product.id} product={product} />
                ),
              )}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
